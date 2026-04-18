import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import API from '../api/api';
import {
  FaCrown, FaUsers, FaUserPlus, FaGlobeAmericas, FaCalendarAlt, FaSearch, FaTimes,
  FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock, FaBookOpen, FaUserFriends,
  FaSuitcase, FaFlag, FaShieldAlt, FaCheckCircle, FaExclamationTriangle
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

/* --------------------------- MAIN ADMIN PAGE --------------------------- */

export default function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // null=checking, true=yes, false=no
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

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (isAdmin === false) {
    return (
      <Layout>
        <div className="ad-page ad-denied">
          <div className="ad-denied-box">
            <FaShieldAlt />
            <h2>Admin access required</h2>
            <p>You don't have permission to view this page. Redirecting…</p>
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
            <h1 className="ad-title"><FaCrown /> Admin Dashboard</h1>
            <p className="ad-subtitle">User onboarding, activity, and platform health at a glance.</p>
          </div>
        </div>

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
                  <tr key={u._id} onClick={() => setSelectedUser(u._id)} className="ad-user-row">
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

        {selectedUser && <UserDetailModal userId={selectedUser} onClose={() => setSelectedUser(null)} />}
      </div>
    </Layout>
  );
}
