import React, { useEffect, useState, useCallback } from 'react';
import Layout from './Layout';
import API from '../api/api';
import { FaUserFriends, FaUserPlus, FaEnvelope, FaCheck, FaTimes, FaTrash, FaPaperPlane, FaSearch, FaMapMarkerAlt, FaHeart, FaImages } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Friends.css';

function Initials({ name, size = 44 }) {
  const initials = (name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return <div className="fr-avatar" style={{ width: size, height: size, fontSize: size * 0.38 }}>{initials}</div>;
}

function InviteModal({ onClose, onSent }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const send = async () => {
    setError(''); setSuccess('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email'); return;
    }
    setLoading(true);
    try {
      await API.post('/api/friends/invite', { email, message });
      setSuccess(`Invite sent to ${email}`);
      setEmail(''); setMessage('');
      onSent && onSent();
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to send invite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fr-modal-overlay" onClick={onClose}>
      <div className="fr-modal" onClick={e => e.stopPropagation()}>
        <div className="fr-modal-header">
          <h2><FaEnvelope /> Invite a friend</h2>
          <button className="fr-close" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="fr-modal-body">
          <p className="fr-modal-desc">
            Send your friend an invite. They'll get a beautifully designed email with a link to join StampYourMap for free.
          </p>
          <div className="fr-field">
            <label>Friend's email</label>
            <input type="email" placeholder="friend@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="fr-field">
            <label>Personal message <span className="fr-optional">(optional)</span></label>
            <textarea
              rows={3}
              maxLength={500}
              placeholder="Hey! I've been loving this travel app — you'd love it too."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          {error && <div className="fr-error">{error}</div>}
          {success && <div className="fr-success">{success}</div>}
        </div>
        <div className="fr-modal-footer">
          <button className="fr-btn-secondary" onClick={onClose}>Close</button>
          <button className="fr-btn-primary" onClick={send} disabled={loading}>
            <FaPaperPlane /> {loading ? 'Sending…' : 'Send Invite'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Friends() {
  const navigate = useNavigate();
  const [data, setData] = useState({ friends: [], incoming: [], outgoing: [], invitesSent: [] });
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/friends');
      setData(res.data);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // Debounced search
  useEffect(() => {
    if (searchQ.length < 3) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await API.get('/api/friends/search', { params: { q: searchQ } });
        setSearchResults(res.data.users || []);
      } catch {}
      setSearchLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQ]);

  const sendRequest = async (userId) => {
    try {
      await API.post('/api/friends/request', { userId });
      await load();
      setSearchResults(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to send request');
    }
  };

  const accept = async (userId) => {
    await API.post(`/api/friends/accept/${userId}`);
    await load();
  };
  const decline = async (userId) => {
    await API.post(`/api/friends/decline/${userId}`);
    await load();
  };
  const cancel = async (userId) => {
    await API.post(`/api/friends/cancel/${userId}`);
    await load();
  };
  const unfriend = async (userId) => {
    if (!window.confirm('Remove this friend?')) return;
    await API.delete(`/api/friends/${userId}`);
    await load();
  };

  return (
    <Layout>
      <div className="friends-page">
        <div className="fr-page-header">
          <div>
            <h1 className="fr-title"><FaUserFriends className="fr-title-icon" /> Friends</h1>
            <p className="fr-subtitle">See your friends' maps, photos, and stories — share yours with them</p>
          </div>
          <button className="fr-btn-primary" onClick={() => setShowInvite(true)}>
            <FaEnvelope /> Invite by Email
          </button>
        </div>

        {/* Stats */}
        <div className="fr-stats">
          <div className="fr-stat">
            <span className="fr-stat-num">{data.friends.length}</span>
            <span className="fr-stat-label">Friends</span>
          </div>
          <div className="fr-stat">
            <span className="fr-stat-num">{data.incoming.length}</span>
            <span className="fr-stat-label">Requests</span>
          </div>
          <div className="fr-stat">
            <span className="fr-stat-num">{data.outgoing.length}</span>
            <span className="fr-stat-label">Pending</span>
          </div>
          <div className="fr-stat">
            <span className="fr-stat-num">{data.invitesSent.length}</span>
            <span className="fr-stat-label">Invites</span>
          </div>
        </div>

        {/* Find friends by email */}
        <div className="fr-section">
          <h2 className="fr-section-title"><FaSearch /> Find friends on StampYourMap</h2>
          <div className="fr-search-box">
            <FaSearch className="fr-search-icon" />
            <input
              type="text"
              placeholder="Search by email (min 3 characters)"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
            />
          </div>
          {searchLoading && <div className="fr-hint">Searching…</div>}
          {searchQ.length >= 3 && !searchLoading && searchResults.length === 0 && (
            <div className="fr-hint">
              No users found for "{searchQ}".{' '}
              <button className="fr-link-btn" onClick={() => setShowInvite(true)}>Invite them instead →</button>
            </div>
          )}
          {searchResults.length > 0 && (
            <div className="fr-list">
              {searchResults.map(u => (
                <div key={u._id} className="fr-item">
                  <Initials name={u.name} />
                  <div className="fr-item-info">
                    <div className="fr-item-name">{u.name}</div>
                    <div className="fr-item-meta">{u.email} · {u.country}</div>
                  </div>
                  <button className="fr-btn-primary small" onClick={() => sendRequest(u._id)}>
                    <FaUserPlus /> Add Friend
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Incoming requests */}
        {data.incoming.length > 0 && (
          <div className="fr-section">
            <h2 className="fr-section-title">📬 Friend Requests ({data.incoming.length})</h2>
            <div className="fr-list">
              {data.incoming.map(req => req.user && (
                <div key={req.user._id} className="fr-item">
                  <Initials name={req.user.name} />
                  <div className="fr-item-info">
                    <div className="fr-item-name">{req.user.name}</div>
                    <div className="fr-item-meta"><FaMapMarkerAlt /> {req.user.country}</div>
                  </div>
                  <div className="fr-item-actions">
                    <button className="fr-btn-primary small" onClick={() => accept(req.user._id)}><FaCheck /> Accept</button>
                    <button className="fr-btn-secondary small" onClick={() => decline(req.user._id)}><FaTimes /> Decline</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outgoing requests */}
        {data.outgoing.length > 0 && (
          <div className="fr-section">
            <h2 className="fr-section-title">⏳ Sent Requests ({data.outgoing.length})</h2>
            <div className="fr-list">
              {data.outgoing.map(req => req.user && (
                <div key={req.user._id} className="fr-item">
                  <Initials name={req.user.name} />
                  <div className="fr-item-info">
                    <div className="fr-item-name">{req.user.name}</div>
                    <div className="fr-item-meta">{req.user.email}</div>
                  </div>
                  <button className="fr-btn-secondary small" onClick={() => cancel(req.user._id)}>Cancel</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friends */}
        <div className="fr-section">
          <h2 className="fr-section-title">
            <FaHeart style={{ color: '#f43f5e' }} /> Your Friends ({data.friends.length})
          </h2>
          {loading ? (
            <div className="fr-hint">Loading…</div>
          ) : data.friends.length === 0 ? (
            <div className="fr-empty">
              <div className="fr-empty-icon">👥</div>
              <h3>No friends yet</h3>
              <p>Search above by email, or send an invite to friends not yet on StampYourMap.</p>
              <button className="fr-btn-primary" onClick={() => setShowInvite(true)}>
                <FaEnvelope /> Invite a Friend
              </button>
            </div>
          ) : (
            <div className="fr-grid">
              {data.friends.map(f => (
                <div key={f._id} className="fr-card" onClick={() => navigate(`/u/${f._id}`)}>
                  <Initials name={f.name} size={56} />
                  <div className="fr-card-name">{f.name}</div>
                  <div className="fr-card-country"><FaMapMarkerAlt /> {f.country}</div>
                  <div className="fr-card-actions">
                    <button
                      className="fr-btn-secondary small"
                      onClick={e => { e.stopPropagation(); navigate(`/u/${f._id}`); }}
                    >
                      <FaImages /> View Wall
                    </button>
                    <button
                      className="fr-btn-icon"
                      onClick={e => { e.stopPropagation(); unfriend(f._id); }}
                      title="Unfriend"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showInvite && <InviteModal onClose={() => setShowInvite(false)} onSent={load} />}
      </div>
    </Layout>
  );
}
