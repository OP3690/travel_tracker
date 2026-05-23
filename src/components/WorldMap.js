import React, { useState, useEffect, useRef, useCallback } from 'react';
import './WorldMap.css';

function WorldMap({ selectedLocations = [], setSelectedLocations = () => {}, onLocationClick = () => {} }) {
  const [hoveredName, setHoveredName] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const svgContainerRef = useRef();
  const dragRef = useRef({ active: false, startX: 0, startY: 0, origX: 0, origY: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);

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
            svg.style.willChange = 'transform';
          }
        }
      });
  }, []);

  // Highlight selected countries — uses the SAME multi-strategy
  // label matching as the click resolver (title text, OR aria-label,
  // OR data-country / data-name / name attribute), otherwise countries
  // saved via attribute-based labels (Libya, Sudan, Ethiopia in the
  // world SVG) get recorded as visited but never turn green.
  useEffect(() => {
    const svgEl = svgContainerRef.current?.querySelector('svg');
    if (!svgEl) return;
    svgEl.querySelectorAll('path.selected, circle.selected').forEach(p => p.classList.remove('selected'));

    if (!selectedLocations.length) return;
    // Index selected names once for O(1) match per element walk
    const targetNames = new Set(selectedLocations.map(l => l.name));

    // Strategy A — match by attribute on the path/g itself
    const labelOf = (el) => {
      const aria  = el.getAttribute?.('aria-label');
      const dataC = el.getAttribute?.('data-country');
      const dataN = el.getAttribute?.('data-name');
      const nm    = el.getAttribute?.('name');
      return (aria && aria.trim()) || (dataC && dataC.trim()) ||
             (dataN && dataN.trim()) || (nm && nm.trim()) || null;
    };
    svgEl.querySelectorAll('path, g').forEach(el => {
      const lbl = labelOf(el);
      if (lbl && targetNames.has(lbl)) {
        if (el.tagName.toLowerCase() === 'path') {
          el.classList.add('selected');
        } else {
          el.querySelectorAll('path').forEach(p => p.classList.add('selected'));
        }
      }
    });

    // Strategy B — match by <title> child / sibling (original behaviour)
    Array.from(svgEl.querySelectorAll('title')).forEach(title => {
      const t = title.textContent?.trim();
      if (!t || !targetNames.has(t)) return;
      const parent = title.parentElement;
      if (parent?.tagName === 'g') {
        parent.querySelectorAll('path').forEach(p => p.classList.add('selected'));
      } else if (parent?.tagName?.toLowerCase() === 'path') {
        parent.classList.add('selected');
      }
      const prev = title.previousElementSibling;
      const next = title.nextElementSibling;
      if (prev?.tagName === 'path') prev.classList.add('selected');
      if (next?.tagName === 'path') next.classList.add('selected');
    });
  }, [selectedLocations]);

  function handleLocationClick(event) {
    if (dragRef.current.moved > 4) return;
    let el = event.target;

    // Multi-strategy country resolver: the World SVG has inconsistent
    // markup — some countries are `<g><title>X</title><path/></g>`,
    // others are `<path><title>X</title></path>`, others have NO title
    // at all but use a `name`, `data-name`, `data-country`, `id`, or
    // `aria-label` attribute. Walking up only looking for <title>
    // missed every country that uses an attribute-based label, which
    // is why some countries didn't respond to clicks.
    function resolve(element) {
      if (!element || element.tagName === 'svg') return null;
      // 1. Direct <title> element
      if (element.tagName === 'title') {
        return { name: element.textContent.trim(), id: element.parentElement?.getAttribute('id') || element.textContent.trim() };
      }
      // 2. Child <title>
      const childTitle = element.querySelector?.(':scope > title') || element.querySelector?.('title');
      if (childTitle?.textContent?.trim()) {
        const t = childTitle.textContent.trim();
        return { name: t, id: element.getAttribute('id') || t };
      }
      // 3. Sibling <title> (before or after)
      const prev = element.previousElementSibling;
      const next = element.nextElementSibling;
      if (prev?.tagName === 'title' && prev.textContent?.trim()) {
        return { name: prev.textContent.trim(), id: element.getAttribute('id') || prev.textContent.trim() };
      }
      if (next?.tagName === 'title' && next.textContent?.trim()) {
        return { name: next.textContent.trim(), id: element.getAttribute('id') || next.textContent.trim() };
      }
      // 4. Attribute-based labels — covers countries that don't have a
      //    <title> child at all (the common cause of unresponsive clicks).
      const aria  = element.getAttribute?.('aria-label');
      const dataC = element.getAttribute?.('data-country');
      const dataN = element.getAttribute?.('data-name');
      const nm    = element.getAttribute?.('name');
      if (aria  && aria.trim())  return { name: aria.trim(),  id: element.getAttribute('id') || aria.trim() };
      if (dataC && dataC.trim()) return { name: dataC.trim(), id: element.getAttribute('id') || dataC.trim() };
      if (dataN && dataN.trim()) return { name: dataN.trim(), id: element.getAttribute('id') || dataN.trim() };
      if (nm    && nm.trim())    return { name: nm.trim(),    id: element.getAttribute('id') || nm.trim() };
      return null;
    }

    let resolved = null;
    while (el && el.tagName !== 'svg') {
      resolved = resolve(el);
      if (resolved) break;
      el = el.parentNode;
    }
    if (!resolved) return;
    const { name, id } = resolved;
    if (!id || !name) return;

    // Only emit the event up — the parent (WorldMapView) is the single
    // source of truth and handles toggling + persistence. We used to also
    // mutate selectedLocations here, which caused a double-toggle: the
    // local update added {id, name} without `type:"country"`, then the
    // parent toggled again with `type:"country"` and the two entries
    // didn't match. Net effect: clicks looked like no-ops for many
    // countries.
    onLocationClick({ id: name, name });
  }

  // ===== Zoom =====
  const handleZoomIn = useCallback(() => {
    setTransform(prev => ({ ...prev, scale: Math.min(prev.scale * 1.25, 6) }));
  }, []);
  const handleZoomOut = useCallback(() => {
    setTransform(prev => {
      const next = Math.max(prev.scale / 1.25, 1);
      return next === 1 ? { x: 0, y: 0, scale: 1 } : { ...prev, scale: next };
    });
  }, []);
  const handleReset = useCallback(() => setTransform({ x: 0, y: 0, scale: 1 }), []);

  // ===== Pan (pointer events — works for mouse, pen, AND touch) =====
  // Only allow pan when zoomed in. Pointer events let one handler set
  // serve mouse + touch + pen; we capture the pointer so a fast drag
  // off the canvas still emits move/up events.
  const onPointerDown = (e) => {
    if (transform.scale <= 1) return;
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch {}
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: transform.x,
      origY: transform.y,
      moved: 0,
    };
    setDragging(true);
  };

  const onPointerMove = (e) => {
    // Tooltip (only when not dragging — saves work)
    if (!dragRef.current.active) {
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
        // Container-relative coords so the tooltip can use position:absolute
        // and stay glued to the cursor even if an ancestor has a transform.
        const rect = svgContainerRef.current?.getBoundingClientRect();
        const x = rect ? e.clientX - rect.left : e.clientX;
        const y = rect ? e.clientY - rect.top  : e.clientY;
        setMousePos({ x, y });
      } else {
        setHoveredName('');
      }
      return;
    }

    // Pan
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    dragRef.current.moved = Math.max(dragRef.current.moved, Math.abs(dx) + Math.abs(dy));
    setTransform(prev => ({ ...prev, x: dragRef.current.origX + dx, y: dragRef.current.origY + dy }));
  };

  const onPointerUp = (e) => {
    if (dragRef.current.active) {
      try { e.currentTarget.releasePointerCapture?.(dragRef.current.pointerId); } catch {}
    }
    dragRef.current.active = false;
    setDragging(false);
    // Reset move marker on next tick so click handlers see the true value
    setTimeout(() => { dragRef.current.moved = 0; }, 0);
  };

  // Ctrl/cmd + wheel = zoom (so normal page scroll still works)
  const onWheel = (e) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setTransform(prev => {
      const delta = e.deltaY > 0 ? 1 / 1.15 : 1.15;
      const next = Math.max(1, Math.min(6, prev.scale * delta));
      if (next === 1) return { x: 0, y: 0, scale: 1 };
      return { ...prev, scale: next };
    });
  };

  // Apply transform
  const svgEl = svgContainerRef.current?.querySelector('svg');
  if (svgEl) {
    svgEl.style.transform = `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`;
    svgEl.style.transformOrigin = '50% 50%';
    svgEl.style.transition = dragging ? 'none' : 'transform 0.25s cubic-bezier(.4,2,.6,1)';
  }

  const zoomed = transform.scale > 1;
  const pannable = zoomed;

  return (
    <div className="world-map-outer">
      <div className="world-map-controls zoom-controls">
        <button onClick={handleZoomIn} aria-label="Zoom in" title="Zoom in">+</button>
        <button onClick={handleZoomOut} aria-label="Zoom out" title="Zoom out" disabled={transform.scale <= 1}>−</button>
        <button onClick={handleReset} aria-label="Reset view" title="Reset view" disabled={!zoomed && transform.x === 0 && transform.y === 0}>↺</button>
      </div>
      <div
        className="world-map-container"
        ref={svgContainerRef}
        onClick={handleLocationClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => setHoveredName('')}
        onWheel={onWheel}
        style={{
          cursor: pannable ? (dragging ? 'grabbing' : 'grab') : 'default',
          touchAction: pannable ? 'none' : 'auto',
        }}
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
