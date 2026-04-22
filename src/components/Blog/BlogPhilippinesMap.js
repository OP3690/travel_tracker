import React from 'react';

/**
 * BlogPhilippinesMap — stylised, cartographically-simplified SVG of the
 * Philippines with highlightable islands / regions. Not geographically
 * exact (deliberately) — it's a brand-aligned, readable illustration that
 * communicates "the Philippines is 3 island groups" at a glance.
 *
 * Accepts either:
 *   regionIds: string[] — list of IDs to highlight sequentially
 *
 * Supported IDs:
 *   luzon, ncr, palawan, mindoro, cebu, bohol, negros, panay,
 *   leyte-samar, siquijor, mindanao, siargao, boracay, batanes
 */
const PHILIPPINES = {
  viewBox: '0 0 520 720',
  // Each region is a path approximating the island's outline.
  // Coordinates are hand-tuned for a tight, recognizable silhouette.
  locations: [
    {
      id: 'batanes',
      name: 'Batanes',
      path: 'M300 30 q8 -6 16 0 q4 8 -4 14 q-10 4 -14 -4 q-4 -6 2 -10 z',
    },
    {
      id: 'luzon',
      name: 'Luzon',
      path:
        'M260 70 q30 -10 52 4 q24 10 30 34 q14 22 22 50 q10 28 6 56 q-6 26 -14 44 ' +
        'q-10 20 -34 26 q-28 8 -48 -2 q-22 -10 -32 -32 q-14 -24 -18 -54 q-6 -32 2 -62 ' +
        'q8 -28 34 -64 z',
    },
    {
      id: 'ncr',
      name: 'Metro Manila (NCR)',
      path: 'M290 220 q6 -4 12 0 q6 4 6 12 q-2 8 -10 10 q-8 0 -12 -6 q-4 -8 4 -16 z',
    },
    {
      id: 'mindoro',
      name: 'Mindoro',
      path:
        'M218 310 q18 -6 30 8 q10 14 4 30 q-6 14 -22 18 q-18 4 -28 -10 q-8 -16 2 -30 ' +
        'q4 -10 14 -16 z',
    },
    {
      id: 'palawan',
      name: 'Palawan',
      path:
        'M100 340 q14 -14 30 -10 q16 6 20 22 q6 22 -4 46 q-10 28 -28 56 q-20 32 -42 58 ' +
        'q-18 24 -32 14 q-14 -10 -2 -34 q16 -30 32 -62 q16 -30 30 -60 q10 -20 -4 -30 z',
    },
    {
      id: 'panay',
      name: 'Panay (Boracay, Aklan)',
      path:
        'M260 340 q20 -8 32 6 q12 14 6 32 q-6 20 -24 26 q-20 4 -32 -12 q-12 -16 0 -32 ' +
        'q6 -14 18 -20 z',
    },
    {
      id: 'boracay',
      name: 'Boracay',
      path: 'M300 340 q4 -4 8 0 q4 4 0 8 q-4 4 -8 0 q-4 -4 0 -8 z',
    },
    {
      id: 'negros',
      name: 'Negros',
      path:
        'M320 370 q18 -4 28 10 q10 14 6 32 q-4 20 -18 28 q-18 8 -32 -4 q-14 -14 -6 -34 ' +
        'q4 -20 22 -32 z',
    },
    {
      id: 'cebu',
      name: 'Cebu',
      path:
        'M370 360 q12 -4 18 8 q6 12 2 26 q-4 16 -14 22 q-12 6 -18 -6 q-6 -14 0 -28 ' +
        'q4 -14 12 -22 z',
    },
    {
      id: 'bohol',
      name: 'Bohol',
      path:
        'M390 410 q14 -4 22 8 q8 12 2 24 q-6 14 -20 16 q-14 0 -20 -12 q-4 -14 4 -24 ' +
        'q4 -10 12 -12 z',
    },
    {
      id: 'siquijor',
      name: 'Siquijor',
      path: 'M348 430 q8 -4 12 4 q2 10 -6 14 q-10 2 -14 -6 q-2 -8 8 -12 z',
    },
    {
      id: 'leyte-samar',
      name: 'Leyte & Samar',
      path:
        'M432 360 q12 -6 22 4 q8 14 6 30 q0 20 -6 40 q-8 22 -24 22 q-14 -2 -16 -24 ' +
        'q-2 -24 4 -44 q4 -18 14 -28 z',
    },
    {
      id: 'mindanao',
      name: 'Mindanao',
      path:
        'M300 500 q40 -12 76 2 q34 12 52 38 q18 26 22 58 q4 28 -10 50 q-16 22 -46 22 ' +
        'q-36 -2 -68 -12 q-34 -12 -50 -36 q-18 -28 -8 -58 q10 -28 32 -64 z',
    },
    {
      id: 'siargao',
      name: 'Siargao',
      path: 'M448 498 q10 -4 14 6 q4 12 -6 18 q-12 4 -16 -6 q-4 -10 8 -18 z',
    },
  ],
};

export function BlogPhilippinesMap({ regionIds = [], title, subtitle }) {
  const activeSet = new Set(regionIds.map(s => s.toLowerCase()));
  const delayFor = (id) => {
    const idx = regionIds.findIndex(r => r.toLowerCase() === id);
    return idx >= 0 ? `${idx * 180}ms` : '0ms';
  };

  return (
    <figure className="blog-usmap blog-ph-map blog-reveal" aria-label={title || 'Philippines map'}>
      {title && <h4>{title}</h4>}
      {subtitle && <p className="sub">{subtitle}</p>}
      <svg viewBox={PHILIPPINES.viewBox} role="img">
        <defs>
          <linearGradient id="blog-us-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {PHILIPPINES.locations.map(loc => {
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

export default BlogPhilippinesMap;
