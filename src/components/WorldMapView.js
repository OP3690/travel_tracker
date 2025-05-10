import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import WorldMap from './WorldMap';
import { countryCodeToName } from '../utils/countryCodeToName';
import API from '../api'; // <-- Make sure you have this axios instance
import '../App.css';

function countryCodeToFlagEmoji(code) {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1f1e6 + c.charCodeAt(0) - 65));
}

function WorldMapView() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editComment, setEditComment] = useState('');

  // Fetch selected locations from backend on mount
  useEffect(() => {
    async function fetchSelected() {
      try {
        const res = await API.get('/api/user/selected');
        setSelectedLocations(res.data.selectedLocations || []);
      } catch (err) {
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
      API.post('/api/user/selected', { selectedLocations: updated })
        .catch(err => console.error('Failed to update selectedLocations:', err));
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
      API.post('/api/user/selected', { selectedLocations: updated })
        .catch(err => console.error('Failed to update selectedLocations:', err));
      return updated;
    });
    setEditId(null);
    setEditDate('');
    setEditComment('');
  }

  function handleDelete(id) {
    setSelectedLocations(prev => {
      const updated = prev.filter(loc => loc.id !== id);
      API.post('/api/user/selected', { selectedLocations: updated })
        .catch(err => console.error('Failed to update selectedLocations:', err));
      return updated;
    });
  }

  return (
    <Layout>
      <div className="dashboard-content worldmap-page" style={{ width: '100%', maxWidth: 'none', margin: 0, padding: 0 }}>
        <h1>Interactive World Map</h1>
        <div className="map-container" style={{ width: '100%', maxWidth: 'none', margin: 0, padding: 0 }}>
          <WorldMap
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            onLocationClick={handleLocationClick}
          />
        </div>
        {/* List of Countries Visited Table */}
        <div style={{ width: '100%', margin: '32px auto 0', maxWidth: 900 }}>
          <h2 style={{ fontWeight: 600, fontSize: '1.18rem', marginBottom: 16 }}>List of Countries Visited</h2>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
            <thead>
              <tr style={{ background: '#f5f5f5', color: '#666', fontWeight: 500, fontSize: '1rem' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Flag</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Country Name</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Date Visited</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Comment</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Action</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Code</th>
              </tr>
            </thead>
            <tbody>
              {selectedLocations.filter(loc => loc.type === 'country').length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#aaa', padding: 24 }}>No countries selected yet.</td></tr>
              ) : (
                selectedLocations.filter(loc => loc.type === 'country').map(location => (
                  <tr key={location.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}>
                    <td style={{ padding: '10px 12px', fontSize: '1.5rem' }}>{countryCodeToFlagEmoji(location.id?.slice(0,2))}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{location.name}</td>
                    <td style={{ padding: '10px 12px' }}>
                      {editId === location.id ? (
                        <input
                          type="date"
                          value={editDate}
                          onChange={e => setEditDate(e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                        />
                      ) : (
                        location.dateVisited || <span style={{ color: '#bbb' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      {editId === location.id ? (
                        <input
                          type="text"
                          value={editComment}
                          onChange={e => setEditComment(e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc', width: 120 }}
                          placeholder="Add comment"
                        />
                      ) : (
                        location.comment || <span style={{ color: '#bbb' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      {editId === location.id ? (
                        <>
                          <button onClick={() => handleSave(location.id)} style={{ marginRight: 8, padding: '4px 10px', borderRadius: 4, border: 'none', background: '#4caf50', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Save</button>
                          <button onClick={() => setEditId(null)} style={{ padding: '4px 10px', borderRadius: 4, border: 'none', background: '#bbb', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(location.id, location.dateVisited, location.comment)} style={{ marginRight: 8, padding: '4px 10px', borderRadius: 4, border: 'none', background: '#1976d2', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => handleDelete(location.id)} style={{ padding: '4px 10px', borderRadius: 4, border: 'none', background: '#e53935', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Delete</button>
                        </>
                      )}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#888' }}>{location.id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default WorldMapView; 