import React, { useEffect, useState, useCallback } from 'react';
import Layout from './Layout';
import API from '../api/api';
import { FaUserFriends, FaUserPlus, FaEnvelope, FaCheck, FaTimes, FaTrash, FaPaperPlane, FaSearch, FaMapMarkerAlt, FaHeart, FaImages, FaInbox, FaHourglassHalf, FaPaperPlane as FaInvite } from 'react-icons/fa';
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

/** Read my own email/id from localStorage once. */
function useMyIdentity() {
  const [me] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      return { email: (u.email || '').toLowerCase(), id: u.id || u._id || '' };
    } catch { return { email: '', id: '' }; }
  });
  return me;
}

export default function Friends() {
  const navigate = useNavigate();
  const me = useMyIdentity();
  const [data, setData] = useState({ friends: [], incoming: [], outgoing: [], invitesSent: [] });
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const isSelfSearch = searchQ.trim().toLowerCase() === me.email && me.email.length > 0;
  // Map of friendId → count of new posts since the user's last visit.
  // Frozen at mount so the dots stay visible while the user reads the page
  // (we don't want them to vanish the instant mark-seen fires).
  const [newPostsByFriend, setNewPostsByFriend] = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/friends');
      setData(res.data);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // On mount: snapshot which friends have new posts, then mark the feed
  // seen so the nav badge clears. We keep the snapshot in state so the
  // per-friend dots stay visible during this session.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await API.get('/api/friends/pending-count');
        if (cancelled) return;
        setNewPostsByFriend(r.data?.perFriend || {});
      } catch {}
      try {
        await API.post('/api/friends/mark-seen');
        window.dispatchEvent(new Event('friend-request-handled'));
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

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

  // Tell the app shell to refetch the pending-count badge right now,
  // instead of waiting for its 60-second poll.
  const notifyShell = () => window.dispatchEvent(new Event('friend-request-handled'));

  const accept = async (userId) => {
    await API.post(`/api/friends/accept/${userId}`);
    notifyShell();
    await load();
  };
  const decline = async (userId) => {
    await API.post(`/api/friends/decline/${userId}`);
    notifyShell();
    await load();
  };
  const cancel = async (userId) => {
    await API.post(`/api/friends/cancel/${userId}`);
    notifyShell();
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
          <div className="fr-page-header-text">
            <h1 className="fr-title"><FaUserFriends className="fr-title-icon" /> Friends</h1>
            <p className="fr-subtitle">See your friends' maps, photos &amp; stories — share yours with them</p>
          </div>
          <button className="fr-btn-primary small" onClick={() => setShowInvite(true)}>
            <FaEnvelope /> Invite by Email
          </button>
        </div>

        {/* Stats */}
        <div className="fr-stats">
          <div className="fr-stat fr-stat--friends">
            <span className="fr-stat-icon"><FaUserFriends /></span>
            <span className="fr-stat-text">
              <span className="fr-stat-num">{data.friends.length}</span>
              <span className="fr-stat-label">Friends</span>
            </span>
          </div>
          <div className={`fr-stat fr-stat--requests ${data.incoming.length > 0 ? 'has-pending' : ''}`}>
            <span className="fr-stat-icon"><FaInbox /></span>
            <span className="fr-stat-text">
              <span className="fr-stat-num">{data.incoming.length}</span>
              <span className="fr-stat-label">Requests</span>
            </span>
          </div>
          <div className="fr-stat fr-stat--pending">
            <span className="fr-stat-icon"><FaHourglassHalf /></span>
            <span className="fr-stat-text">
              <span className="fr-stat-num">{data.outgoing.length}</span>
              <span className="fr-stat-label">Pending</span>
            </span>
          </div>
          <div className="fr-stat fr-stat--invites">
            <span className="fr-stat-icon"><FaInvite /></span>
            <span className="fr-stat-text">
              <span className="fr-stat-num">{data.invitesSent.length}</span>
              <span className="fr-stat-label">Invites</span>
            </span>
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
          {searchQ.length >= 3 && !searchLoading && isSelfSearch && (
            <div className="fr-self-hint">
              <span className="fr-self-hint-emoji">👋</span>
              <div>
                <strong>That's you!</strong>
                <span> Unfortunately you can't add yourself as a friend — but keep exploring and invite your actual travel buddies.</span>
              </div>
            </div>
          )}
          {searchQ.length >= 3 && !searchLoading && !isSelfSearch && searchResults.length === 0 && (
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
            <h2 className="fr-section-title">
              <FaInbox style={{ color: '#f43f5e' }} /> Friend Requests
              <span className="fr-section-count">{data.incoming.length}</span>
            </h2>
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
            <h2 className="fr-section-title">
              <FaHourglassHalf style={{ color: '#f59e0b' }} /> Sent Requests
              <span className="fr-section-count">{data.outgoing.length}</span>
            </h2>
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
            <FaHeart style={{ color: '#f43f5e' }} /> Your Friends
            <span className="fr-section-count">{data.friends.length}</span>
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
              {data.friends.map(f => {
                const newPosts = newPostsByFriend[String(f._id)] || 0;
                return (
                  <div
                    key={f._id}
                    className={`fr-card ${newPosts > 0 ? 'has-new' : ''}`}
                    onClick={() => navigate(`/u/${f._id}`)}
                  >
                    {newPosts > 0 && (
                      <span
                        className="fr-card-new-badge"
                        aria-label={`${newPosts} new posts`}
                      >
                        {newPosts > 9 ? '9+' : newPosts} new
                      </span>
                    )}
                    <Initials name={f.name} size={56} />
                    <div className="fr-card-name">
                      {f.name}
                      {newPosts > 0 && <span className="fr-card-new-dot" aria-hidden="true" />}
                    </div>
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
                );
              })}
            </div>
          )}
        </div>

        {showInvite && <InviteModal onClose={() => setShowInvite(false)} onSent={load} />}
      </div>
    </Layout>
  );
}
