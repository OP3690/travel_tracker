import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, usePageMeta, useRevealOnScroll } from './Blog/BlogLayout';
import { BlogCallout } from './Blog/BlogComponents';
import './Blog/Blog.css';

const SITE_ORIGIN = 'https://stampyourmap.com';
const LAST_UPDATED = 'April 24, 2026';

export default function Terms() {
  usePageMeta({
    title: 'Terms of Service — StampYourMap',
    description:
      'The agreement between you and StampYourMap when you use the free interactive travel tracker. Covers your account, content ownership, acceptable use, our service, disclaimers and limitation of liability. Last updated April 24, 2026.',
    url: '/terms',
    image: '/og-default.jpg',
    keywords:
      'stampyourmap terms of service, terms of use, travel tracker terms, acceptable use, ' +
      'user agreement, content ownership, liability, travel app legal',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}/terms#webpage`,
      name: 'Terms of Service',
      url: `${SITE_ORIGIN}/terms`,
      dateModified: '2026-04-24',
      isPartOf: { '@type': 'WebSite', name: 'StampYourMap', url: SITE_ORIGIN },
    },
  });
  useRevealOnScroll();

  return (
    <BlogShell
      title="Terms of Service"
      kicker="Legal"
      lede={`By using StampYourMap you agree to these terms. They are written in plain English — please take a minute to read them.`}
      readingTime="5 min read"
      datePublished={LAST_UPDATED}
    >
      <section className="blog-section reveal">
        <h2>1. The agreement</h2>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of StampYourMap, including the website at stampyourmap.com, our
          API, and any related services (collectively, the &quot;Service&quot;).
          By creating an account or using the Service you agree to be bound by
          these Terms and our <Link to="/privacy">Privacy Policy</Link>. If you
          do not agree, do not use the Service.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be at least 13 years old to use StampYourMap. If you are in
          the EEA or UK, you must be old enough to consent to the processing
          of your personal data under your local law (typically 16). By
          creating an account you confirm you meet these conditions.
        </p>

        <h2>3. Your account</h2>
        <ul>
          <li>You are responsible for keeping your password safe.</li>
          <li>You must provide accurate information when you sign up.</li>
          <li>One account per person. Sharing accounts is not allowed.</li>
          <li>You can delete your account at any time from Settings.</li>
          <li>
            We may suspend or terminate accounts that violate these Terms or
            put the Service at risk.
          </li>
        </ul>

        <h2>4. Your content</h2>
        <p>
          You retain full ownership of everything you upload — your travel
          memories, photos, stories, trip plans, and the list of countries you
          have stamped. We do not claim any rights to your content. To run the
          Service, you grant us a limited, worldwide, royalty-free licence to
          host, display and process your content solely for the purpose of
          providing the Service to you and the people you share it with.
        </p>
        <p>
          You are responsible for what you upload. Do not upload anything you
          do not have the right to share, anything illegal, hateful,
          violent, sexually explicit, or infringing on someone else&apos;s
          privacy.
        </p>

        <h2>5. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Scrape, crawl, or reverse-engineer the Service.</li>
          <li>Resell, sublicense, or commercialize the Service without our written consent.</li>
          <li>Attempt to gain unauthorized access to other users&apos; accounts or data.</li>
          <li>Use the Service to send spam, harass, dox, or defraud anyone.</li>
          <li>Disrupt the Service, including by uploading malware or abusing rate limits.</li>
          <li>Use automated systems (bots) without permission.</li>
        </ul>

        <h2>6. Our service</h2>
        <ul>
          <li>StampYourMap is provided <strong>free of charge</strong>. We may introduce paid plans for power features in the future; you will always be told before any charge.</li>
          <li>We may add, change, or remove features at any time. Where a change is significant and reduces functionality you rely on, we will give reasonable notice in-app.</li>
          <li>The Service is provided &quot;as is&quot; — we do our best to keep it fast, accurate, and available, but cannot guarantee uninterrupted service.</li>
        </ul>

        <h2>7. Third-party content</h2>
        <p>
          Public map data (country and region boundaries, place names) is
          aggregated from open sources including OpenStreetMap and various
          @svg-maps packages. Country flags are Unicode emoji. These are
          provided under their respective open licences. Any error or
          omission in third-party data is unintentional and we will fix it on
          request.
        </p>

        <h2>8. Advertising</h2>
        <p>
          We may display advertising on free pages (currently the public
          landing pages and blog) to support the cost of running the Service.
          Ads are served by Google AdSense and may use cookies — see our{' '}
          <Link to="/cookies">Cookie Policy</Link>. We do not show ads inside
          your private dashboard, memories, or trip plans.
        </p>

        <h2>9. Disclaimers</h2>
        <p>
          StampYourMap is a travel-tracking and journaling app. We are not a
          travel agency, visa service, or insurance provider. Travel
          information in our blog is provided in good faith but conditions
          change — always verify visa requirements, safety advisories, and
          opening hours with the relevant authority before you travel.
        </p>

        <h2>10. Limitation of liability</h2>
        <p>
          To the extent permitted by law, StampYourMap, its operators and its
          contributors are not liable for any indirect, incidental, special,
          consequential or punitive damages, or any loss of profits, revenues,
          data or goodwill arising from your use of the Service. Our maximum
          aggregate liability to you for any claim is the amount you paid to
          use the Service in the 12 months before the claim (so, for free
          users, this is zero).
        </p>

        <h2>11. Indemnity</h2>
        <p>
          You agree to indemnify StampYourMap against any claims or damages
          arising from content you upload, your violation of these Terms, or
          your violation of any third party&apos;s rights.
        </p>

        <h2>12. Termination</h2>
        <p>
          You may stop using the Service and delete your account at any time.
          We may suspend or terminate your access if you breach these Terms,
          if required by law, or if continuing to provide the Service to you
          poses an unacceptable risk to the platform. On termination, these
          Terms remain in force for the obligations that by their nature
          survive.
        </p>

        <h2>13. Changes to the Terms</h2>
        <p>
          We may update these Terms as the Service evolves. We will update the
          &quot;Last updated&quot; date and, for material changes, notify
          active users via in-app banner. Continued use after a change means
          you accept the new Terms.
        </p>

        <h2>14. Governing law</h2>
        <p>
          These Terms are governed by the laws of India. Any disputes will be
          subject to the exclusive jurisdiction of the courts of Mumbai, India,
          unless mandatory consumer-protection law in your country requires
          otherwise.
        </p>

        <BlogCallout title="Questions about anything in here?">
          We&apos;re happy to explain. Email{' '}
          <a href="mailto:support@stampyourmap.com">
            support@stampyourmap.com
          </a>{' '}
          and a real human will respond.
        </BlogCallout>

        <h2>15. Contact</h2>
        <p>
          Email <a href="mailto:support@stampyourmap.com">support@stampyourmap.com</a>{' '}
          for any legal notices or questions about these Terms.
        </p>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
          Last updated: {LAST_UPDATED}
        </p>
      </section>
    </BlogShell>
  );
}
