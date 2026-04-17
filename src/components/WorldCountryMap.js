import React, { useEffect, useRef, useState } from 'react';
import './CountryMap.css';

const svgNameMap = {
  'Bolivia': 'Bolivia, Plurinational State of',
  'Congo': 'Congo, Republic of the',
  'Iran': 'Iran, Islamic Republic of',
  'Ivory Coast': "Cote d'Ivoire",
  'Laos': "Lao People's Democratic Republic",
  'Moldova': 'Moldova, Republic of',
  'North Korea': "Korea, Democratic People's Republic of",
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
  const svgContainerRef = useRef(null);
  const [hoveredName, setHoveredName] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgContainerRef.current) return;
    svgContainerRef.current.innerHTML = '';

    fetch('/WorldMap_SVG_Source.normalized.svg')
      .then(res => res.text())
      .then(svgText => {
        if (!svgContainerRef.current) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const srcSvg = doc.querySelector('svg');
        if (!srcSvg) return;

        const style = srcSvg.querySelector('style');
        if (style) style.remove();

        const searchNames = [country];
        if (svgNameMap[country]) searchNames.push(svgNameMap[country]);

        // Collect all paths for this country
        const paths = [];
        srcSvg.querySelectorAll('g').forEach(g => {
          const title = g.querySelector('title');
          if (title && searchNames.some(n => title.textContent === n || title.textContent.includes(n))) {
            g.querySelectorAll('path').forEach(p => paths.push(p.cloneNode(true)));
          }
        });
        srcSvg.querySelectorAll('title').forEach(title => {
          if (searchNames.some(n => title.textContent === n || title.textContent.includes(n))) {
            const prev = title.previousElementSibling;
            if (prev?.tagName === 'path') paths.push(prev.cloneNode(true));
          }
        });

        if (paths.length === 0) {
          svgContainerRef.current.innerHTML = `<div style="text-align:center;padding:3rem"><p style="color:var(--text-muted)">Map not available for ${country}</p></div>`;
          return;
        }

        // Get bounding box by rendering temporarily
        const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tempSvg.style.cssText = 'position:absolute;visibility:hidden;width:0;height:0';
        tempSvg.setAttribute('viewBox', '0 0 2754 1398');
        const tempG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        paths.forEach(p => tempG.appendChild(p.cloneNode(true)));
        tempSvg.appendChild(tempG);
        document.body.appendChild(tempSvg);

        let bbox;
        try { bbox = tempG.getBBox(); } catch { bbox = { x: 0, y: 0, width: 200, height: 200 }; }
        document.body.removeChild(tempSvg);

        // Padding around the country shape (15%)
        const pad = Math.max(bbox.width, bbox.height) * 0.15;
        const vx = bbox.x - pad;
        const vy = bbox.y - pad;
        const vw = bbox.width + pad * 2;
        const vh = bbox.height + pad * 2;

        // Build clean isolated SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `${vx} ${vy} ${vw} ${vh}`);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';

        // Stroke width relative to view size
        const sw = Math.max(0.3, vw / 600);

        paths.forEach(p => {
          p.setAttribute('fill', 'var(--accent-400)');
          p.setAttribute('stroke', 'var(--accent-500)');
          p.setAttribute('stroke-width', sw.toFixed(2));
          p.setAttribute('stroke-linejoin', 'round');
          p.style.cursor = 'pointer';
          p.style.transition = 'fill 0.2s ease, stroke 0.2s ease';

          p.addEventListener('mouseenter', () => {
            p.setAttribute('fill', '#4ade80');
            p.setAttribute('stroke', '#86efac');
            setHoveredName(country);
          });
          p.addEventListener('mouseleave', () => {
            p.setAttribute('fill', 'var(--accent-400)');
            p.setAttribute('stroke', 'var(--accent-500)');
            setHoveredName('');
          });

          svg.appendChild(p);
        });

        svgContainerRef.current.appendChild(svg);
      });
  }, [country]);

  return (
    <div
      className="country-map-container world-country-map"
      onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <div ref={svgContainerRef} style={{ width: '100%', height: '100%' }} />
      {hoveredName && (
        <div className="country-map-tooltip" style={{ position: 'fixed', left: mousePos.x + 14, top: mousePos.y - 32 }}>
          {hoveredName}
        </div>
      )}
    </div>
  );
}
