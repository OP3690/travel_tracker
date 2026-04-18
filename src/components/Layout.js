import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkedAlt, FaGlobeAsia, FaCalendarAlt, FaCompass, FaChartBar, FaCog, FaSignOutAlt, FaMountain, FaBars, FaTimes, FaHeart, FaUserFriends, FaCrown } from 'react-icons/fa';
import './Layout.css';

const navItems = [
  { path: '/dashboard', icon: <FaMapMarkedAlt />, label: 'My Map' },
  { path: '/worldmap', icon: <FaGlobeAsia />, label: 'World Map' },
  { path: '/memories', icon: <FaHeart />, label: 'Memory Wall' },
  { path: '/friends', icon: <FaUserFriends />, label: 'Friends' },
  { path: '/discover', icon: <FaCompass />, label: 'Discover' },
  { path: '/planner', icon: <FaCalendarAlt />, label: 'Trip Planner' },
  { path: '/statistics', icon: <FaChartBar />, label: 'Statistics' },
  { path: '/settings', icon: <FaCog />, label: 'Settings' },
];

const ADMIN_EMAIL = 'global5665@gmail.com';
const adminNavItem = { path: '/admin', icon: <FaCrown />, label: 'Admin', adminOnly: true };

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Traveler' });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored?.name) setUser(stored);
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      {/* Mobile toggle */}
      <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-inner">
          {/* Logo */}
          <div className="sidebar-logo">
            <FaMountain className="sidebar-logo-icon" />
            <span className="sidebar-logo-text">StampYourMap</span>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </Link>
            ))}
            {(user.email || '').toLowerCase() === ADMIN_EMAIL && (
              <Link
                key={adminNavItem.path}
                to={adminNavItem.path}
                className={`nav-item nav-item-admin ${location.pathname === adminNavItem.path ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="nav-icon">{adminNavItem.icon}</span>
                <span className="nav-label">{adminNavItem.label}</span>
                <span className="nav-admin-chip">ADMIN</span>
              </Link>
            )}
          </nav>

          {/* User & Logout */}
          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <div className="sidebar-avatar">{getInitials(user.name)}</div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{user.name}</div>
                <div className="sidebar-user-role">Explorer</div>
              </div>
            </div>
            <button className="sidebar-logout" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
