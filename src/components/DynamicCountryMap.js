import React, { useRef, useState, useEffect } from "react";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import countryToCode from "../utils/countryCodeMap";
import "./CountryMap.css";

export default function DynamicCountryMap({ country, selectedLocations = [], setSelectedLocations = () => {} }) {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredName, setHoveredName] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef();

  useEffect(() => {
    setLoading(true);
    setMapData(null);
    const code = countryToCode[country];
    if (!code) { setLoading(false); return; }

    import(`../assets/maps/${code}.json`)
      .then(mod => {
        const data = mod.default || mod;
        if (data && data.locations && data.locations.length > 0) {
          setMapData({
            label: country,
            viewBox: data.viewBox,
            locations: data.locations,
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [country]);

  if (loading) {
    return <div className="country-map-container"><div className="skeleton" style={{ width: '60%', height: '300px', margin: '2rem auto' }} /></div>;
  }

  if (!mapData) {
    return (
      <div className="country-map-container">
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <p>Map data not available for {country}</p>
        </div>
      </div>
    );
  }

  function handleLocationClick(event) {
    const id = event.target.id;
    const name = event.target.getAttribute("name");
    setSelectedLocations(prev => {
      const exists = prev.find(s => s.id === id);
      if (exists) return prev.filter(s => s.id !== id);
      return [...prev, { id, name }];
    });
  }

  function getLocationClass({ id }) {
    const isVisited = selectedLocations && selectedLocations.some(s => s.id === id);
    if (isVisited) return "svg-map__location selected";
    return "svg-map__location pending";
  }

  function handleMouseMove(e) {
    // Container-relative coords so the tooltip anchors correctly even
    // if an ancestor has a transform (containing-block trap).
    const rect = svgRef.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : e.clientX;
    const y = rect ? e.clientY - rect.top  : e.clientY;
    setMousePos({ x, y });
  }

  return (
    <div className="country-map-container" ref={svgRef} onMouseMove={handleMouseMove}>
      <SVGMap
        map={mapData}
        onLocationClick={handleLocationClick}
        onLocationMouseOver={e => setHoveredName(e.target.getAttribute("name"))}
        onLocationMouseOut={() => setHoveredName("")}
        locationClassName={getLocationClass}
      />
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

export function getDynamicMapRegionCount(country) {
  const code = countryToCode[country];
  if (!code) return 0;
  try {
    const data = require(`../assets/maps/${code}.json`);
    return data.locations ? data.locations.length : 0;
  } catch {
    return 0;
  }
}
