import React, { useRef, useState } from "react";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./CountryMap.css";

// Import all supported country maps
import India from "@svg-maps/india";
import USA from "@svg-maps/usa";
import Japan from "@svg-maps/japan";
import Brazil from "@svg-maps/brazil";
import Italy from "@svg-maps/italy";
import France from "@svg-maps/france.regions";
import Germany from "@svg-maps/germany";
import Canada from "@svg-maps/canada";
import Spain from "@svg-maps/spain";
import Mexico from "@svg-maps/mexico";

const countryMaps = {
  India: { map: India, regionLabel: 'States & UTs', regionType: 'state' },
  USA: { map: USA, regionLabel: 'States', regionType: 'state' },
  Japan: { map: Japan, regionLabel: 'Prefectures', regionType: 'prefecture' },
  Brazil: { map: Brazil, regionLabel: 'States', regionType: 'state' },
  Italy: { map: Italy, regionLabel: 'Regions', regionType: 'region' },
  France: { map: France, regionLabel: 'Regions', regionType: 'region' },
  Germany: { map: Germany, regionLabel: 'States', regionType: 'state' },
  Canada: { map: Canada, regionLabel: 'Provinces', regionType: 'province' },
  Spain: { map: Spain, regionLabel: 'Communities', regionType: 'community' },
  Mexico: { map: Mexico, regionLabel: 'States', regionType: 'state' },
};

function CountryMap({ country = 'India', selectedLocations = [], setSelectedLocations = () => {} }) {
  const [hoveredName, setHoveredName] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef();

  const mapData = countryMaps[country] || countryMaps.India;

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
    if (isVisited) return "svg-map__location selected";
    return "svg-map__location pending";
  }

  return (
    <div className="country-map-container" ref={svgRef} onMouseMove={onMouseMove}>
      <SVGMap
        map={mapData.map}
        onLocationClick={handleLocationClick}
        onLocationMouseOver={onLocationMouseOver}
        onLocationMouseOut={onLocationMouseOut}
        locationClassName={getLocationClass}
      />
      {hoveredName && (
        <div
          className="country-map-tooltip"
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

// Export map metadata for Dashboard stats
export function getCountryMapInfo(country) {
  const data = countryMaps[country] || countryMaps.India;
  return {
    totalRegions: data.map.locations.length,
    regionLabel: data.regionLabel,
    regionType: data.regionType,
    regionNames: data.map.locations.map(l => l.name),
  };
}

export default CountryMap;
