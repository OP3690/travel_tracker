import React, { useEffect, useRef, useState } from 'react';
import './CountryMap.css';

// Name mappings: our country names → SVG <title> text
const svgNameMap = {
  'Bolivia': 'Bolivia, Plurinational State of',
  'Congo': 'Congo, Republic of the',
  'Eswatini': 'Eswatini',
  'Iran': 'Iran, Islamic Republic of',
  'Ivory Coast': "Cote d'Ivoire",
  'Laos': "Lao People's Democratic Republic",
  'Moldova': 'Moldova, Republic of',
  'North Korea': "Korea, Democratic People's Republic of",
  'North Macedonia': 'North Macedonia',
  'Palestine': 'State of Palestine',
  'Russia': 'Russian Federation',
  'South Korea': 'Korea, Republic of',
  'Syria': 'Syrian Arab Republic',
  'Tanzania': 'Tanzania, United Republic of',
  'Venezuela': 'Venezuela, Bolivarian Republic of',
  'Vietnam': 'Vietnam, Socialist Republic of',
  'USA': 'United States of America',
  'Seychelles': 'Seychelles, Republic of',
};

export default function WorldCountryMap({ country }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    setLoaded(false);

    fetch('/WorldMap_SVG_Source.normalized.svg')
      .then(res => res.text())
      .then(svgText => {
        if (!containerRef.current) return;

        // Parse the SVG
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgEl = doc.querySelector('svg');
        if (!svgEl) return;

        // Remove embedded styles
        const style = svgEl.querySelector('style');
        if (style) style.remove();

        // Find the country name in SVG (try direct match and mapped name)
        const searchNames = [country];
        if (svgNameMap[country]) searchNames.push(svgNameMap[country]);

        // Find all matching groups and paths
        const matchedPaths = [];
        svgEl.querySelectorAll('g').forEach(g => {
          const title = g.querySelector('title');
          if (title && searchNames.some(n => title.textContent === n || title.textContent.includes(n))) {
            g.querySelectorAll('path').forEach(p => matchedPaths.push(p.cloneNode(true)));
          }
        });

        // Also check standalone paths with sibling titles
        svgEl.querySelectorAll('title').forEach(title => {
          if (searchNames.some(n => title.textContent === n || title.textContent.includes(n))) {
            const prev = title.previousElementSibling;
            const next = title.nextElementSibling;
            if (prev?.tagName === 'path') matchedPaths.push(prev.cloneNode(true));
            if (next?.tagName === 'path') matchedPaths.push(next.cloneNode(true));
          }
        });

        if (matchedPaths.length === 0) {
          // Country not found in SVG — show fallback
          containerRef.current.innerHTML = '';
          const fallback = document.createElement('div');
          fallback.className = 'fallback-content';
          fallback.innerHTML = `
            <div class="fallback-flag" style="font-size:3rem;margin-bottom:0.75rem">🗺️</div>
            <h3 style="color:var(--text-bright);font-size:1.2rem;margin-bottom:0.3rem">${country}</h3>
            <p style="color:var(--text-secondary);font-size:0.85rem">Map view for this country</p>
          `;
          containerRef.current.appendChild(fallback);
          setLoaded(true);
          return;
        }

        // Calculate bounding box of all matched paths
        // We need to temporarily add them to a visible SVG to get getBBox
        const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tempSvg.style.position = 'absolute';
        tempSvg.style.visibility = 'hidden';
        tempSvg.setAttribute('viewBox', '0 0 2754 1398');
        document.body.appendChild(tempSvg);

        const tempG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        matchedPaths.forEach(p => tempG.appendChild(p.cloneNode(true)));
        tempSvg.appendChild(tempG);

        let bbox;
        try {
          bbox = tempG.getBBox();
        } catch {
          bbox = { x: 0, y: 0, width: 2754, height: 1398 };
        }
        document.body.removeChild(tempSvg);

        // Add padding around the country (20% on each side)
        const pad = Math.max(bbox.width, bbox.height) * 0.2;
        const vx = Math.max(0, bbox.x - pad);
        const vy = Math.max(0, bbox.y - pad);
        const vw = bbox.width + pad * 2;
        const vh = bbox.height + pad * 2;

        // Create the zoomed SVG
        const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        newSvg.setAttribute('viewBox', `${vx} ${vy} ${vw} ${vh}`);
        newSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        newSvg.style.width = '100%';
        newSvg.style.height = '100%';
        newSvg.style.display = 'block';

        // Add country paths with styling
        matchedPaths.forEach(p => {
          p.setAttribute('fill', 'var(--accent-400)');
          p.setAttribute('stroke', 'var(--accent-500)');
          p.setAttribute('stroke-width', Math.max(0.5, vw / 500).toString());
          p.style.cursor = 'pointer';
          p.style.transition = 'fill 0.2s ease';
          newSvg.appendChild(p);
        });

        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(newSvg);
        setLoaded(true);
      });
  }, [country]);

  return (
    <div
      className="country-map-container world-country-map"
      ref={containerRef}
      style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
    />
  );
}
