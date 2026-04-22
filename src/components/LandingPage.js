import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaGlobeAsia, FaArrowRight, FaPlane, FaRoute, FaCalendarAlt,
  FaCheckCircle, FaMountain, FaSuitcaseRolling, FaMapPin, FaUserPlus,
  FaStar, FaHeart, FaShareAlt, FaUserFriends, FaDownload, FaLock, FaBolt,
  FaChartLine, FaImages, FaQuestionCircle, FaGlobeAmericas, FaPalette, FaInfinity,
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
   TESTIMONIALS — mix of American, British, and French travelers
   Photos live in /public/reviewers/ (served at /reviewers/*.jpg)
   ======================================================================== */
const testimonials = [
  {
    photo: '/reviewers/emily.jpg',
    name:  'Emily Carter',
    role:  'Travel photographer · London 🇬🇧',
    stars: 5,
    text:
      '14 years of scattered Instagram tags and messy Google Docs — all gone. StampYourMap is the one place I open when someone asks where I\'ve been. The share-cards are gorgeous enough that I actually post them.',
  },
  {
    photo: '/reviewers/camille.jpg',
    name:  'Camille Laurent',
    role:  'Food & travel writer · Paris 🇫🇷',
    stars: 5,
    text:
      'Je l\'adore. My partner and I planned our honeymoon through Japan entirely inside the Trip Planner — budget, itinerary, bookings. And reliving it through the Memory Wall afterwards? Pure magic.',
  },
  {
    photo: '/reviewers/james.jpg',
    name:  'James Harrison',
    role:  'Digital nomad · Austin, TX 🇺🇸',
    stars: 5,
    text:
      'I\'ve stamped 58 countries since 2019 and tried every tracker out there. This finally replaced the three apps I used for logging, journaling, and sharing. The world map looks stunning on an iPad.',
  },
  {
    photo: '/reviewers/juliette.jpg',
    name:  'Juliette Moreau',
    role:  'Travel blogger · Nice 🇫🇷',
    stars: 5,
    text:
      'The shareable post designs are genuinely the best I\'ve seen in any travel app. My Instagram followers message me every time I post one asking which app I used. 12 templates is almost too many good choices.',
  },
  {
    photo: '/reviewers/oliver.jpg',
    name:  'Oliver Bennett',
    role:  'Backpacker & street photographer · Manchester 🇬🇧',
    stars: 5,
    text:
      'Best travel app I\'ve tested in five years of nomad life. The Memory Wall finally got me to revisit my own photos — I\'d forgotten half my trips. Seeing them stamped on a proper world map is oddly emotional.',
  },
  {
    photo: '/reviewers/madison.jpg',
    name:  'Madison Parker',
    role:  'Solo adventurer · Denver, CO 🇺🇸',
    stars: 5,
    text:
      'Signed up on a whim and ended up planning my entire Europe trip with my sister in it. The friends feature made it actually fun — we compete on who\'s stamped more countries. She\'s winning. For now.',
  },
  {
    photo: '/reviewers/ava.jpg',
    name:  'Ava Mitchell',
    role:  'Adventure guide · Portland, OR 🇺🇸',
    stars: 5,
    text:
      'I lead small-group trips and used to send clients three different links for the itinerary, photos, and map. Now I just point them to our shared Memory Wall. Even my least-techy guests figure it out in 30 seconds.',
  },
  {
    photo: '/reviewers/lucas.jpg',
    name:  'Lucas Dubois',
    role:  'Sommelier & wine-region traveler · Bordeaux 🇫🇷',
    stars: 5,
    text:
      'C\'est magnifique. I\'ve been cataloguing every vineyard trip for years in a Moleskine — now they\'re all pinned on a real map with photos and tasting notes. Finally a journal that doesn\'t feel like homework.',
  },
  {
    photo: '/reviewers/isabelle.jpg',
    name:  'Isabelle Fraser',
    role:  'Travel journalist · Edinburgh 🇬🇧',
    stars: 5,
    text:
      'I\'ve written for Condé Nast and Lonely Planet, so I\'ve seen every trip-tracker out there. StampYourMap is the first one where the design is as thoughtful as the data model. Every detail feels intentional.',
  },
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
   TESTIMONIALS CAROUSEL — auto-rotates, shows 3 at a time
   (collapses to 1 at a time on mobile via CSS).
   ======================================================================== */
function TestimonialCard({ t, stagger }) {
  const initials = t.name.split(/\s+/).map(s => s[0]).filter(Boolean).join('').slice(0, 2).toUpperCase();
  return (
    <figure className="testimonial-card" style={{ animationDelay: `${stagger * 0.08}s` }}>
      <div className="testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
        {Array(t.stars).fill(0).map((_, j) => <FaStar key={j} />)}
      </div>
      <blockquote className="testimonial-text">"{t.text}"</blockquote>
      <figcaption className="testimonial-author">
        <div className="testimonial-avatar testimonial-avatar-photo">
          {t.photo ? (
            <img
              src={t.photo}
              alt={t.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.textContent = initials;
              }}
            />
          ) : initials}
        </div>
        <div>
          <div className="testimonial-name">{t.name}</div>
          <div className="testimonial-role">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

function TestimonialsCarousel() {
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const VISIBLE = 3;
  const INTERVAL = 5500;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setOffset(o => (o + 1) % testimonials.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  // Pick N cards starting at `offset`, wrapping.
  const visible = Array.from({ length: VISIBLE }, (_, i) =>
    testimonials[(offset + i) % testimonials.length]
  );

  return (
    <div
      className="testimonials-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
      aria-roledescription="carousel"
      aria-label="Travelers love StampYourMap"
    >
      {/* key={offset} forces remount so the fadeInUp CSS animation replays */}
      <div className="testimonials-grid" key={offset}>
        {visible.map((t, i) => (
          <TestimonialCard key={`${offset}-${i}`} t={t} stagger={i} />
        ))}
      </div>

      <div className="testimonials-dots" role="tablist">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonials-dot ${i === offset ? 'active' : ''}`}
            aria-label={`Show reviewer ${i + 1} of ${testimonials.length}`}
            aria-selected={i === offset}
            role="tab"
            onClick={() => setOffset(i)}
          />
        ))}
      </div>
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
  const tooltipRef = useRef(null);

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

  // Load interactive world map with flight arcs + clickable countries
  useEffect(() => {
    if (!mapRef.current) return;
    const tooltip = tooltipRef.current;
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
        const containerEl = mapRef.current;
        // Collect every titled element — the SVG mixes <g><title/><path/></g>
        // and <path><title/></path>, so we bind to whichever is the title's parent.
        const countryElements = new Set();
        svg.querySelectorAll('title').forEach(t => {
          const parent = t.parentElement;
          if (!parent || parent === svg) return; // skip the root <svg> "World Map" title
          if (!t.textContent || !t.textContent.trim()) return;
          countryElements.add(parent);
        });
        let visitedIdx = 0;
        countryElements.forEach(el => {
          // Use the first (direct-child preferred) title as the country name.
          const t = el.querySelector(':scope > title') || el.querySelector('title');
          const name = (t?.textContent || '').trim();
          if (!name) return;
          const isVisited = visited.some(v => name.includes(v));
          el.setAttribute('data-country', name);
          el.classList.add('sym-country');
          // Gather paths to color. If el is a <path>, style it directly.
          // If el is a <g>, style its direct-child paths (avoids leaking styles
          // into nested sub-territory groups that have their own titles).
          const targets = el.tagName.toLowerCase() === 'path'
            ? [el]
            : Array.from(el.querySelectorAll(':scope > path'));
          targets.forEach(p => {
            p.classList.add('sym-country-path');
            if (isVisited) {
              p.setAttribute('fill', '#34d399');
              p.setAttribute('stroke', '#6ee7b7');
              p.setAttribute('stroke-width', '0.7');
            }
          });
          if (isVisited) {
            el.classList.add('sym-visited');
            el.style.setProperty('--stamp-delay', `${600 + visitedIdx * 140}ms`);
            visitedIdx += 1;
          }
          const onEnter = (e) => {
            el.classList.add('sym-hover');
            if (tooltip) {
              tooltip.textContent = isVisited ? `${name} · stamped` : `${name} · stamp it`;
              tooltip.classList.add('show');
              const rect = containerEl.getBoundingClientRect();
              const x = (e.clientX || rect.left + rect.width / 2) - rect.left;
              const y = (e.clientY || rect.top + rect.height / 2) - rect.top;
              tooltip.style.setProperty('--tx', `${x}px`);
              tooltip.style.setProperty('--ty', `${y}px`);
            }
          };
          const onMove = (e) => {
            if (!tooltip) return;
            const rect = containerEl.getBoundingClientRect();
            tooltip.style.setProperty('--tx', `${e.clientX - rect.left}px`);
            tooltip.style.setProperty('--ty', `${e.clientY - rect.top}px`);
          };
          const onLeave = () => {
            el.classList.remove('sym-hover');
            if (tooltip) tooltip.classList.remove('show');
          };
          const onClick = (e) => {
            // Inner (nested) country wins over the outer one that contains it.
            e.stopPropagation();
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
              try {
                window.gtag('event', 'hero_map_country_click', {
                  country: name,
                  visited: isVisited,
                });
              } catch (_) { /* noop */ }
            }
            const counterEl = containerEl?.parentElement?.querySelector('.hero-map-counter-num');
            if (counterEl && !el.classList.contains('sym-just-stamped')) {
              const current = parseInt(counterEl.textContent || '7', 10) || 7;
              const next = Math.min(current + 1, 195);
              counterEl.textContent = String(next);
              counterEl.classList.remove('bump');
              // eslint-disable-next-line no-unused-expressions
              counterEl.offsetWidth; // reflow to restart animation
              counterEl.classList.add('bump');
              el.classList.add('sym-just-stamped');
            }
            const mapCard = containerEl?.parentElement;
            if (mapCard) {
              const rect = mapCard.getBoundingClientRect();
              const rx = (e.clientX ?? rect.left + rect.width / 2) - rect.left;
              const ry = (e.clientY ?? rect.top + rect.height / 2) - rect.top;
              const ripple = document.createElement('span');
              ripple.className = 'hero-map-ripple';
              ripple.style.setProperty('--rx', `${rx}px`);
              ripple.style.setProperty('--ry', `${ry}px`);
              mapCard.appendChild(ripple);
              setTimeout(() => ripple.remove(), 900);
            }
            el.classList.add('sym-stamped');
            setTimeout(() => navigate(`/signup?from=hero-map&country=${encodeURIComponent(name)}`), 420);
          };
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mousemove', onMove);
          el.addEventListener('mouseleave', onLeave);
          el.addEventListener('click', onClick);
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
  }, [navigate]);

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
              <a href="/blog" className="nav-link-text" data-ga-label="Landing nav: Blog">Blog</a>
              <a href="/about" className="nav-link-text" data-ga-label="Landing nav: About">About</a>
              <a href="#faq" className="nav-link-text" data-ga-label="Landing nav: FAQ">FAQ</a>
            </div>
            <div className="landing-nav-actions">
              <button className="nav-btn-ghost" onClick={() => navigate('/login')}
                data-ga-label="Landing nav: Log in" data-ga-category="cta">Log in</button>
              <button className="nav-btn-primary" onClick={() => navigate('/signup')}
                data-ga-label="Landing nav: Get my map — free" data-ga-category="cta">
                Get my map — free <FaArrowRight />
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
              Stamp every country you've visited<br />
              <span className="hero-gradient-text">on an Interactive World Map.</span>
            </h1>
            <p className="hero-subtitle">
              Your <strong>free travel tracker</strong> for all 195 countries and
              {' '}<strong>5,000+ states, regions &amp; cities</strong>.
              Pin places you've visited — <strong>domestically or internationally</strong> —
              on a beautiful interactive map, capture
              {' '}<strong>travel memories</strong> with photos and stories,
              plan trips with friends, and download
              {' '}<strong>Instagram-ready travel cards</strong> in one tap.
            </p>
            <div className="hero-actions" data-ga-section="hero">
              <button className="hero-btn-primary" onClick={() => navigate('/signup')}
                data-ga-label="Hero: Create my free travel map" data-ga-category="cta">
                <FaSuitcaseRolling /> Create my free travel map
              </button>
              <a href="#features" className="hero-btn-secondary"
                data-ga-label="Hero: See how it works" data-ga-category="cta">
                See how it works <FaArrowRight />
              </a>
            </div>
            <ul className="hero-trust" aria-label="Why travelers love StampYourMap">
              <li className="hero-trust-item" style={{ '--t': '#6366f1', '--tb': 'rgba(99,102,241,0.12)' }}>
                <span className="hero-trust-icon"><FaGlobeAmericas /></span>
                <div className="hero-trust-text">
                  <strong><CountUp target="195" /> countries</strong>
                  <span>+ 5,000 regions &amp; states</span>
                </div>
              </li>
              <li className="hero-trust-item" style={{ '--t': '#ec4899', '--tb': 'rgba(236,72,153,0.12)' }}>
                <span className="hero-trust-icon"><FaPalette /></span>
                <div className="hero-trust-text">
                  <strong>12 share templates</strong>
                  <span>Instagram-ready in one tap</span>
                </div>
              </li>
              <li className="hero-trust-item" style={{ '--t': '#10b981', '--tb': 'rgba(16,185,129,0.12)' }}>
                <span className="hero-trust-icon"><FaUserFriends /></span>
                <div className="hero-trust-text">
                  <strong>Plan &amp; share together</strong>
                  <span>Trip planner · friends · memories</span>
                </div>
              </li>
              <li className="hero-trust-item" style={{ '--t': '#f59e0b', '--tb': 'rgba(245,158,11,0.14)' }}>
                <span className="hero-trust-icon"><FaInfinity /></span>
                <div className="hero-trust-text">
                  <strong>Free forever</strong>
                  <span>No credit card · No ads</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="hero-visual" role="region" aria-label="Interactive world map — click any country to start your map">
            <div
              className="hero-map-real"
              role="button"
              tabIndex={0}
              aria-label="Click any country to start stamping your travel map"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                el.style.setProperty('--rx', `${(-py * 4).toFixed(2)}deg`);
                el.style.setProperty('--ry', `${(px * 5).toFixed(2)}deg`);
                el.style.setProperty('--gx', `${(e.clientX - r.left).toFixed(0)}px`);
                el.style.setProperty('--gy', `${(e.clientY - r.top).toFixed(0)}px`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty('--rx', '0deg');
                e.currentTarget.style.setProperty('--ry', '0deg');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate('/signup?from=hero-map');
                }
              }}
            >
              {/* Top status bar — mac-style window chrome with live counter */}
              <div className="hero-map-topbar" aria-hidden="true">
                <div className="hero-map-dots">
                  <span className="hero-map-dot hero-map-dot-r" />
                  <span className="hero-map-dot hero-map-dot-y" />
                  <span className="hero-map-dot hero-map-dot-g" />
                </div>
                <div className="hero-map-title">
                  <FaGlobeAmericas /> <span>My Travel Atlas</span>
                </div>
                <div className="hero-map-counter">
                  <span className="hero-map-live" />
                  <span className="hero-map-counter-num">7</span>
                  <span className="hero-map-counter-denom">/ 195</span>
                </div>
              </div>

              {/* The map itself */}
              <div className="hero-map-container" ref={mapRef} />

              {/* Glow follow spot on hover — stays centered by default */}
              <div className="hero-map-spot" aria-hidden="true" />

              {/* Cursor-tracking country tooltip */}
              <div className="hero-map-tooltip" ref={tooltipRef} aria-hidden="true" />

              {/* Bottom bar — symmetric legend + CTA pill */}
              <div className="hero-map-bottombar" aria-hidden="true">
                <div className="hero-map-legend">
                  <span className="hero-map-legend-item">
                    <span className="hero-map-legend-swatch legend-visited" /> Visited
                  </span>
                  <span className="hero-map-legend-sep" />
                  <span className="hero-map-legend-item">
                    <span className="hero-map-legend-swatch legend-unstamped" /> Unstamped
                  </span>
                </div>
                <div className="hero-map-cta-pill">
                  Click to stamp <FaArrowRight />
                </div>
              </div>
            </div>
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
          <TestimonialsCarousel />
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
              data-ga-label="Bottom CTA: Create my free travel map" data-ga-category="cta">
              Create my free travel map <FaArrowRight />
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
            <a href="/blog" data-ga-label="Footer: Blog">Blog</a>
            <a href="/about" data-ga-label="Footer: About">About</a>
            <a href="/contact" data-ga-label="Footer: Contact">Contact</a>
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
