import React, { useEffect, useState } from 'react';
import IndiaMap from './IndiaMap';
import Layout from './Layout';
import API from '../api/api';
import { FaBook, FaGlobeAsia, FaChartBar, FaLightbulb, FaTimes, FaMapMarkerAlt, FaRoute, FaCompass, FaStar, FaFlagCheckered, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
    'Andaman and Nicobar Islands', 'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ]
};

const nextDestinations = [
  { name: 'Ladakh', why: 'Pangong Lake & Nubra Valley', icon: '🏔️' },
  { name: 'Kerala', why: 'Backwaters & Ayurveda', icon: '🌴' },
  { name: 'Rajasthan', why: 'Forts & Desert Safari', icon: '🏜️' },
  { name: 'Goa', why: 'Beaches & Nightlife', icon: '🏖️' },
  { name: 'Meghalaya', why: 'Living Root Bridges', icon: '🌿' },
  { name: 'Sikkim', why: 'Monasteries & Mountains', icon: '🏯' },
];

const travelQuotes = [
  '"The world is a book, and those who do not travel read only one page." — Saint Augustine',
  '"Travel makes one modest. You see what a tiny place you occupy in the world." — Gustave Flaubert',
  '"Not all those who wander are lost." — J.R.R. Tolkien',
  '"Life is either a daring adventure or nothing at all." — Helen Keller',
  '"To travel is to live." — Hans Christian Andersen',
  '"Adventure is worthwhile in itself." — Amelia Earhart',
  '"The journey not the arrival matters." — T.S. Eliot',
  '"Travel far enough, you meet yourself." — David Mitchell',
];

function normalizeWords(name) {
  return name.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(Boolean);
}

function fuzzyIncludes(list, name) {
  const nameWords = normalizeWords(name);
  return list.some(item => {
    const itemWords = normalizeWords(item);
    return nameWords.every(w => itemWords.includes(w)) || itemWords.every(w => nameWords.includes(w));
  });
}

export default function Dashboard() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [user, setUser] = useState({ name: 'Explorer' });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored?.name) setUser(stored);
    } catch {}
    setShowWelcome(!localStorage.getItem('dashboard-welcome-dismissed'));
  }, []);

  useEffect(() => {
    async function fetchSelected() {
      try {
        const res = await API.get('/api/user/selected');
        setSelectedLocations(res.data.selectedLocations || []);
      } catch {
        setSelectedLocations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSelected();
  }, []);

  useEffect(() => {
    if (selectedLocations.length > 0) {
      API.post('/api/user/selected', { selectedLocations }).catch(() => {});
    }
  }, [selectedLocations]);

  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('dashboard-welcome-dismissed', 'true');
  };

  // Stats
  const indiaLocations = selectedLocations.filter(loc => !loc.type || loc.type !== 'country');
  const visitedStatesCount = indiaLocations.filter(loc => fuzzyIncludes(stateAndUTData.states, loc.name || '')).length;
  const visitedUTsCount = stateAndUTData.unionTerritories.filter(ut => {
    if (ut === 'Dadra and Nagar Haveli and Daman and Diu') {
      return indiaLocations.some(sel =>
        fuzzyIncludes(['Dadra and Nagar Haveli and Daman and Diu', 'Daman and Diu', 'Dadra and Nagar Haveli'], sel.name || '')
      );
    }
    return indiaLocations.some(sel => fuzzyIncludes([ut], sel.name || ''));
  }).length;

  const totalStates = stateAndUTData.states.length;
  const totalUTs = stateAndUTData.unionTerritories.length;
  const totalPlaces = totalStates + totalUTs;
  const totalVisited = visitedStatesCount + visitedUTsCount;
  const overallPercent = totalPlaces > 0 ? Math.round((totalVisited / totalPlaces) * 100) : 0;

  const todayQuote = travelQuotes[new Date().getDate() % travelQuotes.length];

  // Get unvisited state names for suggestions
  const visitedNames = new Set(indiaLocations.map(l => (l.name || '').toLowerCase()));
  const suggestedNext = nextDestinations.filter(d =>
    !visitedNames.has(d.name.toLowerCase())
  ).slice(0, 3);

  // Recently visited (last 5)
  const recentVisits = indiaLocations.slice(-5).reverse();

  const statCards = [
    { label: 'States Visited', count: visitedStatesCount, total: totalStates, color: 'var(--accent-400)', bg: 'rgba(52,211,153,0.12)' },
    { label: 'UTs Visited', count: visitedUTsCount, total: totalUTs, color: 'var(--primary-400)', bg: 'rgba(129,140,248,0.12)' },
    { label: 'States Pending', count: totalStates - visitedStatesCount, total: totalStates, color: 'var(--amber-400)', bg: 'rgba(251,191,36,0.12)' },
    { label: 'UTs Pending', count: totalUTs - visitedUTsCount, total: totalUTs, color: 'var(--rose-400)', bg: 'rgba(251,113,133,0.12)' },
  ];

  return (
    <Layout>
      <div className="dashboard-page">
        {/* Welcome Banner */}
        {showWelcome && (
          <div className="welcome-banner">
            <button className="welcome-dismiss" onClick={dismissWelcome} aria-label="Dismiss"><FaTimes /></button>
            <div className="welcome-left">
              <h2>Welcome, {user.name.split(' ')[0]}! 🧭</h2>
              <p>Your journey across India starts here. Click any state on the map to mark it as visited.</p>
              <div className="welcome-actions">
                <Link to="/journal" className="welcome-link"><FaBook /> Journal</Link>
                <Link to="/worldmap" className="welcome-link"><FaGlobeAsia /> World Map</Link>
                <Link to="/statistics" className="welcome-link"><FaChartBar /> Stats</Link>
              </div>
            </div>
          </div>
        )}

        {/* Quote Bar */}
        <div className="quote-bar">
          <FaCompass className="quote-icon" />
          <span className="quote-text">{todayQuote}</span>
        </div>

        {/* Main 2-column layout */}
        <div className="dash-columns">
          {/* LEFT: Map */}
          <div className="dash-left">
            {/* Stats Row */}
            <div className="stats-grid">
              {statCards.map((card, i) => (
                <div key={i} className="stat-card" style={{ '--i': i, '--card-color': card.color, '--card-bg': card.bg }}>
                  <div className="stat-card-icon" style={{ background: card.bg, color: card.color }}>
                    <span className="stat-card-number">{card.count}</span>
                  </div>
                  <div className="stat-card-content">
                    <span className="stat-card-label">{card.label}</span>
                    <span className="stat-card-fraction">{card.count} / {card.total}</span>
                    <div className="stat-card-bar">
                      <div className="stat-card-bar-fill" style={{ width: `${card.total > 0 ? (card.count / card.total) * 100 : 0}%`, background: card.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Card */}
            <div className="map-card">
              <div className="map-card-header">
                <h2><FaMapMarkerAlt className="map-title-icon" /> Interactive India Map</h2>
                <div className="map-legend">
                  <span className="legend-item"><span className="legend-dot visited" /> Visited</span>
                  <span className="legend-item"><span className="legend-dot state" /> State</span>
                  <span className="legend-item"><span className="legend-dot ut" /> UT</span>
                </div>
              </div>
              <div className="map-card-body">
                {loading ? (
                  <div className="skeleton" style={{ width: '80%', height: '300px', margin: '2rem auto' }} />
                ) : (
                  <IndiaMap selectedLocations={indiaLocations} setSelectedLocations={setSelectedLocations} />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Info Panel */}
          <div className="dash-right">
            {/* Overall Progress */}
            <div className="progress-card">
              <div className="pc-ring">
                <svg viewBox="0 0 36 36">
                  <path className="pc-ring-bg" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="pc-ring-fill" strokeDasharray={`${overallPercent}, 100`} d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="pc-ring-text">{overallPercent}%</span>
              </div>
              <div className="pc-info">
                <h3>India Coverage</h3>
                <p>{totalVisited} of {totalPlaces} explored</p>
                <div className="pc-breakdown">
                  <span><strong>{visitedStatesCount}</strong>/{totalStates} States</span>
                  <span><strong>{visitedUTsCount}</strong>/{totalUTs} UTs</span>
                </div>
              </div>
            </div>

            {/* Recent Visits */}
            <div className="info-card">
              <h3 className="info-card-title"><FaFlagCheckered className="ict-icon" /> Recent Visits</h3>
              {recentVisits.length === 0 ? (
                <p className="info-empty">Click a state on the map to start your journey!</p>
              ) : (
                <div className="recent-list">
                  {recentVisits.map((loc, i) => (
                    <div key={i} className="recent-item" style={{ '--i': i }}>
                      <FaMapMarkerAlt className="recent-icon" />
                      <span className="recent-name">{loc.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Next Destination Suggestions */}
            <div className="info-card">
              <h3 className="info-card-title"><FaRoute className="ict-icon" /> Where to Next?</h3>
              <div className="suggest-list">
                {suggestedNext.map((dest, i) => (
                  <div key={i} className="suggest-item" style={{ '--i': i }}>
                    <span className="suggest-emoji">{dest.icon}</span>
                    <div className="suggest-info">
                      <span className="suggest-name">{dest.name}</span>
                      <span className="suggest-why">{dest.why}</span>
                    </div>
                    <FaArrowRight className="suggest-arrow" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="quick-links">
              <Link to="/worldmap" className="quick-link">
                <FaGlobeAsia /> World Map
              </Link>
              <Link to="/journal" className="quick-link">
                <FaBook /> Journal
              </Link>
              <Link to="/statistics" className="quick-link">
                <FaChartBar /> Statistics
              </Link>
              <Link to="/planner" className="quick-link">
                <FaStar /> Planner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
