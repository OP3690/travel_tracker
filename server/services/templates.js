/**
 * StampYourMap — HTML email templates.
 *
 * Design goals:
 *  - Bright, airy, "premium SaaS" feel — clean off-white background
 *    with indigo→violet→rose brand gradient accents.
 *  - Inline CSS (most clients strip <style>).
 *  - 600px table layout — the widely-compatible sweet spot for Gmail,
 *    Outlook, Apple Mail, Superhuman, and mobile clients.
 *  - Symmetric padding: every block uses the same horizontal gutter.
 *  - Always greet the user by their FULL name as they entered it
 *    (lightly title-cased) — feels more personal than "hi firstName".
 */

const BRAND = 'StampYourMap';
const APP_URL = process.env.APP_URL || 'https://stampyourmap.com';
const SUPPORT_EMAIL = 'support@stampyourmap.com';

// Brand palette
const INDIGO  = '#6366f1';
const VIOLET  = '#7c3aed';
const ROSE    = '#ec4899';
const AMBER   = '#f59e0b';

// Surface palette (light theme, email-safe)
const BG_PAGE    = '#f4f5fb';   // outer page wash
const BG_CARD    = '#ffffff';   // main card
const BG_MUTED   = '#f9fafb';   // nested sub-cards
const BORDER     = '#e5e7eb';
const BORDER_SOFT = '#eef0f4';

const TEXT_HEAD  = '#0f172a';   // headings
const TEXT_BODY  = '#334155';   // body copy
const TEXT_MUTED = '#64748b';   // captions / footer

/** Polite title-case for names the user typed in ALL CAPS. Never touches
 *  mixed-case input, never collapses double spaces, never strips hyphens. */
function niceName(raw) {
  const s = String(raw || '').trim();
  if (!s) return 'Traveler';
  // If it has any lowercase, respect what the user typed.
  if (/[a-z]/.test(s)) return s;
  // Otherwise title-case word-by-word while keeping punctuation.
  return s.toLowerCase().replace(/\b\p{L}/gu, c => c.toUpperCase());
}

/** Master layout — every template is rendered inside this shell. */
function shell({ preheader, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${BRAND}</title>
</head>
<body style="margin:0;padding:0;background:${BG_PAGE};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Helvetica,Arial,sans-serif;color:${TEXT_BODY};-webkit-font-smoothing:antialiased;">
  <span style="display:none !important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;visibility:hidden;mso-hide:all;">${preheader || ''}</span>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${BG_PAGE};">
    <tr>
      <td align="center" style="padding:36px 16px;">

        <!-- ============ HEADER ============ -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
          <tr>
            <td style="padding:0 8px 18px 8px;" align="center">
              <a href="${APP_URL}" style="text-decoration:none;display:inline-block;">
                <span style="display:inline-block;font-size:22px;font-weight:800;letter-spacing:-0.01em;color:${TEXT_HEAD};">
                  <span style="display:inline-block;margin-right:6px;vertical-align:-2px;">🗺️</span>${BRAND}
                </span>
              </a>
            </td>
          </tr>
        </table>

        <!-- ============ MAIN CARD ============ -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:${BG_CARD};border-radius:18px;border:1px solid ${BORDER};box-shadow:0 6px 24px rgba(15,23,42,0.06);overflow:hidden;">
          <!-- Top gradient ribbon (decorative, no text — keeps it clean) -->
          <tr>
            <td style="line-height:0;font-size:0;height:6px;background:linear-gradient(90deg,${INDIGO} 0%,${VIOLET} 50%,${ROSE} 100%);">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:40px 40px 36px 40px;">${body}</td>
          </tr>
        </table>

        <!-- ============ FOOTER ============ -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
          <tr>
            <td style="padding:22px 8px 4px 8px;text-align:center;color:${TEXT_MUTED};font-size:12px;line-height:1.7;">
              Questions? Reply to this email or write to
              <a href="mailto:${SUPPORT_EMAIL}" style="color:${INDIGO};text-decoration:none;font-weight:600;">${SUPPORT_EMAIL}</a>.
            </td>
          </tr>
          <tr>
            <td style="padding:0 8px 20px 8px;text-align:center;color:${TEXT_MUTED};font-size:11px;line-height:1.6;">
              © ${new Date().getFullYear()} ${BRAND} ·
              <a href="${APP_URL}" style="color:${TEXT_MUTED};text-decoration:underline;">${APP_URL.replace(/^https?:\/\//, '')}</a>
              · Made with ❤️ for travelers.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body></html>`;
}

/** Brand CTA button — bulletproof for Outlook too (table wrap, inline bg). */
function button(label, href) {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
  <tr>
    <td align="center" bgcolor="${INDIGO}" style="background:linear-gradient(135deg,${INDIGO} 0%,${VIOLET} 60%,${ROSE} 100%);border-radius:12px;">
      <a href="${href}" style="display:inline-block;padding:14px 36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;letter-spacing:0.01em;color:#ffffff;text-decoration:none;border-radius:12px;">${label}</a>
    </td>
  </tr>
</table>`;
}

/** A labeled divider — "── Three quick wins ──" style. */
function divider(label) {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0 18px 0;">
  <tr>
    <td width="40%" style="border-bottom:1px solid ${BORDER_SOFT};font-size:0;line-height:0;">&nbsp;</td>
    <td align="center" style="padding:0 14px;white-space:nowrap;color:${TEXT_MUTED};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">${label}</td>
    <td width="40%" style="border-bottom:1px solid ${BORDER_SOFT};font-size:0;line-height:0;">&nbsp;</td>
  </tr>
</table>`;
}

// ======================================================================
// WELCOME
// ======================================================================
exports.welcome = ({ name }) => {
  const fullName = niceName(name);

  const step = (num, emoji, title, desc) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;background:${BG_MUTED};border:1px solid ${BORDER_SOFT};border-radius:14px;">
  <tr>
    <td style="padding:18px 20px 18px 20px;vertical-align:top;width:54px;">
      <div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,${INDIGO},${VIOLET});color:#fff;font-weight:800;font-size:16px;line-height:42px;text-align:center;box-shadow:0 4px 12px rgba(99,102,241,0.28);">${num}</div>
    </td>
    <td style="padding:18px 22px 18px 8px;vertical-align:middle;">
      <div style="color:${TEXT_HEAD};font-size:15px;font-weight:700;margin-bottom:4px;letter-spacing:-0.005em;">${emoji}&nbsp;&nbsp;${title}</div>
      <div style="color:${TEXT_BODY};font-size:13.5px;line-height:1.55;">${desc}</div>
    </td>
  </tr>
</table>`;

  const body = `
    <!-- Hero emoji + heading -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:0 0 8px 0;">
          <div style="font-size:52px;line-height:1;">🎉</div>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:8px 0 4px 0;">
          <h1 style="margin:0;font-size:28px;font-weight:800;color:${TEXT_HEAD};line-height:1.2;letter-spacing:-0.02em;">
            Welcome aboard,<br><span style="color:${INDIGO};">${fullName}</span>
          </h1>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:10px 0 0 0;">
          <p style="margin:0;color:${TEXT_BODY};font-size:15px;line-height:1.6;max-width:460px;">
            Your digital travel map is ready. Let's put the first stamp on it.
          </p>
        </td>
      </tr>
    </table>

    <!-- Feature pills -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:22px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:0 4px;"><span style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(99,102,241,0.10);color:${INDIGO};font-size:12px;font-weight:700;letter-spacing:0.01em;">✓ 195 countries</span></td>
              <td style="padding:0 4px;"><span style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(124,58,237,0.10);color:${VIOLET};font-size:12px;font-weight:700;letter-spacing:0.01em;">✓ Memory wall</span></td>
              <td style="padding:0 4px;"><span style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(236,72,153,0.10);color:${ROSE};font-size:12px;font-weight:700;letter-spacing:0.01em;">✓ Share cards</span></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${divider('Three quick wins')}

    ${step('1', '🗺️', 'Stamp your first country', 'Tap any country you have visited on the interactive world map. Watch it light up in your brand colors instantly.')}
    ${step('2', '📸', 'Capture a travel memory', 'Upload up to 5 photos and write the story — up to 1,000 words. Keep it private, share with friends, or make it public.')}
    ${step('3', '✨', 'Create a shareable card', 'Turn any memory into a beautiful, Instagram-ready card with 12 designer templates. One tap to download, one tap to share.')}

    <!-- Primary CTA -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:32px;">
      <tr>
        <td align="center" style="padding:4px 0 10px 0;">
          ${button('Open my dashboard  →', APP_URL + '/dashboard')}
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0 0 6px 0;">
          <div style="color:${TEXT_MUTED};font-size:12px;">Free forever · No credit card · No ads</div>
        </td>
      </tr>
    </table>

    <!-- Human closer -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;border-top:1px solid ${BORDER_SOFT};">
      <tr>
        <td style="padding:22px 0 0 0;color:${TEXT_BODY};font-size:13.5px;line-height:1.7;">
          Got a question, a suggestion, or just want to say hi? Hit reply.<br>
          A real human at
          <a href="mailto:${SUPPORT_EMAIL}" style="color:${INDIGO};text-decoration:none;font-weight:600;">${SUPPORT_EMAIL}</a>
          reads every message — promise.
        </td>
      </tr>
      <tr>
        <td style="padding:18px 0 0 0;color:${TEXT_HEAD};font-size:14px;font-weight:600;">
          Happy travels,
        </td>
      </tr>
      <tr>
        <td style="padding:2px 0 0 0;color:${TEXT_BODY};font-size:13.5px;">
          The ${BRAND} team 🗺️
        </td>
      </tr>
    </table>`;

  return {
    subject: `Welcome to ${BRAND}, ${fullName} — let's stamp some countries 🗺️`,
    html: shell({
      preheader: `Your digital travel map is ready, ${fullName}. Here's how to start stamping.`,
      body,
    }),
  };
};

// ======================================================================
// OTP — password reset
// ======================================================================
exports.otp = ({ name, otp }) => {
  const fullName = niceName(name);
  // Split OTP into pairs so large-screen clients still render nicely
  const pretty = String(otp).split('').join(' ');

  const body = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:0 0 6px 0;">
          <div style="font-size:40px;line-height:1;">🔐</div>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:10px 0 0 0;">
          <h1 style="margin:0;font-size:26px;font-weight:800;color:${TEXT_HEAD};line-height:1.25;letter-spacing:-0.015em;">
            Reset your password
          </h1>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:10px 0 0 0;">
          <p style="margin:0;color:${TEXT_BODY};font-size:15px;line-height:1.6;max-width:460px;">
            Hi <strong style="color:${TEXT_HEAD};">${fullName}</strong>, enter this 6-digit code on the password reset screen.
            It expires in <strong style="color:${TEXT_HEAD};">10 minutes</strong>.
          </p>
        </td>
      </tr>
    </table>

    <!-- OTP box -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0 10px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:22px 40px;background:linear-gradient(135deg,rgba(99,102,241,0.06),rgba(236,72,153,0.06));border:2px solid ${INDIGO};border-radius:16px;">
                <div style="color:${TEXT_MUTED};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;margin-bottom:10px;">Your code</div>
                <div style="font-family:'SF Mono','Menlo','Consolas','Courier New',monospace;font-size:38px;font-weight:800;letter-spacing:0.2em;color:${TEXT_HEAD};line-height:1;">${pretty}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Security note -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:22px;">
      <tr>
        <td style="padding:14px 18px;background:#fff7ed;border-left:4px solid ${AMBER};border-radius:10px;">
          <div style="color:#b45309;font-weight:700;font-size:13px;margin-bottom:4px;">⚠️ Didn't request this?</div>
          <div style="color:${TEXT_BODY};font-size:13px;line-height:1.55;">
            You can safely ignore this email. Your password won't change unless you enter this code yourself.
          </div>
        </td>
      </tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;border-top:1px solid ${BORDER_SOFT};">
      <tr>
        <td style="padding:20px 0 0 0;color:${TEXT_MUTED};font-size:12.5px;line-height:1.65;">
          For your security, ${BRAND} will never ask you for this code by phone, chat, or any other channel.
          We only use it inside the app.
        </td>
      </tr>
    </table>`;

  return {
    subject: `Your ${BRAND} verification code: ${otp}`,
    html: shell({
      preheader: `Your 6-digit code is ${otp} — expires in 10 minutes.`,
      body,
    }),
  };
};

// ======================================================================
// INVITE FRIEND
// ======================================================================
exports.invite = ({ fromName, fromEmail, personalMessage }) => {
  const fromFull = niceName(fromName);
  const fromFirst = fromFull.split(/\s+/)[0];
  const initials = fromFull
    .split(/\s+/)
    .map(s => s[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'F';

  const escape = (s) => String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

  const messageBlock = personalMessage
    ? `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:22px 0;">
  <tr>
    <td style="padding:18px 22px;background:${BG_MUTED};border:1px solid ${BORDER_SOFT};border-radius:14px;">
      <div style="color:${TEXT_MUTED};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;margin-bottom:8px;">💬 &nbsp;A note from ${fromFirst}</div>
      <div style="color:${TEXT_HEAD};font-size:15px;font-style:italic;line-height:1.65;">"${escape(personalMessage).slice(0, 500)}"</div>
    </td>
  </tr>
</table>`
    : '';

  const perk = (emoji, title, desc) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td style="padding:12px 0;vertical-align:top;width:44px;">
      <div style="width:36px;height:36px;border-radius:10px;background:rgba(99,102,241,0.10);color:${INDIGO};font-size:16px;line-height:36px;text-align:center;">${emoji}</div>
    </td>
    <td style="padding:12px 0 12px 12px;vertical-align:middle;">
      <div style="color:${TEXT_HEAD};font-size:14.5px;font-weight:700;">${title}</div>
      <div style="color:${TEXT_BODY};font-size:13px;line-height:1.55;">${desc}</div>
    </td>
  </tr>
</table>`;

  const body = `
    <!-- Inviter card -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:22px;">
      <tr>
        <td style="padding:22px 24px;background:linear-gradient(135deg,rgba(99,102,241,0.06),rgba(236,72,153,0.06));border:1px solid rgba(99,102,241,0.2);border-radius:16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="width:60px;vertical-align:middle;">
                <div style="width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,${INDIGO},${ROSE});color:#fff;font-weight:800;font-size:18px;line-height:54px;text-align:center;box-shadow:0 6px 18px rgba(99,102,241,0.35);">${initials}</div>
              </td>
              <td style="padding-left:16px;vertical-align:middle;">
                <div style="color:${TEXT_MUTED};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;margin-bottom:3px;">From your friend</div>
                <div style="color:${TEXT_HEAD};font-size:17px;font-weight:800;line-height:1.25;letter-spacing:-0.005em;">${fromFull}</div>
                <div style="color:${TEXT_MUTED};font-size:12.5px;margin-top:2px;">${fromEmail}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h1 style="margin:0 0 10px 0;font-size:26px;font-weight:800;color:${TEXT_HEAD};line-height:1.25;letter-spacing:-0.02em;">
      ${fromFirst} wants to share their travel map with you ✈️
    </h1>
    <p style="margin:0 0 4px 0;color:${TEXT_BODY};font-size:15px;line-height:1.65;">
      <strong style="color:${TEXT_HEAD};">${fromFull}</strong> just invited you to ${BRAND} — a free digital travel map where travelers stamp every country they've visited, capture photos and stories, and connect with friends.
    </p>

    ${messageBlock}

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:26px 0 6px 0;">
      <tr>
        <td align="center">
          ${button('Join ' + fromFirst + ' on ' + BRAND + '  →', APP_URL + '/signup?ref=' + encodeURIComponent(fromEmail))}
        </td>
      </tr>
      <tr>
        <td align="center" style="padding-top:10px;">
          <div style="color:${TEXT_MUTED};font-size:12px;">Free forever · No credit card · Takes 30 seconds</div>
        </td>
      </tr>
    </table>

    ${divider('What you\'ll get')}

    <div style="background:${BG_MUTED};border:1px solid ${BORDER_SOFT};border-radius:14px;padding:6px 22px 14px 22px;">
      ${perk('🗺️', 'Interactive world map', 'Clickable maps for 195 countries. Stamp the ones you have been to.')}
      ${perk('📸', 'Photos &amp; stories', 'Upload up to 5 photos per place and write the story — up to 1,000 words.')}
      ${perk('👥', 'See friends\' maps', `Follow ${fromFirst} and your travel buddies. See where they have been.`)}
      ${perk('🔒', 'Full privacy control', 'Each memory is public, friends-only, or private. Your call, every time.')}
    </div>

    <p style="margin:24px 0 0 0;color:${TEXT_MUTED};font-size:12px;line-height:1.6;text-align:center;">
      Not interested? No worries — you can safely ignore this email. ${fromFirst} won't be notified either way.
    </p>`;

  return {
    subject: `${fromFull} invited you to ${BRAND} ✈️`,
    html: shell({
      preheader: `${fromFull} wants to share their travel map with you.`,
      body,
    }),
  };
};

// ======================================================================
// FRIEND REQUEST
// ======================================================================
exports.friendRequest = ({ toName, fromName }) => {
  const toFull = niceName(toName);
  const fromFull = niceName(fromName);
  const fromFirst = fromFull.split(/\s+/)[0];
  const fromInitials = fromFull.split(/\s+/).map(s => s[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || 'F';

  const body = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:0 0 6px 0;">
          <div style="font-size:40px;line-height:1;">👋</div>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:8px 0 0 0;">
          <h1 style="margin:0;font-size:26px;font-weight:800;color:${TEXT_HEAD};line-height:1.25;letter-spacing:-0.015em;">
            ${fromFirst} wants to connect
          </h1>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:10px 0 0 0;">
          <p style="margin:0;color:${TEXT_BODY};font-size:15px;line-height:1.65;max-width:460px;">
            Hi <strong style="color:${TEXT_HEAD};">${toFull}</strong> — <strong style="color:${TEXT_HEAD};">${fromFull}</strong> sent you a friend request on ${BRAND}.
            Once you accept, you'll see each other's travel maps, photos, and stories.
          </p>
        </td>
      </tr>
    </table>

    <!-- Requester card -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:26px 0 10px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:18px 22px;background:${BG_MUTED};border:1px solid ${BORDER_SOFT};border-radius:14px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,${INDIGO},${ROSE});color:#fff;font-weight:800;font-size:16px;line-height:48px;text-align:center;">${fromInitials}</div>
                    </td>
                    <td style="padding-left:14px;vertical-align:middle;">
                      <div style="color:${TEXT_HEAD};font-size:15px;font-weight:700;line-height:1.2;">${fromFull}</div>
                      <div style="color:${TEXT_MUTED};font-size:12.5px;margin-top:2px;">wants to be your travel friend</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0 4px 0;">
      <tr>
        <td align="center">${button('Review request  →', APP_URL + '/friends')}</td>
      </tr>
      <tr>
        <td align="center" style="padding-top:10px;">
          <div style="color:${TEXT_MUTED};font-size:12px;">Tap above to accept or decline.</div>
        </td>
      </tr>
    </table>`;

  return {
    subject: `${fromFull} sent you a friend request on ${BRAND}`,
    html: shell({
      preheader: `${fromFull} wants to connect with you on ${BRAND}.`,
      body,
    }),
  };
};
