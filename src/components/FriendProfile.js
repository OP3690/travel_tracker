import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import API from '../api/api';
import {
  FaArrowLeft, FaMapMarkerAlt, FaCamera, FaGlobe, FaUserFriends, FaLock, FaCalendar,
  FaImages, FaBookOpen, FaGlobeAmericas, FaHeart,
} from 'react-icons/fa';
import allCountries from '../utils/countries';
import './Memories.css';
import './Friends.css';
import './FriendProfile.css';

function flagFor(country) {
  const c = allCountries.find(x => x.value === country);
  return c?.flag || '🌍';
}
function formatDate(d) {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return ''; }
}
function initialsOf(name) {
  return (name || '?').split(/\s+/).map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || '?';
}
const visIcon = { public: <FaGlobe />, friends: <FaUserFriends />, private: <FaLock /> };
const relationLabel = {
  self:   { label: 'You',         emoji: '👤', tone: 'self' },
  friend: { label: 'Friend',      emoji: '🤝', tone: 'friend' },
  none:   { label: 'Public only', emoji: '🌍', tone: 'public' },
};

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

  // Aggregate stats from the visible memories
  const stats = useMemo(() => {
    if (!profile) return { photos: 0, countries: 0, countriesList: [] };
    const countries = new Set();
    let photos = 0;
    for (const m of profile.memories || []) {
      if (m.country) countries.add(m.country);
      photos += (m.photos?.length || 0);
    }
    return { photos, countries: countries.size, countriesList: [...countries] };
  }, [profile]);

  if (loading) {
    return (
      <Layout>
        <div className="fp-page">
          <div className="fp-skeleton-hero" />
          <div className="fp-skeleton-grid">
            {[0, 1, 2].map(i => <div key={i} className="fp-skeleton-card" />)}
          </div>
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <div className="fp-page">
          <div className="fp-error-card">
            <div className="fp-error-icon">🙈</div>
            <h3>Profile not found</h3>
            <p>{error}</p>
            <button className="fr-btn-primary" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Go back
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  if (!profile) return null;

  const { user, memories, relation } = profile;
  const rel = relationLabel[relation] || relationLabel.none;

  return (
    <Layout>
      <div className="fp-page">

        {/* Back */}
        <button className="fp-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        {/* ===== HERO CARD ===== */}
        <section className="fp-hero">
          <div className="fp-hero-gradient" />
          <span className={`fp-relation-chip fp-relation-${rel.tone}`}>
            <span aria-hidden="true">{rel.emoji}</span> {rel.label}
          </span>

          <div className="fp-hero-inner">
            <div className="fp-avatar">{initialsOf(user.name)}</div>

            <div className="fp-hero-text">
              <h1 className="fp-name">{user.name}</h1>
              <div className="fp-meta">
                {user.country && (
                  <span className="fp-meta-pill">
                    <FaMapMarkerAlt /> {flagFor(user.country)} {user.country}
                  </span>
                )}
              </div>
              {user.bio && <p className="fp-bio">{user.bio}</p>}
            </div>
          </div>

          <div className="fp-stats">
            <div className="fp-stat">
              <span className="fp-stat-icon" style={{ color: '#818cf8', background: 'rgba(99,102,241,0.12)' }}>
                <FaBookOpen />
              </span>
              <div>
                <div className="fp-stat-num">{memories.length}</div>
                <div className="fp-stat-label">Memories</div>
              </div>
            </div>
            <div className="fp-stat">
              <span className="fp-stat-icon" style={{ color: '#34d399', background: 'rgba(52,211,153,0.14)' }}>
                <FaGlobeAmericas />
              </span>
              <div>
                <div className="fp-stat-num">{stats.countries}</div>
                <div className="fp-stat-label">Countries</div>
              </div>
            </div>
            <div className="fp-stat">
              <span className="fp-stat-icon" style={{ color: '#fbbf24', background: 'rgba(251,191,36,0.14)' }}>
                <FaImages />
              </span>
              <div>
                <div className="fp-stat-num">{stats.photos}</div>
                <div className="fp-stat-label">Photos</div>
              </div>
            </div>
            <div className="fp-stat">
              <span className="fp-stat-icon" style={{ color: '#f472b6', background: 'rgba(244,114,182,0.14)' }}>
                <FaHeart />
              </span>
              <div>
                <div className="fp-stat-num">{user.friendsCount ?? 0}</div>
                <div className="fp-stat-label">Friends</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MEMORIES ===== */}
        {memories.length === 0 ? (
          <div className="fp-empty">
            <div className="fp-empty-icon">📷</div>
            <h3>No memories to show yet</h3>
            <p>
              {relation === 'self'
                ? 'Head to your Memory Wall to capture your first trip.'
                : relation === 'friend'
                ? `${user.name.split(' ')[0]} hasn't shared any memories yet — hang tight!`
                : `Only public memories are visible. Become friends with ${user.name.split(' ')[0]} to see more.`}
            </p>
          </div>
        ) : (
          <section className="fp-section">
            <div className="fp-section-head">
              <h2 className="fp-section-title">
                <FaBookOpen /> {user.name.split(' ')[0]}'s Memory Wall
                <span className="fp-section-count">{memories.length}</span>
              </h2>
            </div>

            <div className="fp-grid">
              {memories.map(mem => (
                <article key={mem._id} className="fp-card" onClick={() => { setViewing(mem); setPhotoIdx(0); }}>
                  <div className="fp-card-photo">
                    {mem.photos?.length > 0 ? (
                      <>
                        <img src={mem.photos[0]} alt={mem.title} loading="lazy" />
                        {mem.photos.length > 1 && (
                          <span className="fp-card-photo-count"><FaCamera /> {mem.photos.length}</span>
                        )}
                      </>
                    ) : (
                      <div className="fp-card-no-photo"><FaBookOpen /></div>
                    )}
                    {mem.visibility && (
                      <span className={`fp-vis fp-vis-${mem.visibility}`} title={`Visibility: ${mem.visibility}`}>
                        {visIcon[mem.visibility]}
                      </span>
                    )}
                  </div>

                  <div className="fp-card-body">
                    <div className="fp-card-meta">
                      {mem.country && <span className="fp-chip">{flagFor(mem.country)} {mem.country}</span>}
                      {mem.region && <span className="fp-chip-light">{mem.region}</span>}
                    </div>

                    <h3 className="fp-card-title">{mem.title}</h3>

                    {mem.dateVisited && (
                      <div className="fp-card-date">
                        <FaCalendar /> {formatDate(mem.dateVisited)}
                      </div>
                    )}
                    {mem.story && (
                      <p className="fp-card-story">
                        {mem.story.slice(0, 160)}{mem.story.length > 160 ? '…' : ''}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ===== PHOTO VIEWER (reuses Memories.css) ===== */}
        {viewing && (
          <div className="mem-viewer-overlay" onClick={() => setViewing(null)}>
            <div className="mem-viewer" onClick={e => e.stopPropagation()}>
              <button className="mem-viewer-close" onClick={() => setViewing(null)}>✕</button>
              <div className="mem-viewer-content">
                {viewing.photos?.length > 0 && (
                  <div className="mem-viewer-photo-wrap">
                    <img src={viewing.photos[photoIdx]} alt={viewing.title} />
                    {viewing.photos.length > 1 && (
                      <div className="fp-viewer-thumbs">
                        {viewing.photos.map((p, i) => (
                          <button
                            key={i}
                            className={`fp-viewer-thumb ${i === photoIdx ? 'active' : ''}`}
                            onClick={() => setPhotoIdx(i)}
                            aria-label={`Photo ${i + 1}`}
                          >
                            <img src={p} alt="" />
                          </button>
                        ))}
                      </div>
                    )}
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
