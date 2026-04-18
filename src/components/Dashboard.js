import React, { useEffect, useState } from 'react';
import CountryMap, { getCountryMapInfo } from './CountryMap';
import Layout from './Layout';
import API from '../api/api';
import { FaBook, FaGlobeAsia, FaChartBar, FaTimes, FaMapMarkerAlt, FaRoute, FaCompass, FaFlagCheckered, FaArrowRight, FaCrown, FaHeart, FaPlus, FaCamera } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import allCountries from '../utils/countries';
import AddMemoryModal from './AddMemoryModal';
import './Dashboard.css';

// Country-specific suggestions
const countrySuggestions = {
  India: [
    { name: 'Ladakh', why: 'Pangong Lake & Nubra Valley', icon: '🏔️' },
    { name: 'Kerala', why: 'Backwaters & Ayurveda', icon: '🌴' },
    { name: 'Rajasthan', why: 'Forts & Desert Safari', icon: '🏜️' },
    { name: 'Goa', why: 'Beaches & Nightlife', icon: '🏖️' },
    { name: 'Meghalaya', why: 'Living Root Bridges', icon: '🌿' },
  ],
  USA: [
    { name: 'California', why: 'Golden Gate & Yosemite', icon: '🌉' },
    { name: 'New York', why: 'Times Square & Central Park', icon: '🗽' },
    { name: 'Hawaii', why: 'Volcanoes & Beaches', icon: '🌺' },
    { name: 'Colorado', why: 'Rocky Mountains', icon: '⛰️' },
    { name: 'Florida', why: 'Everglades & Theme Parks', icon: '🐊' },
  ],
  Japan: [
    { name: 'Tokyo', why: 'Shibuya & Akihabara', icon: '🗼' },
    { name: 'Kyoto', why: 'Temples & Cherry Blossoms', icon: '🌸' },
    { name: 'Osaka', why: 'Street Food Capital', icon: '🍜' },
    { name: 'Hokkaido', why: 'Skiing & Nature', icon: '❄️' },
  ],
  default: [
    { name: 'Explore your map!', why: 'Click regions to mark visited', icon: '🗺️' },
  ],
};

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

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [user, setUser] = useState({ name: 'Explorer', country: 'India', email: '' });
  const [adminCountry, setAdminCountry] = useState('');
  const [recentMemories, setRecentMemories] = useState([]);
  const [showMemoryModal, setShowMemoryModal] = useState(false);

  const fetchMemories = async () => {
    try {
      const res = await API.get('/api/user/memories');
      setRecentMemories((res.data.memories || []).slice(0, 4));
    } catch {
      setRecentMemories([]);
    }
  };
  useEffect(() => { fetchMemories(); }, []);

  const ADMIN_EMAIL = 'global5665@gmail.com';
  const isAdmin = user.email === ADMIN_EMAIL;

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored?.name) {
        setUser({ ...stored, country: stored.country || 'India', email: stored.email || '' });
        setAdminCountry(stored.country || 'India');
      }
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

  const handleAdminCountryChange = async (newCountry) => {
    setAdminCountry(newCountry);
    setUser(prev => ({ ...prev, country: newCountry }));
    // Persist to localStorage
    const stored = JSON.parse(localStorage.getItem('user') || '{}');
    stored.country = newCountry;
    localStorage.setItem('user', JSON.stringify(stored));
    // Persist to backend
    try {
      await API.post('/api/user/country', { country: newCountry });
    } catch {}
    // Clear selected locations when switching country (fresh start)
    setSelectedLocations([]);
  };

  // Dynamic country stats
  const userCountry = user.country || 'India';
  const countryInfo = getCountryMapInfo(userCountry);
  const countryLocations = selectedLocations.filter(loc => !loc.type || loc.type !== 'country');
  const visitedCount = countryLocations.length;
  const totalRegions = countryInfo.totalRegions;
  const pendingCount = totalRegions - visitedCount;
  const overallPercent = totalRegions > 0 ? Math.round((visitedCount / totalRegions) * 100) : 0;

  const todayQuote = travelQuotes[new Date().getDate() % travelQuotes.length];

  // Suggestions based on country
  const visitedNames = new Set(countryLocations.map(l => (l.name || '').toLowerCase()));
  const suggestions = countrySuggestions[userCountry] || countrySuggestions.default;
  const suggestedNext = suggestions.filter(d => !visitedNames.has(d.name.toLowerCase())).slice(0, 3);

  // Recently visited (last 5)
  const recentVisits = countryLocations.slice(-5).reverse();

  const regionLabel = countryInfo.regionLabel;
  const statCards = [
    { label: `${regionLabel} Visited`, count: visitedCount, total: totalRegions, color: 'var(--accent-400)', bg: 'rgba(52,211,153,0.12)' },
    { label: `${regionLabel} Pending`, count: pendingCount, total: totalRegions, color: 'var(--amber-400)', bg: 'rgba(251,191,36,0.12)' },
  ];

  return (
    <Layout>
      <div className="dashboard-page">
        {/* Welcome Banner */}
        {showWelcome && (
          <div className="welcome-banner">
            <button className="welcome-dismiss" onClick={dismissWelcome} aria-label="Dismiss"><FaTimes /></button>
            <div className="welcome-left">
              <h2>Hey {user.name.split(' ')[0]}, ready to explore? 🧭</h2>
              <p>Your travel map is waiting. Click any region to mark it visited and watch your progress grow.</p>
              <div className="welcome-actions">
                <Link to="/discover" className="welcome-link"><FaBook /> Discover</Link>
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

            {/* Admin Country Switcher */}
            {isAdmin && (
              <div className="admin-switcher">
                <div className="admin-badge"><FaCrown className="admin-crown" /> Admin Preview</div>
                <div className="admin-controls">
                  <span className="admin-label">Switch country map:</span>
                  <select
                    className="admin-select"
                    value={adminCountry}
                    onChange={e => handleAdminCountryChange(e.target.value)}
                  >
                    {allCountries.map(c => (
                      <option key={c.value} value={c.value}>
                        {c.label}{c.hasMap ? ' ★' : ''}
                      </option>
                    ))}
                  </select>
                  <span className="admin-hint">★ = Interactive region map available</span>
                </div>
              </div>
            )}

            {/* Map Card */}
            <div className="map-card">
              <div className="map-card-header">
                <h2><FaMapMarkerAlt className="map-title-icon" /> {userCountry} Map</h2>
                <div className="map-legend">
                  <span className="legend-item"><span className="legend-dot visited" /> Visited</span>
                  <span className="legend-item"><span className="legend-dot state" /> Pending</span>
                </div>
              </div>
              <div className="map-card-body">
                {loading ? (
                  <div className="skeleton" style={{ width: '80%', height: '300px', margin: '2rem auto' }} />
                ) : (
                  <CountryMap country={userCountry} selectedLocations={countryLocations} setSelectedLocations={setSelectedLocations} />
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
                <h3>{userCountry} Coverage</h3>
                <p>{visitedCount} of {totalRegions} {countryInfo.regionLabel.toLowerCase()} explored</p>
                <div className="pc-breakdown">
                  <span><strong>{visitedCount}</strong>/{totalRegions} {countryInfo.regionLabel}</span>
                </div>
              </div>
            </div>

            {/* Recent Visits */}
            <div className="info-card">
              <h3 className="info-card-title"><FaFlagCheckered className="ict-icon" /> Recent Visits</h3>
              {recentVisits.length === 0 ? (
                <p className="info-empty">Tap a region on the map to begin your story!</p>
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

            {/* Memory Wall Preview */}
            <div className="info-card memory-wall-card">
              <div className="mw-header">
                <h3 className="info-card-title"><FaHeart className="ict-icon mw-heart" /> Memory Wall</h3>
                <Link to="/memories" className="mw-view-all">View all <FaArrowRight /></Link>
              </div>
              {recentMemories.length === 0 ? (
                <div className="mw-empty">
                  <p>Save photos and stories from places you've stamped.</p>
                  <button className="mw-add-btn" onClick={() => setShowMemoryModal(true)}>
                    <FaPlus /> Add Memory
                  </button>
                </div>
              ) : (
                <>
                  <div className="mw-grid">
                    {recentMemories.map((m, i) => (
                      <div key={m._id || i} className="mw-thumb" onClick={() => navigate('/memories')}>
                        {m.photos?.[0] ? (
                          <img src={m.photos[0]} alt={m.title} />
                        ) : (
                          <div className="mw-thumb-noimg">📝</div>
                        )}
                        {m.photos?.length > 1 && (
                          <span className="mw-thumb-count"><FaCamera /> {m.photos.length}</span>
                        )}
                        <div className="mw-thumb-overlay">
                          <span className="mw-thumb-title">{m.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mw-add-btn wide" onClick={() => setShowMemoryModal(true)}>
                    <FaPlus /> Add Memory
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {showMemoryModal && (
          <AddMemoryModal
            onClose={() => setShowMemoryModal(false)}
            onSaved={fetchMemories}
          />
        )}
      </div>
    </Layout>
  );
}
