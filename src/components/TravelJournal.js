import React, { useState, useEffect, useRef } from 'react';
import API from '../api/api';
import Layout from './Layout';
import './TravelJournal.css';
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiCheckCircle, FiFlag } from 'react-icons/fi';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: token } : {};
}

const AddEditModal = ({ open, onClose, onSave, initialValue, title, stateName }) => {
  const [value, setValue] = useState(initialValue || '');
  useEffect(() => { setValue(initialValue || ''); }, [initialValue]);
  if (!open) return null;
  return (
    <div className="tj-modal-backdrop" onClick={onClose}>
      <div className="tj-modal" onClick={e => e.stopPropagation()}>
        <h3 style={{textAlign:'center',marginBottom:8}}>{title}</h3>
        <div className="modal-state-name" style={{textAlign:'center',fontWeight:600,marginBottom:10,fontSize:'1.1em',color:'#4f8cff'}}>{stateName}</div>
        <input
          className="tj-modal-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          autoFocus
        />
        <div className="tj-modal-actions" style={{display:'flex',justifyContent:'center',gap:12,marginTop:10}}>
          <button onClick={onClose} className="tj-btn tj-btn-cancel">Cancel</button>
          <button onClick={() => { if (value.trim()) onSave(value.trim()); }} className="tj-btn tj-btn-save">Save</button>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = ({ open, onClose, onConfirm, stateName, destination }) => {
  if (!open) return null;
  return (
    <div className="tj-modal-backdrop" onClick={onClose}>
      <div className="tj-modal" onClick={e => e.stopPropagation()}>
        <h3 style={{textAlign:'center',marginBottom:8}}>Delete Destination</h3>
        <div className="modal-state-name" style={{textAlign:'center',fontWeight:600,marginBottom:10,fontSize:'1.1em',color:'#4f8cff'}}>{stateName}</div>
        <div className="modal-message" style={{textAlign:'center',marginBottom:16}}>
          Are you sure you want to delete <b>{destination}</b> from <b>{stateName}</b>?
        </div>
        <div className="tj-modal-actions" style={{display:'flex',justifyContent:'center',gap:12}}>
          <button onClick={onClose} className="tj-btn tj-btn-cancel">Cancel</button>
          <button onClick={onConfirm} className="tj-btn tj-btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
};

const TravelJournal = () => {
  const [destinations, setDestinations] = useState([]);
  const [visited, setVisited] = useState([]); // [{state, destination}]
  const [expanded, setExpanded] = useState({}); // { [stateId]: true/false }
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState({ open: false });
  const [confirm, setConfirm] = useState({ open: false });
  const [loading, setLoading] = useState(true);
  const [globalAddModal, setGlobalAddModal] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [newDestName, setNewDestName] = useState('');
  const [destPlaceholder, setDestPlaceholder] = useState('Destination name');
  const [toast, setToast] = useState('');
  const toastTimeout = useRef();
  const [alreadyVisited, setAlreadyVisited] = useState(false);
  const [userDestinations, setUserDestinations] = useState([]);

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
      } catch (err) {
        setDestinations([]);
        setVisited([]);
        setUserDestinations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const isVisited = (state, dest) => visited.some(v => v.state === state && v.destination === dest);

  const handleToggleVisited = async (state, dest) => {
    try {
      await API.post('/api/user/visited-destinations', { state, destination: dest }, { headers: getAuthHeader() });
      setVisited(prev =>
        isVisited(state, dest)
          ? prev.filter(v => !(v.state === state && v.destination === dest))
          : [...prev, { state, destination: dest }]
      );
    } catch (err) {
      alert('Failed to update visited status');
    }
  };

  // Merge global and user-specific destinations for display
  const mergedDestinations = React.useMemo(() => {
    // Map global by state for easy lookup
    const globalMap = new Map(destinations.map(d => [d.state, d]));
    // Group user destinations by state
    const userMap = {};
    userDestinations.forEach(({ state, destination }) => {
      if (!userMap[state]) userMap[state] = [];
      userMap[state].push(destination);
    });
    // For each global state, add user destinations if any
    const result = destinations.map(d => {
      const userDests = userMap[d.state] || [];
      return {
        ...d,
        destinations: [...d.destinations, ...userDests.filter(ud => !d.destinations.includes(ud))],
      };
    });
    // Add any user-only states (if user added a destination for a state not in global)
    Object.keys(userMap).forEach(state => {
      if (!globalMap.has(state)) {
        result.push({
          state,
          type: 'User',
          destinations: userMap[state],
          topDestinations: [],
          _id: 'user-' + state.replace(/\s/g, '-')
        });
      }
    });
    return result;
  }, [destinations, userDestinations]);

  // Filtering
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
    const visitedCount = visited.length;
    return total ? Math.round((visitedCount / total) * 100) : 0;
  };

  const getVisitedStatesCount = () => {
    // Count unique states/UTs with at least one visited destination
    const visitedStates = new Set(visited.map(v => v.state));
    return visitedStates.size;
  };
  const getTotalStatesCount = () => destinations.length;

  // Expand/collapse logic
  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  // Add/Edit/Delete destination
  const handleAddDestination = async (stateId, newDest, stateName) => {
    try {
      // Only add to user-specific destinations
      await API.post('/api/user/destination', { state: stateName, destination: newDest }, { headers: getAuthHeader() });
      setUserDestinations(prev => [...prev, { state: stateName, destination: newDest }]);
      setModal({ open: false });
    } catch {
      alert('Failed to add destination');
    }
  };
  const handleEditDestination = async (stateId, oldName, newName, stateName) => {
    try {
      await API.put(`/api/destinations/${stateId}/destination`, { oldName, newName }, { headers: getAuthHeader() });
      setDestinations(ds => ds.map(d =>
        d._id === stateId
          ? {
              ...d,
              destinations: d.destinations.map(n => n === oldName ? newName : n),
              topDestinations: d.topDestinations.map(n => n === oldName ? newName : n)
            }
          : d
      ));
      setModal({ open: false });
    } catch {
      alert('Failed to edit destination');
    }
  };
  const handleDeleteDestination = async (stateId, name, stateName) => {
    setConfirm({ open: true, stateId, name, stateName });
  };
  const confirmDelete = async () => {
    const { stateId, name, stateName } = confirm;
    // Check if this is a user-specific destination
    const isUserDest = userDestinations.some(
      d => d.state === stateName && d.destination === name
    );
    try {
      if (isUserDest) {
        // Delete from user-specific destinations
        await API.delete(
          `/api/user/destination?state=${encodeURIComponent(stateName)}&destination=${encodeURIComponent(name)}`,
          { headers: getAuthHeader() }
        );
        setUserDestinations(prev =>
          prev.filter(d => !(d.state === stateName && d.destination === name))
        );
      } else {
        // Delete from global destinations
        await API.delete(
          `/api/destinations/${stateId}/destination?name=${encodeURIComponent(name)}`,
          { headers: getAuthHeader() }
        );
        setDestinations(ds =>
          ds.map(d =>
            d._id === stateId
              ? {
                  ...d,
                  destinations: d.destinations.filter(n => n !== name),
                  topDestinations: d.topDestinations.filter(n => n !== name)
                }
              : d
          )
        );
      }
      setConfirm({ open: false });
      setToast('Destination deleted successfully!');
      clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToast(''), 2500);
    } catch {
      setToast('Failed to delete destination');
      clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToast(''), 2500);
    }
  };

  // Add/Edit/Delete destination
  const handleGlobalAdd = async () => {
    if (!selectedStateId || !newDestName.trim()) return;
    const stateObj = destinations.find(d => d._id === selectedStateId);
    const stateName = stateObj ? stateObj.state : '';
    try {
      // Only add to user-specific destinations
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
      setToast('Destination Added Successfully');
      clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToast(''), 2500);
    } catch {
      setToast('Failed to add destination');
      clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setToast(''), 2500);
    }
  };

  return (
    <Layout>
      <div className="travel-journal">
        <div className="journal-header">
          <h1>Travel Journal</h1>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${getProgress()}%` }} />
            </div>
            <div className="progress-details" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:4,fontSize:'1.01em',color:'#4f8cff',fontWeight:600}}>
              <span>{visited.length} / {destinations.reduce((acc, d) => acc + d.destinations.length, 0)} ({getProgress()}%)</span>
              <span style={{color:'#7a8ca3',fontWeight:500}}>{visited.length} destinations visited across {getVisitedStatesCount()} State/UT{getVisitedStatesCount()!==1?'s':''}</span>
            </div>
          </div>
        </div>
        {/* Cards grid */}
        {loading ? (
          <div style={{ textAlign: 'center', margin: '2rem', color: '#888' }}>Loading...</div>
        ) : (
          <div className="destinations-grid">
            {filteredDestinations.map((dest) => {
              const visitedTop = dest.topDestinations.filter(place => isVisited(dest.state, place)).length;
              const visitedAll = dest.destinations.filter(place => isVisited(dest.state, place)).length;
              const isOpen = expanded[dest._id];
              const allVisited = dest.destinations.length > 0 && visitedAll === dest.destinations.length;
              const partiallyVisited = visitedAll > 0 && !allVisited;
              const showFlag = visitedAll > 0;
              return (
                <div
                  key={dest._id}
                  className={`destination-card${isOpen ? ' expanded' : ''}${allVisited ? ' all-visited' : ''}${partiallyVisited ? ' partially-visited' : ''}`}
                  onClick={() => toggleExpand(dest._id)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  {showFlag && (
                    <span className="visited-flag-icon" title="Visited at least one destination">
                      <FiFlag />
                    </span>
                  )}
                  <div className="card-header" style={{flexDirection:'column',alignItems:'center',textAlign:'center',gap:4, position:'relative'}}>
                    <div className="state-title" style={{fontWeight:700,fontSize:'1.13em',color:'#1a2636',marginBottom:2}}>{dest.state}</div>
                    <div className="state-type" style={{fontSize:'0.93em',color:'#7a8ca3',marginBottom:6}}>{dest.type === 'UT' ? 'Union Territory' : 'State'}</div>
                    <div className="card-insights" style={{display:'flex',gap:18,justifyContent:'center',alignItems:'center',margin:'0.2em 0 0.1em 0'}}>
                      <span title="Top 3 visited" style={{display:'flex',alignItems:'center',gap:4,color:'#f7b731',fontWeight:600}}><FiStar /> {visitedTop} / {dest.topDestinations.length}</span>
                      <span title="All visited" style={{display:'flex',alignItems:'center',gap:4,color:'#2ecc71',fontWeight:600}}><FiCheckCircle /> {visitedAll} / {dest.destinations.length}</span>
                      <span title="Total destinations" style={{color:'#4f8cff',fontWeight:500}}>Total: {dest.destinations.length}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="destinations-list">
                      {dest.destinations.map((place) => (
                        <div
                          key={place}
                          className={`destination-item ${dest.topDestinations.includes(place) ? 'top-destination' : ''} ${isVisited(dest.state, place) ? 'visited' : ''}`}
                          style={{ background: isVisited(dest.state, place) ? '#e6ffe6' : '#fffbe6', display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.7em 1em',margin:'0.3em 0',borderRadius:8 }}
                          onClick={e => { e.stopPropagation(); handleToggleVisited(dest.state, place); }}
                        >
                          <span className="destination-name" style={{fontWeight:500}}>{place}</span>
                          <div style={{display:'flex',alignItems:'center',gap:10}}>
                            {dest.topDestinations.includes(place) && (
                              <FiStar className="top-badge" style={{color:'#f7b731'}} />
                            )}
                            <span className="visit-status" style={{color:isVisited(dest.state, place)?'#2ecc71':'#bbb',fontSize:'1.2em'}}>
                              {isVisited(dest.state, place) ? <FiCheckCircle /> : <span style={{fontSize:'1.1em'}}>○</span>}
                            </span>
                            <span className="tj-dest-actions" style={{display:'flex',gap:8}}>
                              <FiEdit2
                                className="tj-dest-edit"
                                title="Edit"
                                onClick={e => { e.stopPropagation(); setModal({ open: true, stateId: dest._id, type: 'edit', oldName: place, stateName: dest.state }); }}
                              />
                              <FiTrash2
                                className="tj-dest-delete"
                                title="Delete"
                                onClick={e => { e.stopPropagation(); handleDeleteDestination(dest._id, place, dest.state); }}
                              />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {/* Global Add Destination Floating Button */}
        <button className="floating-add-btn" title="Add Destination" onClick={() => setGlobalAddModal(true)}>
          <FiPlus />
        </button>
        {/* Global Add Modal */}
        {globalAddModal && (
          <div className="tj-modal-backdrop" onClick={() => setGlobalAddModal(false)}>
            <div className="tj-modal tj-modal-cool" onClick={e => e.stopPropagation()}>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
                <h3 style={{textAlign:'center',marginBottom:0,fontWeight:800,letterSpacing:'-1px'}}>Add Destination</h3>
                <div style={{color:'#7a8ca3',fontSize:'1.01em',marginBottom:8}}>Add a new destination to any State or Union Territory</div>
              </div>
              <select
                className="tj-modal-input tj-modal-select"
                value={selectedStateId}
                onChange={e => setSelectedStateId(e.target.value)}
                style={{marginBottom:10,marginTop:8}}
              >
                <option value="">Select State/UT</option>
                {destinations.map(d => (
                  <option key={d._id} value={d._id}>{d.state} ({d.type === 'UT' ? 'UT' : 'State'})</option>
                ))}
              </select>
              <div style={{height:1,background:'#e3eafc',width:'100%',margin:'8px 0'}} />
              <input
                className="tj-modal-input"
                placeholder={destPlaceholder}
                value={newDestName}
                onChange={e => setNewDestName(e.target.value)}
                onFocus={() => setDestPlaceholder('')}
                onBlur={() => !newDestName && setDestPlaceholder('Destination name')}
                autoFocus
                style={{marginBottom:8}}
                disabled={!selectedStateId}
              />
              <div className="tj-switch-container">
                <label className="tj-switch">
                  <input type="checkbox" id="alreadyVisited" checked={alreadyVisited} onChange={e => setAlreadyVisited(e.target.checked)} />
                  <span className="tj-slider"></span>
                </label>
                <label htmlFor="alreadyVisited" className="tj-switch-label">Already Visited?</label>
              </div>
              <div className="tj-modal-actions" style={{display:'flex',justifyContent:'center',gap:12,marginTop:10}}>
                <button onClick={() => setGlobalAddModal(false)} className="tj-btn tj-btn-cancel">Cancel</button>
                <button onClick={handleGlobalAdd} className="tj-btn tj-btn-save" disabled={!selectedStateId || !newDestName.trim()}>Add</button>
              </div>
            </div>
          </div>
        )}
        {/* Toast Message */}
        {toast && <div className="tj-toast">{toast}</div>}
        {/* Add/Edit Modal (for per-state edit) */}
        <AddEditModal
          open={modal.open}
          title={modal.type === 'add' ? 'Add Destination' : 'Edit Destination'}
          initialValue={modal.type === 'edit' ? modal.oldName : ''}
          stateName={modal.stateName}
          onClose={() => setModal({ open: false })}
          onSave={val => {
            if (modal.type === 'add') handleAddDestination(modal.stateId, val, modal.stateName);
            else if (modal.type === 'edit') handleEditDestination(modal.stateId, modal.oldName, val, modal.stateName);
          }}
        />
        {/* Confirm Delete Modal */}
        <ConfirmModal
          open={confirm.open}
          stateName={confirm.stateName}
          destination={confirm.name}
          onClose={() => setConfirm({ open: false })}
          onConfirm={confirmDelete}
        />
      </div>
    </Layout>
  );
};

export default TravelJournal; 