import React, { useEffect, useState, useMemo } from 'react';
import Layout from './Layout';
import API from '../api/api';
import { FaGlobeAmericas, FaStar, FaTrophy, FaFlagCheckered, FaHome, FaPlane, FaCamera, FaLightbulb, FaFire, FaArrowRight, FaMedal } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getContinent, CONTINENT_LIST, CONTINENT_TOTALS } from '../utils/continents';
import { getCountryMapInfo } from './CountryMap';
import './Statistics.css';

// Inspiration seeds — curated "must-visit" spots around the globe, filtered by what the user hasn't marked yet
const INSPIRATIONS = [
  { country: 'Japan',        emoji: '🗼', why: 'Cherry blossoms, ramen, and 2000-year-old temples' },
  { country: 'Iceland',      emoji: '🌋', why: 'Northern lights and waterfalls you will never forget' },
  { country: 'Peru',         emoji: '🏔️', why: 'Walk Machu Picchu at sunrise' },
  { country: 'Morocco',      emoji: '🐪', why: 'Sahara desert nights and Marrakech markets' },
  { country: 'New Zealand',  emoji: '🏞️', why: 'Middle-earth landscapes are real' },
  { country: 'Italy',        emoji: '🍝', why: 'Every meal is a love letter' },
  { country: 'Thailand',     emoji: '🏝️', why: 'Beaches, street food, and elephant sanctuaries' },
  { country: 'Egypt',        emoji: '🔺', why: 'Pyramids older than recorded history' },
  { country: 'Norway',       emoji: '🚢', why: 'Fjords and midnight sun in summer' },
  { country: 'Kenya',        emoji: '🦁', why: 'The Great Migration is the greatest show on earth' },
  { country: 'Brazil',       emoji: '🎭', why: 'Rio, the Amazon, and Carnival' },
  { country: 'Vietnam',      emoji: '🛵', why: 'Halong Bay, pho, and scooter rides through Hanoi' },
  { country: 'Turkey',       emoji: '🎈', why: 'Cappadocia hot-air balloons at dawn' },
  { country: 'Australia',    emoji: '🦘', why: 'Great Barrier Reef and 10,000 km of coastline' },
  { country: 'Portugal',     emoji: '🌊', why: 'Lisbon\'s tiles, Porto\'s wine, Algarve\'s cliffs' },
];

const INT_MILESTONES = [
  { threshold: 1,  label: 'First Flight',       desc: 'Your first country stamped', icon: <FaFlagCheckered /> },
  { threshold: 5,  label: 'Frequent Flyer',    desc: '5 countries unlocked',       icon: <FaPlane /> },
  { threshold: 10, label: 'Continental',        desc: '10 countries explored',      icon: <FaGlobeAmericas /> },
  { threshold: 25, label: 'Globetrotter',       desc: '25 countries and counting',  icon: <FaMedal /> },
  { threshold: 50, label: 'Half Centurion',     desc: '50 countries conquered',     icon: <FaStar /> },
  { threshold: 100,label: 'Century Club',       desc: '100 countries — elite',      icon: <FaTrophy /> },
];

function Donut({ percent, color, label, sub, size = 160 }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);
  return (
    <div className="sp-donut" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36">
        <path className="sp-donut-bg" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" />
        <path className="sp-donut-fill" style={{ stroke: color }} strokeDasharray={mounted ? `${percent}, 100` : '0, 100'}
              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" />
      </svg>
      <div className="sp-donut-center">
        <span className="sp-donut-value">{percent}%</span>
        <span className="sp-donut-sub">{sub}</span>
      </div>
      {label && <div className="sp-donut-label">{label}</div>}
    </div>
  );
}

export default function Statistics() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [visitedDestinations, setVisitedDestinations] = useState([]);
  const [memories, setMemories] = useState([]);
  const [friendsCount, setFriendsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userCountry, setUserCountry] = useState('India');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored?.country) setUserCountry(stored.country);
    } catch {}
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      setLoading(true);
      const [selRes, visitRes, memRes, friendsRes] = await Promise.allSettled([
        API.get('/api/user/selected'),
        API.get('/api/user/visited-destinations'),
        API.get('/api/user/memories'),
        API.get('/api/friends'),
      ]);
      if (cancelled) return;
      setSelectedLocations(selRes.status === 'fulfilled' ? (selRes.value.data.selectedLocations || []) : []);
      setVisitedDestinations(visitRes.status === 'fulfilled' ? (visitRes.value.data.visitedDestinations || []) : []);
      setMemories(memRes.status === 'fulfilled' ? (memRes.value.data.memories || []) : []);
      setFriendsCount(friendsRes.status === 'fulfilled' ? (friendsRes.value.data.friends?.length || 0) : 0);
      setLoading(false);
    }
    fetchAll();
    return () => { cancelled = true; };
  }, []);

  // --- Derived stats ---
  const countryInfo = useMemo(() => getCountryMapInfo(userCountry), [userCountry]);
  const regionLabel = countryInfo.regionLabel || 'Regions';
  const totalRegions = countryInfo.totalRegions || 0;

  // Domestic: regions within user's country (states/provinces)
  const domesticRegions = selectedLocations.filter(loc => !loc.type || loc.type !== 'country');
  const domesticCount = domesticRegions.length;
  const domesticPercent = totalRegions > 0 ? Math.round((domesticCount / totalRegions) * 100) : 0;

  // International: 'country' type entries in selectedLocations
  const intlCountries = selectedLocations.filter(loc => loc.type === 'country');
  const intlCount = intlCountries.length;
  const intlPercent = Math.round((intlCount / 195) * 100);

  // Continent breakdown
  const continentCounts = useMemo(() => {
    const counts = Object.fromEntries(CONTINENT_LIST.map(c => [c, 0]));
    for (const c of intlCountries) {
      const cont = getContinent(c.name);
      if (counts[cont] !== undefined) counts[cont]++;
    }
    return counts;
  }, [intlCountries]);

  // Top explored regions (most destinations visited within)
  const topRegions = useMemo(() => {
    const byRegion = {};
    for (const v of visitedDestinations) {
      const key = v.state || v.region || 'Unknown';
      byRegion[key] = (byRegion[key] || 0) + 1;
    }
    return Object.entries(byRegion)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [visitedDestinations]);

  // Unvisited inspirations
  const visitedCountryNames = new Set(intlCountries.map(c => (c.name || '').toLowerCase()));
  const inspirations = INSPIRATIONS
    .filter(i => !visitedCountryNames.has(i.country.toLowerCase()))
    .slice(0, 4);

  // Achievements
  const achievedIntl = INT_MILESTONES.filter(m => intlCount >= m.threshold);
  const nextIntl = INT_MILESTONES.find(m => intlCount < m.threshold);

  // Fun insights
  const favContinent = Object.entries(continentCounts).sort((a, b) => b[1] - a[1])[0];
  const travelDnaContinent = favContinent && favContinent[1] > 0 ? favContinent[0] : null;
  const photoCount = memories.reduce((sum, m) => sum + (m.photos?.length || 0), 0);
  const wordsWritten = memories.reduce((sum, m) => sum + (m.story || '').trim().split(/\s+/).filter(Boolean).length, 0);

  if (loading) {
    return (
      <Layout>
        <div className="stats-page">
          <div className="sp-header"><h1 className="sp-title">Travel Statistics</h1></div>
          <div className="sp-hero-grid">
            {[0,1,2,3].map(i => <div key={i} className="sp-hero-card skeleton" style={{ height: 110 }} />)}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="stats-page">
        {/* Header */}
        <div className="sp-header">
          <div>
            <h1 className="sp-title">Travel Statistics</h1>
            <p className="sp-subtitle">Your journey in numbers — and a few nudges to make it bigger.</p>
          </div>
          <div className="sp-header-dna">
            {travelDnaContinent ? (
              <><span className="sp-dna-label">Travel DNA</span><span className="sp-dna-value">{travelDnaContinent} explorer</span></>
            ) : (
              <><span className="sp-dna-label">Travel DNA</span><span className="sp-dna-value">Awaiting first flight ✈️</span></>
            )}
          </div>
        </div>

        {/* Hero row */}
        <div className="sp-hero-grid">
          <div className="sp-hero-card">
            <div className="sp-hero-icon" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}><FaHome /></div>
            <div className="sp-hero-info">
              <span className="sp-hero-value">{domesticCount}</span>
              <span className="sp-hero-label">Domestic {regionLabel}</span>
              <span className="sp-hero-sub">in {userCountry}</span>
            </div>
          </div>
          <div className="sp-hero-card">
            <div className="sp-hero-icon" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}><FaGlobeAmericas /></div>
            <div className="sp-hero-info">
              <span className="sp-hero-value">{intlCount}</span>
              <span className="sp-hero-label">Countries</span>
              <span className="sp-hero-sub">of 195 worldwide</span>
            </div>
          </div>
          <div className="sp-hero-card">
            <div className="sp-hero-icon" style={{ background: 'rgba(244,114,182,0.12)', color: '#f472b6' }}><FaCamera /></div>
            <div className="sp-hero-info">
              <span className="sp-hero-value">{photoCount}</span>
              <span className="sp-hero-label">Photos</span>
              <span className="sp-hero-sub">across {memories.length} memories</span>
            </div>
          </div>
          <div className="sp-hero-card">
            <div className="sp-hero-icon" style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}><FaStar /></div>
            <div className="sp-hero-info">
              <span className="sp-hero-value">{visitedDestinations.length}</span>
              <span className="sp-hero-label">Destinations</span>
              <span className="sp-hero-sub">checked off</span>
            </div>
          </div>
        </div>

        {/* Domestic vs International split */}
        <div className="sp-split">
          <div className="sp-split-card sp-domestic">
            <div className="sp-split-header">
              <span className="sp-split-badge" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>
                <FaHome /> Domestic
              </span>
              <h3>{userCountry} Coverage</h3>
            </div>
            <Donut percent={domesticPercent} color="#34d399" sub={`of ${userCountry}`} />
            <div className="sp-split-stats">
              <div><strong>{domesticCount}</strong>/{totalRegions} {regionLabel} visited</div>
              <div className="sp-muted">{totalRegions - domesticCount} more to go</div>
            </div>
            <Link to="/dashboard" className="sp-split-cta">Open {userCountry} map <FaArrowRight /></Link>
          </div>

          <div className="sp-split-card sp-international">
            <div className="sp-split-header">
              <span className="sp-split-badge" style={{ background: 'rgba(99,102,241,0.18)', color: '#818cf8' }}>
                <FaPlane /> International
              </span>
              <h3>World Coverage</h3>
            </div>
            <Donut percent={intlPercent} color="#818cf8" sub="of the world" />
            <div className="sp-split-stats">
              <div><strong>{intlCount}</strong>/195 countries stamped</div>
              <div className="sp-muted">{nextIntl ? `${nextIntl.threshold - intlCount} away from "${nextIntl.label}"` : 'You\'re in rare air ⭐'}</div>
            </div>
            <Link to="/worldmap" className="sp-split-cta">Open World map <FaArrowRight /></Link>
          </div>
        </div>

        {/* Continent breakdown */}
        <div className="sp-card">
          <div className="sp-card-header">
            <h3><FaGlobeAmericas /> Continent Breakdown</h3>
            <span className="sp-muted">{intlCount} countries across {Object.values(continentCounts).filter(v => v > 0).length} continents</span>
          </div>
          <div className="sp-continents">
            {CONTINENT_LIST.map(cont => {
              const v = continentCounts[cont];
              const total = CONTINENT_TOTALS[cont];
              const pct = Math.round((v / total) * 100);
              const emoji = { Africa: '🌍', Asia: '🌏', Europe: '🏰', 'North America': '🗽', 'South America': '🌴', Oceania: '🏝️' }[cont];
              return (
                <div key={cont} className="sp-cont-row">
                  <div className="sp-cont-name">{emoji} <strong>{cont}</strong></div>
                  <div className="sp-cont-bar-wrap">
                    <div className="sp-cont-bar" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="sp-cont-count">{v}/{total}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights + Top Regions */}
        <div className="sp-grid-2">
          <div className="sp-card">
            <div className="sp-card-header">
              <h3><FaLightbulb /> Insights</h3>
            </div>
            <div className="sp-insights">
              {travelDnaContinent && (
                <div className="sp-insight">
                  <span className="sp-insight-emoji">🧭</span>
                  <div><strong>You're a {travelDnaContinent} explorer.</strong> Most of your stamps cluster there — try a new continent to expand your travel DNA.</div>
                </div>
              )}
              {intlCount > 0 && (
                <div className="sp-insight">
                  <span className="sp-insight-emoji">🌍</span>
                  <div>You've been to <strong>{intlPercent}%</strong> of the world. Average traveler covers ~7%. {intlPercent >= 7 ? 'You\'re ahead of the pack.' : 'Plenty of firsts ahead.'}</div>
                </div>
              )}
              {memories.length > 0 && (
                <div className="sp-insight">
                  <span className="sp-insight-emoji">✍️</span>
                  <div>You've written <strong>{wordsWritten.toLocaleString()}</strong> words across <strong>{memories.length}</strong> memories. That's about {Math.max(1, Math.round(wordsWritten / 250))} pages of travel memoir.</div>
                </div>
              )}
              {friendsCount > 0 && (
                <div className="sp-insight">
                  <span className="sp-insight-emoji">👥</span>
                  <div>You have <strong>{friendsCount}</strong> travel {friendsCount === 1 ? 'friend' : 'friends'} on StampYourMap. See their stamps for trip inspiration.</div>
                </div>
              )}
              {intlCount === 0 && domesticCount === 0 && (
                <div className="sp-insight">
                  <span className="sp-insight-emoji">🚀</span>
                  <div>Start by stamping a few places you've been. Your stats light up fast — every stamp tells a story.</div>
                </div>
              )}
            </div>
          </div>

          <div className="sp-card">
            <div className="sp-card-header">
              <h3><FaFire /> Most Explored</h3>
            </div>
            {topRegions.length === 0 ? (
              <div className="sp-empty">
                Check off destinations in <Link to="/discover">Discover</Link> to see your top regions.
              </div>
            ) : (
              <div className="sp-top-list">
                {topRegions.map((r, i) => (
                  <div key={r.name} className="sp-top-item">
                    <span className="sp-top-rank">#{i + 1}</span>
                    <span className="sp-top-name">{r.name}</span>
                    <div className="sp-top-bar-wrap">
                      <div className="sp-top-bar" style={{ width: `${(r.count / topRegions[0].count) * 100}%` }} />
                    </div>
                    <span className="sp-top-count">{r.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Travel inspirations */}
        {inspirations.length > 0 && (
          <div className="sp-card">
            <div className="sp-card-header">
              <h3>✨ Travel Inspirations</h3>
              <span className="sp-muted">Hand-picked places you haven't stamped yet</span>
            </div>
            <div className="sp-inspire-grid">
              {inspirations.map(ins => (
                <Link key={ins.country} to="/worldmap" className="sp-inspire-card">
                  <span className="sp-inspire-emoji">{ins.emoji}</span>
                  <div className="sp-inspire-info">
                    <span className="sp-inspire-name">{ins.country}</span>
                    <span className="sp-inspire-why">{ins.why}</span>
                  </div>
                  <FaArrowRight className="sp-inspire-arrow" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* International milestones */}
        <div className="sp-card">
          <div className="sp-card-header">
            <h3><FaTrophy /> Milestones</h3>
            <span className="sp-muted">{achievedIntl.length}/{INT_MILESTONES.length} unlocked</span>
          </div>
          <div className="sp-milestones">
            {INT_MILESTONES.map((m, i) => {
              const achieved = achievedIntl.includes(m);
              return (
                <div key={i} className={`sp-milestone ${achieved ? 'achieved' : ''}`}>
                  <div className="sp-ms-icon">{m.icon}</div>
                  <div className="sp-ms-info">
                    <span className="sp-ms-label">{m.label}</span>
                    <span className="sp-ms-desc">{m.desc}</span>
                  </div>
                  {achieved ? <span className="sp-ms-check">✓</span> : <span className="sp-ms-lock">🔒</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
