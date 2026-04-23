import React, { useState, useEffect, useRef } from 'react';
import Layout from './Layout';
import WorldMap from './WorldMap';
import API from '../api/api';
import { FaEdit, FaTrash, FaSave, FaTimes, FaGlobeAmericas, FaHome, FaDownload } from 'react-icons/fa';
import DownloadMapModal from './DownloadMapModal';
import './WorldMapView.css';

function countryCodeToFlagEmoji(code) {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1f1e6 + c.charCodeAt(0) - 65));
}

// Map short names to the canonical names used in the World SVG (<title> tags)
const COUNTRY_ALIASES = {
  'USA': 'United States',
  'UK': 'United Kingdom',
  'UAE': 'United Arab Emirates',
  'Czechia': 'Czech Republic',
  'Burma': 'Myanmar',
};
function canonicalCountry(name) {
  if (!name) return '';
  return COUNTRY_ALIASES[name] || name;
}

function WorldMapView() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editComment, setEditComment] = useState('');
  const [downloadOpts, setDownloadOpts] = useState(null);
  const mapCardRef = useRef(null);

  useEffect(() => {
    async function fetchSelected() {
      try {
        const res = await API.get('/api/user/selected');
        let locations = res.data.selectedLocations || [];

        // Auto-mark the user's home country as visited, with a "Home Country" note
        let home = '';
        try {
          const stored = JSON.parse(localStorage.getItem('user') || '{}');
          home = canonicalCountry(stored.country);
        } catch {}

        if (home) {
          const idx = locations.findIndex(
            l => l.type === 'country' && (l.name === home || canonicalCountry(l.name) === home)
          );
          if (idx === -1) {
            const homeEntry = {
              id: home,
              name: home,
              type: 'country',
              isHome: true,
              comment: 'Home Country',
            };
            locations = [...locations, homeEntry];
            API.post('/api/user/selected', { selectedLocations: locations }).catch(() => {});
          } else if (!locations[idx].isHome) {
            locations = locations.map((l, i) =>
              i === idx ? { ...l, isHome: true, comment: l.comment || 'Home Country' } : l
            );
            API.post('/api/user/selected', { selectedLocations: locations }).catch(() => {});
          }
        }

        setSelectedLocations(locations);
      } catch {
        setSelectedLocations([]);
      }
    }
    fetchSelected();
  }, []);

  function handleLocationClick(location) {
    setSelectedLocations(prev => {
      const exists = prev.find(s => s.id === location.id && s.type === 'country');
      let updated;
      if (exists) {
        updated = prev.filter(s => !(s.id === location.id && s.type === 'country'));
      } else {
        updated = [...prev, { ...location, type: 'country' }];
      }
      API.post('/api/user/selected', { selectedLocations: updated }).catch(() => {});
      return updated;
    });
  }

  function handleEdit(id, dateVisited, comment) {
    setEditId(id);
    setEditDate(dateVisited || '');
    setEditComment(comment || '');
  }

  function handleSave(id) {
    setSelectedLocations(prev => {
      const updated = prev.map(loc =>
        loc.id === id ? { ...loc, dateVisited: editDate, comment: editComment } : loc
      );
      API.post('/api/user/selected', { selectedLocations: updated }).catch(() => {});
      return updated;
    });
    setEditId(null);
  }

  function handleDelete(id) {
    setSelectedLocations(prev => {
      const updated = prev.filter(loc => loc.id !== id);
      API.post('/api/user/selected', { selectedLocations: updated }).catch(() => {});
      return updated;
    });
  }

  const countries = selectedLocations.filter(loc => loc.type === 'country');

  const handleDownloadMap = () => {
    if (!mapCardRef.current) return;
    const svgs = Array.from(mapCardRef.current.querySelectorAll('svg'));
    if (!svgs.length) return;
    const svg = svgs.reduce((best, el) => {
      const r = el.getBoundingClientRect();
      const area = r.width * r.height;
      return area > (best.area || 0) ? { el, area } : best;
    }, {}).el;
    if (!svg) return;

    let userName = '';
    try { userName = JSON.parse(localStorage.getItem('user') || '{}').name || ''; } catch {}
    const percent = Math.round((countries.length / 195) * 100);
    const sortedVisited = countries
      .map(c => c.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    setDownloadOpts({
      svgElement: svg,
      title: 'World Map',
      subtitle: `${countries.length} of 195 Countries stamped`,
      userName,
      stats: [
        { label: 'Countries Visited', value: countries.length, accent: '#34d399' },
        { label: 'World Explored', value: `${percent}%`, accent: '#a78bfa' },
        { label: 'Remaining', value: 195 - countries.length, accent: '#fbbf24' },
      ],
      visitedNames: sortedVisited,
      pendingFill: 'rgba(253, 186, 116, 0.55)',
      pendingStroke: 'rgba(251, 191, 36, 0.8)',
      eyebrow: 'MY INTERNATIONAL STAMPS',
      filename: `stampyourmap-world-${userName || 'map'}`,
    });
  };

  return (
    <Layout>
      <div className="worldmap-page">
        {/* Header */}
        <div className="page-header wm-header">
          <div>
            <h1 className="page-title">World Map Explorer</h1>
            <p className="page-subtitle">The world is your canvas — click any country to paint it visited</p>
          </div>
          <div className="wm-header-actions">
            <div className="wm-counter">
              <FaGlobeAmericas />
              <span>{countries.length} countries visited</span>
            </div>
            <button
              type="button"
              className="wm-download-btn"
              onClick={handleDownloadMap}
              disabled={countries.length === 0}
              title={countries.length === 0 ? 'Stamp at least one country to download' : 'Preview & download your world map'}
              data-ga-label="WorldMap: Open download modal"
              data-ga-event="worldmap_download_open"
              data-ga-category="download"
            >
              <FaDownload /> Download
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="wm-map-card" ref={mapCardRef}>
          <WorldMap
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            onLocationClick={handleLocationClick}
          />
        </div>

        {/* Stats Bar */}
        <div className="wm-stats-bar">
          <div className="wm-stat-item">
            <span className="wm-stat-value">{countries.length}</span>
            <span className="wm-stat-label">Countries Visited</span>
          </div>
          <div className="wm-stat-divider" />
          <div className="wm-stat-item">
            <span className="wm-stat-value">{Math.round((countries.length / 195) * 100)}%</span>
            <span className="wm-stat-label">World Explored</span>
          </div>
          <div className="wm-stat-divider" />
          <div className="wm-stat-item">
            <span className="wm-stat-value">{195 - countries.length}</span>
            <span className="wm-stat-label">Remaining</span>
          </div>
        </div>

        {/* Countries Table */}
        <div className="wm-table-card">
          <div className="wm-table-header">
            <h2>Countries Visited</h2>
            <span className="wm-table-count">{countries.length} total</span>
          </div>
          {countries.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <FaGlobeAmericas />
              </div>
              <h3>No countries selected yet</h3>
              <p>Click on the map above to start tracking your travels</p>
            </div>
          ) : (
            <div className="wm-table-wrap">
              <table className="wm-table">
                <thead>
                  <tr>
                    <th>Flag</th>
                    <th>Country</th>
                    <th>Date Visited</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {countries.map(location => (
                    <tr key={location.id}>
                      <td className="flag-cell" data-label="Flag">{countryCodeToFlagEmoji(location.id?.slice(0, 2))}</td>
                      <td className="country-cell" data-label="Country">{location.name}</td>
                      <td data-label="Date Visited">
                        {editId === location.id ? (
                          <input
                            type="date"
                            value={editDate}
                            onChange={e => setEditDate(e.target.value)}
                            className="wm-edit-input"
                          />
                        ) : (
                          <span className={location.dateVisited ? '' : 'text-muted'}>
                            {location.dateVisited || '---'}
                          </span>
                        )}
                      </td>
                      <td data-label="Notes">
                        {location.isHome ? (
                          <span className="wm-home-badge"><FaHome /> Home Country</span>
                        ) : editId === location.id ? (
                          <input
                            type="text"
                            value={editComment}
                            onChange={e => setEditComment(e.target.value)}
                            className="wm-edit-input"
                            placeholder="Add a note..."
                          />
                        ) : (
                          <span className={location.comment ? '' : 'text-muted'}>
                            {location.comment || '---'}
                          </span>
                        )}
                      </td>
                      <td data-label="Actions">
                        <div className="wm-actions">
                          {editId === location.id ? (
                            <>
                              <button className="wm-action-btn save" onClick={() => handleSave(location.id)}>
                                <FaSave /> Save
                              </button>
                              <button className="wm-action-btn cancel" onClick={() => setEditId(null)}>
                                <FaTimes />
                              </button>
                            </>
                          ) : location.isHome ? (
                            <span className="wm-home-lock" title="Home country is always marked visited">—</span>
                          ) : (
                            <>
                              <button className="wm-action-btn edit" onClick={() => handleEdit(location.id, location.dateVisited, location.comment)}>
                                <FaEdit />
                              </button>
                              <button className="wm-action-btn delete" onClick={() => handleDelete(location.id)}>
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {downloadOpts && (
          <DownloadMapModal
            {...downloadOpts}
            onClose={() => setDownloadOpts(null)}
          />
        )}
      </div>
    </Layout>
  );
}

export default WorldMapView;
