import React, { useState, useEffect, useRef } from 'react';
import API from '../api/api';
import Layout from './Layout';
import './TravelJournal.css';
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiCheckCircle, FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: token } : {};
}

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="tj-overlay" onClick={onClose}>
      <div className="tj-modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const TravelJournal = () => {
  const [destinations, setDestinations] = useState([]);
  const [visited, setVisited] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState({ open: false });
  const [confirm, setConfirm] = useState({ open: false });
  const [loading, setLoading] = useState(true);
  const [globalAddModal, setGlobalAddModal] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [newDestName, setNewDestName] = useState('');
  const [toast, setToast] = useState('');
  const toastTimeout = useRef();
  const [alreadyVisited, setAlreadyVisited] = useState(false);
  const [userDestinations, setUserDestinations] = useState([]);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const [dRes, vRes, uRes] = await Promise.all([
          API.get('/api/destinations', { headers: getAuthHeader() }),
          API.get('/api/user/visited-destinations', { headers: getAuthHeader() }),
          API.get('/api/user/destinations', { headers: getAuthHeader() })
        ]);
        setDestinations(dRes.data);
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

  const isVisited = (state, dest) => visited.some(v => v.state === state && v.destination === dest);

  const handleToggleVisited = async (state, dest) => {
    try {
      await API.post('/api/user/visited-destinations', { state, destination: dest }, { headers: getAuthHeader() });
      setVisited(prev =>
        isVisited(state, dest)
          ? prev.filter(v => !(v.state === state && v.destination === dest))
          : [...prev, { state, destination: dest }]
      );
    } catch {
      showToast('Failed to update');
    }
  };

  const mergedDestinations = React.useMemo(() => {
    const globalMap = new Map(destinations.map(d => [d.state, d]));
    const userMap = {};
    userDestinations.forEach(({ state, destination }) => {
      if (!userMap[state]) userMap[state] = [];
      userMap[state].push(destination);
    });
    const result = destinations.map(d => {
      const userDests = userMap[d.state] || [];
      return { ...d, destinations: [...d.destinations, ...userDests.filter(ud => !d.destinations.includes(ud))] };
    });
    Object.keys(userMap).forEach(state => {
      if (!globalMap.has(state)) {
        result.push({ state, type: 'User', destinations: userMap[state], topDestinations: [], _id: 'user-' + state.replace(/\s/g, '-') });
      }
    });
    return result;
  }, [destinations, userDestinations]);

  const filteredDestinations = mergedDestinations.filter(dest => {
    const matchesSearch = dest.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'all' ||
      (filter === 'visited' && dest.destinations.some(d => isVisited(dest.state, d))) ||
      (filter === 'unvisited' && !dest.destinations.some(d => isVisited(dest.state, d)));
    return matchesSearch && matchesFilter;
  });

  const getProgress = () => {
    const total = destinations.reduce((acc, d) => acc + d.destinations.length, 0);
    return total ? Math.round((visited.length / total) * 100) : 0;
  };

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const handleAddDestination = async (stateId, newDest, stateName) => {
    try {
      await API.post('/api/user/destination', { state: stateName, destination: newDest }, { headers: getAuthHeader() });
      setUserDestinations(prev => [...prev, { state: stateName, destination: newDest }]);
      setModal({ open: false });
      showToast('Destination added!');
    } catch {
      showToast('Failed to add');
    }
  };

  const handleEditDestination = async (stateId, oldName, newName, stateName) => {
    try {
      await API.put(`/api/destinations/${stateId}/destination`, { oldName, newName }, { headers: getAuthHeader() });
      setDestinations(ds => ds.map(d =>
        d._id === stateId ? { ...d, destinations: d.destinations.map(n => n === oldName ? newName : n), topDestinations: d.topDestinations.map(n => n === oldName ? newName : n) } : d
      ));
      setModal({ open: false });
      showToast('Destination updated!');
    } catch {
      showToast('Failed to edit');
    }
  };

  const handleDeleteDestination = async (stateId, name, stateName) => {
    setConfirm({ open: true, stateId, name, stateName });
  };

  const confirmDelete = async () => {
    const { stateId, name, stateName } = confirm;
    const isUserDest = userDestinations.some(d => d.state === stateName && d.destination === name);
    try {
      if (isUserDest) {
        await API.delete(`/api/user/destination?state=${encodeURIComponent(stateName)}&destination=${encodeURIComponent(name)}`, { headers: getAuthHeader() });
        setUserDestinations(prev => prev.filter(d => !(d.state === stateName && d.destination === name)));
      } else {
        await API.delete(`/api/destinations/${stateId}/destination?name=${encodeURIComponent(name)}`, { headers: getAuthHeader() });
        setDestinations(ds => ds.map(d => d._id === stateId ? { ...d, destinations: d.destinations.filter(n => n !== name), topDestinations: d.topDestinations.filter(n => n !== name) } : d));
      }
      setConfirm({ open: false });
      showToast('Destination deleted');
    } catch {
      showToast('Failed to delete');
    }
  };

  const handleGlobalAdd = async () => {
    if (!selectedStateId || !newDestName.trim()) return;
    const stateObj = destinations.find(d => d._id === selectedStateId);
    const stateName = stateObj ? stateObj.state : '';
    try {
      await API.post('/api/user/destination', { state: stateName, destination: newDestName.trim() }, { headers: getAuthHeader() });
      setUserDestinations(prev => [...prev, { state: stateName, destination: newDestName.trim() }]);
      if (alreadyVisited) {
        await API.post('/api/user/visited-destinations', { state: stateName, destination: newDestName.trim() }, { headers: getAuthHeader() });
        setVisited(prev => [...prev, { state: stateName, destination: newDestName.trim() }]);
      }
      setGlobalAddModal(false);
      setSelectedStateId('');
      setNewDestName('');
      setAlreadyVisited(false);
      showToast('Destination added!');
    } catch {
      showToast('Failed to add');
    }
  };

  const totalDest = destinations.reduce((acc, d) => acc + d.destinations.length, 0);
  const progress = getProgress();

  return (
    <Layout>
      <div className="journal-page">
        {/* Header */}
        <div className="page-header journal-hdr">
          <div>
            <h1 className="page-title">Travel Journal</h1>
            <p className="page-subtitle">Every destination tells a story — track yours here</p>
          </div>
          <div className="journal-progress-card">
            <div className="journal-progress-bar-wrap">
              <div className="journal-progress-bar">
                <div className="journal-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="journal-progress-pct">{progress}%</span>
            </div>
            <span className="journal-progress-label">{visited.length} of {totalDest} destinations visited</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="journal-toolbar">
          <div className="journal-search">
            <FiSearch className="journal-search-icon" />
            <input
              placeholder="Search states or destinations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="journal-search-clear" onClick={() => setSearchTerm('')}>
                <FiX />
              </button>
            )}
          </div>
          <div className="journal-filter">
            <FiFilter className="journal-filter-icon" />
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="visited">Visited</option>
              <option value="unvisited">Unvisited</option>
            </select>
          </div>
        </div>

        {/* Result Count */}
        {searchTerm && !loading && (
          <div className="journal-result-count">
            {filteredDestinations.length} result{filteredDestinations.length !== 1 ? 's' : ''} found
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="loading-spinner" />
        ) : (
          <div className="journal-grid">
            {filteredDestinations.map((dest) => {
              const visitedTop = dest.topDestinations.filter(p => isVisited(dest.state, p)).length;
              const visitedAll = dest.destinations.filter(p => isVisited(dest.state, p)).length;
              const isOpen = expanded[dest._id];
              const allDone = dest.destinations.length > 0 && visitedAll === dest.destinations.length;
              const partial = visitedAll > 0 && !allDone;

              return (
                <div
                  key={dest._id}
                  className={`journal-card ${isOpen ? 'open' : ''} ${allDone ? 'complete' : ''} ${partial ? 'partial' : ''}`}
                  style={{ '--i': filteredDestinations.indexOf(dest) }}
                >
                  <div className="journal-card-head" onClick={() => toggleExpand(dest._id)}>
                    <div className="journal-card-info">
                      <h3>{dest.state}</h3>
                      <span className="journal-card-type">{dest.type === 'UT' ? 'Union Territory' : 'State'}</span>
                    </div>
                    <div className="journal-card-stats">
                      <span className="jcs-item star" title="Top destinations visited">
                        <FiStar /> {visitedTop}/{dest.topDestinations.length}
                      </span>
                      <span className="jcs-item check" title="All destinations visited">
                        <FiCheckCircle /> {visitedAll}/{dest.destinations.length}
                      </span>
                    </div>
                    <span className="journal-card-toggle">
                      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </div>

                  <div className={`journal-card-collapse ${isOpen ? 'expanded' : ''}`}>
                    <div className="journal-card-body">
                      {dest.destinations.map((place) => {
                        const isTop = dest.topDestinations.includes(place);
                        const done = isVisited(dest.state, place);
                        return (
                          <div
                            key={place}
                            className={`journal-dest ${done ? 'done' : ''} ${isTop ? 'top' : ''}`}
                          >
                            <button
                              className={`journal-dest-check ${done ? 'checked' : ''}`}
                              onClick={() => handleToggleVisited(dest.state, place)}
                              title={done ? 'Mark unvisited' : 'Mark visited'}
                            >
                              <FiCheckCircle />
                            </button>
                            <span className="journal-dest-name">
                              {place}
                              {isTop && <FiStar className="journal-dest-star" />}
                            </span>
                            <div className="journal-dest-actions">
                              <button
                                className="jda-btn edit"
                                onClick={() => { setEditValue(place); setModal({ open: true, stateId: dest._id, type: 'edit', oldName: place, stateName: dest.state }); }}
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                className="jda-btn delete"
                                onClick={() => handleDeleteDestination(dest._id, place, dest.state)}
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FAB */}
        <button className="journal-fab" onClick={() => setGlobalAddModal(true)} title="Add Destination">
          <FiPlus />
        </button>

        {/* Global Add Modal */}
        <Modal open={globalAddModal} onClose={() => setGlobalAddModal(false)}>
          <h3 className="tj-modal-title">Add Destination</h3>
          <p className="tj-modal-desc">Add a new destination to any state or UT</p>
          <select
            className="tj-modal-select"
            value={selectedStateId}
            onChange={e => setSelectedStateId(e.target.value)}
          >
            <option value="">Select State / UT</option>
            {destinations.map(d => (
              <option key={d._id} value={d._id}>{d.state} ({d.type === 'UT' ? 'UT' : 'State'})</option>
            ))}
          </select>
          <input
            className="tj-modal-input"
            placeholder="Destination name"
            value={newDestName}
            onChange={e => setNewDestName(e.target.value)}
            disabled={!selectedStateId}
          />
          <label className="tj-modal-toggle">
            <input type="checkbox" checked={alreadyVisited} onChange={e => setAlreadyVisited(e.target.checked)} />
            <span className="toggle-switch"><span className="toggle-knob" /></span>
            Already visited
          </label>
          <div className="tj-modal-btns">
            <button className="tj-btn-cancel" onClick={() => setGlobalAddModal(false)}>Cancel</button>
            <button className="tj-btn-primary" onClick={handleGlobalAdd} disabled={!selectedStateId || !newDestName.trim()}>Add</button>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal open={modal.open} onClose={() => setModal({ open: false })}>
          <h3 className="tj-modal-title">{modal.type === 'add' ? 'Add' : 'Edit'} Destination</h3>
          <p className="tj-modal-desc">{modal.stateName}</p>
          <input
            className="tj-modal-input"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            autoFocus
          />
          <div className="tj-modal-btns">
            <button className="tj-btn-cancel" onClick={() => setModal({ open: false })}>Cancel</button>
            <button className="tj-btn-primary" onClick={() => {
              if (!editValue.trim()) return;
              if (modal.type === 'add') handleAddDestination(modal.stateId, editValue.trim(), modal.stateName);
              else handleEditDestination(modal.stateId, modal.oldName, editValue.trim(), modal.stateName);
            }}>Save</button>
          </div>
        </Modal>

        {/* Confirm Delete */}
        <Modal open={confirm.open} onClose={() => setConfirm({ open: false })}>
          <h3 className="tj-modal-title">Delete Destination</h3>
          <p className="tj-modal-desc">
            Remove <strong>{confirm.name}</strong> from <strong>{confirm.stateName}</strong>?
          </p>
          <div className="tj-modal-btns">
            <button className="tj-btn-cancel" onClick={() => setConfirm({ open: false })}>Cancel</button>
            <button className="tj-btn-danger" onClick={confirmDelete}>Delete</button>
          </div>
        </Modal>

        {/* Toast */}
        {toast && <div className="journal-toast">{toast}</div>}
      </div>
    </Layout>
  );
};

export default TravelJournal;
