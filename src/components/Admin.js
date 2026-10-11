import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import API from '../api/api';
import {
  FaCrown, FaUsers, FaUserPlus, FaGlobeAmericas, FaCalendarAlt, FaSearch, FaTimes,
  FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock, FaBookOpen, FaUserFriends,
  FaSuitcase, FaFlag, FaShieldAlt, FaCheckCircle, FaExclamationTriangle,
  FaImages, FaDownload, FaChartLine, FaCamera, FaEye, FaEyeSlash,
} from 'react-icons/fa';
import allCountries from '../utils/countries';
import './Admin.css';

const ADMIN_EMAIL = 'global5665@gmail.com';

function flagFor(country) {
  const c = allCountries.find(x => x.value === country);
  return c?.flag || '🌍';
}
function fmtDate(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return '—'; }
}
function fmtDateTime(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); }
  catch { return '—'; }
}
function daysAgo(d) {
  if (!d) return null;
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
  if (diff === 0) return 'today';
  if (diff === 1) return 'yesterday';
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}

function Initials({ name, size = 34 }) {
  const initials = (name || '?').split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2);
  return <div className="ad-avatar" style={{ width: size, height: size, fontSize: size * 0.38 }}>{initials}</div>;
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="ad-stat">
      <div className="ad-stat-icon" style={{ background: `${color}18`, color }}>{icon}</div>
      <div className="ad-stat-body">
        <div className="ad-stat-value">{value?.toLocaleString?.() ?? value}</div>
        <div className="ad-stat-label">{label}</div>
        {sub && <div className="ad-stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

function TrendSparkline({ trend }) {
  const max = Math.max(1, ...trend.map(t => t.count));
  return (
    <div className="ad-spark">
      {trend.map((t, i) => {
        const h = (t.count / max) * 100;
        return (
          <div key={t.date} className="ad-spark-bar-wrap" title={`${t.date}: ${t.count}`}>
            <div className="ad-spark-bar" style={{ height: `${Math.max(2, h)}%` }} />
            {i % 7 === 0 && <span className="ad-spark-date">{t.date.slice(5)}</span>}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------- USER DETAIL MODAL ------------------------- */
function UserDetailModal({ userId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    setLoading(true);
    API.get(`/api/admin/users/${userId}`)
      .then(r => { setData(r.data.user); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="ad-modal-overlay" onClick={onClose}>
      <div className="ad-modal" onClick={e => e.stopPropagation()}>
        <div className="ad-modal-header">
          <div className="ad-modal-user">
            <Initials name={data?.name || '?'} size={48} />
            <div>
              <h2>{data?.name || 'Loading…'}</h2>
              <div className="ad-modal-sub">
                {data?.email}
                {data?.role === 'admin' && <span className="ad-admin-tag"><FaShieldAlt /> Admin</span>}
                {data?.emailVerified && <span className="ad-verified-tag"><FaCheckCircle /> Verified</span>}
              </div>
            </div>
          </div>
          <button className="ad-close" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="ad-readonly-banner">
          <FaExclamationTriangle /> Read-only view — admins can inspect but not edit user data.
        </div>

        <div className="ad-modal-tabs">
          {[
            { id: 'overview',  label: 'Overview' },
            { id: 'memories',  label: `Memories${data?.memories?.length ? ` (${data.memories.length})` : ''}` },
            { id: 'friends',   label: `Friends${data?.friends?.length ? ` (${data.friends.length})` : ''}` },
            { id: 'trips',     label: `Trips${data?.tripPlans?.length ? ` (${data.tripPlans.length})` : ''}` },
            { id: 'travel',    label: 'Travel' },
          ].map(t => (
            <button key={t.id} className={`ad-modal-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="ad-modal-body">
          {loading && <div className="ad-loading">Loading user details…</div>}
          {!loading && data && (
            <>
              {tab === 'overview' && (
                <div className="ad-kv-grid">
                  <KV icon={<FaEnvelope />}      label="Email"       value={data.email} />
                  <KV icon={<FaPhone />}          label="Mobile"      value={data.mobile ? `${data.phoneCode || ''} ${data.mobile}` : '—'} />
                  <KV icon={<FaMapMarkerAlt />}   label="Country"     value={`${flagFor(data.country)} ${data.country || '—'}`} />
                  <KV icon={<FaCalendarAlt />}    label="Joined"      value={`${fmtDate(data.createdAt)} · ${daysAgo(data.createdAt)}`} />
                  <KV icon={<FaClock />}          label="Last login"  value={data.lastLogin ? `${fmtDateTime(data.lastLogin)} · ${daysAgo(data.lastLogin)}` : 'Never'} />
                  <KV icon={<FaShieldAlt />}      label="Role"        value={data.role === 'admin' ? '👑 Admin' : 'User'} />
                  <KV icon={<FaCheckCircle />}    label="Verified"    value={data.emailVerified ? 'Yes' : 'No'} />
                  <KV icon={<FaCheckCircle />}    label="Login count" value={data.loginCount || 0} />
                  <KV icon={<FaUsers />}          label="Gender"      value={data.gender || '—'} />
                  <KV icon={<FaCalendarAlt />}    label="Date of birth" value={data.dateOfBirth ? fmtDate(data.dateOfBirth) : '—'} />
                  {data.bio && <KV icon={<FaBookOpen />} label="Bio" value={data.bio} wide />}
                </div>
              )}
              {tab === 'memories' && (
                <div className="ad-list">
                  {(data.memories || []).length === 0 ? <div className="ad-empty">No memories yet</div> :
                    data.memories.map((m, i) => (
                      <div key={i} className="ad-list-row">
                        <div className="ad-list-thumb">
                          {m.photos?.[0] ? <img src={m.photos[0]} alt="" /> : <span>📝</span>}
                        </div>
                        <div className="ad-list-info">
                          <div className="ad-list-title">
                            {m.title}
                            {m.isDemo && <span className="ad-tag ad-tag-demo">Demo</span>}
                            <span className={`ad-tag ad-tag-vis-${m.visibility}`}>{m.visibility}</span>
                          </div>
                          <div className="ad-list-sub">
                            {flagFor(m.country)} {m.country}{m.region ? ` · ${m.region}` : ''} · {fmtDate(m.dateVisited || m.createdAt)} · {m.photos?.length || 0} photo{m.photos?.length === 1 ? '' : 's'}
                          </div>
                          {m.story && <div className="ad-list-body">{m.story.slice(0, 150)}{m.story.length > 150 ? '…' : ''}</div>}
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
              {tab === 'friends' && (
                <div className="ad-list">
                  {(data.friends || []).length === 0 ? <div className="ad-empty">No friends yet</div> :
                    data.friends.map(f => (
                      <div key={f._id} className="ad-list-row">
                        <Initials name={f.name} size={38} />
                        <div className="ad-list-info">
                          <div className="ad-list-title">{f.name}</div>
                          <div className="ad-list-sub">{f.email} · {flagFor(f.country)} {f.country}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
              {tab === 'trips' && (
                <div className="ad-list">
                  {(data.tripPlans || []).length === 0 ? <div className="ad-empty">No trips planned</div> :
                    data.tripPlans.map((t, i) => (
                      <div key={i} className="ad-list-row">
                        <div className="ad-list-ico">{flagFor(t.country)}</div>
                        <div className="ad-list-info">
                          <div className="ad-list-title">
                            {t.title}
                            <span className={`ad-tag ad-tag-status-${t.status || 'planning'}`}>{t.status || 'planning'}</span>
                          </div>
                          <div className="ad-list-sub">
                            {t.destination || t.country || '—'}
                            {t.startDate && ` · ${fmtDate(t.startDate)}`}
                            {t.endDate && ` → ${fmtDate(t.endDate)}`}
                            {t.travelers && ` · ${t.travelers} traveler${t.travelers > 1 ? 's' : ''}`}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
              {tab === 'travel' && (
                <div className="ad-kv-grid">
                  <KV icon={<FaFlag />}          label="Regions stamped"  value={(data.selectedLocations || []).filter(l => !l.type || l.type !== 'country').length} />
                  <KV icon={<FaGlobeAmericas />} label="Countries stamped" value={(data.selectedLocations || []).filter(l => l.type === 'country').length} />
                  <KV icon={<FaMapMarkerAlt />}  label="Destinations"     value={(data.visitedDestinations || []).length} />
                  <KV icon={<FaSuitcase />}      label="Custom places"    value={(data.userDestinations || []).length} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function KV({ icon, label, value, wide }) {
  return (
    <div className={`ad-kv ${wide ? 'wide' : ''}`}>
      <div className="ad-kv-label">{icon} {label}</div>
      <div className="ad-kv-value">{value}</div>
    </div>
  );
}

/* --------------------------- PHOTOS GALLERY --------------------------- */
/* Flattens every photo uploaded by every user into a paginated grid.
   Each tile shows the thumbnail + who/when/where, with a quick
   "Download" action that triggers a client-side save of the base64
   data URL (no server round-trip; the payload is already in hand). */

function downloadDataUrl(dataUrl, filename) {
  // Trigger a browser download for a data: URL by creating a
  // temporary anchor. Works for base64 image blobs returned by the
  // /api/admin/photos endpoint — no server stream needed.
  try {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename || 'photo.jpg';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (e) {
    window.open(dataUrl, '_blank');
  }
}

// Build a safe filename like "ada-lovelace__tokyo-skyline__2026-04-12.jpg"
// so bulk-downloaded files are self-describing on disk.
function makeFilename(photo) {
  const slug = (s) => (s || '').toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'untitled';
  const date = photo.uploadedAt ? new Date(photo.uploadedAt).toISOString().slice(0, 10) : 'nodate';
  const mimeMatch = /^data:image\/(\w+)/.exec(photo.photo || '');
  const ext = (mimeMatch && mimeMatch[1]) || 'jpg';
  return `${slug(photo.userName)}__${slug(photo.memoryTitle)}__${date}__${photo.photoIndex}.${ext}`;
}

function PhotoTile({ photo, onOpen }) {
  const [downloading, setDownloading] = useState(false);
  const triggerDownload = (e) => {
    e.stopPropagation();
    setDownloading(true);
    downloadDataUrl(photo.photo, makeFilename(photo));
    setTimeout(() => setDownloading(false), 600);
  };
  return (
    <div className="ad-photo-tile" onClick={() => onOpen(photo)}>
      <div className="ad-photo-img-wrap">
        <img src={photo.photo} alt={photo.memoryTitle || 'Memory photo'} loading="lazy" />
        <button
          className="ad-photo-dl"
          onClick={triggerDownload}
          disabled={downloading}
          title="Download original"
        >
          <FaDownload /> {downloading ? 'Saved' : 'Download'}
        </button>
        {photo.visibility && (
          <span className={`ad-photo-vis ad-vis-${photo.visibility}`}>
            {photo.visibility === 'public'  && <><FaEye /> Public</>}
            {photo.visibility === 'friends' && <><FaUserFriends /> Friends</>}
            {photo.visibility === 'private' && <><FaEyeSlash /> Private</>}
          </span>
        )}
      </div>
      <div className="ad-photo-meta">
        <div className="ad-photo-title">{photo.memoryTitle || 'Untitled memory'}</div>
        <div className="ad-photo-sub">
          <span className="ad-photo-user">
            <Initials name={photo.userName} size={20} /> {photo.userName}
          </span>
          <span className="ad-photo-dot">·</span>
          <span className="ad-photo-place">{flagFor(photo.memoryCountry)} {photo.memoryCountry || 'Unknown'}</span>
        </div>
        <div className="ad-photo-time">{daysAgo(photo.uploadedAt)}</div>
      </div>
    </div>
  );
}

function PhotoLightbox({ photo, onClose }) {
  if (!photo) return null;
  return (
    <div className="ad-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="ad-lightbox-close" onClick={onClose} aria-label="Close"><FaTimes /></button>
      <div className="ad-lightbox-inner" onClick={e => e.stopPropagation()}>
        <img src={photo.photo} alt={photo.memoryTitle || 'Memory'} />
        <div className="ad-lightbox-meta">
          <div className="ad-lightbox-head">
            <div>
              <div className="ad-lightbox-title">{photo.memoryTitle || 'Untitled'}</div>
              <div className="ad-lightbox-sub">
                <Initials name={photo.userName} size={22} /> {photo.userName}
                <span className="ad-photo-dot">·</span>
                {photo.userEmail}
              </div>
            </div>
            <button
              className="ad-lightbox-dl"
              onClick={() => downloadDataUrl(photo.photo, makeFilename(photo))}
            >
              <FaDownload /> Download
            </button>
          </div>
          <div className="ad-lightbox-kv">
            <span><FaMapMarkerAlt /> {photo.memoryCountry || '—'}{photo.memoryRegion ? ` · ${photo.memoryRegion}` : ''}</span>
            <span><FaCalendarAlt /> Visited {fmtDate(photo.dateVisited)}</span>
            <span><FaClock /> Uploaded {fmtDateTime(photo.uploadedAt)}</span>
            <span><FaCamera /> Photo #{photo.photoIndex + 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotosGallery({ isAdmin }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [lightbox, setLightbox] = useState(null);
  const limit = 24;

  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    setLoading(true);
    API.get('/api/admin/photos', { params: { page, limit, search, country, userId: userFilter } })
      .then(r => { if (!cancelled) { setData(r.data); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [isAdmin, page, search, country, userFilter]);

  const downloadVisiblePage = () => {
    if (!data?.photos?.length) return;
    // Trigger each download with a tiny stagger so the browser's
    // multi-file save flow doesn't drop any.
    data.photos.forEach((p, i) => {
      setTimeout(() => downloadDataUrl(p.photo, makeFilename(p)), i * 180);
    });
  };

  const totalPages = data?.totalPages || 1;

  return (
    <>
      <div className="ad-card">
        <div className="ad-card-hdr">
          <h3><FaImages /> Uploaded photos</h3>
          <div className="ad-filters">
            <div className="ad-search">
              <FaSearch />
              <input
                placeholder="Search by memory title, country, story…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            {country && (
              <span className="ad-filter-chip">
                {flagFor(country)} {country}
                <button onClick={() => { setCountry(''); setPage(1); }}><FaTimes /></button>
              </span>
            )}
            {userFilter && data?.photos?.[0] && (
              <span className="ad-filter-chip">
                {data.photos[0].userName}
                <button onClick={() => { setUserFilter(''); setPage(1); }}><FaTimes /></button>
              </span>
            )}
            <button
              className="ad-bulk-dl"
              onClick={downloadVisiblePage}
              disabled={!data?.photos?.length}
              title="Download every photo on this page"
            >
              <FaDownload /> Download page ({data?.photos?.length || 0})
            </button>
            <span className="ad-muted">{(data?.total || 0).toLocaleString()} photos</span>
          </div>
        </div>

        {loading ? (
          <div className="ad-loading-cell" style={{ padding: '3rem' }}>Loading photos…</div>
        ) : !data?.photos?.length ? (
          <div className="ad-loading-cell" style={{ padding: '3rem' }}>
            No photos match these filters.
          </div>
        ) : (
          <div className="ad-photos-grid">
            {data.photos.map(p => (
              <PhotoTile
                key={`${p.userId}-${p.memoryId}-${p.photoIndex}`}
                photo={p}
                onOpen={setLightbox}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="ad-pager">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
        )}
      </div>

      {/* Breakdown chips — click to filter */}
      {data && (data.byUser?.length > 0 || data.byCountry?.length > 0) && (
        <div className="ad-grid-2">
          {data.byUser?.length > 0 && (
            <div className="ad-card">
              <div className="ad-card-hdr">
                <h3>🧳 Top uploaders</h3>
                <span className="ad-muted">by photo count</span>
              </div>
              <div className="ad-countries">
                {data.byUser.slice(0, 10).map(u => {
                  const pct = data.total > 0 ? (u.count / data.total) * 100 : 0;
                  return (
                    <div key={u.name} className="ad-country-row">
                      <span className="ad-country-name">{u.name}</span>
                      <div className="ad-country-bar-wrap"><div className="ad-country-bar" style={{ width: `${pct}%` }} /></div>
                      <span className="ad-country-count">{u.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {data.byCountry?.length > 0 && (
            <div className="ad-card">
              <div className="ad-card-hdr">
                <h3>🌍 Photos by country</h3>
                <span className="ad-muted">{data.byCountry.length} places</span>
              </div>
              <div className="ad-countries">
                {data.byCountry.slice(0, 10).map(c => {
                  const pct = data.total > 0 ? (c.count / data.total) * 100 : 0;
                  return (
                    <div key={c.name} className="ad-country-row" onClick={() => { setCountry(c.name); setPage(1); }}>
                      <span className="ad-country-name">{flagFor(c.name)} {c.name}</span>
                      <div className="ad-country-bar-wrap"><div className="ad-country-bar" style={{ width: `${pct}%` }} /></div>
                      <span className="ad-country-count">{c.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {lightbox && <PhotoLightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}

/* --------------------------- MAIN ADMIN PAGE --------------------------- */

export default function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // null=checking, true=yes, false=no
  const [view, setView] = useState('overview'); // 'overview' | 'photos'
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const limit = 25;

  // Client-side admin check (UX only — real auth enforced by backend).
  // Strictly the single owner email — role is intentionally not accepted.
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      const yes = (u.email || '').toLowerCase() === ADMIN_EMAIL;
      setIsAdmin(yes);
      if (!yes) setTimeout(() => navigate('/dashboard'), 1500);
    } catch {
      setIsAdmin(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    API.get('/api/admin/stats').then(r => setStats(r.data)).catch(() => {});
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    setLoading(true);
    const params = { page, limit, search, country };
    API.get('/api/admin/users', { params }).then(r => {
      if (cancelled) return;
      setUsers(r.data.users || []);
      setTotal(r.data.total || 0);
      setLoading(false);
    }).catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [isAdmin, page, search, country]);

  // Non-admins get a generic 404-style page so the route itself gives
  // nothing away — no "Admin access required" copy, no shield icon,
  // no hint that an admin surface exists. Just a plain "not found".
  if (isAdmin === false) {
    return (
      <Layout>
        <div className="ad-page ad-denied">
          <div className="ad-denied-box">
            <h2>Page not found</h2>
            <p>This page doesn't exist. Redirecting you back…</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="ad-page">
        <div className="ad-hdr">
          <div>
            <h1 className="ad-title">Operations Console</h1>
            <p className="ad-subtitle">Platform health, user activity, and uploaded media.</p>
          </div>
          <div className="ad-tabs">
            <button
              className={`ad-tab ${view === 'overview' ? 'active' : ''}`}
              onClick={() => setView('overview')}
            >
              <FaChartLine /> Overview
            </button>
            <button
              className={`ad-tab ${view === 'photos' ? 'active' : ''}`}
              onClick={() => setView('photos')}
            >
              <FaImages /> Photos
            </button>
          </div>
        </div>

        {view === 'photos' ? (
          <PhotosGallery isAdmin={isAdmin} />
        ) : (
          <OverviewView
            stats={stats}
            users={users}
            total={total}
            loading={loading}
            search={search} setSearch={setSearch}
            country={country} setCountry={setCountry}
            page={page} setPage={setPage}
            totalPages={Math.max(1, Math.ceil(total / limit))}
            onSelectUser={setSelectedUser}
          />
        )}

        {selectedUser && <UserDetailModal userId={selectedUser} onClose={() => setSelectedUser(null)} />}
      </div>
    </Layout>
  );
}

/* --------------------------- OVERVIEW VIEW --------------------------- */
/* The original dashboard — stats + user table — now one of two tabs
   under the Operations Console. */

function OverviewView({ stats, users, total, loading, search, setSearch, country, setCountry, page, setPage, totalPages, onSelectUser }) {
  return (
    <>
        {/* STATS */}
        {stats && (
          <>
            <div className="ad-stats-grid">
              <StatCard icon={<FaUsers />}      label="Total users"    value={stats.total}        color="#6366f1" />
              <StatCard icon={<FaUserPlus />}   label="Today"          value={stats.today}        sub={`${stats.today === 1 ? 'person' : 'people'} joined today`} color="#10b981" />
              <StatCard icon={<FaCalendarAlt />} label="Last 7 days"    value={stats.last7}        sub="Weekly signups" color="#f59e0b" />
              <StatCard icon={<FaCalendarAlt />} label="Last 30 days"   value={stats.last30}       sub="Monthly signups" color="#ec4899" />
              <StatCard icon={<FaCheckCircle />} label="Active users"   value={stats.activeUsers}  sub="2+ logins" color="#06b6d4" />
              <StatCard icon={<FaBookOpen />}    label="Memories"       value={stats.totalMemories} color="#8b5cf6" />
              <StatCard icon={<FaUserFriends />} label="Friendships"    value={stats.totalFriendships} color="#f43f5e" />
              <StatCard icon={<FaShieldAlt />}   label="Admins"         value={stats.admins}       color="#fbbf24" />
            </div>

            {/* TREND + COUNTRIES */}
            <div className="ad-grid-2">
              <div className="ad-card">
                <div className="ad-card-hdr"><h3>📈 Last 30 days signups</h3></div>
                <TrendSparkline trend={stats.trend} />
              </div>
              <div className="ad-card">
                <div className="ad-card-hdr">
                  <h3>🌍 Users by country</h3>
                  <span className="ad-muted">{stats.byCountry.length} countries</span>
                </div>
                <div className="ad-countries">
                  {stats.byCountry.slice(0, 10).map(c => {
                    const pct = stats.total > 0 ? (c.count / stats.total) * 100 : 0;
                    return (
                      <div key={c.country} className="ad-country-row" onClick={() => { setCountry(c.country); setPage(1); }}>
                        <span className="ad-country-name">{flagFor(c.country)} {c.country}</span>
                        <div className="ad-country-bar-wrap"><div className="ad-country-bar" style={{ width: `${pct}%` }} /></div>
                        <span className="ad-country-count">{c.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* USERS TABLE */}
        <div className="ad-card">
          <div className="ad-card-hdr">
            <h3>👥 All users</h3>
            <div className="ad-filters">
              <div className="ad-search">
                <FaSearch />
                <input placeholder="Search by name or email…"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              {country && (
                <span className="ad-filter-chip">
                  {flagFor(country)} {country}
                  <button onClick={() => { setCountry(''); setPage(1); }}><FaTimes /></button>
                </span>
              )}
              <span className="ad-muted">{total.toLocaleString()} total</span>
            </div>
          </div>

          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Country</th>
                  <th>Joined</th>
                  <th>Last login</th>
                  <th className="ad-num">Memories</th>
                  <th className="ad-num">Friends</th>
                  <th className="ad-num">Trips</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="ad-loading-cell">Loading…</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={8} className="ad-loading-cell">No users found</td></tr>
                ) : users.map(u => (
                  <tr key={u._id} onClick={() => onSelectUser(u._id)} className="ad-user-row">
                    <td>
                      <div className="ad-user-cell">
                        <Initials name={u.name} />
                        <div>
                          <div className="ad-user-name">
                            {u.name}
                            {u.role === 'admin' && <FaCrown className="ad-user-admin" title="Admin" />}
                          </div>
                          <div className="ad-user-email">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{flagFor(u.country)} {u.country || '—'}</td>
                    <td><span title={fmtDateTime(u.createdAt)}>{daysAgo(u.createdAt)}</span></td>
                    <td><span title={u.lastLogin ? fmtDateTime(u.lastLogin) : 'never'}>{u.lastLogin ? daysAgo(u.lastLogin) : 'never'}</span></td>
                    <td className="ad-num">{u.counts?.memories || 0}</td>
                    <td className="ad-num">{u.counts?.friends || 0}</td>
                    <td className="ad-num">{u.counts?.trips || 0}</td>
                    <td>
                      {u.role === 'admin' ? <span className="ad-tag ad-tag-admin">Admin</span> : <span className="ad-tag ad-tag-user">User</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="ad-pager">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            </div>
          )}
        </div>
    </>
  );
}
