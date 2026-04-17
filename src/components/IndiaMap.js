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
    setMousePos({ x: event.clientX, y: event.clientY });
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
            position: "fixed",
            left: mousePos.x + 14,
            top: mousePos.y - 32,
          }}
        >
          {hoveredName}
        </div>
      )}
    </div>
  );
}

export default IndiaMap;
