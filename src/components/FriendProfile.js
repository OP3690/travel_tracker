import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import API from '../api/api';
import { FaArrowLeft, FaMapMarkerAlt, FaCamera, FaGlobe, FaUserFriends, FaLock, FaCalendar } from 'react-icons/fa';
import allCountries from '../utils/countries';
import './Memories.css';
import './Friends.css';

function flagFor(country) {
  const c = allCountries.find(x => x.value === country);
  return c?.flag || '🌍';
}
function formatDate(d) {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return ''; }
}
const visIcon = { public: <FaGlobe />, friends: <FaUserFriends />, private: <FaLock /> };

export default function FriendProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewing, setViewing] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await API.get(`/api/friends/${userId}/profile`);
        setProfile(res.data);
      } catch (err) {
        setError(err?.response?.data?.error || 'Profile not found');
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  if (loading) return <Layout><div className="memories-page"><p>Loading…</p></div></Layout>;
  if (error) return <Layout><div className="memories-page"><p>{error}</p></div></Layout>;
  if (!profile) return null;

  const { user, memories, relation } = profile;

  return (
    <Layout>
      <div className="memories-page">
        <button
          onClick={() => navigate(-1)}
          className="fr-btn-secondary small"
          style={{ marginBottom: '1rem' }}
        >
          <FaArrowLeft /> Back
        </button>

        {/* Header card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(124,58,237,0.12))',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
        }}>
          <div className="fr-avatar" style={{ width: 72, height: 72, fontSize: 26 }}>
            {(user.name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {user.name}
            </h1>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <FaMapMarkerAlt style={{ marginRight: 4 }} /> {user.country || 'Explorer'}
              {' · '}<strong style={{ color: 'var(--text-primary)' }}>{memories.length}</strong> memories
              {' · '}<strong style={{ color: 'var(--text-primary)' }}>{user.friendsCount}</strong> friends
            </div>
            {user.bio && <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{user.bio}</p>}
          </div>
          <span className="mcm-chip" style={{ fontSize: '0.8rem' }}>
            {relation === 'friend' ? '🤝 Friend' : relation === 'self' ? '👤 You' : '👁️ Public only'}
          </span>
        </div>

        {/* Memories */}
        {memories.length === 0 ? (
          <div className="mem-empty">
            <div className="mem-empty-icon">📷</div>
            <h3>No memories to show</h3>
            <p>{relation === 'friend' ? 'Your friend hasn\'t shared any memories yet.' : 'Only public memories are visible. Become friends to see more.'}</p>
          </div>
        ) : (
          <div className="mem-grid">
            {memories.map(mem => (
              <div key={mem._id} className="mem-card">
                <div className="mem-card-photo" onClick={() => { setViewing(mem); setPhotoIdx(0); }}>
                  {mem.photos?.length > 0 ? (
                    <>
                      <img src={mem.photos[0]} alt={mem.title} />
                      {mem.photos.length > 1 && (
                        <span className="mem-card-photo-count"><FaCamera /> {mem.photos.length}</span>
                      )}
                    </>
                  ) : (
                    <div className="mem-card-no-photo">📝</div>
                  )}
                </div>
                <div className="mem-card-body">
                  <div className="mem-card-meta">
                    {mem.country && <span className="mcm-chip">{flagFor(mem.country)} {mem.country}</span>}
                    {mem.region && <span className="mcm-chip-light">{mem.region}</span>}
                    <span className="mcm-chip-light" title={`Visibility: ${mem.visibility}`}>
                      {visIcon[mem.visibility] || null}
                    </span>
                  </div>
                  <h3 className="mem-card-title" onClick={() => { setViewing(mem); setPhotoIdx(0); }}>{mem.title}</h3>
                  {mem.dateVisited && <p className="mem-card-date"><FaCalendar /> {formatDate(mem.dateVisited)}</p>}
                  {mem.story && (
                    <p className="mem-card-story">{mem.story.slice(0, 140)}{mem.story.length > 140 ? '…' : ''}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Photo viewer reuse */}
        {viewing && (
          <div className="mem-viewer-overlay" onClick={() => setViewing(null)}>
            <div className="mem-viewer" onClick={e => e.stopPropagation()}>
              <button className="mem-viewer-close" onClick={() => setViewing(null)}>✕</button>
              <div className="mem-viewer-content">
                {viewing.photos?.length > 0 && (
                  <div className="mem-viewer-photo-wrap">
                    <img src={viewing.photos[photoIdx]} alt={viewing.title} />
                  </div>
                )}
                <div className="mem-viewer-info">
                  <div className="mem-viewer-meta">
                    {viewing.country && <span className="mvm-chip">{flagFor(viewing.country)} {viewing.country}</span>}
                    {viewing.region && <span className="mvm-chip"><FaMapMarkerAlt /> {viewing.region}</span>}
                    {viewing.dateVisited && <span className="mvm-chip"><FaCalendar /> {formatDate(viewing.dateVisited)}</span>}
                  </div>
                  <h2>{viewing.title}</h2>
                  {viewing.story && <p className="mem-viewer-story">{viewing.story}</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
