import React, { useEffect, useRef, useState } from 'react';
import './CountryMap.css';

// Name mappings: our country names → SVG <title> text
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
  const containerRef = useRef(null);
  const [hoveredName, setHoveredName] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    fetch('/WorldMap_SVG_Source.normalized.svg')
      .then(res => res.text())
      .then(svgText => {
        if (!containerRef.current) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const srcSvg = doc.querySelector('svg');
        if (!srcSvg) return;

        const style = srcSvg.querySelector('style');
        if (style) style.remove();

        // Find target country names
        const searchNames = [country];
        if (svgNameMap[country]) searchNames.push(svgNameMap[country]);

        // Find bounding box of the target country
        // We need to render the full SVG temporarily to get bbox
        const tempDiv = document.createElement('div');
        tempDiv.style.cssText = 'position:absolute;visibility:hidden;width:2754px;height:1398px';
        tempDiv.innerHTML = srcSvg.outerHTML;
        document.body.appendChild(tempDiv);
        const tempSvg = tempDiv.querySelector('svg');

        let targetBbox = null;
        const targetGroups = new Set();

        // Find all matching elements
        tempSvg.querySelectorAll('g').forEach(g => {
          const title = g.querySelector('title');
          if (title && searchNames.some(n => title.textContent === n || title.textContent.includes(n))) {
            targetGroups.add(title.textContent);
            try {
              const paths = g.querySelectorAll('path');
              paths.forEach(p => {
                const bb = p.getBBox();
                if (!targetBbox) {
                  targetBbox = { x: bb.x, y: bb.y, x2: bb.x + bb.width, y2: bb.y + bb.height };
                } else {
                  targetBbox.x = Math.min(targetBbox.x, bb.x);
                  targetBbox.y = Math.min(targetBbox.y, bb.y);
                  targetBbox.x2 = Math.max(targetBbox.x2, bb.x + bb.width);
                  targetBbox.y2 = Math.max(targetBbox.y2, bb.y + bb.height);
                }
              });
            } catch {}
          }
        });

        // Also check standalone titles
        tempSvg.querySelectorAll('title').forEach(title => {
          if (searchNames.some(n => title.textContent === n || title.textContent.includes(n))) {
            targetGroups.add(title.textContent);
            const prev = title.previousElementSibling;
            if (prev?.tagName === 'path') {
              try {
                const bb = prev.getBBox();
                if (!targetBbox) {
                  targetBbox = { x: bb.x, y: bb.y, x2: bb.x + bb.width, y2: bb.y + bb.height };
                } else {
                  targetBbox.x = Math.min(targetBbox.x, bb.x);
                  targetBbox.y = Math.min(targetBbox.y, bb.y);
                  targetBbox.x2 = Math.max(targetBbox.x2, bb.x + bb.width);
                  targetBbox.y2 = Math.max(targetBbox.y2, bb.y + bb.height);
                }
              } catch {}
            }
          }
        });

        document.body.removeChild(tempDiv);

        if (!targetBbox) {
          containerRef.current.innerHTML = `<div class="fallback-content"><h3 style="color:var(--text-bright)">${country}</h3><p style="color:var(--text-secondary)">Map not available</p></div>`;
          return;
        }

        // Calculate zoomed viewBox with padding showing neighbors
        const cw = targetBbox.x2 - targetBbox.x;
        const ch = targetBbox.y2 - targetBbox.y;
        const pad = Math.max(cw, ch) * 0.6; // 60% padding to show neighbors
        const vx = targetBbox.x - pad;
        const vy = targetBbox.y - pad;
        const vw = cw + pad * 2;
        const vh = ch + pad * 2;

        // Clone the entire SVG but set the zoomed viewBox
        const newSvg = srcSvg.cloneNode(true);
        const newStyle = newSvg.querySelector('style');
        if (newStyle) newStyle.remove();

        newSvg.setAttribute('viewBox', `${vx} ${vy} ${vw} ${vh}`);
        newSvg.removeAttribute('width');
        newSvg.removeAttribute('height');
        newSvg.style.width = '100%';
        newSvg.style.height = '100%';
        newSvg.style.display = 'block';
        newSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        // Hide all circles
        newSvg.querySelectorAll('circle').forEach(c => c.setAttribute('opacity', '0'));

        // Style all countries as dark background
        newSvg.querySelectorAll('path').forEach(p => {
          p.setAttribute('fill', '#1e2a3a');
          p.setAttribute('stroke', '#2d3d50');
          p.setAttribute('stroke-width', (vw / 1500).toFixed(2));
          p.style.transition = 'fill 0.2s ease';
          p.style.cursor = 'default';
        });

        // Highlight the target country in green with thicker borders
        newSvg.querySelectorAll('g').forEach(g => {
          const title = g.querySelector('title');
          if (title && targetGroups.has(title.textContent)) {
            g.querySelectorAll('path').forEach(p => {
              p.setAttribute('fill', '#34d399');
              p.setAttribute('stroke', '#6ee7b7');
              p.setAttribute('stroke-width', (vw / 800).toFixed(2));
              p.style.cursor = 'pointer';
              p.setAttribute('data-target', 'true');
            });
          }
        });

        // Also check standalone paths
        newSvg.querySelectorAll('title').forEach(title => {
          if (targetGroups.has(title.textContent)) {
            const prev = title.previousElementSibling;
            const next = title.nextElementSibling;
            [prev, next].forEach(el => {
              if (el?.tagName === 'path') {
                el.setAttribute('fill', '#34d399');
                el.setAttribute('stroke', '#6ee7b7');
                el.setAttribute('stroke-width', (vw / 800).toFixed(2));
                el.style.cursor = 'pointer';
                el.setAttribute('data-target', 'true');
              }
            });
          }
        });

        // Highlight neighbor countries slightly on hover
        newSvg.querySelectorAll('g').forEach(g => {
          const title = g.querySelector('title');
          if (title && !targetGroups.has(title.textContent)) {
            g.querySelectorAll('path').forEach(p => {
              p.style.cursor = 'pointer';
              p.setAttribute('data-country', title.textContent);
            });
          }
        });

        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(newSvg);

        // Add hover interactivity
        newSvg.addEventListener('mouseover', (e) => {
          const path = e.target.closest('path');
          if (!path) return;

          // Find country name
          let name = null;
          let el = path;
          while (el && el.tagName !== 'svg') {
            const t = el.querySelector?.('title');
            if (t) { name = t.textContent; break; }
            if (el.previousElementSibling?.tagName === 'title') { name = el.previousElementSibling.textContent; break; }
            el = el.parentNode;
          }

          if (name && name !== 'World Map') {
            setHoveredName(name);
            if (!path.getAttribute('data-target')) {
              path.setAttribute('fill', '#2a4a6b');
            } else {
              path.setAttribute('fill', '#4ade80');
            }
          }
        });

        newSvg.addEventListener('mouseout', (e) => {
          const path = e.target.closest('path');
          if (!path) return;
          setHoveredName('');
          if (path.getAttribute('data-target')) {
            path.setAttribute('fill', '#34d399');
          } else {
            path.setAttribute('fill', '#1e2a3a');
          }
        });
      });
  }, [country]);

  return (
    <div className="country-map-container world-country-map" onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {hoveredName && (
        <div
          className="country-map-tooltip"
          style={{ position: 'fixed', left: mousePos.x + 14, top: mousePos.y - 32 }}
        >
          {hoveredName}
        </div>
      )}
    </div>
  );
}
