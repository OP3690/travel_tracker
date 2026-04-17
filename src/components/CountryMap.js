import React, { useRef, useState } from "react";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import WorldCountryMap from "./WorldCountryMap";
import "./CountryMap.css";

// Import ALL available @svg-maps packages (27 countries)
import India from "@svg-maps/india";
import USA from "@svg-maps/usa";
import Japan from "@svg-maps/japan";
import Brazil from "@svg-maps/brazil";
import Italy from "@svg-maps/italy";
import FranceRegions from "@svg-maps/france.regions";
import Germany from "@svg-maps/germany";
import Canada from "@svg-maps/canada";
import Spain from "@svg-maps/spain";
import Mexico from "@svg-maps/mexico";
import Nigeria from "@svg-maps/nigeria";
import Romania from "@svg-maps/romania";
import Taiwan from "@svg-maps/taiwan";
import Thailand from "@svg-maps/thailand";
import SouthKorea from "@svg-maps/south-korea";
import Australia from "@svg-maps/australia";
import China from "@svg-maps/china";
import Vietnam from "@svg-maps/vietnam";
import Ukraine from "@svg-maps/ukraine";
import Denmark from "@svg-maps/denmark";
import SaudiArabia from "@svg-maps/saudi-arabia";
import Colombia from "@svg-maps/colombia";
import Austria from "@svg-maps/austria";
import Uzbekistan from "@svg-maps/uzbekistan";
import Indonesia from "@svg-maps/indonesia";

const countryMaps = {
  India: { map: India, regionLabel: 'States & UTs', regionType: 'state' },
  USA: { map: USA, regionLabel: 'States', regionType: 'state' },
  Japan: { map: Japan, regionLabel: 'Prefectures', regionType: 'prefecture' },
  Brazil: { map: Brazil, regionLabel: 'States', regionType: 'state' },
  Italy: { map: Italy, regionLabel: 'Regions', regionType: 'region' },
  France: { map: FranceRegions, regionLabel: 'Regions', regionType: 'region' },
  Germany: { map: Germany, regionLabel: 'States', regionType: 'state' },
  Canada: { map: Canada, regionLabel: 'Provinces & Territories', regionType: 'province' },
  Spain: { map: Spain, regionLabel: 'Communities', regionType: 'community' },
  Mexico: { map: Mexico, regionLabel: 'States', regionType: 'state' },
  Nigeria: { map: Nigeria, regionLabel: 'States', regionType: 'state' },
  Romania: { map: Romania, regionLabel: 'Counties', regionType: 'county' },
  Taiwan: { map: Taiwan, regionLabel: 'Counties & Cities', regionType: 'county' },
  Thailand: { map: Thailand, regionLabel: 'Provinces', regionType: 'province' },
  'South Korea': { map: SouthKorea, regionLabel: 'Provinces & Cities', regionType: 'province' },
  Australia: { map: Australia, regionLabel: 'States & Territories', regionType: 'state' },
  China: { map: China, regionLabel: 'Provinces', regionType: 'province' },
  Vietnam: { map: Vietnam, regionLabel: 'Provinces', regionType: 'province' },
  Ukraine: { map: Ukraine, regionLabel: 'Oblasts', regionType: 'oblast' },
  Denmark: { map: Denmark, regionLabel: 'Regions', regionType: 'region' },
  'Saudi Arabia': { map: SaudiArabia, regionLabel: 'Provinces', regionType: 'province' },
  Colombia: { map: Colombia, regionLabel: 'Departments', regionType: 'department' },
  Austria: { map: Austria, regionLabel: 'States', regionType: 'state' },
  Uzbekistan: { map: Uzbekistan, regionLabel: 'Regions', regionType: 'region' },
  Indonesia: { map: Indonesia, regionLabel: 'Provinces', regionType: 'province' },
};

function CountryMap({ country = 'India', selectedLocations = [], setSelectedLocations = () => {} }) {
  const [hoveredName, setHoveredName] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef();

  const mapData = countryMaps[country];
  const hasInteractiveMap = !!mapData;

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

  if (!hasInteractiveMap) {
    return <WorldCountryMap country={country} />;
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
  const data = countryMaps[country];
  if (!data) {
    return {
      totalRegions: 0,
      regionLabel: 'Regions',
      regionType: 'region',
      regionNames: [],
      hasMap: false,
    };
  }
  return {
    totalRegions: data.map.locations.length,
    regionLabel: data.regionLabel,
    regionType: data.regionType,
    regionNames: data.map.locations.map(l => l.name),
    hasMap: true,
  };
}

export default CountryMap;
