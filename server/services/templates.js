/**
 * HTML email templates.
 * Inline CSS (email clients strip <style> tags).
 * Dark-mode-friendly with gradient accents matching the app brand.
 */

const BRAND = 'StampYourMap';
const APP_URL = process.env.APP_URL || 'https://stampyourmap.com';
const SUPPORT_EMAIL = 'support@stampyourmap.com';
const PRIMARY = '#6366f1';
const ACCENT = '#7c3aed';
const BG_DARK = '#0f172a';
const BG_CARD = '#1e293b';
const TEXT_PRIMARY = '#f8fafc';
const TEXT_SECONDARY = '#cbd5e1';

function shell({ preheader, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:${BG_DARK};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,sans-serif;color:${TEXT_PRIMARY};">
<span style="display:none !important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${preheader || ''}</span>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${BG_DARK};padding:32px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;background:${BG_CARD};border-radius:16px;overflow:hidden;border:1px solid #334155;">
        <tr>
          <td style="background:linear-gradient(135deg,${PRIMARY},${ACCENT});padding:28px 32px;text-align:center;">
            <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.02em;">
              <span style="display:inline-block;margin-right:6px;">🗺️</span>${BRAND}
            </div>
            <div style="color:rgba(255,255,255,0.85);font-size:13px;margin-top:4px;font-weight:500;">Stamp every country you've visited</div>
          </td>
        </tr>
        <tr><td style="padding:36px 32px;color:${TEXT_PRIMARY};">${body}</td></tr>
        <tr>
          <td style="padding:24px 32px;border-top:1px solid #334155;background:#0f172a;text-align:center;">
            <div style="color:${TEXT_SECONDARY};font-size:12px;line-height:1.6;">
              Questions? Reply to this email or write to <a href="mailto:${SUPPORT_EMAIL}" style="color:${PRIMARY};text-decoration:none;">${SUPPORT_EMAIL}</a><br>
              © ${new Date().getFullYear()} ${BRAND} · <a href="${APP_URL}" style="color:${PRIMARY};text-decoration:none;">${APP_URL.replace(/^https?:\/\//, '')}</a>
            </div>
          </td>
        </tr>
      </table>
      <div style="color:#64748b;font-size:11px;margin-top:16px;">You're receiving this because you signed up at ${BRAND}.</div>
    </td>
  </tr>
</table>
</body></html>`;
}

function button(label, href) {
  return `<a href="${href}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,${PRIMARY},${ACCENT});color:#fff;text-decoration:none;font-weight:700;border-radius:10px;font-size:15px;box-shadow:0 4px 14px rgba(99,102,241,0.4);">${label}</a>`;
}

// ===== WELCOME =====
exports.welcome = ({ name }) => {
  const firstName = (name || 'Traveler').split(' ')[0];

  const stepCard = (num, emoji, title, desc) => `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0f172a;border:1px solid #334155;border-radius:12px;margin-bottom:10px;">
      <tr>
        <td style="padding:16px 18px;vertical-align:top;width:52px;">
          <div style="width:40px;height:40px;background:linear-gradient(135deg,${PRIMARY},${ACCENT});border-radius:10px;text-align:center;line-height:40px;font-size:18px;font-weight:800;color:#fff;box-shadow:0 4px 12px rgba(99,102,241,0.35);">${num}</div>
        </td>
        <td style="padding:16px 18px 16px 6px;vertical-align:middle;">
          <div style="color:${TEXT_PRIMARY};font-size:15px;font-weight:700;margin-bottom:3px;">${emoji}&nbsp;&nbsp;${title}</div>
          <div style="color:${TEXT_SECONDARY};font-size:13px;line-height:1.5;">${desc}</div>
        </td>
      </tr>
    </table>`;

  const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:56px;line-height:1;margin-bottom:8px;">🎉</div>
      <h1 style="margin:0 0 6px;font-size:28px;font-weight:800;color:${TEXT_PRIMARY};line-height:1.15;letter-spacing:-0.01em;">
        Welcome aboard, ${firstName}!
      </h1>
      <p style="margin:0;color:${TEXT_SECONDARY};font-size:15px;line-height:1.55;">
        Your digital passport is officially open. Let's put some stamps in it.
      </p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(124,58,237,0.1));border:1px solid rgba(99,102,241,0.25);border-radius:14px;padding:20px 24px;margin:24px 0;text-align:center;">
      <div style="color:${TEXT_PRIMARY};font-size:15px;line-height:1.6;">
        Every country you've visited becomes a <strong style="color:${PRIMARY};">stamp</strong> on your personal world map.<br>
        Every photo you add tells a story. Every friend you invite sees your journey.
      </div>
    </div>

    <div style="margin:30px 0 20px;text-align:center;">
      <div style="font-size:11px;letter-spacing:0.15em;color:${TEXT_SECONDARY};font-weight:700;text-transform:uppercase;">
        ──&nbsp;&nbsp;Three quick wins&nbsp;&nbsp;──
      </div>
    </div>

    ${stepCard('1', '🗺️', 'Stamp your first country', 'Click any country you have visited on the world map. Watch it light up in your brand colors.')}
    ${stepCard('2', '📸', 'Capture a memory', 'Upload up to 5 photos and write the story — up to 1000 words. Keep it private, share with friends, or go public.')}
    ${stepCard('3', '👥', 'Invite your travel buddies', 'See each other\'s maps, photos, and stories. Travel is better when it is shared.')}

    <div style="text-align:center;margin:32px 0 8px;">${button('Open My Passport →', APP_URL + '/dashboard')}</div>
    <div style="text-align:center;color:${TEXT_SECONDARY};font-size:12px;margin-bottom:8px;">It's free forever — no credit card, no ads.</div>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;border-top:1px solid #334155;padding-top:20px;">
      <tr>
        <td style="color:${TEXT_SECONDARY};font-size:13px;line-height:1.6;">
          Got a question, suggestion, or just want to say hi? Hit reply.<br>
          A real human at <a href="mailto:${SUPPORT_EMAIL}" style="color:${PRIMARY};text-decoration:none;font-weight:600;">${SUPPORT_EMAIL}</a> reads every message. Promise.
        </td>
      </tr>
    </table>`;
  return {
    subject: `Welcome to ${BRAND}, ${firstName} — let's stamp some countries 🗺️`,
    html: shell({ preheader: `Your digital passport is ready, ${firstName}. Here's how to start stamping.`, body }),
  };
};

// ===== OTP =====
exports.otp = ({ name, otp }) => {
  const firstName = (name || 'there').split(' ')[0];
  const body = `
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:${TEXT_PRIMARY};line-height:1.2;">Reset your password, ${firstName}</h1>
    <p style="margin:0 0 24px;color:${TEXT_SECONDARY};font-size:15px;line-height:1.6;">
      Enter this 6-digit code in the password reset screen. It expires in <strong style="color:${TEXT_PRIMARY};">10 minutes</strong>.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <div style="display:inline-block;background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(124,58,237,0.15));border:2px solid ${PRIMARY};border-radius:14px;padding:20px 36px;">
        <div style="font-size:38px;font-weight:800;letter-spacing:10px;color:${TEXT_PRIMARY};font-family:'Courier New',monospace;">${otp}</div>
      </div>
    </div>
    <div style="background:#0f172a;border-left:3px solid #f59e0b;padding:12px 16px;border-radius:6px;margin-top:24px;">
      <div style="color:#fbbf24;font-weight:700;font-size:13px;margin-bottom:4px;">⚠️ Didn't request this?</div>
      <div style="color:${TEXT_SECONDARY};font-size:13px;line-height:1.5;">You can safely ignore this email. Your password won't change unless you enter this code yourself.</div>
    </div>`;
  return {
    subject: `Your ${BRAND} password reset code: ${otp}`,
    html: shell({ preheader: `Your 6-digit code: ${otp} (expires in 10 minutes)`, body }),
  };
};

// ===== INVITE FRIEND =====
exports.invite = ({ fromName, fromEmail, personalMessage }) => {
  const initials = (fromName || 'F').split(' ').map(s => s[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || 'F';
  const escaped = (personalMessage || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const messageBlock = personalMessage
    ? `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
        <tr>
          <td style="background:#0f172a;border:1px solid #334155;border-radius:12px;padding:18px 22px;">
            <div style="color:${TEXT_SECONDARY};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;margin-bottom:8px;">💬&nbsp;&nbsp;A note from ${fromName.split(' ')[0]}</div>
            <div style="color:${TEXT_PRIMARY};font-size:15px;font-style:italic;line-height:1.6;">"${escaped.slice(0, 500)}"</div>
          </td>
        </tr>
      </table>`
    : '';

  const perk = (emoji, title, desc) => `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:8px;">
      <tr>
        <td style="padding:10px 0;vertical-align:top;width:40px;">
          <div style="width:32px;height:32px;background:rgba(99,102,241,0.12);border-radius:8px;text-align:center;line-height:32px;font-size:15px;">${emoji}</div>
        </td>
        <td style="padding:10px 0 10px 10px;vertical-align:middle;">
          <div style="color:${TEXT_PRIMARY};font-size:14px;font-weight:700;">${title}</div>
          <div style="color:${TEXT_SECONDARY};font-size:13px;line-height:1.5;">${desc}</div>
        </td>
      </tr>
    </table>`;

  const body = `
    <!-- Inviter card -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
      <tr>
        <td style="background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(124,58,237,0.12));border:1px solid rgba(99,102,241,0.3);border-radius:14px;padding:22px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="width:60px;vertical-align:middle;">
                <div style="width:52px;height:52px;background:linear-gradient(135deg,${PRIMARY},${ACCENT});border-radius:50%;text-align:center;line-height:52px;font-size:18px;font-weight:800;color:#fff;box-shadow:0 6px 18px rgba(99,102,241,0.4);">${initials}</div>
              </td>
              <td style="padding-left:14px;vertical-align:middle;">
                <div style="color:${TEXT_SECONDARY};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;margin-bottom:3px;">From your friend</div>
                <div style="color:${TEXT_PRIMARY};font-size:17px;font-weight:800;line-height:1.2;">${fromName}</div>
                <div style="color:${TEXT_SECONDARY};font-size:12px;margin-top:2px;">${fromEmail}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${TEXT_PRIMARY};line-height:1.2;letter-spacing:-0.01em;">
      ${fromName.split(' ')[0]} wants to share their travel map with you ✈️
    </h1>
    <p style="margin:0 0 8px;color:${TEXT_SECONDARY};font-size:15px;line-height:1.6;">
      <strong style="color:${TEXT_PRIMARY};">${fromName}</strong> just invited you to ${BRAND} — a free digital passport where travelers stamp every country they've visited, share photos and stories, and connect with friends.
    </p>

    ${messageBlock}

    <div style="text-align:center;margin:28px 0 10px;">
      ${button(`Join ${fromName.split(' ')[0]} on ${BRAND} →`, APP_URL + '/signup?ref=' + encodeURIComponent(fromEmail))}
    </div>
    <div style="text-align:center;color:${TEXT_SECONDARY};font-size:12px;margin-bottom:28px;">
      Free forever · No credit card · Takes 30 seconds
    </div>

    <!-- Perks -->
    <div style="background:#0f172a;border:1px solid #334155;border-radius:14px;padding:20px 22px;margin-top:12px;">
      <div style="color:${TEXT_PRIMARY};font-size:15px;font-weight:700;margin-bottom:12px;">What you'll get</div>
      ${perk('🗺️', 'Interactive world map', 'Clickable maps for 195 countries. Stamp the ones you have been to.')}
      ${perk('📸', 'Photos &amp; stories', 'Upload up to 5 photos per place and write the story — up to 1000 words.')}
      ${perk('👥', 'See friends\' maps', 'Follow ${fromName.split(\" \")[0]} and your travel buddies. See where they\'ve been.'.replace('${fromName.split(" ")[0]}', fromName.split(' ')[0]))}
      ${perk('🔒', 'Full privacy control', 'Each memory is public, friends-only, or private. Your call, every time.')}
    </div>

    <p style="margin:24px 0 0;color:${TEXT_SECONDARY};font-size:12px;line-height:1.5;text-align:center;">
      Not interested? No worries — you can safely ignore this email. ${fromName.split(' ')[0]} won't be notified either way.
    </p>`;
  return {
    subject: `${fromName} invited you to ${BRAND} ✈️`,
    html: shell({ preheader: `${fromName} wants to share their travel map with you`, body }),
  };
};

// ===== FRIEND REQUEST =====
exports.friendRequest = ({ toName, fromName }) => {
  const firstName = (toName || 'there').split(' ')[0];
  const body = `
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:${TEXT_PRIMARY};line-height:1.2;">Hi ${firstName}, ${fromName} wants to connect 👋</h1>
    <p style="margin:0 0 24px;color:${TEXT_SECONDARY};font-size:15px;line-height:1.6;">
      <strong style="color:${TEXT_PRIMARY};">${fromName}</strong> sent you a friend request on ${BRAND}. Once you accept, you'll see each other's travel maps, photos, and stories.
    </p>
    <div style="text-align:center;margin:28px 0 16px;">${button('Review Request →', APP_URL + '/friends')}</div>`;
  return {
    subject: `${fromName} sent you a friend request on ${BRAND}`,
    html: shell({ preheader: `${fromName} wants to connect with you`, body }),
  };
};
