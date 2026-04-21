import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGlobeAmericas,
  FaLock,
  FaInfinity,
  FaPalette,
  FaUserFriends,
  FaMapMarkedAlt,
  FaImages,
} from 'react-icons/fa';
import { BlogShell, usePageMeta, useRevealOnScroll } from './Blog/BlogLayout';
import {
  BlogStatGrid,
  BlogInlineCTA,
  BlogEndCTA,
  BlogCallout,
} from './Blog/BlogComponents';
import './Blog/Blog.css';

const SITE_ORIGIN = 'https://stampyourmap.com';

export default function About() {
  usePageMeta({
    title: 'About StampYourMap — The Free Interactive Travel Tracker Loved by 10,000+ Travelers',
    description:
      'StampYourMap is the free interactive travel tracker for all 195 countries and 5,000+ regions. Learn our story, our mission and why we built the simplest way to map every place you have ever visited.',
    url: '/about',
    image: '/tom-barrett-M0AWNxnLaMw-unsplash.jpg',
    keywords:
      'about stampyourmap, stampyourmap story, interactive travel tracker, travel map app about, ' +
      'free country tracker, about us stampyourmap, travel memory app mission',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': `${SITE_ORIGIN}/about#aboutpage`,
          url: `${SITE_ORIGIN}/about`,
          name: 'About StampYourMap',
          description:
            'The story, mission and values behind StampYourMap — the free interactive travel tracker for 195 countries.',
          isPartOf: { '@id': `${SITE_ORIGIN}#website` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/tom-barrett-M0AWNxnLaMw-unsplash.jpg`,
          },
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
          sameAs: [],
          slogan: 'Stamp every country you\'ve visited on an interactive world map.',
          description:
            'Free interactive travel tracker for 195 countries and 5,000+ regions. Map places visited, capture memories with photos and stories, plan trips with friends, and share Instagram-ready travel cards.',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@stampyourmap.com',
            contactType: 'customer support',
            availableLanguage: ['English'],
          },
        },
      ],
    },
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <span>About</span>
        </div>

        <div className="blog-hero">
          <span className="blog-cat-chip">About Us</span>
          <span className="blog-meta-sep">•</span>
          <span>Our mission, our story, our why</span>
        </div>

        <h1>🌍 About StampYourMap: The Free Interactive Travel Map Built for Lifelong Travelers</h1>

        <p className="blog-lede">
          We built StampYourMap because our own travel memories kept slipping
          away. A photo album on one phone. A journal in a drawer. A trip's
          worth of stories that faded to a blur after six months. What we
          couldn't find anywhere on the internet was a single, beautiful
          place to pin every country, state, region and city we'd ever
          visited, attach the memory that made each one matter, and watch
          our world slowly fill in over a lifetime. So we made it.
        </p>

        <BlogStatGrid
          stats={[
            { value: '195', label: 'Countries mapped' },
            { value: '5,000+', label: 'States & regions' },
            { value: '10,000+', label: 'Travelers using it' },
            { value: '$0', label: 'Free forever' },
          ]}
        />

        <h2 id="mission">Our Mission</h2>

        <p>
          <strong>Help every traveler remember every place they've been.</strong>
        </p>

        <p>
          That's the whole thing. We think the greatest cost of modern
          travel isn't airfare or hotel prices — it's{' '}
          <em>forgetting</em>. People take the trip of a lifetime and ten
          years later can't remember the name of the restaurant, the face
          of the owner, the exact stretch of coast where everything felt
          suddenly right. Photos alone don't do it. Caption-less scrolls
          on Instagram definitely don't do it. What works is a{' '}
          <strong>map you can pin, a memory you can write, and a
          lifetime horizon</strong>.
        </p>

        <p>
          StampYourMap is that tool. It's deliberately small. It does a
          few things well. It's free. It stays free. And we build it
          exactly the way we'd want to use it ourselves.
        </p>

        <h2 id="why">Why We Built StampYourMap</h2>

        <p>
          Every country-tracking tool we tried before making our own had
          at least one of three flaws:
        </p>

        <ul>
          <li>
            <strong>It was ugly.</strong> Your travel story deserves a
            beautiful map. The tools we tried looked like tax software.
          </li>
          <li>
            <strong>It was locked behind a paywall.</strong> A $40/year
            travel journal is a contradiction. Travel journals should
            outlive subscriptions.
          </li>
          <li>
            <strong>It stopped at country borders.</strong> Americans
            don't just visit "USA." They visit Yellowstone and New
            Orleans and the Oregon coast. A map that only tracks
            countries misses what most people actually remember about a
            trip.
          </li>
        </ul>

        <p>
          So we built a travel tracker that looks like a keepsake, costs
          nothing, and works at every zoom level — from continents down
          to the exact region, state or city you stepped into. The first
          version shipped in 2024. The version you're using today is
          the 14th rewrite. We're only getting started.
        </p>

        <BlogInlineCTA
          title="See your own world map fill in as you travel."
          subtitle="Free forever. No credit card. Works on any device."
          href="/signup"
          button="Start my map"
        />

        <h2 id="what-we-build">What StampYourMap Actually Does</h2>

        <p>
          In one sentence: you sign up, tap countries or regions you've
          visited, write one-line memories on a photo-backed "Memory
          Wall," and download Instagram-ready stamp cards whenever you
          want to share a trip. That's the shape of it. Here's the
          slightly expanded feature list:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
            margin: '20px 0 32px',
          }}
        >
          {[
            {
              icon: <FaGlobeAmericas />,
              title: 'Interactive World Map',
              body: 'All 195 countries plus 5,000+ states, regions and cities. Tap to stamp. Zoom in as deep as you like.',
            },
            {
              icon: <FaImages />,
              title: 'Memory Wall',
              body: 'Every stamp can hold photos and a story. It\'s a travel journal that never runs out of pages.',
            },
            {
              icon: <FaMapMarkedAlt />,
              title: 'Trip Planner',
              body: 'Plan future trips with your own wishlist pins, and share the plan with travel partners.',
            },
            {
              icon: <FaUserFriends />,
              title: 'Friends & Co-Travelers',
              body: 'See the maps of friends who travel. Compare itineraries. Get inspired by where they\'ve been.',
            },
            {
              icon: <FaPalette />,
              title: 'Shareable Stamp Cards',
              body: '12 beautiful templates. One tap exports an HD image ready for Instagram, WhatsApp or Facebook.',
            },
            {
              icon: <FaInfinity />,
              title: 'Lifetime, Free, No Ads*',
              body: 'Your map is your keepsake. We\'ll never paywall the core experience. * Minimal non-intrusive display ads only.',
            },
          ].map((f, i) => (
            <div
              key={i}
              className="blog-reveal"
              style={{
                background: 'var(--card-bg, #fff)',
                border: '1px solid rgba(99,102,241,0.14)',
                borderRadius: 14,
                padding: 18,
                boxShadow: '0 10px 24px -18px rgba(99,102,241,0.3)',
              }}
            >
              <div
                style={{
                  color: '#6366f1',
                  fontSize: 22,
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {f.icon}
              </div>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.55 }}>
                {f.body}
              </div>
            </div>
          ))}
        </div>

        <h2 id="values">What We Believe</h2>

        <p>
          Three things that shape every design decision we make:
        </p>

        <h3>1. Travel memory should be permanent, not algorithmic.</h3>
        <p>
          Your Instagram Stories disappear in 24 hours. Your phone
          replaces itself every three years. Your cloud album gets
          reorganized by an AI you didn't ask. StampYourMap is built
          so your travel record outlives all of it — the map you stamp
          today should still be there in 2046 when your kid asks where
          you've been.
        </p>

        <h3>2. Free should mean free.</h3>
        <p>
          We don't do freemium tiers that silently lock you out of the
          map you built. Every feature that currently exists — stamping,
          memory wall, stamp cards, friends, trip planner — stays free
          forever. If we add premium features later, they'll be
          add-ons, not walls around the thing you already have.
        </p>

        <h3>3. The best travel tool is the one you'll still use in ten years.</h3>
        <p>
          We obsess over the long-term map, not the first-week novelty.
          That's why we build slowly, remove features that don't earn
          their keep, and write letters to new travelers as often as we
          write code.
        </p>

        <h2 id="who-its-for">Who StampYourMap Is For</h2>

        <p>
          If any of these sound like you, you're already home:
        </p>

        <ul>
          <li>
            <strong>First-time international travelers</strong> who want
            their first country stamp to feel like the accomplishment it
            is.
          </li>
          <li>
            <strong>Digital nomads</strong> who've genuinely lost count of
            the list.
          </li>
          <li>
            <strong>Families</strong> keeping a visual record of every
            road trip the kids will inherit.
          </li>
          <li>
            <strong>Travel couples</strong> planning next year's trip
            together on a shared map.
          </li>
          <li>
            <strong>The 10-country club, the 50-country club, the
            100-country club</strong>. Everyone starts somewhere, and
            every stamp counts.
          </li>
        </ul>

        <h2 id="story">The Short Version of the Story</h2>

        <p>
          StampYourMap was founded in 2024 by a small team who'd spent
          too many years building enterprise software and not enough
          years on the road. The first prototype was a single HTML file
          with a color-fill world map and a localStorage array. It was
          ugly. It was also the most satisfying thing any of us had
          built in a decade. We kept going.
        </p>

        <p>
          Today StampYourMap is used by more than{' '}
          <strong>10,000 travelers across 120+ countries</strong>, and
          we ship a new feature or improvement every week. We're still
          small, still self-funded, still building exactly what we'd
          want to use ourselves.
        </p>

        <BlogCallout title="A note on privacy">
          <p>
            Your travel map is yours. We don't sell data, we don't
            share it with advertisers, and we'll never use a machine
            learning model trained on your memories. The only person
            who sees your map is you — unless you explicitly share it
            with a friend or post a stamp card publicly.{' '}
            <FaLock style={{ fontSize: 12, verticalAlign: 'middle' }} />
          </p>
        </BlogCallout>

        <h2 id="next">What's Next</h2>

        <p>
          The roadmap through 2026 — in order of priority:
        </p>

        <ol>
          <li>
            <strong>Native iOS & Android apps.</strong> The web PWA is
            great; the native apps will be better, especially offline.
          </li>
          <li>
            <strong>Printable wall maps.</strong> Your stamped world
            map, shipped as a museum-quality poster.
          </li>
          <li>
            <strong>Travel stats deep-dive.</strong> Miles traveled,
            climate zones crossed, cuisine combinations logged,
            currency count.
          </li>
          <li>
            <strong>Group trips.</strong> Shared maps with multiple
            pin-owners for families and travel groups.
          </li>
          <li>
            <strong>Travel journalism.</strong> You're reading the
            first installment on our <Link to="/blog">blog</Link> —
            expect one deep-dive USA and international travel guide a
            week from now on.
          </li>
        </ol>

        <p>
          If there's a feature you'd love to see, we genuinely want to
          hear it —{' '}
          <Link to="/contact">drop us a line</Link> or email{' '}
          <a href="mailto:support@stampyourmap.com">
            support@stampyourmap.com
          </a>
          . The most popular features in the product today started as
          user emails.
        </p>

        <h2 id="faq">About-Us FAQ</h2>

        <h3>Is StampYourMap really free?</h3>
        <p>
          Yes. Every feature currently on the site is free. We don't
          require a credit card, we don't run pop-up paywalls, and the
          map you build today stays free forever, even if we add
          premium features later.
        </p>

        <h3>Who's behind StampYourMap?</h3>
        <p>
          A small independent team of travelers who write code for a
          living and wanted a better way to remember our own trips.
          We're not venture-funded, we're not owned by a travel
          company, and nothing about the product is a growth hack. If
          you want to say hi: <Link to="/contact">/contact</Link>.
        </p>

        <h3>How do you make money if it's free?</h3>
        <p>
          A small "Buy me a coffee" button on the landing page covers
          hosting, and we run minimal non-intrusive display ads. That's
          it. We have no plans to change the core free model.
        </p>

        <h3>Where's my data stored?</h3>
        <p>
          On encrypted MongoDB Atlas servers in the US East region.
          Your map is tied to your email and can be exported at any
          time by emailing us.
        </p>

        <h3>Can I use StampYourMap offline?</h3>
        <p>
          Partially today (we're a PWA — install it on mobile and the
          core UI works offline). Full offline stamping is in the 2026
          roadmap.
        </p>

        <h2 id="read-more">Keep Exploring</h2>

        <ul>
          <li>
            <Link to="/blog">Read our USA travel guides →</Link>
          </li>
          <li>
            <Link to="/contact">Contact us — we reply fast →</Link>
          </li>
          <li>
            <Link to="/signup">Start stamping for free →</Link>
          </li>
        </ul>

        <BlogEndCTA
          title="Start your map in 30 seconds."
          subtitle="Free forever. No credit card. 195 countries waiting to be stamped."
          href="/signup"
          button="Start stamping"
        />
      </article>
    </BlogShell>
  );
}
