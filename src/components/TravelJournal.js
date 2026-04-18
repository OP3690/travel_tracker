import React, { useState, useEffect, useRef } from 'react';
import API from '../api/api';
import Layout from './Layout';
import { getCountryMapInfo } from './CountryMap';
import countryToCode from '../utils/countryCodeMap';
import './TravelJournal.css';
import { FiPlus, FiTrash2, FiStar, FiCheckCircle, FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp, FiMapPin, FiGlobe } from 'react-icons/fi';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: token } : {};
}

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="tj-overlay" onClick={onClose}>
      <div className="tj-modal" onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
};

const TravelJournal = () => {
  const [destinations, setDestinations] = useState([]);
  const [visited, setVisited] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [globalAddModal, setGlobalAddModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [newDestName, setNewDestName] = useState('');
  const [toast, setToast] = useState('');
  const toastTimeout = useRef();
  const [alreadyVisited, setAlreadyVisited] = useState(false);
  const [userDestinations, setUserDestinations] = useState([]);
  const [confirm, setConfirm] = useState({ open: false });
  const [userCountry, setUserCountry] = useState('India');
  const [countryRegions, setCountryRegions] = useState([]);

  // Load user country and regions
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored?.country) setUserCountry(stored.country);
    } catch {}
  }, []);

  // Load country regions from map data
  useEffect(() => {
    const info = getCountryMapInfo(userCountry);
    if (info.hasMap && info.regionNames.length > 0) {
      setCountryRegions(info.regionNames);
    } else {
      // Try loading dynamic map
      const code = countryToCode[userCountry];
      if (code) {
        import(`../assets/maps/${code}.json`)
          .then(mod => {
            const data = mod.default || mod;
            if (data?.locations) {
              setCountryRegions(data.locations.map(l => l.name));
            }
          })
          .catch(() => setCountryRegions([]));
      }
    }
  }, [userCountry]);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const [dRes, vRes, uRes] = await Promise.all([
          API.get('/api/destinations', { headers: getAuthHeader() }),
          API.get('/api/user/visited-destinations', { headers: getAuthHeader() }),
          API.get('/api/user/destinations', { headers: getAuthHeader() })
        ]);
        setDestinations(dRes.data || []);
        setVisited(vRes.data.visitedDestinations || []);
        setUserDestinations(uRes.data.userDestinations || []);
      } catch {
        setDestinations([]);
        setVisited([]);
        setUserDestinations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(''), 2500);
  };

  const isVisited = (region, dest) => visited.some(v => v.state === region && v.destination === dest);

  const handleToggleVisited = async (region, dest) => {
    try {
      await API.post('/api/user/visited-destinations', { state: region, destination: dest }, { headers: getAuthHeader() });
      setVisited(prev =>
        isVisited(region, dest)
          ? prev.filter(v => !(v.state === region && v.destination === dest))
          : [...prev, { state: region, destination: dest }]
      );
    } catch {
      showToast('Failed to update');
    }
  };

  // Build merged region list: country regions + backend destinations + user destinations
  const mergedRegions = React.useMemo(() => {
    const regionMap = new Map();

    // Add all country regions first
    countryRegions.forEach(name => {
      regionMap.set(name, { state: name, destinations: [], topDestinations: [], _id: 'region-' + name.replace(/\s/g, '-') });
    });

    // Merge backend destinations (if matching country — mainly for India)
    destinations.forEach(d => {
      if (regionMap.has(d.state)) {
        const existing = regionMap.get(d.state);
        existing.destinations = [...new Set([...existing.destinations, ...d.destinations])];
        existing.topDestinations = d.topDestinations || [];
        existing._id = d._id;
      } else {
        regionMap.set(d.state, { ...d });
      }
    });

    // Add user destinations
    userDestinations.forEach(({ state, destination }) => {
      if (regionMap.has(state)) {
        const existing = regionMap.get(state);
        if (!existing.destinations.includes(destination)) {
          existing.destinations = [...existing.destinations, destination];
        }
      } else {
        regionMap.set(state, { state, destinations: [destination], topDestinations: [], _id: 'user-' + state.replace(/\s/g, '-') });
      }
    });

    return Array.from(regionMap.values());
  }, [countryRegions, destinations, userDestinations]);

  // Filtering
  const filteredRegions = mergedRegions.filter(r => {
    const matchesSearch = r.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'all' ||
      (filter === 'visited' && r.destinations.some(d => isVisited(r.state, d))) ||
      (filter === 'unvisited' && !r.destinations.some(d => isVisited(r.state, d))) ||
      (filter === 'has-dest' && r.destinations.length > 0);
    return matchesSearch && matchesFilter;
  });

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const handleAddDestination = async (regionName, destName) => {
    try {
      await API.post('/api/user/destination', { state: regionName, destination: destName }, { headers: getAuthHeader() });
      setUserDestinations(prev => [...prev, { state: regionName, destination: destName }]);
      if (alreadyVisited) {
        await API.post('/api/user/visited-destinations', { state: regionName, destination: destName }, { headers: getAuthHeader() });
        setVisited(prev => [...prev, { state: regionName, destination: destName }]);
      }
      showToast('Destination added!');
    } catch {
      showToast('Failed to add');
    }
  };

  const handleDeleteDestination = async (regionName, destName) => {
    setConfirm({ open: true, regionName, destName });
  };

  const confirmDelete = async () => {
    const { regionName, destName } = confirm;
    const isUserDest = userDestinations.some(d => d.state === regionName && d.destination === destName);
    try {
      if (isUserDest) {
        await API.delete(`/api/user/destination?state=${encodeURIComponent(regionName)}&destination=${encodeURIComponent(destName)}`, { headers: getAuthHeader() });
        setUserDestinations(prev => prev.filter(d => !(d.state === regionName && d.destination === destName)));
      }
      setConfirm({ open: false });
      showToast('Deleted');
    } catch {
      showToast('Failed');
    }
  };

  const totalDest = mergedRegions.reduce((acc, r) => acc + r.destinations.length, 0);
  const visitedCount = visited.length;
  const progress = totalDest > 0 ? Math.round((visitedCount / totalDest) * 100) : 0;
  const regionsWithDest = mergedRegions.filter(r => r.destinations.length > 0).length;

  const countryInfo = getCountryMapInfo(userCountry);
  const regionLabel = countryInfo.hasMap ? countryInfo.regionLabel : 'Regions';

  return (
    <Layout>
      <div className="journal-page">
        {/* Header */}
        <div className="page-header journal-hdr">
          <div>
            <h1 className="page-title">Travel Journal</h1>
            <p className="page-subtitle">
              <FiGlobe style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {userCountry} — {countryRegions.length} {regionLabel.toLowerCase()} to explore
            </p>
          </div>
          <div className="journal-progress-card">
            <div className="journal-progress-bar-wrap">
              <div className="journal-progress-bar">
                <div className="journal-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="journal-progress-pct">{progress}%</span>
            </div>
            <span className="journal-progress-label">
              {visitedCount} destination{visitedCount !== 1 ? 's' : ''} visited across {regionsWithDest} {regionLabel.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="journal-toolbar">
          <div className="journal-search">
            <FiSearch className="journal-search-icon" />
            <input placeholder={`Search ${regionLabel.toLowerCase()} or destinations...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            {searchTerm && <button className="journal-search-clear" onClick={() => setSearchTerm('')}><FiX /></button>}
          </div>
          <div className="journal-filter">
            <FiFilter className="journal-filter-icon" />
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">All {regionLabel}</option>
              <option value="has-dest">With Destinations</option>
              <option value="visited">Visited</option>
              <option value="unvisited">Not Visited</option>
            </select>
          </div>
        </div>

        {searchTerm && !loading && (
          <div className="journal-result-count">{filteredRegions.length} result{filteredRegions.length !== 1 ? 's' : ''}</div>
        )}

        {/* Grid */}
        {loading ? <div className="loading-spinner" /> : (
          <div className="journal-grid">
            {filteredRegions.map((region) => {
              const visitedDest = region.destinations.filter(d => isVisited(region.state, d)).length;
              const totalRegionDest = region.destinations.length;
              const isOpen = expanded[region._id];
              const allDone = totalRegionDest > 0 && visitedDest === totalRegionDest;
              const partial = visitedDest > 0 && !allDone;

              return (
                <div key={region._id} className={`journal-card ${isOpen ? 'open' : ''} ${allDone ? 'complete' : ''} ${partial ? 'partial' : ''}`} style={{ '--i': filteredRegions.indexOf(region) }}>
                  <div className="journal-card-head" onClick={() => toggleExpand(region._id)}>
                    <div className="journal-card-info">
                      <h3><FiMapPin className="journal-pin" /> {region.state}</h3>
                      {totalRegionDest === 0 && <span className="journal-card-empty">No destinations yet — add one!</span>}
                    </div>
                    <div className="journal-card-stats">
                      {totalRegionDest > 0 && (
                        <span className="jcs-item check"><FiCheckCircle /> {visitedDest}/{totalRegionDest}</span>
                      )}
                    </div>
                    <span className="journal-card-toggle">{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
                  </div>

                  <div className={`journal-card-collapse ${isOpen ? 'expanded' : ''}`}>
                    <div className="journal-card-body">
                      {region.destinations.map((place) => {
                        const isTop = (region.topDestinations || []).includes(place);
                        const done = isVisited(region.state, place);
                        return (
                          <div key={place} className={`journal-dest ${done ? 'done' : ''} ${isTop ? 'top' : ''}`}>
                            <button className={`journal-dest-check ${done ? 'checked' : ''}`} onClick={() => handleToggleVisited(region.state, place)}>
                              <FiCheckCircle />
                            </button>
                            <span className="journal-dest-name">
                              {place}
                              {isTop && <FiStar className="journal-dest-star" />}
                            </span>
                            <div className="journal-dest-actions">
                              <button className="jda-btn delete" onClick={() => handleDeleteDestination(region.state, place)}><FiTrash2 /></button>
                            </div>
                          </div>
                        );
                      })}
                      {/* Inline add */}
                      <button className="journal-inline-add" onClick={() => { setSelectedRegion(region.state); setGlobalAddModal(true); }}>
                        <FiPlus /> Add destination to {region.state}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FAB */}
        <button className="journal-fab" onClick={() => setGlobalAddModal(true)} title="Add Destination"><FiPlus /></button>

        {/* Add Modal */}
        <Modal open={globalAddModal} onClose={() => { setGlobalAddModal(false); setSelectedRegion(''); setNewDestName(''); setAlreadyVisited(false); }}>
          <h3 className="tj-modal-title">Add Destination</h3>
          <p className="tj-modal-desc">Add a place you've been to (or want to visit) in {userCountry}</p>
          <select className="tj-modal-select" value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
            <option value="">Select {regionLabel.replace('& ', '/ ')}</option>
            {countryRegions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <input className="tj-modal-input" placeholder="Destination name (e.g., Taj Mahal)" value={newDestName} onChange={e => setNewDestName(e.target.value)} disabled={!selectedRegion} />
          <label className="tj-modal-toggle">
            <input type="checkbox" checked={alreadyVisited} onChange={e => setAlreadyVisited(e.target.checked)} />
            <span className="toggle-switch"><span className="toggle-knob" /></span>
            Already visited
          </label>
          <div className="tj-modal-btns">
            <button className="tj-btn-cancel" onClick={() => { setGlobalAddModal(false); setSelectedRegion(''); setNewDestName(''); }}>Cancel</button>
            <button className="tj-btn-primary" disabled={!selectedRegion || !newDestName.trim()} onClick={() => { handleAddDestination(selectedRegion, newDestName.trim()); setGlobalAddModal(false); setSelectedRegion(''); setNewDestName(''); setAlreadyVisited(false); }}>Add</button>
          </div>
        </Modal>

        {/* Confirm Delete */}
        <Modal open={confirm.open} onClose={() => setConfirm({ open: false })}>
          <h3 className="tj-modal-title">Delete Destination</h3>
          <p className="tj-modal-desc">Remove <strong>{confirm.destName}</strong> from <strong>{confirm.regionName}</strong>?</p>
          <div className="tj-modal-btns">
            <button className="tj-btn-cancel" onClick={() => setConfirm({ open: false })}>Cancel</button>
            <button className="tj-btn-danger" onClick={confirmDelete}>Delete</button>
          </div>
        </Modal>

        {toast && <div className="journal-toast">{toast}</div>}
      </div>
    </Layout>
  );
};

export default TravelJournal;
