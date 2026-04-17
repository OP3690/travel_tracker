import React, { useState, useEffect, useRef } from 'react';
import './WorldMap.css';

function WorldMap({ selectedLocations = [], setSelectedLocations = () => {}, onLocationClick = () => {} }) {
  const [hoveredName, setHoveredName] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const svgContainerRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

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

  // Highlight selected countries
  useEffect(() => {
    const svgEl = svgContainerRef.current?.querySelector('svg');
    if (!svgEl) return;
    svgEl.querySelectorAll('path.selected, circle.selected').forEach(p => p.classList.remove('selected'));

    selectedLocations.forEach(loc => {
      // Match <g> elements that have a <title> matching the country name
      Array.from(svgEl.querySelectorAll('g')).forEach(g => {
        const title = g.querySelector('title');
        if (title && title.textContent === loc.name) {
          g.querySelectorAll('path').forEach(path => path.classList.add('selected'));
        }
      });
      // Also match standalone <path> elements with a sibling <title>
      Array.from(svgEl.querySelectorAll('title')).forEach(title => {
        if (title.textContent === loc.name) {
          const parent = title.parentElement;
          if (parent?.tagName === 'g') {
            parent.querySelectorAll('path').forEach(p => p.classList.add('selected'));
          }
          // Check if the title's previous/next sibling is a path
          const prev = title.previousElementSibling;
          const next = title.nextElementSibling;
          if (prev?.tagName === 'path') prev.classList.add('selected');
          if (next?.tagName === 'path') next.classList.add('selected');
        }
      });
    });
  }, [selectedLocations]);

  function handleLocationClick(event) {
    if (isDragging) return;
    let el = event.target;
    let name = null;
    let id = null;

    function findTitle(element) {
      if (!element) return null;
      if (element.tagName === 'title') return element.textContent;
      if (element.querySelector?.('title')) return element.querySelector('title').textContent;
      if (element.previousElementSibling?.tagName === 'title') return element.previousElementSibling.textContent;
      if (element.nextElementSibling?.tagName === 'title') return element.nextElementSibling.textContent;
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
    if (!found && el) {
      id = el.getAttribute('id') || (el.getAttribute('class') ? el.getAttribute('class').split(' ')[0] : null);
      name = id;
    }
    if (!id || !name) return;

    // Use name as the unique key, not the unreliable class-based id
    setSelectedLocations(prev => {
      const exists = prev.find(s => s.name === name);
      if (exists) return prev.filter(s => s.name !== name);
      return [...prev, { id: name, name }];
    });
    onLocationClick({ id: name, name });
  }

  function handleZoomIn() {
    setTransform(prev => ({ ...prev, scale: Math.min(prev.scale * 1.2, 5) }));
  }

  function handleZoomOut() {
    setTransform(prev => ({ ...prev, scale: Math.max(prev.scale / 1.2, 1) }));
  }

  function handleReset() {
    setTransform({ x: 0, y: 0, scale: 1 });
  }

  function handleMouseDown(e) {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove(e) {
    // Tooltip
    let el = e.target;
    let name = null;
    const findTitle = (element) => {
      if (!element) return null;
      if (element.tagName === 'title') return element.textContent;
      if (element.querySelector?.('title')) return element.querySelector('title').textContent;
      return null;
    };
    while (el && el.tagName !== 'svg') {
      name = findTitle(el);
      if (name) break;
      el = el.parentNode;
    }
    if (name) {
      e.target.title = '';
      setHoveredName(name);
      setMousePos({ x: e.clientX, y: e.clientY });
    } else {
      setHoveredName('');
    }

    // Pan
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  // Apply transform
  const svgEl = svgContainerRef.current?.querySelector('svg');
  if (svgEl) {
    svgEl.style.transform = `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`;
    svgEl.style.transformOrigin = '50% 50%';
    svgEl.style.transition = isDragging ? 'none' : 'transform 0.3s cubic-bezier(.4,2,.6,1)';
  }

  return (
    <div className="world-map-outer">
      <div className="world-map-controls zoom-controls">
        <button onClick={handleZoomIn} aria-label="Zoom in">+</button>
        <button onClick={handleZoomOut} aria-label="Zoom out">-</button>
        <button onClick={handleReset} aria-label="Reset view">&#8634;</button>
      </div>
      <div
        className="world-map-container"
        ref={svgContainerRef}
        onClick={handleLocationClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { setIsDragging(false); setHoveredName(''); }}
      />
      {hoveredName && (
        <div className="world-map-tooltip" style={{ left: mousePos.x + 14, top: mousePos.y - 32 }}>
          {hoveredName}
        </div>
      )}
    </div>
  );
}

export default WorldMap;
