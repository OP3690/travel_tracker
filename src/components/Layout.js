import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMapMarkedAlt, FaGlobeAsia, FaCalendarAlt, FaBook, FaChartBar, FaCog, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './Layout.css';

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <h2>India Travel</h2>
          <nav>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              <FaMapMarkedAlt className="sidebar-icon" /> Map Overview
            </Link>
            <Link to="/worldmap" className={location.pathname === '/worldmap' ? 'active' : ''}>
              <FaGlobeAsia className="sidebar-icon" /> WorldMap View
            </Link>
            <Link to="/planner" className={location.pathname === '/planner' ? 'active' : ''}>
              <FaCalendarAlt className="sidebar-icon" /> Travel Planner
            </Link>
            <Link to="/journal" className={location.pathname === '/journal' ? 'active' : ''}>
              <FaBook className="sidebar-icon" /> Travel Journal
            </Link>
            <Link to="/statistics" className={location.pathname === '/statistics' ? 'active' : ''}>
              <FaChartBar className="sidebar-icon" /> Statistics
            </Link>
            <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
              <FaCog className="sidebar-icon" /> Settings
            </Link>
          </nav>
        </div>
        <div className="sidebar-footer">
          <div className="user-card">
            <FaUserCircle className="user-avatar" />
            <div className="user-details">
              <div className="user-name">Omprakash Utaha</div>
              <div className="user-status">Planning next trip</div>
            </div>
          </div>
          <Link to="/login" className="logout-btn">
            <FaSignOutAlt style={{ marginRight: 8, fontSize: 18 }} /> Logout
          </Link>
        </div>
      </aside>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
} 