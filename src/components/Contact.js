import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaClock,
  FaBug,
  FaLightbulb,
  FaHandshake,
  FaNewspaper,
  FaLock,
  FaBuilding,
  FaCopy,
  FaCheck,
} from 'react-icons/fa';
import { BlogShell, usePageMeta, useRevealOnScroll } from './Blog/BlogLayout';
import { BlogInlineCTA, BlogEndCTA, BlogCallout } from './Blog/BlogComponents';
import './Blog/Blog.css';

const SITE_ORIGIN = 'https://stampyourmap.com';
const SUPPORT_EMAIL = 'support@stampyourmap.com';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  usePageMeta({
    title: 'Contact StampYourMap — Support, Feedback, Press & Partnerships',
    description:
      'Get in touch with the StampYourMap team. Email support@stampyourmap.com for product feedback, partnerships, press inquiries, bug reports and privacy questions. We reply within 24 hours.',
    url: '/contact',
    image: '/tom-barrett-M0AWNxnLaMw-unsplash.jpg',
    keywords:
      'stampyourmap contact, stampyourmap support email, contact stampyourmap, ' +
      'stampyourmap partnerships, stampyourmap press, report a bug, feature request',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': `${SITE_ORIGIN}/contact#contactpage`,
          url: `${SITE_ORIGIN}/contact`,
          name: 'Contact StampYourMap',
          description:
            'Contact the StampYourMap team for support, feedback, partnerships, press inquiries, bug reports and privacy questions.',
          isPartOf: { '@id': `${SITE_ORIGIN}#website` },
        },
        {
          '@type': 'Organization',
          '@id': `${SITE_ORIGIN}#organization`,
          name: 'StampYourMap',
          url: SITE_ORIGIN,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/icon-512.png`,
            width: 512,
            height: 512,
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              email: SUPPORT_EMAIL,
              contactType: 'customer support',
              availableLanguage: ['English'],
            },
            {
              '@type': 'ContactPoint',
              email: SUPPORT_EMAIL,
              contactType: 'press inquiries',
              availableLanguage: ['English'],
            },
            {
              '@type': 'ContactPoint',
              email: SUPPORT_EMAIL,
              contactType: 'partnerships',
              availableLanguage: ['English'],
            },
          ],
        },
      ],
    },
  });
  useRevealOnScroll();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (insecure context) — fall back to native mailto.
      window.location.href = `mailto:${SUPPORT_EMAIL}`;
    }
  };

  const topics = [
    {
      icon: <FaLightbulb />,
      title: 'Feedback & feature requests',
      body:
        'We ship 1–2 new features per month, almost all of them driven directly by user emails. Tell us what you\'d love to see — especially the small paper-cuts.',
      subject: 'Feature idea',
    },
    {
      icon: <FaBug />,
      title: 'Bug reports',
      body:
        'Found something broken? We respond fastest to bug reports. Please include your browser, device and what you were doing when it happened.',
      subject: 'Bug report',
    },
    {
      icon: <FaHandshake />,
      title: 'Partnerships & collaborations',
      body:
        'Travel publications, tourism boards, brand collaborations, affiliate integrations — we\'re open. Email with the word "Partnership" in the subject.',
      subject: 'Partnership',
    },
    {
      icon: <FaNewspaper />,
      title: 'Press & media',
      body:
        'Writing about travel tracking, digital nomad tools or interactive maps? We\'re happy to provide quotes, screenshots and founder interviews.',
      subject: 'Press inquiry',
    },
    {
      icon: <FaLock />,
      title: 'Privacy & data questions',
      body:
        'Data export, account deletion, GDPR / CCPA requests — ask anything. We reply to privacy emails within one business day.',
      subject: 'Privacy question',
    },
    {
      icon: <FaBuilding />,
      title: 'Enterprise & agencies',
      body:
        'Planning a group trip tracker for your travel agency, corporate team, or school? Tell us the use case; we can help set you up.',
      subject: 'Enterprise inquiry',
    },
  ];

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <span>Contact</span>
        </div>

        <div className="blog-hero">
          <span className="blog-cat-chip">Contact Us</span>
          <span className="blog-meta-sep">•</span>
          <span>Reply usually within 24 hours</span>
        </div>

        <h1>📬 Contact StampYourMap</h1>

        <p className="blog-lede">
          We read every single email. Whether you've found a bug, have a
          feature idea, want to talk about a partnership, or just want to
          tell us how many countries you've stamped this year —
          we'd love to hear from you. Scroll for the right contact
          channel for your reason, or email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>
            <strong>{SUPPORT_EMAIL}</strong>
          </a>{' '}
          directly and we'll route it internally.
        </p>

        {/* Primary email card */}
        <section
          className="blog-reveal"
          aria-labelledby="primary-contact"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            color: '#fff',
            padding: '32px 28px',
            borderRadius: 18,
            margin: '24px 0 32px',
            boxShadow: '0 24px 48px -18px rgba(99,102,241,0.45)',
          }}
        >
          <div
            style={{
              textTransform: 'uppercase',
              fontSize: 12,
              letterSpacing: '0.08em',
              fontWeight: 700,
              opacity: 0.9,
            }}
          >
            Primary contact
          </div>
          <h2
            id="primary-contact"
            style={{
              color: '#fff',
              margin: '6px 0 6px',
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.01em',
            }}
          >
            <FaEnvelope style={{ verticalAlign: '-3px', marginRight: 10 }} />
            {SUPPORT_EMAIL}
          </h2>
          <p
            style={{
              color: '#e0e7ff',
              fontSize: 15,
              margin: '0 0 20px',
            }}
          >
            Any question, any topic. Responses within 24 hours Monday–Friday.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="blog-cta-btn"
              style={{ background: '#fff', color: '#4338ca' }}
            >
              <FaEnvelope style={{ verticalAlign: '-2px', marginRight: 6 }} />
              Open email app
            </a>
            <button
              onClick={copyEmail}
              className="blog-cta-btn"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.35)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 15,
              }}
            >
              {copied ? (
                <>
                  <FaCheck style={{ verticalAlign: '-2px', marginRight: 6 }} />
                  Copied!
                </>
              ) : (
                <>
                  <FaCopy style={{ verticalAlign: '-2px', marginRight: 6 }} />
                  Copy address
                </>
              )}
            </button>
          </div>
        </section>

        <h2 id="topics">What Can We Help With?</h2>

        <p>
          Tap the topic closest to what you want to discuss — each
          opens a pre-subject-lined email, which helps us triage
          faster:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            margin: '20px 0 32px',
          }}
        >
          {topics.map((t, i) => (
            <a
              key={i}
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(t.subject)}`}
              className="blog-reveal"
              style={{
                display: 'block',
                background: 'var(--card-bg, #fff)',
                border: '1px solid rgba(99,102,241,0.14)',
                borderRadius: 14,
                padding: 18,
                boxShadow: '0 10px 24px -18px rgba(99,102,241,0.3)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 250ms ease, box-shadow 250ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow =
                  '0 20px 40px -18px rgba(99,102,241,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 10px 24px -18px rgba(99,102,241,0.3)';
              }}
            >
              <div
                style={{
                  color: '#6366f1',
                  fontSize: 22,
                  marginBottom: 8,
                }}
              >
                {t.icon}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                  marginBottom: 4,
                }}
              >
                {t.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: '#6b7280',
                  lineHeight: 1.55,
                }}
              >
                {t.body}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: '#4338ca',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Email us →
              </div>
            </a>
          ))}
        </div>

        <h2 id="response-time">
          <FaClock style={{ verticalAlign: '-3px', marginRight: 8 }} />
          Response Times
        </h2>

        <p>
          We're a small team, so we reply in order of urgency, not
          strict FIFO. Here's a realistic expectation:
        </p>

        <ul>
          <li>
            <strong>Bug reports that block usage:</strong> within 4–8
            hours during US business days.
          </li>
          <li>
            <strong>Privacy / data-export requests:</strong> within one
            business day.
          </li>
          <li>
            <strong>Feature requests and general feedback:</strong>{' '}
            within 1–2 business days — we read every one, even if we
            don't reply at length.
          </li>
          <li>
            <strong>Partnership and press inquiries:</strong> within 2–3
            business days.
          </li>
          <li>
            <strong>Weekends:</strong> we read; we reply Monday.
          </li>
        </ul>

        <BlogCallout title="Before you write — one favour">
          <p>
            If you have a bug report, it helps us enormously if you
            include: (1) what you were trying to do, (2) what happened
            instead, (3) your browser (Chrome, Safari, Firefox,
            version), and (4) a screenshot if visual. That single
            paragraph turns a 3-email thread into a 1-email fix.
          </p>
        </BlogCallout>

        <BlogInlineCTA
          title="Not here to contact us? Try the product first."
          subtitle="Most questions get answered faster by trying StampYourMap for 60 seconds."
          href="/signup"
          button="Start free"
        />

        <h2 id="faq">Contact FAQ</h2>

        <h3>Is there a contact form instead of email?</h3>
        <p>
          Not yet — email is intentionally the only channel, because it
          lets us triage, forward and respond faster than a form would.
          If you'd prefer a form, tell us in an email and we'll
          prioritize it.
        </p>

        <h3>Do you offer live chat or phone support?</h3>
        <p>
          Not currently. Live chat is surprisingly bad for a travel
          product — most of our users are in 20+ time zones and often
          offline while traveling. Email scales better.
        </p>

        <h3>Can I request data export or account deletion?</h3>
        <p>
          Yes. Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{' '}
          with "Data export" or "Delete account" in the subject. We
          process both within one business day, GDPR and CCPA compliant.
        </p>

        <h3>Do you accept guest posts on the blog?</h3>
        <p>
          Selectively. If you're a travel writer with a data-rich
          destination deep-dive you want us to consider, email with
          "Guest post" in the subject and a link to a published
          sample. We publish roughly one guest piece per month.
        </p>

        <h3>How do I report a security issue?</h3>
        <p>
          Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{' '}
          with "Security" in the subject. We acknowledge within 4
          hours and coordinate responsible disclosure.
        </p>

        <h3>Where are you located?</h3>
        <p>
          We're a distributed team across multiple time zones. Our
          servers are hosted in the US East region on MongoDB Atlas
          and Render. For legal correspondence, email us first and we
          will provide the correct postal address.
        </p>

        <h2 id="also">Before You Go</h2>

        <ul>
          <li>
            <Link to="/about">Read our story →</Link>
          </li>
          <li>
            <Link to="/blog">Browse the StampYourMap travel blog →</Link>
          </li>
          <li>
            <Link to="/signup">Start your free travel map →</Link>
          </li>
        </ul>

        <BlogEndCTA
          title="Haven't stamped your first country yet?"
          subtitle="Takes 30 seconds. Free forever. 195 countries waiting."
          href="/signup"
          button="Start stamping"
        />
      </article>
    </BlogShell>
  );
}
