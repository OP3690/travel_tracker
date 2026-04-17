import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkedAlt, FaGlobeAsia, FaCalendarAlt, FaBook, FaChartBar, FaCog, FaSignOutAlt, FaMountain, FaBars, FaTimes } from 'react-icons/fa';
import './Layout.css';

const navItems = [
  { path: '/dashboard', icon: <FaMapMarkedAlt />, label: 'India Map' },
  { path: '/worldmap', icon: <FaGlobeAsia />, label: 'World Map' },
  { path: '/journal', icon: <FaBook />, label: 'Journal' },
  { path: '/planner', icon: <FaCalendarAlt />, label: 'Planner' },
  { path: '/statistics', icon: <FaChartBar />, label: 'Statistics' },
  { path: '/settings', icon: <FaCog />, label: 'Settings' },
];

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
            <span className="sidebar-logo-text">MyTravelGlimpse</span>
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
