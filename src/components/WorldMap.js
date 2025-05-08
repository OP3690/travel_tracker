import React, { useState, useMemo, useEffect, useRef } from 'react';
import './WorldMap.css';
import { countryCodeToName } from '../utils/countryCodeToName';

function countryCodeToFlagEmoji(code) {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1f1e6 + c.charCodeAt(0) - 65));
}

function WorldMap({ selectedLocations = [], setSelectedLocations = () => {}, onLocationClick = () => {} }) {
  const [hoveredName, setHoveredName] = useState('');
  const [hoveredId, setHoveredId] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const svgContainerRef = useRef();
  const [pinPositions, setPinPositions] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Load the normalized SVG
  useEffect(() => {
    fetch('/WorldMap_SVG_Source.normalized.svg')
      .then(res => res.text())
      .then(svgContent => {
        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgContent;
          const svg = svgContainerRef.current.querySelector('svg');
          if (svg) {
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('viewBox', '0 0 2754 1398');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svg.style.display = 'block';
          }
        }
      });
  }, []);

  // Highlight selected countries and compute pin positions after SVG is rendered
  useEffect(() => {
    const svgEl = svgContainerRef.current?.querySelector('svg');
    if (!svgEl) return;

    // Remove previous selected
    svgEl.querySelectorAll('path.selected, circle.selected').forEach(p => p.classList.remove('selected'));

    // For pins
    const pins = [];
    selectedLocations.forEach(loc => {
      // Find all <g> with matching <title>
      const gs = Array.from(svgEl.querySelectorAll('g')).filter(
        g => g.querySelector('title') && g.querySelector('title').textContent === loc.name
      );
      let largestArea = 0;
      let pin = null;
      gs.forEach(g => {
        // Highlight all paths
        g.querySelectorAll('path').forEach(path => {
          path.classList.add('selected');
          // For pin: use the largest path's bbox
          try {
            const bbox = path.getBBox();
            const area = bbox.width * bbox.height;
            if (area > largestArea) {
              largestArea = area;
              pin = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
            }
          } catch (e) {}
        });
        // If there is a circle, prefer it for small countries
        const circle = g.querySelector('circle');
        if (circle) {
          pin = {
            x: parseFloat(circle.getAttribute('cx')),
            y: parseFloat(circle.getAttribute('cy')),
          };
        }
      });
      // Highlight any <path> or <circle> with matching id or class
      if (loc.id) {
        svgEl.querySelectorAll(`path[id='${loc.id}'], circle[id='${loc.id}']`).forEach(el => el.classList.add('selected'));
        svgEl.querySelectorAll(`path.${loc.id}, circle.${loc.id}`).forEach(el => el.classList.add('selected'));
      }
      if (pin) pins.push({ name: loc.name, ...pin });
    });
    setPinPositions(pins);
  }, [selectedLocations]);

  function handleLocationClick(event) {
    let el = event.target;
    let name = null;
    let id = null;

    // Try to find the nearest <title> (self, parent <g>, siblings)
    function findTitle(element) {
      if (!element) return null;
      if (element.tagName === 'title') return element.textContent;
      if (element.querySelector && element.querySelector('title')) return element.querySelector('title').textContent;
      if (element.previousElementSibling && element.previousElementSibling.tagName === 'title') return element.previousElementSibling.textContent;
      if (element.nextElementSibling && element.nextElementSibling.tagName === 'title') return element.nextElementSibling.textContent;
      return null;
    }

    let found = false;
    while (el && el.tagName !== 'svg') {
      name = findTitle(el);
      if (name) {
        id = el.getAttribute('id') || (el.getAttribute('class') ? el.getAttribute('class').split(' ')[0] : name);
        found = true;
        break;
      }
      el = el.parentNode;
    }

    // Fallback: if still no name, try to use id or class
    if (!found && el) {
      id = el.getAttribute('id') || (el.getAttribute('class') ? el.getAttribute('class').split(' ')[0] : null);
      name = id;
    }

    if (!id || !name) return;

    setSelectedLocations(prev => {
      const exists = prev.find(s => s.id === id);
      if (exists) {
        return prev.filter(s => s.id !== id);
      } else {
        return [...prev, { id, name }];
      }
    });
    onLocationClick({ id, name });
  }

  function onLocationMouseOver(event) {
    event.target.title = '';
    let el = event.target;
    let name = null;
    let id = null;
    // Try to find the nearest <title> and id
    function findTitle(element) {
      if (!element) return null;
      if (element.tagName === 'title') return element.textContent;
      if (element.querySelector && element.querySelector('title')) return element.querySelector('title').textContent;
      if (element.previousElementSibling && element.previousElementSibling.tagName === 'title') return element.previousElementSibling.textContent;
      if (element.nextElementSibling && element.nextElementSibling.tagName === 'title') return element.nextElementSibling.textContent;
      return null;
    }
    while (el && el.tagName !== 'svg') {
      name = findTitle(el);
      if (name) {
        id = el.getAttribute('id') || (el.getAttribute('class') ? el.getAttribute('class').split(' ')[0] : name);
        break;
      }
      el = el.parentNode;
    }
    if (!name) return;
    setHoveredName(name);
    setHoveredId(id || '');
    setMousePos({ x: event.clientX, y: event.clientY });
  }

  function onLocationMouseOut() {
    setHoveredName('');
    setHoveredId('');
  }

  function handleZoomIn() {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 5)
    }));
  }

  function handleZoomOut() {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale / 1.2, 1)
    }));
  }

  function handleReset() {
    setTransform({ x: 0, y: 0, scale: 1 });
  }

  // Drag-to-pan handlers
  function handleMouseDown(e) {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setTransform(prev => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy
    }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  return (
    <div className="world-map-container">
      <div className="zoom-controls">
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
        <button onClick={handleReset} title="Reset View">⟳</button>
      </div>
      <div 
        className="svg-container"
        ref={svgContainerRef}
        onClick={handleLocationClick}
        onMouseOver={onLocationMouseOver}
        onMouseOut={onLocationMouseOut}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: 'center center'
        }}
      />
      {hoveredName && (
        <div 
          className="tooltip"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y + 10,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(33, 33, 33, 0.95)',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '1.08rem',
            fontWeight: 500,
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            pointerEvents: 'none',
            zIndex: 1000,
            minWidth: '120px'
          }}
        >
          <span style={{ fontSize: '1.6em', filter: 'drop-shadow(0 1px 2px #0002)' }}>
            {countryCodeToFlagEmoji(hoveredId?.slice(0,2))}
          </span>
          <span>{countryCodeToName[hoveredId?.toLowerCase()] || hoveredName}</span>
        </div>
      )}
      {pinPositions.map((pin, index) => (
        <div
          key={index}
          className="pin"
          style={{
            left: `${pin.x}px`,
            top: `${pin.y}px`,
            transform: `translate(-50%, -50%) scale(${transform.scale})`
          }}
        />
      ))}
    </div>
  );
}

export default WorldMap; 