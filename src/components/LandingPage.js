import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaGlobeAsia, FaArrowRight, FaPlane, FaRoute, FaCalendarAlt,
  FaCheckCircle, FaMountain, FaSuitcaseRolling, FaCamera, FaMapPin, FaUserPlus,
  FaStar, FaHeart, FaShareAlt, FaUserFriends, FaDownload, FaLock, FaBolt,
  FaChartLine, FaImages, FaQuestionCircle
} from 'react-icons/fa';
import './LandingPage.css';

/* ========================================================================
   FEATURES — benefit-led copy that maps to the real product
   ======================================================================== */
const features = [
  {
    icon: <FaGlobeAsia />,
    title: 'Interactive world & country maps',
    desc: 'Stamp 195 countries and drill into states, provinces, or prefectures. Your travel map, rendered beautifully in seconds.',
    color: '#6366f1',
  },
  {
    icon: <FaImages />,
    title: 'Memory Wall',
    desc: 'Upload photos, write your story, and revisit every place you\'ve been. Up to 4 photos per memory, 1,000-word journals.',
    color: '#ec4899',
  },
  {
    icon: <FaShareAlt />,
    title: 'Shareable HD travel cards',
    desc: '12 designer templates. One click downloads a gorgeous Instagram-ready card with your map, photos, and story. Built to go viral.',
    color: '#f59e0b',
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Advanced trip planner',
    desc: 'Dates, cities, budget, day-by-day itinerary, bookings, smart checklists — and invite friends as co-travelers in one click.',
    color: '#10b981',
  },
  {
    icon: <FaUserFriends />,
    title: 'Travel friends & community',
    desc: 'Follow friends, compare maps, see where they\'ve been. Travel is better when it\'s shared.',
    color: '#8b5cf6',
  },
  {
    icon: <FaChartLine />,
    title: 'Stats, badges & insights',
    desc: 'Domestic vs international breakdown, continent coverage, travel DNA, milestone badges from First Flight to Century Club.',
    color: '#06b6d4',
  },
];

/* ========================================================================
   WHY — unique value pillars
   ======================================================================== */
const pillars = [
  { icon: <FaBolt />,      title: 'Built for speed',    desc: 'From signup to first stamp in under 30 seconds. No credit card, no onboarding maze.' },
  { icon: <FaLock />,      title: 'Your data, private', desc: 'Every memory is public, friends-only, or private. You control who sees what, every time.' },
  { icon: <FaDownload />,  title: 'Export anything',    desc: 'Download your world map, travel cards, or stats as HD images. Yours to keep, forever.' },
  { icon: <FaHeart />,     title: 'Free forever',       desc: 'All 195 countries, all features, no ads, no paywalls. Truly free — built by travelers, for travelers.' },
];

/* ========================================================================
   TESTIMONIALS
   ======================================================================== */
const testimonials = [
  { text: 'I used to keep a messy spreadsheet of trips. Now my world map is a stunning visual I actually want to share.', name: 'Priya M.',  role: 'Solo Traveler',  stars: 5 },
  { text: 'The shareable card templates are genuinely beautiful. My Instagram followers ask how I made them every single time.', name: 'Arjun K.',   role: 'Digital Nomad',  stars: 5 },
  { text: 'Planning our anniversary trip with checklists + budget + itinerary in one place was a game-changer. Plus my husband actually used it.', name: 'Sneha R.',   role: 'Travel Blogger', stars: 5 },
];

/* ========================================================================
   FAQ — also mirrored into JSON-LD for SEO
   ======================================================================== */
const faqs = [
  {
    q: 'Is StampYourMap really free?',
    a: 'Yes — completely free. All 195 countries, the full Memory Wall, unlimited trip plans, shareable card templates, and analytics are free forever. No credit card required, no paywalls, no ads.',
  },
  {
    q: 'How many countries and regions does it support?',
    a: 'StampYourMap includes interactive maps for all 195 UN-recognized countries, plus drill-down into 5,000+ states, provinces, prefectures, and territories — the biggest interactive travel map collection on the web.',
  },
  {
    q: 'Can I share my travel map on Instagram, WhatsApp, or Facebook?',
    a: 'Absolutely. Download a high-resolution travel card in one click — 12 designer templates including Midnight, Polaroid, Sunset, Minimal, Neon, and more. Perfect for Instagram Stories, WhatsApp Status, Facebook posts, or Pinterest pins.',
  },
  {
    q: 'Do I need an account to use StampYourMap?',
    a: 'Yes — a free account lets us save your travel map, memories, trip plans, and friends across all your devices. Signup takes about 30 seconds with just an email.',
  },
  {
    q: 'Is my travel data private?',
    a: 'Your data is yours. Every memory has three visibility levels — Public, Friends-only, or Private — and you choose per memory. We never sell or share your data with third parties.',
  },
  {
    q: 'Can I plan trips and invite friends?',
    a: 'Yes. The Trip Planner includes dates, cities, budget tracking, day-by-day itineraries, smart packing checklists, and a built-in friend invite system so your travel buddies get automatic updates as you plan together.',
  },
];

/* ========================================================================
   ANIMATED COUNTER
   ======================================================================== */
function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const duration = 1500;
        const step = Math.ceil(num / (duration / 16));
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= num) { current = num; clearInterval(timer); }
          setCount(current);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ========================================================================
   FAQ ACCORDION ITEM
   ======================================================================== */
function FaqItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}
        data-ga-label={`FAQ: ${typeof q === 'string' ? q : 'item'}`} data-ga-category="faq">
        <span>{q}</span>
        <span className="faq-chevron">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

/* ========================================================================
   MAIN LANDING PAGE
   ======================================================================== */
export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  // Inject JSON-LD structured data for SEO (FAQ + Organization + WebSite)
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'StampYourMap',
      url: 'https://stampyourmap.com',
      logo: 'https://stampyourmap.com/favicon.png',
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@stampyourmap.com',
        contactType: 'customer support',
      },
    };
    const addScript = (id, data) => {
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.id = id;
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };
    addScript('ld-faq', faqSchema);
    addScript('ld-org', orgSchema);
    return () => {
      ['ld-faq', 'ld-org'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  // Load interactive world map with flight arcs
  useEffect(() => {
    if (!mapRef.current) return;
    fetch('/WorldMap_SVG_Source.normalized.svg')
      .then(res => res.text())
      .then(svgContent => {
        if (!mapRef.current) return;
        mapRef.current.innerHTML = svgContent;
        const svg = mapRef.current.querySelector('svg');
        if (!svg) return;
        const W = 2754, H = 1398;
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        const styleEl = svg.querySelector('style');
        if (styleEl) styleEl.remove();
        svg.querySelectorAll('circle').forEach(c => c.setAttribute('opacity', '0'));
        svg.querySelectorAll('path').forEach(path => {
          path.setAttribute('fill', '#3d5f80');
          path.setAttribute('stroke', '#8ab4d8');
          path.setAttribute('stroke-width', '0.8');
        });
        const visited = ['India', 'France', 'Australia', 'Brazil', 'Japan', 'Thailand', 'Italy'];
        svg.querySelectorAll('g').forEach(g => {
          const title = g.querySelector('title');
          if (title && visited.some(v => title.textContent.includes(v))) {
            g.querySelectorAll('path').forEach(p => {
              p.setAttribute('fill', '#34d399');
              p.setAttribute('stroke', '#6ee7b7');
              p.setAttribute('stroke-width', '0.7');
            });
          }
        });
        // Flight arcs
        const ns = 'http://www.w3.org/2000/svg';
        const overlay = document.createElementNS(ns, 'g');
        const routes = [
          { x1: 0.53, y1: 0.30, x2: 0.72, y2: 0.40, color: '#60a5fa' },
          { x1: 0.72, y1: 0.40, x2: 0.87, y2: 0.33, color: '#a78bfa' },
          { x1: 0.17, y1: 0.32, x2: 0.53, y2: 0.30, color: '#22d3ee' },
          { x1: 0.72, y1: 0.40, x2: 0.84, y2: 0.72, color: '#fbbf24' },
        ];
        routes.forEach((r, i) => {
          const x1 = r.x1*W, y1 = r.y1*H, x2 = r.x2*W, y2 = r.y2*H;
          const mx = (x1+x2)/2, my = Math.min(y1,y2) - Math.abs(x2-x1)*0.18;
          const arc = document.createElementNS(ns, 'path');
          arc.setAttribute('d', `M${x1},${y1} Q${mx},${my} ${x2},${y2}`);
          arc.setAttribute('fill', 'none');
          arc.setAttribute('stroke', r.color);
          arc.setAttribute('stroke-width', '3');
          arc.setAttribute('opacity', '0.7');
          arc.setAttribute('stroke-dasharray', '10 7');
          const ad = document.createElementNS(ns, 'animate');
          ad.setAttribute('attributeName', 'stroke-dashoffset');
          ad.setAttribute('values', '0;-34');
          ad.setAttribute('dur', `${1.5+i*0.3}s`);
          ad.setAttribute('repeatCount', 'indefinite');
          arc.appendChild(ad);
          overlay.appendChild(arc);
          const dot = document.createElementNS(ns, 'circle');
          dot.setAttribute('r', '4');
          dot.setAttribute('fill', r.color);
          const am = document.createElementNS(ns, 'animateMotion');
          am.setAttribute('dur', `${3+i*0.4}s`);
          am.setAttribute('repeatCount', 'indefinite');
          am.setAttribute('path', `M${x1},${y1} Q${mx},${my} ${x2},${y2}`);
          dot.appendChild(am);
          overlay.appendChild(dot);
          [{ cx: x1, cy: y1 }, { cx: x2, cy: y2 }].forEach(pt => {
            const city = document.createElementNS(ns, 'circle');
            city.setAttribute('cx', pt.cx);
            city.setAttribute('cy', pt.cy);
            city.setAttribute('r', '4');
            city.setAttribute('fill', r.color);
            city.setAttribute('opacity', '0.6');
            const p = document.createElementNS(ns, 'animate');
            p.setAttribute('attributeName', 'r');
            p.setAttribute('values', '3;8;3');
            p.setAttribute('dur', '2.5s');
            p.setAttribute('repeatCount', 'indefinite');
            city.appendChild(p);
            overlay.appendChild(city);
          });
        });
        svg.appendChild(overlay);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing">
      {/* NAV */}
      <header>
        <nav className={`landing-nav ${scrollY > 50 ? 'scrolled' : ''}`} aria-label="Primary" data-ga-section="landing-nav">
          <div className="landing-nav-inner">
            <a href="/" className="landing-logo" aria-label="StampYourMap home"
              data-ga-label="Landing nav: logo home">
              <FaMountain className="landing-logo-icon" />
              <span>StampYourMap</span>
            </a>
            <div className="landing-nav-links">
              <a href="#features" className="nav-link-text" data-ga-label="Landing nav: Features">Features</a>
              <a href="#how" className="nav-link-text" data-ga-label="Landing nav: How it works">How it works</a>
              <a href="#reviews" className="nav-link-text" data-ga-label="Landing nav: Reviews">Reviews</a>
              <a href="#faq" className="nav-link-text" data-ga-label="Landing nav: FAQ">FAQ</a>
            </div>
            <div className="landing-nav-actions">
              <button className="nav-btn-ghost" onClick={() => navigate('/login')}
                data-ga-label="Landing nav: Log in" data-ga-category="cta">Log in</button>
              <button className="nav-btn-primary" onClick={() => navigate('/signup')}
                data-ga-label="Landing nav: Start stamping" data-ga-category="cta">
                Start stamping <FaArrowRight />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section className="landing-hero" aria-labelledby="hero-heading">
          <div className="hero-bg-shapes">
            <div className="hero-shape hero-shape-1" />
            <div className="hero-shape hero-shape-2" />
            <div className="hero-shape hero-shape-3" />
          </div>
          <div className="hero-content">
            <div className="hero-badge">
              <FaPlane className="hero-badge-icon" /> The free travel tracker for 195 countries
            </div>
            <h1 className="hero-title" id="hero-heading">
              Stamp every country you've visited.
              <br />
              <span className="hero-gradient-text">Share the story.</span>
            </h1>
            <p className="hero-subtitle">
              Your <strong>free travel tracker</strong> for all 195 countries.
              Pin every place you've been, capture memories with photos and stories,
              plan adventures with friends, and download
              {' '}<strong>Instagram-ready travel cards</strong> in one tap.
            </p>
            <div className="hero-actions" data-ga-section="hero">
              <button className="hero-btn-primary" onClick={() => navigate('/signup')}
                data-ga-label="Hero: Stamp your first country" data-ga-category="cta">
                <FaSuitcaseRolling /> Stamp your first country
              </button>
              <a href="#features" className="hero-btn-secondary"
                data-ga-label="Hero: See how it works" data-ga-category="cta">
                See how it works <FaArrowRight />
              </a>
            </div>
            <ul className="hero-bullets" aria-label="Key numbers">
              <li><FaCheckCircle /> <CountUp target="195" /> countries &amp; 5,000+ regions</li>
              <li><FaCheckCircle /> 12 designer card templates</li>
              <li><FaCheckCircle /> Trip planner, friends &amp; memory wall</li>
              <li><FaCheckCircle /> Free forever — no credit card</li>
            </ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-map-real">
              <div className="hero-map-container" ref={mapRef} />
            </div>
            <div className="hero-float-icon fi-1"><FaPlane /></div>
            <div className="hero-float-icon fi-2"><FaCamera /></div>
            <div className="hero-float-icon fi-3"><FaMapPin /></div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="travel-marquee" aria-hidden="true">
          <div className="marquee-track">
            {['Goa', 'Paris', 'Tokyo', 'Kerala', 'Sydney', 'New York', 'Jaipur', 'London', 'Bali', 'Dubai', 'Manali', 'Rome', 'Ladakh', 'Bangkok', 'Maldives', 'Goa', 'Paris', 'Tokyo', 'Kerala', 'Sydney', 'New York', 'Jaipur', 'London', 'Bali', 'Dubai', 'Manali', 'Rome', 'Ladakh', 'Bangkok', 'Maldives'].map((city, i) => (
              <span key={i} className="marquee-item"><FaMapPin className="marquee-pin" /> {city}</span>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="landing-features" id="features" aria-labelledby="features-heading">
          <div className="features-header">
            <div className="section-badge"><FaRoute /> Everything you need</div>
            <h2 id="features-heading">
              One app. Every country.
              <br />
              <span className="hero-gradient-text">Every memory, mapped.</span>
            </h2>
            <p>
              Six powerful features that turn scattered travel memories into a beautiful, shareable story.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <article key={i} className="feature-card" style={{ '--fc': f.color, animationDelay: `${i * 0.08}s` }}>
                <div className="feature-icon" style={{ background: `${f.color}15`, color: f.color }}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="feature-line" style={{ background: f.color }} />
              </article>
            ))}
          </div>
        </section>

        {/* WHY / PILLARS */}
        <section className="landing-why" aria-labelledby="why-heading">
          <div className="why-inner">
            <div className="why-header">
              <div className="section-badge"><FaCheckCircle /> Why StampYourMap</div>
              <h2 id="why-heading">
                Built for real travelers.
                <br />
                <span className="hero-gradient-text">Not for spreadsheet warriors.</span>
              </h2>
            </div>
            <div className="why-grid">
              {pillars.map((p, i) => (
                <div key={i} className="why-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="why-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="landing-how" id="how" aria-labelledby="how-heading">
          <div className="how-header">
            <div className="section-badge"><FaSuitcaseRolling /> Get started</div>
            <h2 id="how-heading">
              From signup to first stamp in
              {' '}<span className="hero-gradient-text">30 seconds</span>.
            </h2>
            <p>Three simple steps to unlock your travel story.</p>
          </div>
          <div className="how-timeline">
            <div className="how-timeline-line" />
            {[
              { num: '1', title: 'Sign up free', desc: 'Quick signup with just an email — no credit card, no onboarding maze. You\'re in.', icon: <FaUserPlus /> },
              { num: '2', title: 'Stamp your map', desc: 'Click countries on the world map. Drill into states. Upload photos and write the story.', icon: <FaMapPin /> },
              { num: '3', title: 'Share the story', desc: 'Download a beautiful HD travel card. Post it to Instagram, WhatsApp, or Facebook in one click.', icon: <FaShareAlt /> },
            ].map((step, i) => (
              <div key={i} className="how-timeline-item" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="how-timeline-dot">{step.icon}</div>
                <div className="how-timeline-content">
                  <span className="how-timeline-num">Step {step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="landing-testimonials" id="reviews" aria-labelledby="reviews-heading">
          <div className="testimonials-header">
            <div className="section-badge"><FaHeart /> Loved by travelers</div>
            <h2 id="reviews-heading">Real travelers. <span className="hero-gradient-text">Real stories.</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <figure key={i} className="testimonial-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
                  {Array(t.stars).fill(0).map((_, j) => <FaStar key={j} />)}
                </div>
                <blockquote className="testimonial-text">"{t.text}"</blockquote>
                <figcaption className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="landing-faq" id="faq" aria-labelledby="faq-heading">
          <div className="faq-inner">
            <div className="faq-header">
              <div className="section-badge"><FaQuestionCircle /> FAQ</div>
              <h2 id="faq-heading">Questions? <span className="hero-gradient-text">We've got answers.</span></h2>
              <p>Everything you need to know before you stamp your first country.</p>
            </div>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="landing-cta" aria-labelledby="cta-heading">
          <div className="cta-content">
            <FaMountain className="cta-icon" />
            <h2 id="cta-heading">Your world is waiting. Start mapping it.</h2>
            <p>
              Join thousands of travelers turning scattered trips into a beautiful, shareable story.
              Free forever. 195 countries. Takes 30 seconds.
            </p>
            <button className="hero-btn-primary cta-btn" onClick={() => navigate('/signup')}
              data-ga-label="Bottom CTA: Start stamping" data-ga-category="cta">
              Start stamping — it's free forever <FaArrowRight />
            </button>
            <div className="cta-reassure">
              <FaCheckCircle /> No credit card
              <FaCheckCircle /> No ads
              <FaCheckCircle /> Data stays yours
            </div>
          </div>
        </section>

        {/* ABOUT + CONTACT */}
        <section id="about" className="landing-about" aria-labelledby="about-heading">
          <div className="landing-about-inner">
            <div className="about-block">
              <h3 id="about-heading">About StampYourMap</h3>
              <p>
                StampYourMap is a free interactive travel map for modern travelers. Stamp every country you've
                visited on stunning interactive maps, capture photos and stories as memories, plan trips
                with co-travelers, and share it all on Instagram, WhatsApp, or Facebook in one click.
                Built by travelers, for travelers.
              </p>
            </div>
            <div className="about-block">
              <h3>Get in touch</h3>
              <p>
                Questions, feedback, partnerships — we read every message.<br />
                <a href="mailto:support@stampyourmap.com" className="contact-email">
                  📧 support@stampyourmap.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="landing-footer" data-ga-section="footer">
        <div className="footer-inner">
          <div className="landing-logo"><FaMountain className="landing-logo-icon" /><span>StampYourMap</span></div>
          <div className="footer-links">
            <a href="#features" data-ga-label="Footer: Features">Features</a>
            <a href="#how" data-ga-label="Footer: How it works">How it works</a>
            <a href="#reviews" data-ga-label="Footer: Reviews">Reviews</a>
            <a href="#faq" data-ga-label="Footer: FAQ">FAQ</a>
            <a href="#about" data-ga-label="Footer: About">About</a>
            <a href="mailto:support@stampyourmap.com" data-ga-label="Footer: Contact email">Contact</a>
            <span onClick={() => navigate('/login')} role="button" tabIndex={0}
              data-ga-label="Footer: Log in">Log in</span>
          </div>
          <p>
            &copy; {new Date().getFullYear()} StampYourMap ·{' '}
            <a href="mailto:support@stampyourmap.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              support@stampyourmap.com
            </a>
            {' '}· Built with <FaHeart style={{ color: '#f43f5e', fontSize: '0.7rem', verticalAlign: 'middle' }} /> for travelers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}
