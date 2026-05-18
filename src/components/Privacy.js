import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, usePageMeta, useRevealOnScroll } from './Blog/BlogLayout';
import { BlogCallout } from './Blog/BlogComponents';
import './Blog/Blog.css';

const SITE_ORIGIN = 'https://stampyourmap.com';
const LAST_UPDATED = 'April 24, 2026';

export default function Privacy() {
  usePageMeta({
    title: 'Privacy Policy — StampYourMap',
    description:
      'How StampYourMap collects, uses, stores and protects your personal data. Plain-English privacy policy covering analytics, cookies, the data you control, your GDPR/CCPA rights, and how to contact us. Last updated April 24, 2026.',
    url: '/privacy',
    image: '/og-default.jpg',
    keywords:
      'stampyourmap privacy policy, travel tracker privacy, data protection, gdpr, ccpa, cookie policy, ' +
      'travel app privacy, user data, personal data, third-party services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}/privacy#webpage`,
      name: 'Privacy Policy',
      url: `${SITE_ORIGIN}/privacy`,
      dateModified: '2026-04-24',
      isPartOf: { '@type': 'WebSite', name: 'StampYourMap', url: SITE_ORIGIN },
      publisher: {
        '@type': 'Organization',
        name: 'StampYourMap',
        url: SITE_ORIGIN,
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@stampyourmap.com',
          contactType: 'customer support',
        },
      },
    },
  });
  useRevealOnScroll();

  return (
    <BlogShell
      title="Privacy Policy"
      kicker="Legal"
      lede={`Plain-English summary of what data StampYourMap collects, why, how long we keep it, and the rights you have over it.`}
      readingTime="6 min read"
      datePublished={LAST_UPDATED}
    >
      <section className="blog-section reveal">
        <h2>1. Who we are</h2>
        <p>
          StampYourMap (the &quot;Service&quot;, &quot;we&quot;, &quot;us&quot;) is a
          free interactive travel tracker operated for travelers who want to map every
          country, state, and city they have ever visited. We can be reached at{' '}
          <a href="mailto:support@stampyourmap.com">support@stampyourmap.com</a>{' '}
          for any privacy-related question. The data controller for the
          purposes of GDPR is the operator of <strong>stampyourmap.com</strong>.
        </p>

        <h2>2. The personal data we collect</h2>
        <p>We deliberately collect as little as possible. The categories are:</p>
        <ul>
          <li>
            <strong>Account data</strong> — name, email address, country (optional),
            and a one-way-hashed password if you sign up with email/password.
          </li>
          <li>
            <strong>Travel data you create</strong> — countries you mark visited,
            memories you upload (text, photos, story, dates), trip plans, the
            list of friends you invite. This is yours and you can delete it at
            any time from Settings.
          </li>
          <li>
            <strong>Usage data</strong> — anonymized pageviews, route changes, click
            events on CTAs, performance timing, browser type, viewport size,
            approximate country (derived from IP, not stored). Used to improve
            the product, never sold.
          </li>
          <li>
            <strong>Device data</strong> — only what your browser exposes via the
            Web APIs: viewport, dark/light preference, language. No fingerprinting.
          </li>
        </ul>

        <h2>3. How we use it</h2>
        <ul>
          <li>To sign you in and keep your travel data attached to your account.</li>
          <li>To render your interactive map, trip plan, statistics, and memory wall.</li>
          <li>To notify you about activity from friends you have connected with.</li>
          <li>To detect abuse (rate limits, login alerts) and keep the service safe.</li>
          <li>To improve UX based on anonymized aggregated analytics.</li>
          <li>To respond to support requests you send to us.</li>
        </ul>
        <p>
          We do not sell your personal data. We do not run a data broker. We do
          not share your account or travel content with third parties for
          advertising purposes.
        </p>

        <h2>4. Cookies and similar technologies</h2>
        <p>
          We use cookies and similar technologies (localStorage, sessionStorage)
          for three purposes:
        </p>
        <ul>
          <li>
            <strong>Essential</strong> — authentication token, theme (light/dark)
            preference, dismissed onboarding banners. Without these the site
            cannot work for you.
          </li>
          <li>
            <strong>Analytics</strong> — Google Analytics 4 (anonymized) and
            Microsoft Clarity (heatmaps + session recording with PII masking)
            help us understand which features are used. Both are loaded only
            after you interact with the page.
          </li>
          <li>
            <strong>Advertising</strong> — when shown, Google AdSense and Google
            Ads tags may set cookies to serve relevant ads. You can manage these
            via your Google Ads Settings.
          </li>
        </ul>
        <p>
          A more detailed breakdown is on our <Link to="/cookies">Cookie Policy</Link>{' '}
          page.
        </p>

        <h2>5. Third-party services we rely on</h2>
        <ul>
          <li><strong>Vercel</strong> — hosts the front-end. Sees IP + request headers for delivery.</li>
          <li><strong>Render</strong> — hosts the API. Sees IP + request headers for delivery.</li>
          <li><strong>MongoDB Atlas</strong> — stores account + travel data, encrypted at rest.</li>
          <li><strong>Google Analytics &amp; Google Ads</strong> — aggregated usage + conversion tracking.</li>
          <li><strong>Microsoft Clarity</strong> — heatmaps and session replay (PII masking on by default).</li>
          <li><strong>Google AdSense</strong> — display advertising on free pages.</li>
          <li><strong>Cloudinary</strong> — secure image hosting for memories you upload.</li>
        </ul>
        <p>
          Each of these processors is contractually required to handle your
          data lawfully and only on our instructions.
        </p>

        <h2>6. Where data is stored</h2>
        <p>
          Account data and travel content sit in MongoDB Atlas (EU/US regions
          depending on the cluster). Files (photos, exported map cards) are
          stored on Cloudinary. Analytics data is held in Google&apos;s and
          Microsoft&apos;s systems. We do not transfer data to countries
          without an adequate level of protection unless covered by Standard
          Contractual Clauses.
        </p>

        <h2>7. How long we keep it</h2>
        <ul>
          <li>Account + travel data: until you delete your account.</li>
          <li>Authentication tokens: 7 days after issuance.</li>
          <li>Analytics: aggregated, retained 14 months.</li>
          <li>Backups: 30-day rolling snapshots, then permanently deleted.</li>
        </ul>

        <h2>8. Your rights</h2>
        <p>
          If you are in the EU, UK, California, India, or any jurisdiction with
          equivalent rights, you can:
        </p>
        <ul>
          <li><strong>Access</strong> — download a copy of your data from Settings → Export.</li>
          <li><strong>Rectify</strong> — fix any inaccurate data from Settings.</li>
          <li><strong>Erase</strong> — delete your entire account and content from Settings → Delete account. This is irreversible.</li>
          <li><strong>Restrict / object</strong> — email <a href="mailto:support@stampyourmap.com">support@stampyourmap.com</a> and we will action within 30 days.</li>
          <li><strong>Portability</strong> — the export is a portable JSON.</li>
          <li><strong>Complain</strong> — to your local data protection authority.</li>
        </ul>

        <h2>9. Children</h2>
        <p>
          StampYourMap is not directed at children under 13. We do not
          knowingly collect data from anyone under 13. If you believe a child
          has signed up, please contact us and we will delete the account.
        </p>

        <h2>10. Security</h2>
        <p>
          Passwords are hashed with bcrypt. All data in transit uses TLS 1.2+.
          Data at rest is encrypted by our infrastructure providers. We follow
          industry best practice for access control on our backend.
        </p>

        <BlogCallout title="A simple promise">
          We will never sell, rent, or share your travel memories with third
          parties for marketing purposes. Your map is yours.
        </BlogCallout>

        <h2>11. Changes to this policy</h2>
        <p>
          We may update this policy as the product evolves. When we do, we
          will change the &quot;Last updated&quot; date at the top of the page
          and, for material changes, notify you in-app before they take effect.
        </p>

        <h2>12. Contact</h2>
        <p>
          Privacy questions, data requests, and concerns:{' '}
          <a href="mailto:support@stampyourmap.com">support@stampyourmap.com</a>.
          We aim to respond within 5 business days.
        </p>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
          Last updated: {LAST_UPDATED}
        </p>
      </section>
    </BlogShell>
  );
}
