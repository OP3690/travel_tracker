const nodemailer = require('nodemailer');
const templates = require('./templates');

/**
 * Email service — two-provider setup:
 *
 *   1. RESEND (HTTPS, preferred). Set RESEND_API_KEY and we send via
 *      api.resend.com. This is the only reliable path from a stock
 *      DigitalOcean droplet, where outbound SMTP (ports 25/465/587) is
 *      blocked by default. Resend's API is HTTPS so DO's SMTP filter
 *      doesn't see it.
 *
 *   2. SMTP (nodemailer, fallback). Used when RESEND_API_KEY is not set
 *      and SMTP_PASS IS set. Fine from any host that doesn't block
 *      outbound SMTP (local dev, non-restricted VPSes).
 *
 * Required env (pick one path):
 *   RESEND_API_KEY — Resend API key (preferred; needs a verified sender
 *                    domain OR an on-brand onboarding@resend.dev sandbox
 *                    sender to the account owner)
 *   SMTP_PASS      — SMTP app password (fallback, only works where
 *                    outbound SMTP is open)
 *
 * SMTP sub-env (only when using the SMTP path):
 *   SMTP_HOST (default: smtp.gmail.com)
 *   SMTP_PORT (default: 465)
 *   SMTP_USER (default: support@stampyourmap.com)
 *
 * Optional env (both paths):
 *   EMAIL_FROM        — visible "From:" address (defaults to SMTP_USER)
 *   EMAIL_FROM_NAME   — visible "From:" display name (default: StampYourMap)
 *   EMAIL_REDIRECT_TO — if set, every outbound email goes here instead
 *                       of the real recipient. Dev-only. Must be empty
 *                       in production or users won't get their mail.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_USER = process.env.SMTP_USER || 'support@stampyourmap.com';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'StampYourMap';
const FROM_EMAIL = process.env.EMAIL_FROM || SMTP_USER;
const EMAIL_REDIRECT_TO = process.env.EMAIL_REDIRECT_TO || '';

function providerLabel() {
  if (RESEND_API_KEY) return 'resend';
  if (SMTP_PASS)      return 'smtp';
  return 'mock';
}

let transporter = null;
let bootLogged = false;
function logBoot() {
  if (bootLogged) return;
  bootLogged = true;
  const provider = providerLabel();
  if (provider === 'resend') {
    console.log(`[EMAIL] provider=resend from="${FROM_NAME} <${FROM_EMAIL}>"${EMAIL_REDIRECT_TO ? ` REDIRECT_TO=${EMAIL_REDIRECT_TO}` : ''}`);
  } else if (provider === 'smtp') {
    console.log(`[EMAIL] provider=smtp host=${SMTP_HOST} port=${SMTP_PORT} user=${SMTP_USER}${EMAIL_REDIRECT_TO ? ` REDIRECT_TO=${EMAIL_REDIRECT_TO}` : ''}`);
  } else {
    console.warn(`[EMAIL] NO provider configured — set RESEND_API_KEY (preferred) or SMTP_PASS. Every email will be mocked.`);
  }
}

function getTransporter() {
  logBoot();
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

/**
 * Resend's HTTPS endpoint — the only path that works from a stock DO
 * droplet (SMTP ports are blocked by DO's spam filter). Node 18+ has
 * native fetch; no SDK needed.
 */
async function sendViaResend({ from, to, subject, html, text }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from, to, subject, html, text }),
  });
  const body = await res.text();
  if (!res.ok) {
    // Resend returns a JSON error body; keep it bounded so logs stay sane.
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
  let parsed = {};
  try { parsed = JSON.parse(body); } catch { /* body might be empty on 200 */ }
  return { sent: true, id: parsed.id || null, to };
}

function devBanner(realRecipient) {
  return `<div style="background:#0f172a;border:1px solid #334155;color:#94a3b8;padding:10px 16px;font-size:12px;font-family:monospace;text-align:center;border-radius:8px;margin:0 0 16px;">
    🛠️ Dev preview · original recipient: <strong style="color:#f1f5f9;">${realRecipient}</strong>
  </div>`;
}

async function sendMail({ to, subject, html, text }) {
  logBoot();
  const realRecipient = to;
  const isRedirecting = EMAIL_REDIRECT_TO && EMAIL_REDIRECT_TO !== to;
  const finalTo = EMAIL_REDIRECT_TO || to;
  const finalSubject = subject;
  const finalHtml = isRedirecting ? devBanner(realRecipient) + html : html;
  const finalText = text || html.replace(/<[^>]+>/g, '');
  const from = `${FROM_NAME} <${FROM_EMAIL}>`;

  // Preferred path: Resend over HTTPS. Works from DO droplets even when
  // every SMTP port is blocked.
  if (RESEND_API_KEY) {
    try {
      const result = await sendViaResend({
        from, to: finalTo, subject: finalSubject, html: finalHtml, text: finalText,
      });
      console.log(`[EMAIL SENT via resend] to=${finalTo} (original ${realRecipient}) subject="${finalSubject}" id=${result.id}`);
      return result;
    } catch (err) {
      console.error('[EMAIL FAILED via resend]', err.message);
      return { error: err.message };
    }
  }

  // Fallback path: nodemailer SMTP. Used in local dev or on hosts that
  // don't block outbound SMTP.
  const t = getTransporter();
  if (!t) {
    console.log('\n[EMAIL MOCK — no provider configured]');
    console.log(`  To: ${finalTo} (original: ${realRecipient})`);
    console.log(`  Subject: ${finalSubject}`);
    console.log('  (set RESEND_API_KEY or SMTP_PASS to actually send)\n');
    return { mocked: true, to: finalTo, subject: finalSubject };
  }

  try {
    const info = await t.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: finalTo,
      subject: finalSubject,
      html: finalHtml,
      text: finalText,
    });
    console.log(`[EMAIL SENT via smtp] to=${finalTo} (original ${realRecipient}) subject="${finalSubject}" id=${info.messageId}`);
    return { sent: true, id: info.messageId, to: finalTo };
  } catch (err) {
    console.error('[EMAIL FAILED via smtp]', err.message);
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

// ======================================================================
// DIAGNOSTICS — used by the admin-gated /api/auth/email-debug endpoint.
// Returns the full transport config (minus password) + the actual SMTP
// outcome so you can see exactly why an email didn't go out.
// ======================================================================
async function diagnose(testTo) {
  const provider = providerLabel();
  const config = {
    provider,
    FROM_EMAIL, FROM_NAME,
    RESEND_API_KEY_set: !!RESEND_API_KEY,
    RESEND_API_KEY_length: RESEND_API_KEY ? RESEND_API_KEY.length : 0,
    SMTP_HOST, SMTP_PORT, SMTP_USER,
    SMTP_PASS_set: !!SMTP_PASS,
    SMTP_PASS_length: SMTP_PASS ? SMTP_PASS.length : 0,
    EMAIL_REDIRECT_TO: EMAIL_REDIRECT_TO || null,
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
  const to = testTo || FROM_EMAIL;

  if (provider === 'mock') {
    return { ok: false, config, reason: 'No provider configured — set RESEND_API_KEY (preferred) or SMTP_PASS.' };
  }

  if (provider === 'resend') {
    try {
      const result = await sendViaResend({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to,
        subject: 'StampYourMap email test (via Resend)',
        html: '<p>If you see this, Resend is wired up correctly.</p>',
        text: 'If you see this, Resend is wired up correctly.',
      });
      return { ok: true, config, messageId: result.id, to };
    } catch (err) {
      return { ok: false, config, error: { message: err.message } };
    }
  }

  // provider === 'smtp'
  try {
    const t = getTransporter();
    await t.verify();
    const info = await t.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to,
      subject: 'StampYourMap SMTP test',
      text: 'If you see this, SMTP is wired up correctly.',
    });
    return { ok: true, config, verified: true, messageId: info.messageId, to };
  } catch (err) {
    return {
      ok: false,
      config,
      error: {
        message: err.message,
        code: err.code,
        command: err.command,
        response: err.response,
        responseCode: err.responseCode,
      },
    };
  }
}

module.exports = {
  sendWelcomeEmail,
  sendOtpEmail,
  sendInviteEmail,
  sendFriendRequestEmail,
  diagnose,
};
