import React from 'react';

/**
 * BlogPhilippinesMap — region-group infographic for the Philippines.
 *
 * Renders the three island groups (Luzon+Palawan, Visayas, Mindanao) as
 * three cards, each containing its key regions as labelled pills. Active
 * regions (passed via `regionIds`) animate in with the brand gradient,
 * staggered in the order given — exactly like BlogUSMap's state animation.
 *
 * We moved away from a hand-drawn SVG because the Philippines has no
 * clean public @svg-maps package, and a stylised polygon approximation
 * looked like unrecognisable blobs. An infographic reads better anyway
 * for a "three island groups, X regions" narrative.
 *
 * API:
 *   regionIds: string[] — ordered list of IDs to highlight & animate
 *   title, subtitle — card heading
 *
 * Region IDs:
 *   luzon, ncr, batanes, palawan, mindoro,          (Luzon + Palawan)
 *   cebu, bohol, boracay, panay, negros, siquijor, leyte-samar,   (Visayas)
 *   mindanao, siargao, davao                        (Mindanao)
 */

const REGION_GROUPS = [
  {
    id: 'luzon-group',
    label: 'Luzon + Palawan',
    subtitle: 'Northern islands',
    regions: [
      { id: 'ncr',      name: 'Metro Manila',  hint: 'NCR · capital' },
      { id: 'luzon',    name: 'Luzon',         hint: 'main northern island' },
      { id: 'palawan',  name: 'Palawan',       hint: 'El Nido · Coron' },
      { id: 'batanes',  name: 'Batanes',       hint: 'far north' },
      { id: 'mindoro',  name: 'Mindoro',       hint: 'Puerto Galera' },
    ],
  },
  {
    id: 'visayas-group',
    label: 'Visayas',
    subtitle: 'Central islands',
    regions: [
      { id: 'cebu',        name: 'Cebu',        hint: 'city + beach hub' },
      { id: 'bohol',       name: 'Bohol',       hint: 'Chocolate Hills' },
      { id: 'boracay',     name: 'Boracay',     hint: 'White Beach' },
      { id: 'panay',       name: 'Panay',       hint: 'Iloilo · Aklan' },
      { id: 'negros',      name: 'Negros',      hint: 'Apo Island' },
      { id: 'siquijor',    name: 'Siquijor',    hint: 'mystic south' },
      { id: 'leyte-samar', name: 'Leyte · Samar', hint: 'Kalanggaman Island' },
    ],
  },
  {
    id: 'mindanao-group',
    label: 'Mindanao',
    subtitle: 'Southern islands',
    regions: [
      { id: 'siargao',   name: 'Siargao',    hint: 'surf capital' },
      { id: 'mindanao',  name: 'Mindanao',   hint: 'main southern island' },
      { id: 'davao',     name: 'Davao',      hint: 'Mt Apo · durian' },
    ],
  },
];

export function BlogPhilippinesMap({ regionIds = [], title, subtitle }) {
  const activeList = regionIds.map(s => s.toLowerCase());
  const activeSet = new Set(activeList);
  const delayFor = (id) => {
    const idx = activeList.indexOf(id);
    return idx >= 0 ? `${idx * 160}ms` : '0ms';
  };
  const activeCount = regionIds.length;

  return (
    <figure className="blog-ph-infographic blog-reveal" aria-label={title || 'Philippines regions'}>
      {title && <h4>{title}</h4>}
      {subtitle && <p className="sub">{subtitle}</p>}

      <div className="blog-ph-groups">
        {REGION_GROUPS.map(group => {
          const groupActive = group.regions.some(r => activeSet.has(r.id));
          return (
            <div
              key={group.id}
              className={`blog-ph-group ${groupActive ? 'is-active' : ''}`}
            >
              <div className="blog-ph-group-head">
                <div className="blog-ph-group-label">{group.label}</div>
                <div className="blog-ph-group-sub">{group.subtitle}</div>
              </div>
              <div className="blog-ph-pills">
                {group.regions.map(r => {
                  const isActive = activeSet.has(r.id);
                  return (
                    <div
                      key={r.id}
                      className={`blog-ph-pill ${isActive ? 'active' : ''}`}
                      style={isActive ? { '--ph-pill-delay': delayFor(r.id) } : undefined}
                      title={r.hint}
                    >
                      <span className="blog-ph-pill-name">{r.name}</span>
                      <span className="blog-ph-pill-hint">{r.hint}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {activeCount > 0 && (
        <div className="blog-ph-legend">
          <span className="blog-ph-legend-dot" />
          {activeCount} region{activeCount === 1 ? '' : 's'} highlighted
        </div>
      )}
    </figure>
  );
}

export default BlogPhilippinesMap;
