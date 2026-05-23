import React, { useRef, useState } from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./IndiaMap.css";

// Union Territory IDs
const utIds = new Set(['an', 'ch', 'dn', 'dd', 'dl', 'jk', 'ld', 'py']);

function IndiaMap({ selectedLocations = [], setSelectedLocations = () => {} }) {
  const [hoveredName, setHoveredName] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef();

  function handleLocationClick(event) {
    const id = event.target.id;
    const name = event.target.getAttribute("name");
    setSelectedLocations(prev => {
      const exists = prev.find(s => s.id === id);
      if (exists) return prev.filter(s => s.id !== id);
      return [...prev, { id, name }];
    });
  }

  function onLocationMouseOver(event) {
    setHoveredName(event.target.getAttribute("name"));
  }

  function onLocationMouseOut() {
    setHoveredName("");
  }

  function onMouseMove(event) {
    // Container-relative coords so position:absolute tooltip can never
    // drift if an ancestor introduces a transform.
    const rect = svgRef.current?.getBoundingClientRect();
    const x = rect ? event.clientX - rect.left : event.clientX;
    const y = rect ? event.clientY - rect.top  : event.clientY;
    setMousePos({ x, y });
  }

  function getLocationClass({ id }) {
    const isVisited = selectedLocations && selectedLocations.some(s => s.id === id);
    const isUT = utIds.has(id);

    if (isVisited) return "svg-map__location selected";
    if (isUT) return "svg-map__location pending-ut";
    return "svg-map__location pending-state";
  }

  return (
    <div className="india-map-container" ref={svgRef} onMouseMove={onMouseMove}>
      <SVGMap
        map={India}
        onLocationClick={handleLocationClick}
        onLocationMouseOver={onLocationMouseOver}
        onLocationMouseOut={onLocationMouseOut}
        locationClassName={getLocationClass}
      />
      {hoveredName && (
        <div
          className="india-map-tooltip"
          style={{
            position: "absolute",
            left: mousePos.x + 14,
            top: mousePos.y - 32,
            pointerEvents: "none",
            zIndex: 1001,
          }}
        >
          {hoveredName}
        </div>
      )}
    </div>
  );
}

export default IndiaMap;
