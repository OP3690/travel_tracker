import React, { useEffect, useRef, useState } from 'react';

const svgUrl = '/WorldMapSVGSource.txt';

const WorldMapView = () => {
  const [svgContent, setSvgContent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const svgContainerRef = useRef(null);

  useEffect(() => {
    fetch(svgUrl)
      .then(res => res.text())
      .then(text => {
        console.log('SVG Content:', text.slice(0, 500)); // Log first 500 chars
        setSvgContent(text);
      });
  }, []);

  useEffect(() => {
    if (!svgContent) return;
    const svgEl = svgContainerRef.current?.querySelector('svg');
    if (!svgEl) return;
    // Remove previous listeners
    svgEl.querySelectorAll('.landxx').forEach(path => {
      path.replaceWith(path.cloneNode(true));
    });
    // Add click listeners to all country paths
    svgEl.querySelectorAll('.landxx').forEach(path => {
      path.addEventListener('click', () => {
        svgEl.querySelectorAll('.landxx.selected').forEach(sel => sel.classList.remove('selected'));
        path.classList.add('selected');
        // Use <title> or id for country name
        const title = path.querySelector('title')?.textContent || path.getAttribute('id') || 'Unknown';
        setSelectedCountry(title);
      });
    });
  }, [svgContent]);

  return (
    <div style={{ maxWidth: '100vw', margin: '0 auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 16 }}>World Map (SVG)</h1>
      <div
        ref={svgContainerRef}
        style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      {selectedCountry && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <strong>Selected Country:</strong> {selectedCountry}
        </div>
      )}
    </div>
  );
};

export default WorldMapView; 