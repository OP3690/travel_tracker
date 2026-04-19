import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaMapMarkedAlt, FaGlobeAsia, FaCalendarAlt, FaCompass, FaChartBar, FaCog,
  FaSignOutAlt, FaMountain, FaTimes, FaHeart, FaUserFriends, FaCrown,
  FaEllipsisH,
} from 'react-icons/fa';
import API from '../api/api';
import './Layout.css';

/** Render "9+" once the count goes over 9 — matches the Facebook/iOS style. */
function formatBadge(n) {
  if (!n || n <= 0) return null;
  return n > 9 ? '9+' : String(n);
}

// Full nav (shown in desktop sidebar + mobile More-drawer)
const navItems = [
  { path: '/dashboard',   icon: <FaMapMarkedAlt />, label: 'My Map' },
  { path: '/worldmap',    icon: <FaGlobeAsia />,    label: 'World Map' },
  { path: '/memories',    icon: <FaHeart />,        label: 'Memory Wall' },
  { path: '/friends',     icon: <FaUserFriends />,  label: 'Friends' },
  { path: '/discover',    icon: <FaCompass />,      label: 'Discover' },
  { path: '/planner',     icon: <FaCalendarAlt />,  label: 'Trip Planner' },
  { path: '/statistics',  icon: <FaChartBar />,     label: 'Statistics' },
  { path: '/settings',    icon: <FaCog />,          label: 'Settings' },
];

// Primary 4 tabs shown on the mobile bottom tab bar (+ "More" as the 5th)
const bottomTabs = [
  { path: '/dashboard',   icon: <FaMapMarkedAlt />, label: 'Map' },
  { path: '/worldmap',    icon: <FaGlobeAsia />,    label: 'World' },
  { path: '/memories',    icon: <FaHeart />,        label: 'Memories' },
  { path: '/friends',     icon: <FaUserFriends />,  label: 'Friends' },
];
const morePaths = new Set(['/discover', '/planner', '/statistics', '/settings', '/admin']);

const ADMIN_EMAIL = 'global5665@gmail.com';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Traveler' });
  const [friendRequestCount, setFriendRequestCount] = useState(0);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored?.name) setUser(stored);
    } catch {}
  }, []);

  // Poll pending friend-request count. We refetch on mount, every 60 s,
  // when the tab regains focus, and whenever Friends.js emits a custom
  // "friend-request-handled" event (after accept/decline/cancel) so the
  // badge updates instantly without a full poll cycle.
  const fetchFriendRequestCount = useCallback(() => {
    if (!localStorage.getItem('token')) return;
    API.get('/api/friends/pending-count')
      .then(r => setFriendRequestCount(r.data?.count || 0))
      .catch(() => { /* silent — don't spam the UI on transient errors */ });
  }, []);

  useEffect(() => {
    fetchFriendRequestCount();
    const interval = setInterval(fetchFriendRequestCount, 60000);
    const onFocus = () => fetchFriendRequestCount();
    const onHandled = () => fetchFriendRequestCount();
    window.addEventListener('focus', onFocus);
    window.addEventListener('friend-request-handled', onHandled);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('friend-request-handled', onHandled);
    };
  }, [fetchFriendRequestCount]);

  // Close drawers on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const isAdmin = (user.email || '').toLowerCase() === ADMIN_EMAIL;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const initials = (user.name || '?').split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2);

  // Current page label (for mobile top bar)
  const currentNav = [...navItems, { path: '/admin', label: 'Admin' }].find(n => n.path === location.pathname);
  const pageTitle = currentNav?.label || 'StampYourMap';

  // Is "More" considered the active tab?
  const moreActive = morePaths.has(location.pathname);

  return (
    <div className="app-layout">
      {/* ============ MOBILE TOP BAR ============ */}
      <header className="m-topbar" data-ga-section="topbar">
        <Link to="/dashboard" className="m-topbar-brand" aria-label="Home"
          data-ga-label="Topbar: brand home">
          <FaMountain />
          <span>StampYourMap</span>
        </Link>
        <div className="m-topbar-title">{pageTitle}</div>
        <button
          className="m-topbar-btn"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Menu"
          data-ga-label="Topbar: open menu"
        >
          <div className="m-topbar-avatar">{initials}</div>
        </button>
      </header>

      {/* ============ DESKTOP SIDEBAR ============ */}
      {mobileMenuOpen && <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />}

      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`} data-ga-section="sidebar">
        <div className="sidebar-inner">
          <div className="sidebar-logo">
            <FaMountain className="sidebar-logo-icon" />
            <span className="sidebar-logo-text">StampYourMap</span>
          </div>

          <nav className="sidebar-nav">
            {navItems.map(item => {
              const isFriends = item.path === '/friends';
              const countBadge = isFriends ? formatBadge(friendRequestCount) : null;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-ga-label={`Sidebar: ${item.label}`}
                  data-ga-category="nav"
                >
                  <span className="nav-icon">
                    {item.icon}
                    {countBadge && <span className="nav-icon-dot" aria-hidden="true" />}
                  </span>
                  <span className="nav-label">{item.label}</span>
                  {countBadge && (
                    <span className="nav-count-badge" aria-label={`${friendRequestCount} pending friend requests`}>{countBadge}</span>
                  )}
                  {!countBadge && item.badge && <span className="nav-badge">{item.badge}</span>}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                className={`nav-item nav-item-admin ${location.pathname === '/admin' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                data-ga-label="Sidebar: Admin"
                data-ga-category="nav"
              >
                <span className="nav-icon"><FaCrown /></span>
                <span className="nav-label">Admin</span>
                <span className="nav-admin-chip">ADMIN</span>
              </Link>
            )}
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <div className="sidebar-avatar">{initials}</div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{user.name}</div>
                <div className="sidebar-user-role">Explorer</div>
              </div>
            </div>
            <button className="sidebar-logout" onClick={handleLogout}
              data-ga-label="Sidebar: Log out" data-ga-event="logout">
              <FaSignOutAlt />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ============ MAIN CONTENT ============ */}
      <main className="main-content">
        {children}
      </main>

      {/* ============ MOBILE BOTTOM TAB BAR ============ */}
      <nav className="m-tabbar" aria-label="Primary" data-ga-section="tabbar">
        {bottomTabs.map(tab => {
          const active = location.pathname === tab.path;
          const isFriends = tab.path === '/friends';
          const countBadge = isFriends ? formatBadge(friendRequestCount) : null;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`m-tab ${active ? 'active' : ''}`}
              aria-current={active ? 'page' : undefined}
              data-ga-label={`Tabbar: ${tab.label}`}
              data-ga-category="nav"
            >
              <span className="m-tab-icon">
                {tab.icon}
                {countBadge && (
                  <span className="m-tab-count-badge" aria-label={`${friendRequestCount} pending friend requests`}>{countBadge}</span>
                )}
              </span>
              <span className="m-tab-label">{tab.label}</span>
            </Link>
          );
        })}
        <button
          className={`m-tab ${moreActive || moreOpen ? 'active' : ''}`}
          onClick={() => setMoreOpen(true)}
          aria-label="More"
          data-ga-label="Tabbar: More"
          data-ga-category="nav"
        >
          <span className="m-tab-icon"><FaEllipsisH /></span>
          <span className="m-tab-label">More</span>
        </button>
      </nav>

      {/* ============ MORE BOTTOM-SHEET DRAWER ============ */}
      {moreOpen && (
        <div className="m-sheet-overlay" onClick={() => setMoreOpen(false)} data-ga-section="more-sheet">
          <div className="m-sheet" onClick={e => e.stopPropagation()}>
            <div className="m-sheet-handle" />
            <div className="m-sheet-header">
              <div className="m-sheet-user">
                <div className="m-sheet-avatar">{initials}</div>
                <div>
                  <div className="m-sheet-name">{user.name}</div>
                  <div className="m-sheet-role">Explorer</div>
                </div>
              </div>
              <button className="m-sheet-close" onClick={() => setMoreOpen(false)} aria-label="Close"
                data-ga-label="More sheet: close">
                <FaTimes />
              </button>
            </div>
            <div className="m-sheet-grid">
              {[
                { path: '/discover',   icon: <FaCompass />,     label: 'Discover' },
                { path: '/planner',    icon: <FaCalendarAlt />, label: 'Trip Planner' },
                { path: '/statistics', icon: <FaChartBar />,    label: 'Statistics' },
                { path: '/settings',   icon: <FaCog />,         label: 'Settings' },
                ...(isAdmin ? [{ path: '/admin', icon: <FaCrown />, label: 'Admin', admin: true }] : []),
              ].map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`m-sheet-tile ${item.admin ? 'admin' : ''}`}
                  onClick={() => setMoreOpen(false)}
                  data-ga-label={`More sheet: ${item.label}`}
                  data-ga-category="nav"
                >
                  <span className="m-sheet-tile-icon">{item.icon}</span>
                  <span className="m-sheet-tile-label">{item.label}</span>
                </Link>
              ))}
            </div>
            <button className="m-sheet-logout" onClick={handleLogout}
              data-ga-label="More sheet: Log out" data-ga-event="logout">
              <FaSignOutAlt /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
