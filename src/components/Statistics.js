import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import API from '../api/api';
import { FaMapMarkedAlt, FaGlobeAmericas, FaRoute, FaStar, FaTrophy, FaFlagCheckered } from 'react-icons/fa';
import './Statistics.css';

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

const milestones = [
  { threshold: 1, label: 'First Step', desc: 'Visited your first state', icon: <FaFlagCheckered /> },
  { threshold: 5, label: 'Explorer', desc: 'Visited 5 states', icon: <FaRoute /> },
  { threshold: 10, label: 'Adventurer', desc: 'Visited 10 states', icon: <FaMapMarkedAlt /> },
  { threshold: 15, label: 'Wanderer', desc: 'Visited 15 states', icon: <FaStar /> },
  { threshold: 20, label: 'Nomad', desc: 'Visited 20 states', icon: <FaGlobeAmericas /> },
  { threshold: 28, label: 'All India', desc: 'All 28 states visited!', icon: <FaTrophy /> },
];

export default function Statistics() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [visited, setVisited] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const [selRes, visitRes, destRes] = await Promise.all([
          API.get('/api/user/selected'),
          API.get('/api/user/visited-destinations'),
          API.get('/api/destinations')
        ]);
        setSelectedLocations(selRes.data.selectedLocations || []);
        setVisited(visitRes.data.visitedDestinations || []);
        setDestinations(destRes.data || []);
      } catch {
        setSelectedLocations([]);
        setVisited([]);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => setMounted(true));
    }
  }, [loading]);

  const indiaLocs = selectedLocations.filter(loc => !loc.type || loc.type !== 'country');
  const worldLocs = selectedLocations.filter(loc => loc.type === 'country');
  const visitedStates = indiaLocs.filter(loc =>
    stateAndUTData.states.some(s => s.toLowerCase() === (loc.name || '').toLowerCase())
  );
  const visitedUTs = indiaLocs.filter(loc =>
    stateAndUTData.unionTerritories.some(ut => ut.toLowerCase() === (loc.name || '').toLowerCase())
  );

  const totalDest = destinations.reduce((acc, d) => acc + d.destinations.length, 0);
  const destPercent = totalDest > 0 ? Math.round((visited.length / totalDest) * 100) : 0;
  const indiaPercent = Math.round(((visitedStates.length + visitedUTs.length) / 36) * 100);

  const topStates = [...new Set(visited.map(v => v.state))].map(state => ({
    state,
    count: visited.filter(v => v.state === state).length,
  })).sort((a, b) => b.count - a.count).slice(0, 5);

  const achievedMilestones = milestones.filter(m => visitedStates.length >= m.threshold);

  if (loading) return (
    <Layout>
      <div className="stats-page">
        <div className="page-header"><div><h1 className="page-title">Travel Statistics</h1></div></div>
        <div className="stats-overview">
          {[0,1,2,3].map(i => (
            <div key={i} className="so-card">
              <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="skeleton" style={{ width: '60%', height: 20 }} />
                <div className="skeleton" style={{ width: '40%', height: 12 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );

  const overviewCards = [
    { icon: <FaMapMarkedAlt />, value: visitedStates.length, label: 'States Visited', bg: 'var(--accent-50)', color: 'var(--accent-500)' },
    { icon: <FaRoute />, value: visitedUTs.length, label: 'UTs Visited', bg: 'var(--primary-50)', color: 'var(--primary-500)' },
    { icon: <FaGlobeAmericas />, value: worldLocs.length, label: 'Countries', bg: 'var(--amber-50)', color: 'var(--amber-500)' },
    { icon: <FaStar />, value: visited.length, label: 'Destinations', bg: 'var(--pink-50)', color: 'var(--pink-500)' },
  ];

  return (
    <Layout>
      <div className="stats-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Travel Statistics</h1>
            <p className="page-subtitle">Numbers that prove you are not just dreaming about travel</p>
          </div>
        </div>

        <div className="stats-overview">
          {overviewCards.map((card, i) => (
            <div key={i} className="so-card" style={{ '--i': i }}>
              <div className="so-icon" style={{ background: card.bg, color: card.color }}>{card.icon}</div>
              <div className="so-info">
                <span className="so-value">{card.value}</span>
                <span className="so-label">{card.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-charts">
          <div className="stats-chart-card">
            <h3>India Coverage</h3>
            <div className="stats-donut">
              <svg viewBox="0 0 36 36">
                <path className="donut-bg" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="donut-fill" style={{ stroke: 'var(--accent-500)' }} strokeDasharray={mounted ? `${indiaPercent}, 100` : '0, 100'} d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="donut-center">
                <span className="donut-value">{indiaPercent}%</span>
                <span className="donut-label">of India</span>
              </div>
            </div>
            <div className="stats-breakdown">
              <div className="sb-item"><span className="sb-dot" style={{ background: 'var(--accent-500)' }} />{visitedStates.length}/28 States</div>
              <div className="sb-item"><span className="sb-dot" style={{ background: 'var(--primary-500)' }} />{visitedUTs.length}/8 UTs</div>
            </div>
          </div>

          <div className="stats-chart-card">
            <h3>Destination Coverage</h3>
            <div className="stats-donut">
              <svg viewBox="0 0 36 36">
                <path className="donut-bg" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="donut-fill" style={{ stroke: 'var(--amber-500)' }} strokeDasharray={mounted ? `${destPercent}, 100` : '0, 100'} d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="donut-center">
                <span className="donut-value">{destPercent}%</span>
                <span className="donut-label">explored</span>
              </div>
            </div>
            <div className="stats-breakdown">
              <div className="sb-item"><span className="sb-dot" style={{ background: 'var(--amber-500)' }} />{visited.length}/{totalDest} destinations</div>
            </div>
          </div>

          <div className="stats-chart-card">
            <h3>Most Explored</h3>
            <div className="top-states-list">
              {topStates.length === 0 ? (
                <div className="empty-state" style={{ padding: '1.5rem 0' }}>
                  <p>No destinations visited yet</p>
                </div>
              ) : (
                topStates.map((ts, i) => (
                  <div key={ts.state} className="top-state-item" style={{ '--i': i }}>
                    <span className="top-state-rank">#{i + 1}</span>
                    <span className="top-state-name">{ts.state}</span>
                    <div className="top-state-bar-wrap">
                      <div className="top-state-bar" style={{ width: mounted ? `${(ts.count / (topStates[0]?.count || 1)) * 100}%` : '0%' }} />
                    </div>
                    <span className="top-state-count">{ts.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="stats-milestones">
          <h3>Milestones</h3>
          <div className="milestones-grid">
            {milestones.map((m, i) => {
              const achieved = achievedMilestones.includes(m);
              return (
                <div key={i} className={`milestone-card ${achieved ? 'achieved' : ''}`} style={{ '--i': i }}>
                  <div className="milestone-icon">{m.icon}</div>
                  <div className="milestone-info">
                    <span className="milestone-label">{m.label}</span>
                    <span className="milestone-desc">{m.desc}</span>
                  </div>
                  {achieved && <span className="milestone-check">&#10003;</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
