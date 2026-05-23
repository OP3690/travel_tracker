import React, { useRef, useState, useCallback } from "react";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import DynamicCountryMap from "./DynamicCountryMap";
import countryToCode from "../utils/countryCodeMap";
import "./CountryMap.css";
import "./WorldMap.css"; // share the .world-map-controls / .zoom-controls styling

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
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, origX: 0, origY: 0, moved: 0 });
  const svgRef = useRef();

  const mapData = countryMaps[country];
  const hasInteractiveMap = !!mapData;

  function handleLocationClick(event) {
    // Suppress click if it was part of a pan gesture
    if (dragRef.current.moved > 4) return;
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
    // Use container-relative coordinates so the tooltip works correctly
    // even when an ancestor (e.g. a route-enter animation) has a
    // transform that would otherwise re-anchor `position: fixed`
    // away from the viewport.
    const rect = svgRef.current?.getBoundingClientRect();
    const x = rect ? event.clientX - rect.left : event.clientX;
    const y = rect ? event.clientY - rect.top  : event.clientY;
    setMousePos({ x, y });
  }

  function getLocationClass({ id }) {
    const isVisited = selectedLocations && selectedLocations.some(s => s.id === id);
    if (isVisited) return "svg-map__location selected";
    return "svg-map__location pending";
  }

  // ===== Pan + zoom handlers =====
  const zoomIn  = useCallback(() => setTransform(t => ({ ...t, scale: Math.min(t.scale * 1.25, 6) })), []);
  const zoomOut = useCallback(() => setTransform(t => {
    const next = Math.max(t.scale / 1.25, 1);
    return next === 1 ? { x: 0, y: 0, scale: 1 } : { ...t, scale: next };
  }), []);
  const reset   = useCallback(() => setTransform({ x: 0, y: 0, scale: 1 }), []);

  const onPointerDown = (e) => {
    if (transform.scale <= 1) return;
    dragRef.current = {
      active: true,
      startX: e.clientX, startY: e.clientY,
      origX: transform.x, origY: transform.y,
      moved: 0,
    };
    setDragging(true);
  };
  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    dragRef.current.moved = Math.max(dragRef.current.moved, Math.abs(dx) + Math.abs(dy));
    setTransform(t => ({ ...t, x: dragRef.current.origX + dx, y: dragRef.current.origY + dy }));
  };
  const onPointerUp = () => {
    dragRef.current.active = false;
    setDragging(false);
    // reset move marker after a tick so click handlers run with the true value
    setTimeout(() => { dragRef.current.moved = 0; }, 0);
  };

  const onWheel = (e) => {
    if (!e.ctrlKey && !e.metaKey) return; // only zoom on ctrl/cmd+wheel to keep page scroll natural
    e.preventDefault();
    setTransform(t => {
      const delta = e.deltaY > 0 ? 1 / 1.15 : 1.15;
      const next = Math.max(1, Math.min(6, t.scale * delta));
      if (next === 1) return { x: 0, y: 0, scale: 1 };
      return { ...t, scale: next };
    });
  };

  if (!hasInteractiveMap) {
    return <DynamicCountryMap country={country} selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} />;
  }

  const zoomed = transform.scale > 1;
  const transformStyle = {
    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
    transformOrigin: '50% 50%',
    transition: dragging ? 'none' : 'transform 0.25s cubic-bezier(.4,2,.6,1)',
    cursor: zoomed ? (dragging ? 'grabbing' : 'grab') : 'default',
    willChange: 'transform',
  };

  return (
    <div className="country-map-container" ref={svgRef} onMouseMove={onMouseMove}>
      {/* Zoom controls — same look as the World Map */}
      <div className="world-map-controls zoom-controls" aria-label="Map controls">
        <button type="button" onClick={zoomIn} title="Zoom in" aria-label="Zoom in">+</button>
        <button type="button" onClick={zoomOut} title="Zoom out" aria-label="Zoom out" disabled={transform.scale <= 1}>−</button>
        <button type="button" onClick={reset} title="Reset view" aria-label="Reset view" disabled={transform.scale === 1 && transform.x === 0 && transform.y === 0}>↺</button>
      </div>

      <div
        className="country-map-pan"
        style={{ ...transformStyle, touchAction: zoomed ? 'none' : 'auto' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      >
        <SVGMap
          map={mapData.map}
          onLocationClick={handleLocationClick}
          onLocationMouseOver={onLocationMouseOver}
          onLocationMouseOut={onLocationMouseOut}
          locationClassName={getLocationClass}
        />
      </div>

      {hoveredName && (
        <div
          className="country-map-tooltip"
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

// Export map metadata for Dashboard stats
export function getCountryMapInfo(country) {
  const data = countryMaps[country];
  if (data) {
    return {
      totalRegions: data.map.locations.length,
      regionLabel: data.regionLabel,
      regionType: data.regionType,
      regionNames: data.map.locations.map(l => l.name),
      hasMap: true,
    };
  }

  // Check dynamic maps
  const code = countryToCode[country];
  if (code) {
    try {
      const mapJson = require(`../assets/maps/${code}.json`);
      if (mapJson && mapJson.locations) {
        return {
          totalRegions: mapJson.locations.length,
          regionLabel: 'Regions',
          regionType: 'region',
          regionNames: mapJson.locations.map(l => l.name),
          hasMap: true,
        };
      }
    } catch {}
  }

  return {
    totalRegions: 0,
    regionLabel: 'Regions',
    regionType: 'region',
    regionNames: [],
    hasMap: false,
  };
}

export default CountryMap;
