const nodemailer = require('nodemailer');
const templates = require('./templates');

/**
 * Email service — nodemailer-based SMTP.
 *
 * Required env:
 *   SMTP_HOST (default: smtp.gmail.com)
 *   SMTP_PORT (default: 465)
 *   SMTP_USER (default: support@stampyourmap.com)
 *   SMTP_PASS (required at runtime to actually send)
 *
 * Optional env:
 *   EMAIL_FROM_NAME (default: StampYourMap)
 *   EMAIL_REDIRECT_TO — if set, ALL outbound emails go to this address
 *                      instead of the real recipient (original recipient is
 *                      prepended to the subject for visibility). Use this in
 *                      dev to have every email land in the admin inbox for review.
 */

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_USER = process.env.SMTP_USER || 'support@stampyourmap.com';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'StampYourMap';
const EMAIL_REDIRECT_TO = process.env.EMAIL_REDIRECT_TO || 'global5665@gmail.com';

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  if (!SMTP_PASS) return null;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

function devBanner(realRecipient) {
  return `<div style="background:#0f172a;border:1px solid #334155;color:#94a3b8;padding:10px 16px;font-size:12px;font-family:monospace;text-align:center;border-radius:8px;margin:0 0 16px;">
    🛠️ Dev preview · original recipient: <strong style="color:#f1f5f9;">${realRecipient}</strong>
  </div>`;
}

async function sendMail({ to, subject, html, text }) {
  const realRecipient = to;
  const isRedirecting = EMAIL_REDIRECT_TO && EMAIL_REDIRECT_TO !== to;
  const finalTo = EMAIL_REDIRECT_TO || to;
  // Clean subject — no more [→ email] prefix; original recipient is shown in an in-email dev banner
  const finalSubject = subject;
  const finalHtml = isRedirecting ? devBanner(realRecipient) + html : html;

  const t = getTransporter();
  if (!t) {
    console.log('\n[EMAIL MOCK — no SMTP_PASS set]');
    console.log(`  To: ${finalTo} (original: ${realRecipient})`);
    console.log(`  Subject: ${finalSubject}`);
    console.log('  (set SMTP_PASS env to actually send)\n');
    return { mocked: true, to: finalTo, subject: finalSubject };
  }

  try {
    const info = await t.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: finalTo,
      subject: finalSubject,
      html: finalHtml,
      text: text || html.replace(/<[^>]+>/g, ''),
    });
    console.log(`[EMAIL SENT] to=${finalTo} (original ${realRecipient}) subject="${finalSubject}" id=${info.messageId}`);
    return { sent: true, id: info.messageId, to: finalTo };
  } catch (err) {
    console.error('[EMAIL FAILED]', err.message);
    return { error: err.message };
  }
}

// --- Public API ---
async function sendWelcomeEmail(user) {
  const { html, subject } = templates.welcome({ name: user.name });
  return sendMail({ to: user.email, subject, html });
}

async function sendOtpEmail(user, otp) {
  const { html, subject } = templates.otp({ name: user.name, otp });
  return sendMail({ to: user.email, subject, html });
}

async function sendInviteEmail({ fromUser, toEmail, personalMessage }) {
  const { html, subject } = templates.invite({
    fromName: fromUser.name,
    fromEmail: fromUser.email,
    personalMessage,
  });
  return sendMail({ to: toEmail, subject, html });
}

async function sendFriendRequestEmail({ toUser, fromUser }) {
  const { html, subject } = templates.friendRequest({
    toName: toUser.name,
    fromName: fromUser.name,
  });
  return sendMail({ to: toUser.email, subject, html });
}

module.exports = {
  sendWelcomeEmail,
  sendOtpEmail,
  sendInviteEmail,
  sendFriendRequestEmail,
};
