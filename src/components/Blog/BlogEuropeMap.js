import React from 'react';
import World from '@svg-maps/world';

// Europe isn't a single country — there's no @svg-maps/europe package —
// so we use @svg-maps/world filtered to European ISO 2-letter codes, with
// a Europe-cropped viewBox. Same API as BlogUSMap / BlogJapanMap.
//
// Supported regionIds (ISO 2): fr, de, it, es, pt, nl, be, pl, gr, at, ch,
// ie, gb, no, se, dk, fi, is, cz, hu, ro, bg, hr, si, sk, ee, lv, lt, al,
// rs, ba, mk, me, md, ua, by, mt, cy, lu, li, mc, sm, va, ad, xk

// European country ISO codes (lowercase, matching @svg-maps/world IDs)
const EUROPE_IDS = new Set([
  'fr','de','it','es','pt','nl','be','pl','gr','at','ch','ie','gb',
  'no','se','dk','fi','is','cz','hu','ro','bg','hr','si','sk',
  'ee','lv','lt','al','rs','ba','mk','me','md','ua','by',
  'mt','cy','lu','li','mc','sm','va','ad','xk','ax','fo',
  'gi','im','je','gg',
]);

export function BlogEuropeMap({ regionIds = [], title, subtitle }) {
  const activeList = regionIds.map(s => s.toLowerCase());
  const activeSet = new Set(activeList);
  const delayFor = (id) => {
    const idx = activeList.indexOf(id);
    return idx >= 0 ? `${idx * 180}ms` : '0ms';
  };

  // Europe viewBox crop from the world (viewBox 0 0 1010 666).
  // Actual measured bounding box of all European country paths is roughly
  // x: 386-582, y: 175-380. This crop adds ~8px padding on all sides.
  const euroViewBox = '378 167 212 220';

  return (
    <figure className="blog-usmap blog-reveal" aria-label={title || 'Europe map'}>
      {title && <h4>{title}</h4>}
      {subtitle && <p className="sub">{subtitle}</p>}
      <svg viewBox={euroViewBox} role="img">
        <defs>
          <linearGradient id="blog-us-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {World.locations
          .filter(loc => EUROPE_IDS.has(loc.id))
          .map(loc => {
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

export default BlogEuropeMap;
