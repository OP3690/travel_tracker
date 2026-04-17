import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import WorldMap from './WorldMap';
import API from '../api/api';
import { FaEdit, FaTrash, FaSave, FaTimes, FaGlobeAmericas } from 'react-icons/fa';
import './WorldMapView.css';

function countryCodeToFlagEmoji(code) {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1f1e6 + c.charCodeAt(0) - 65));
}

function WorldMapView() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    async function fetchSelected() {
      try {
        const res = await API.get('/api/user/selected');
        setSelectedLocations(res.data.selectedLocations || []);
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

  return (
    <Layout>
      <div className="worldmap-page">
        {/* Header */}
        <div className="page-header wm-header">
          <div>
            <h1 className="page-title">World Map Explorer</h1>
            <p className="page-subtitle">Your glimpse across borders — click any country to pin it</p>
          </div>
          <div className="wm-counter">
            <FaGlobeAmericas />
            <span>{countries.length} countries visited</span>
          </div>
        </div>

        {/* Map */}
        <div className="wm-map-card">
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
                      <td className="flag-cell">{countryCodeToFlagEmoji(location.id?.slice(0, 2))}</td>
                      <td className="country-cell">{location.name}</td>
                      <td>
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
                      <td>
                        {editId === location.id ? (
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
                      <td>
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
      </div>
    </Layout>
  );
}

export default WorldMapView;
