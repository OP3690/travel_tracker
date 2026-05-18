import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, usePageMeta, useRevealOnScroll } from './Blog/BlogLayout';
import { BlogCallout } from './Blog/BlogComponents';
import './Blog/Blog.css';

const SITE_ORIGIN = 'https://stampyourmap.com';
const LAST_UPDATED = 'April 24, 2026';

export default function Cookies() {
  usePageMeta({
    title: 'Cookie Policy — StampYourMap',
    description:
      'Exactly which cookies StampYourMap sets, who sets them, why, and how to turn them off. Covers essential auth cookies, Google Analytics, Microsoft Clarity, and Google AdSense. Last updated April 24, 2026.',
    url: '/cookies',
    image: '/og-default.jpg',
    keywords:
      'stampyourmap cookies, cookie policy, third-party cookies, google analytics cookies, ' +
      'adsense cookies, clarity cookies, how to disable cookies, gdpr cookies',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}/cookies#webpage`,
      name: 'Cookie Policy',
      url: `${SITE_ORIGIN}/cookies`,
      dateModified: '2026-04-24',
      isPartOf: { '@type': 'WebSite', name: 'StampYourMap', url: SITE_ORIGIN },
    },
  });
  useRevealOnScroll();

  return (
    <BlogShell
      title="Cookie Policy"
      kicker="Legal"
      lede={`We use cookies and similar technologies to keep you signed in, to understand how the product is used, and to fund the free service. Here is exactly what is set and how to opt out.`}
      readingTime="4 min read"
      datePublished={LAST_UPDATED}
    >
      <section className="blog-section reveal">
        <h2>1. What is a cookie?</h2>
        <p>
          A cookie is a small text file that a website stores in your browser
          so it can remember things between visits — for example, that you are
          signed in, or that you prefer dark mode. We also use related
          technologies like <strong>localStorage</strong> and{' '}
          <strong>sessionStorage</strong> which work the same way but live
          inside the browser.
        </p>

        <h2>2. Essential cookies</h2>
        <p>
          These are required for the Service to work. You cannot opt out of
          them and we do not need consent to set them.
        </p>
        <ul>
          <li>
            <strong>token</strong> — your authentication JWT, set when you sign
            in. Stored in localStorage. Expires after 7 days.
          </li>
          <li>
            <strong>user</strong> — cached display name + avatar initials, so
            the UI does not flash blank on hard refresh. Stored in localStorage.
          </li>
          <li>
            <strong>theme</strong> — your light/dark theme preference. Stored
            in localStorage.
          </li>
          <li>
            <strong>syp:welcomeDismissed / syp:nudgeDismissed</strong> — flags
            for in-app banners you have already closed. Stored in localStorage.
          </li>
        </ul>

        <h2>3. Analytics cookies</h2>
        <p>
          These help us understand which features are used so we can improve
          the product. They are anonymized and only fire after you interact
          with the page (tap, scroll, or key).
        </p>
        <ul>
          <li>
            <strong>Google Analytics 4</strong> — sets _ga, _ga_*, _gid for
            anonymized session tracking. IP anonymization is on. Data retained
            14 months.
          </li>
          <li>
            <strong>Microsoft Clarity</strong> — sets _clck, _clsk, CLID for
            heatmaps and session recording. PII masking is on by default; we
            never see your input values.
          </li>
        </ul>

        <h2>4. Advertising cookies</h2>
        <p>
          Free travel apps cost money to run. We display advertising on the
          public pages (landing, blog) to keep the service free. Ads are
          delivered by Google AdSense, which may set cookies to choose
          relevant ads and prevent the same ad from being shown to you over
          and over.
        </p>
        <ul>
          <li>
            <strong>Google AdSense</strong> — sets IDE, NID, __gads,
            __gpi for ad personalization, frequency capping, and fraud
            prevention.
          </li>
          <li>
            <strong>Google Ads conversion</strong> — sets _gcl_au for
            measuring effectiveness of search ads.
          </li>
        </ul>
        <p>
          We never show ads inside your private dashboard, memories, or trip
          plans.
        </p>

        <h2>5. How to opt out</h2>
        <ul>
          <li>
            <strong>Browser-wide</strong> — every modern browser lets you block
            or delete cookies. In Chrome: Settings → Privacy and security →
            Cookies. In Safari: Settings → Safari → Privacy. Note that
            blocking essential cookies will sign you out and break the app.
          </li>
          <li>
            <strong>Google ads personalization</strong> — turn off at{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
              adssettings.google.com
            </a>.
          </li>
          <li>
            <strong>Microsoft Clarity</strong> — opt out at{' '}
            <a href="https://clarity.microsoft.com/optout" target="_blank" rel="noopener noreferrer">
              clarity.microsoft.com/optout
            </a>.
          </li>
          <li>
            <strong>Do Not Track</strong> — we honour the DNT browser signal
            for our analytics. If your browser sends it, GA + Clarity will not
            load.
          </li>
        </ul>

        <h2>6. Cookies set by other people</h2>
        <p>
          Most of the cookies above are set by third parties (Google,
          Microsoft), not by us. We have no access to their cookie databases
          and cannot delete cookies on their behalf. To delete those, use the
          browser controls above or the third-party opt-out links.
        </p>

        <BlogCallout title="Want a private map?">
          Set your account to Private in Settings → Privacy. We will never
          show advertising on private content, and your memories never leave
          our database.
        </BlogCallout>

        <h2>7. Updates</h2>
        <p>
          When we add or remove a cookie partner, we will update this list and
          change the &quot;Last updated&quot; date at the bottom.
        </p>

        <h2>8. Related</h2>
        <ul>
          <li><Link to="/privacy">Privacy Policy</Link> — what data we collect overall.</li>
          <li><Link to="/terms">Terms of Service</Link> — your agreement when using the Service.</li>
        </ul>

        <h2>9. Contact</h2>
        <p>
          Questions about cookies:{' '}
          <a href="mailto:support@stampyourmap.com">support@stampyourmap.com</a>.
        </p>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
          Last updated: {LAST_UPDATED}
        </p>
      </section>
    </BlogShell>
  );
}
