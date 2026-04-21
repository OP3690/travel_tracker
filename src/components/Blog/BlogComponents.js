import React from 'react';
import USA from '@svg-maps/usa';
import { Link } from 'react-router-dom';

// ---------------------------------------------------------------------------
// BlogUSMap — renders the USA SVG with a subset of states highlighted.
// States animate in sequentially via CSS animation-delay so the reader sees
// the route "light up" as they scroll the article.
//
// props:
//   stateIds: string[]  — lowercase 2-letter codes in the order to animate
//   title / subtitle    — chart card heading
// ---------------------------------------------------------------------------
export function BlogUSMap({ stateIds = [], title, subtitle }) {
  const activeSet = new Set(stateIds.map(s => s.toLowerCase()));
  const delayFor = (id) => {
    const idx = stateIds.findIndex(s => s.toLowerCase() === id);
    return idx >= 0 ? `${idx * 180}ms` : '0ms';
  };

  return (
    <figure className="blog-usmap blog-reveal" aria-label={title || 'US map'}>
      {title && <h4>{title}</h4>}
      {subtitle && <p className="sub">{subtitle}</p>}
      <svg viewBox={USA.viewBox} role="img">
        <defs>
          <linearGradient id="blog-us-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {USA.locations.map(loc => {
          const isActive = activeSet.has(loc.id);
          return (
            <path
              key={loc.id}
              d={loc.path}
              className={`st ${isActive ? 'active' : ''}`}
              style={isActive ? { '--state-delay': delayFor(loc.id) } : undefined}
            >
              <title>{loc.name}</title>
            </path>
          );
        })}
      </svg>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// BlogBarChart — a pure-SVG / CSS bar chart. Each row animates its fill width
// from 0 to its target via CSS keyframes with staggered delays.
//
// props:
//   title, subtitle
//   data: [{ label, value, valueLabel? }]
//   max?: number  (fallback to Math.max of values)
//   unit?: string
// ---------------------------------------------------------------------------
export function BlogBarChart({ title, subtitle, data = [], max, unit = '' }) {
  const top = Math.max(max || 0, ...data.map(d => d.value || 0), 1);
  return (
    <figure className="blog-chart blog-reveal" aria-label={title || 'chart'}>
      {title && <h4>{title}</h4>}
      {subtitle && <p className="sub">{subtitle}</p>}
      <div className="blog-chart-rows">
        {data.map((d, i) => {
          const pct = Math.min(100, Math.round((d.value / top) * 100));
          return (
            <div className="blog-chart-row" key={`${d.label}-${i}`}>
              <div className="lbl">{d.label}</div>
              <div className="bar">
                <span
                  className="fill"
                  style={{
                    '--target-width': `${pct}%`,
                    '--delay': `${120 + i * 120}ms`,
                  }}
                />
              </div>
              <div className="v">{d.valueLabel ?? `${d.value}${unit}`}</div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// BlogTable — light wrapper so we get consistent styling + horizontal scroll
// on narrow screens without repeating markup in every post.
// ---------------------------------------------------------------------------
export function BlogTable({ headers, rows, caption }) {
  return (
    <div className="blog-table-wrap blog-reveal" role="region" aria-label={caption || 'table'}>
      {caption && <div style={{ padding: '12px 16px', fontWeight: 700, fontSize: 14 }}>{caption}</div>}
      <table className="blog-table">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Callout — attention box for tips / warnings / pro notes.
// ---------------------------------------------------------------------------
export function BlogCallout({ title, children }) {
  return (
    <aside className="blog-callout blog-reveal">
      {title && <h4>{title}</h4>}
      {children}
    </aside>
  );
}

// ---------------------------------------------------------------------------
// StatGrid — hero-row of numeric highlights ("at-a-glance" stats).
// ---------------------------------------------------------------------------
export function BlogStatGrid({ stats = [] }) {
  return (
    <div className="blog-stat-grid">
      {stats.map((s, i) => (
        <div key={i} className="blog-stat-card">
          <div className="v">{s.value}</div>
          <div className="k">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// InlineCTA — mid-article nudge back to the product.
// ---------------------------------------------------------------------------
export function BlogInlineCTA({ title, subtitle, href = '/signup', button = 'Start free' }) {
  const isInternal = href.startsWith('/');
  return (
    <div className="blog-inline-cta blog-reveal">
      <div>
        <div className="t">{title}</div>
        <div className="s">{subtitle}</div>
      </div>
      {isInternal ? (
        <Link to={href} className="blog-cta-btn-sm">{button}</Link>
      ) : (
        <a href={href} className="blog-cta-btn-sm">{button}</a>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EndCTA — large conversion block at the bottom of every article.
// ---------------------------------------------------------------------------
export function BlogEndCTA({ title, subtitle, href = '/signup', button = 'Start stamping free' }) {
  const isInternal = href.startsWith('/');
  return (
    <section className="blog-end-cta blog-reveal">
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {isInternal ? (
        <Link to={href} className="blog-cta-btn">{button} →</Link>
      ) : (
        <a href={href} className="blog-cta-btn">{button} →</a>
      )}
    </section>
  );
}
