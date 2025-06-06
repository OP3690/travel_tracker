import React, { useEffect, useState } from 'react';
import IndiaMap from './IndiaMap';
import MapStatsRow from './MapStatsRow';
import Layout from './Layout';
import API from '../api/api';
import './Dashboard.css';

const stateAndUTData = {
  states: [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal'
  ],
  unionTerritories: [
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ]
};

function normalizeWords(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean);
}

function fuzzyIncludes(list, name) {
  const nameWords = normalizeWords(name);
  return list.some(item => {
    const itemWords = normalizeWords(item);
    // All words in name are in item, or all words in item are in name
    return (
      nameWords.every(w => itemWords.includes(w)) ||
      itemWords.every(w => nameWords.includes(w))
    );
  });
}

export function MapStatsLeft({ selectedLocations = [] }) {
  const visitedStates = selectedLocations.filter(state => 
    stateAndUTData.states.includes(state.name)
  );
  const visitedUTs = stateAndUTData.unionTerritories.filter(ut => {
    if (ut === "Dadra and Nagar Haveli and Daman and Diu") {
      // Fuzzy match any alias
      return selectedLocations.some(sel =>
        fuzzyIncludes([
          "Dadra and Nagar Haveli and Daman and Diu",
          "Daman and Diu",
          "Dadra and Nagar Haveli"
        ], sel.name)
      );
    }
    return selectedLocations.some(sel => fuzzyIncludes([ut], sel.name));
  });
  return (
    <div className="stats-grid">
      <div className="stat-card" style={{ borderColor: '#4CAF50' }}>
        <div className="stat-icon" style={{ backgroundColor: '#4CAF50' }}>🏛️</div>
        <div className="stat-content">
          <h3>States Visited</h3>
          <div className="stat-numbers">
            <span className="stat-count">{visitedStates.length}</span>
            <span className="stat-total">/ {stateAndUTData.states.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(visitedStates.length / stateAndUTData.states.length) * 100}%`, backgroundColor: '#4CAF50' }} />
          </div>
        </div>
      </div>
      <div className="stat-card" style={{ borderColor: '#2196F3' }}>
        <div className="stat-icon" style={{ backgroundColor: '#2196F3' }}>🏢</div>
        <div className="stat-content">
          <h3>UTs Visited</h3>
          <div className="stat-numbers">
            <span className="stat-count">{visitedUTs.length}</span>
            <span className="stat-total">/ {stateAndUTData.unionTerritories.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(visitedUTs.length / stateAndUTData.unionTerritories.length) * 100}%`, backgroundColor: '#2196F3' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MapStatsRight({ selectedLocations = [] }) {
  const pendingStates = stateAndUTData.states.filter(state => 
    !selectedLocations.some(s => s.name === state)
  );
  const pendingUTs = stateAndUTData.unionTerritories.filter(ut => {
    if (ut === "Dadra and Nagar Haveli and Daman and Diu") {
      return !selectedLocations.some(sel =>
        fuzzyIncludes([
          "Dadra and Nagar Haveli and Daman and Diu",
          "Daman and Diu",
          "Dadra and Nagar Haveli"
        ], sel.name)
      );
    }
    return !selectedLocations.some(sel => fuzzyIncludes([ut], sel.name));
  });
  return (
    <div className="stats-grid">
      <div className="stat-card" style={{ borderColor: '#FF9800' }}>
        <div className="stat-icon" style={{ backgroundColor: '#FF9800' }}>⏳</div>
        <div className="stat-content">
          <h3>States Pending</h3>
          <div className="stat-numbers">
            <span className="stat-count">{pendingStates.length}</span>
            <span className="stat-total">/ {stateAndUTData.states.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(pendingStates.length / stateAndUTData.states.length) * 100}%`, backgroundColor: '#FF9800' }} />
          </div>
        </div>
      </div>
      <div className="stat-card" style={{ borderColor: '#F44336' }}>
        <div className="stat-icon" style={{ backgroundColor: '#F44336' }}>📝</div>
        <div className="stat-content">
          <h3>UTs Pending</h3>
          <div className="stat-numbers">
            <span className="stat-count">{pendingUTs.length}</span>
            <span className="stat-total">/ {stateAndUTData.unionTerritories.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(pendingUTs.length / stateAndUTData.unionTerritories.length) * 100}%`, backgroundColor: '#F44336' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [idToLabel, setIdToLabel] = useState({});

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

  // Always POST the latest selectedLocations to backend when it changes
  useEffect(() => {
    if (selectedLocations.length > 0) {
      API.post('/api/user/selected', { selectedLocations })
        .catch(err => console.error('Failed to update selectedLocations:', err));
    }
  }, [selectedLocations]);

  useEffect(() => {
    setSelectedLocations(prev => prev.map(loc => {
      if ((loc.x === undefined || loc.y === undefined) && idToLabel[loc.id]) {
        return { ...loc, x: idToLabel[loc.id].x, y: idToLabel[loc.id].y };
      }
      return loc;
    }));
  }, []);

  const handleLocationClick = (event) => {
    const id = event.target.id;
    const name = event.target.getAttribute('name');
    const label = idToLabel[id];
    setSelectedLocations(prev => {
      const exists = prev.find(s => s.id === id);
      let updated;
      if (exists) {
        updated = prev.filter(s => s.id !== id);
      } else {
        // Always use correct centroid if available
        let pin = { id, name, x: 0, y: 0 };
        if (label) {
          pin.x = label.x;
          pin.y = label.y;
        }
        updated = [...prev, pin];
      }
      return updated;
    });
  };

  const handleDelete = (id) => {
    setSelectedLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const handlePinMove = (id, x, y) => {
    setSelectedLocations(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, x, y } : s);
      return updated;
    });
  };

  return (
    <Layout>
      <div className="dashboard-content">
        <h1 className="dashboard-title">India Travel Dashboard</h1>
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">🏛️</div>
            <div className="stat-content">
              <h3>States Visited</h3>
              <div className="stat-numbers">{visitedStates.length} / 28</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <h3>UTs Visited</h3>
              <div className="stat-numbers">{visitedUTs.length} / 8</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>States Pending</h3>
              <div className="stat-numbers">{pendingStates.length} / 28</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>UTs Pending</h3>
              <div className="stat-numbers">{pendingUTs.length} / 8</div>
            </div>
          </div>
        </div>
        <div className="map-section">
          <IndiaMap
            selectedStates={visitedStates}
            selectedUTs={visitedUTs}
            onStateClick={handleStateClick}
            onUTClick={handleUTClick}
          />
        </div>
      </div>
    </Layout>
  );
} 