import React from 'react';
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
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ]
};

export default function MapStatsRow({ selectedLocations = [] }) {
  const visitedStates = selectedLocations.filter(state => 
    stateAndUTData.states.includes(state.name)
  );
  const visitedUTs = selectedLocations.filter(state => 
    stateAndUTData.unionTerritories.includes(state.name)
  );
  const pendingStates = stateAndUTData.states.filter(state => 
    !selectedLocations.some(s => s.name === state)
  );
  const pendingUTs = stateAndUTData.unionTerritories.filter(ut => 
    !selectedLocations.some(s => s.name === ut)
  );
  return (
    <div className="map-stats-row">
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