import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkedAlt, FaGlobeAsia, FaBook, FaChartLine, FaArrowRight, FaPlane, FaRoute, FaCalendarAlt, FaCheckCircle, FaMountain, FaPassport, FaSuitcaseRolling, FaCamera, FaMapPin, FaStar, FaHeart } from 'react-icons/fa';
import './LandingPage.css';

const features = [
  { icon: <FaMapMarkedAlt />, title: '195 Country Maps', desc: 'Every country. Every state. Every province. Click to mark visited and watch your map come alive.', color: '#10b981' },
  { icon: <FaGlobeAsia />, title: 'World Map Explorer', desc: 'Zoom, pan, and pin countries across the globe. Animated flight arcs connect your journeys.', color: '#3b82f6' },
  { icon: <FaBook />, title: 'Destination Journal', desc: 'Log 1000+ destinations. Mark favorites. Track progress by region. Your travel diary, digitized.', color: '#8b5cf6' },
  { icon: <FaChartLine />, title: 'Travel Analytics', desc: 'See your coverage with donut charts, progress rings, and leaderboards. Data meets wanderlust.', color: '#f59e0b' },
  { icon: <FaCalendarAlt />, title: 'Trip Planner', desc: 'Plan your next escape. Set dates, add notes, build checklists. Never forget a travel detail.', color: '#ec4899' },
  { icon: <FaCheckCircle />, title: 'Milestone Badges', desc: 'Earn badges as you explore. First Step, Explorer, Adventurer, Nomad — collect them all.', color: '#06b6d4' },
];

const testimonials = [
  { text: 'I can see every state I have visited on a beautiful map. The milestone badges keep me exploring!', name: 'Priya M.', role: 'Solo Traveler', stars: 5 },
  { text: 'Switched from spreadsheets to this. The world map with flight arcs is just stunning.', name: 'Arjun K.', role: 'Digital Nomad', stars: 5 },
  { text: '195 country maps with clickable states! I plan trips and track them all in one place. A must-have.', name: 'Sneha R.', role: 'Travel Blogger', stars: 5 },
];

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

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  // Load world map SVG
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
      {/* Nav */}
      <nav className={`landing-nav ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="landing-nav-inner">
          <div className="landing-logo"><FaMountain className="landing-logo-icon" /><span>MyTravelGlimpse</span></div>
          <div className="landing-nav-links">
            <a href="#features" className="nav-link-text">Features</a>
            <a href="#how" className="nav-link-text">How It Works</a>
            <a href="#reviews" className="nav-link-text">Reviews</a>
          </div>
          <div className="landing-nav-actions">
            <button className="nav-btn-ghost" onClick={() => navigate('/login')}>Log In</button>
            <button className="nav-btn-primary" onClick={() => navigate('/signup')}>Start Free <FaArrowRight /></button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="landing-hero">
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge"><FaPlane className="hero-badge-icon" /> Free Travel Tracker for 195 Countries</div>
          <h1 className="hero-title">
            Your Travels.<br />Beautifully <span className="hero-gradient-text">Mapped.</span>
          </h1>
          <p className="hero-subtitle">
            Click states. Pin countries. Journal destinations. Earn badges.
            The most visual way to track where you have been — and dream about where to go next.
          </p>
          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => navigate('/signup')}>
              <FaSuitcaseRolling /> Start Your Map — Free
            </button>
            <button className="hero-btn-secondary" onClick={() => navigate('/login')}>
              <FaPassport /> Log In
            </button>
          </div>
          <div className="hero-mini-stats">
            <div className="hms"><strong><CountUp target="195" /></strong> Countries</div>
            <div className="hms-dot" />
            <div className="hms"><strong><CountUp target="5000" suffix="+" /></strong> Regions</div>
            <div className="hms-dot" />
            <div className="hms"><strong>100</strong>% Free</div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-map-real">
            <div className="hero-map-container" ref={mapRef} />
          </div>
          <div className="hero-float-icon fi-1"><FaPlane /></div>
          <div className="hero-float-icon fi-2"><FaCamera /></div>
          <div className="hero-float-icon fi-3"><FaMapPin /></div>
        </div>
      </section>

      {/* Marquee */}
      <section className="travel-marquee">
        <div className="marquee-track">
          {['Goa', 'Paris', 'Tokyo', 'Kerala', 'Sydney', 'New York', 'Jaipur', 'London', 'Bali', 'Dubai', 'Manali', 'Rome', 'Ladakh', 'Bangkok', 'Maldives', 'Goa', 'Paris', 'Tokyo', 'Kerala', 'Sydney', 'New York', 'Jaipur', 'London', 'Bali', 'Dubai', 'Manali', 'Rome', 'Ladakh', 'Bangkok', 'Maldives'].map((city, i) => (
            <span key={i} className="marquee-item"><FaMapPin className="marquee-pin" /> {city}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="landing-features" id="features">
        <div className="features-header">
          <div className="section-badge"><FaRoute /> Features</div>
          <h2>One App. Every Country.<br /><span className="hero-gradient-text">Infinite Adventures.</span></h2>
          <p>Six powerful features that turn your travels into a visual story</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ '--fc': f.color, animationDelay: `${i * 0.08}s` }}>
              <div className="feature-icon" style={{ background: `${f.color}15`, color: f.color }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="feature-line" style={{ background: f.color }} />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-how" id="how">
        <div className="how-header">
          <div className="section-badge"><FaSuitcaseRolling /> How It Works</div>
          <h2>Start in <span className="hero-gradient-text">60 Seconds</span></h2>
          <p>Three simple steps to begin your travel story</p>
        </div>
        <div className="how-timeline">
          <div className="how-timeline-line" />
          {[
            { num: '1', title: 'Create Free Account', desc: 'Sign up with email. No credit card. Takes 10 seconds.', icon: <FaPassport /> },
            { num: '2', title: 'Pin Your Travels', desc: 'Click states on India map. Click countries on world map. Done.', icon: <FaMapPin /> },
            { num: '3', title: 'Watch Your Story', desc: 'See charts, unlock badges, plan next trips, share your stats.', icon: <FaChartLine /> },
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

      {/* Testimonials */}
      <section className="landing-testimonials" id="reviews">
        <div className="testimonials-header">
          <div className="section-badge"><FaHeart /> Reviews</div>
          <h2>Loved by <span className="hero-gradient-text">Travelers</span></h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="testimonial-stars">
                {Array(t.stars).fill(0).map((_, j) => <FaStar key={j} />)}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name[0]}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="cta-content">
          <FaMountain className="cta-icon" />
          <h2>Stop Forgetting Where You've Been</h2>
          <p>Join thousands of travelers mapping their journeys. Free forever. 195 countries.</p>
          <button className="hero-btn-primary cta-btn" onClick={() => navigate('/signup')}>
            Create Free Account <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="landing-logo"><FaMountain className="landing-logo-icon" /><span>MyTravelGlimpse</span></div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#reviews">Reviews</a>
            <span onClick={() => navigate('/login')}>Log In</span>
          </div>
          <p>&copy; {new Date().getFullYear()} MyTravelGlimpse. Built with <FaHeart style={{ color: '#f43f5e', fontSize: '0.7rem', verticalAlign: 'middle' }} /> for travelers.</p>
        </div>
      </footer>
    </div>
  );
}
