import React from 'react';
import Australia from '@svg-maps/australia';

// Australia — 16 regions (6 states + 2 territories + offshore islands).
// Key IDs: nsw (Sydney), vic (Melbourne), qld-mainland (Brisbane/GBR),
// sa-mainland (Adelaide), wa (Perth), nt-mainland (Darwin/Uluru),
// tas-mainland (Hobart), act (Canberra).
export function BlogAustraliaMap({ regionIds = [], title, subtitle }) {
  const activeSet = new Set(regionIds.map(s => s.toLowerCase()));
  const delayFor = (id) => {
    const idx = regionIds.findIndex(s => s.toLowerCase() === id);
    return idx >= 0 ? `${idx * 180}ms` : '0ms';
  };
  return (
    <figure className="blog-usmap blog-reveal" aria-label={title || 'Australia map'}>
      {title && <h4>{title}</h4>}
      {subtitle && <p className="sub">{subtitle}</p>}
      <svg viewBox={Australia.viewBox} role="img">
        <defs>
          <linearGradient id="blog-us-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {Australia.locations.map(loc => {
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
export default BlogAustraliaMap;
