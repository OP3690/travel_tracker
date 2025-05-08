import React, { useRef, useState } from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./IndiaMap.css";

// Build a map from id to label coordinates
const idToLabel = {};
India.locations.forEach(loc => {
  if (loc.label) {
    idToLabel[loc.id] = loc.label;
  }
});

function IndiaMap({ selectedLocations = [], setSelectedLocations = () => {}, onLocationClick = () => {}, onPinMove = () => {} }) {
  const [hoveredName, setHoveredName] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(null); // {id, offsetX, offsetY}
  const svgRef = useRef();

  function svgCoordsToContainerCoords(x, y) {
    if (!svgRef.current) return { left: 0, top: 0 };
    const svg = svgRef.current.querySelector("svg");
    if (!svg) return { left: 0, top: 0 };
    const viewBox = svg.viewBox.baseVal;
    const svgRect = svg.getBoundingClientRect();
    const containerRect = svgRef.current.getBoundingClientRect();
    // Scale x/y from viewBox to rendered SVG size
    const left = ((x - viewBox.x) / viewBox.width) * svgRect.width + (svgRect.left - containerRect.left);
    const top = ((y - viewBox.y) / viewBox.height) * svgRect.height + (svgRect.top - containerRect.top);
    return { left, top };
  }

  function handleLocationClick(event) {
    const id = event.target.id;
    const name = event.target.getAttribute("name");
    const label = idToLabel[id];
    setSelectedLocations(prev => {
      const exists = prev.find(s => s.id === id);
      if (exists) {
        return prev.filter(s => s.id !== id);
      } else {
        let pin = { id, name, x: 0, y: 0 };
        if (label) {
          pin.x = label.x;
          pin.y = label.y;
        }
        return [...prev, pin];
      }
    });
  }

  function onLocationMouseOver(event) {
    setHoveredName(event.target.getAttribute("name"));
  }

  function onLocationMouseOut() {
    setHoveredName("");
  }

  function onMouseMove(event) {
    setMousePos({ x: event.clientX, y: event.clientY });
    if (dragging && svgRef.current) {
      const svg = svgRef.current.querySelector("svg");
      const pt = svg.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
      // Place the pin so its tip is under the cursor
      onPinMove(dragging.id, cursorpt.x - dragging.offsetX, cursorpt.y - dragging.offsetY - 25);
    }
  }

  function onPinMouseDown(e, id, x, y) {
    e.preventDefault();
    e.stopPropagation();
    if (svgRef.current) {
      const svg = svgRef.current.querySelector("svg");
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
      // The tip of the pin is at (x, y + 25) in SVG coordinates (since the pin is 36px tall, tip is at bottom)
      setDragging({
        id,
        offsetX: cursorpt.x - x,
        offsetY: cursorpt.y - (y + 25),
      });
    }
  }

  function onMouseUp() {
    setDragging(null);
  }

  return (
    <div
      className="india-map-container"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      ref={svgRef}
      style={{ userSelect: dragging ? "none" : undefined }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <SVGMap
          map={India}
          onLocationClick={handleLocationClick}
          onLocationMouseOver={onLocationMouseOver}
          onLocationMouseOut={onLocationMouseOut}
          locationClassName={({ id }) =>
            selectedLocations && selectedLocations.some(s => s.id === id)
              ? "svg-map__location selected"
              : "svg-map__location"
          }
        />
        {/* Render moveable pins as absolutely positioned HTML elements at the correct spot */}
        {(selectedLocations || []).map(({ id, x, y }) => {
          const { left, top } = svgCoordsToContainerCoords(x, y);
          const isDragging = dragging && dragging.id === id;
          return (
            <svg
              key={id}
              style={{
                position: "absolute",
                left: left - 12,
                top: top - 36,
                cursor: isDragging ? "grabbing" : "grab",
                zIndex: 10,
                width: 24,
                height: 36,
                pointerEvents: "auto"
              }}
              viewBox="0 0 24 36"
              onMouseDown={e => onPinMouseDown(e, id, x, y)}
            >
              <g>
                <ellipse cx="12" cy="28" rx="6" ry="3" fill="#b71c1c" opacity="0.3" />
                <path
                  d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.5 17 8.13 18.02a1 1 0 0 0 1.74 0C13.5 28 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 12.5A3.5 3.5 0 1 1 12 7a3.5 3.5 0 0 1 0 7.5z"
                  fill="#e53935"
                  stroke="#b71c1c"
                  strokeWidth="1"
                />
                <circle cx="12" cy="11" r="2" fill="#fff" />
              </g>
            </svg>
          );
        })}
      </div>
      {hoveredName && (
        <div
          className="india-map-tooltip"
          style={{
            position: "fixed",
            left: mousePos.x + 12,
            top: mousePos.y + 12,
            background: "#222",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: 4,
            pointerEvents: "none",
            fontSize: 14,
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
          }}
        >
          {hoveredName}
        </div>
      )}
    </div>
  );
}

export default IndiaMap; 