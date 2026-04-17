import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { FiUser, FiMail, FiPhone, FiShield, FiTrash2, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', mobile: '' });
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored) setUser({ name: stored.name || '', email: stored.email || '', mobile: stored.mobile || '' });
    } catch {}
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleClearData = () => {
    localStorage.removeItem('travelPlans');
    setToast('Local data cleared');
    setTimeout(() => setToast(''), 2500);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'appearance', label: 'Appearance', icon: <FiSun /> },
    { id: 'security', label: 'Security', icon: <FiShield /> },
    { id: 'data', label: 'Data', icon: <FiTrash2 /> },
  ];

  return (
    <Layout>
      <div className="settings-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Your account, your rules</p>
          </div>
        </div>

        <div className="settings-layout">
          <div className="settings-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="settings-content">
            {activeTab === 'profile' && (
              <div className="settings-card">
                <h2>Profile Information</h2>
                <p className="settings-card-desc">Your personal details</p>
                <div className="settings-form">
                  <div className="sf-group">
                    <label><FiUser /> Full Name</label>
                    <input value={user.name} readOnly />
                  </div>
                  <div className="sf-group">
                    <label><FiMail /> Email</label>
                    <input value={user.email} readOnly />
                  </div>
                  <div className="sf-group">
                    <label><FiPhone /> Mobile</label>
                    <input value={user.mobile} readOnly />
                  </div>
                </div>
                <div className="settings-note">
                  Profile changes are managed through the backend. Contact support to update your details.
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="settings-card">
                <h2>Appearance</h2>
                <p className="settings-card-desc">Customize how TravelTracker looks</p>
                <div className="settings-section">
                  <div className="ss-item">
                    <div className="ss-info">
                      <h4>{darkMode ? <FiMoon /> : <FiSun />} Dark Mode</h4>
                      <p>Switch between light and dark theme</p>
                    </div>
                    <label className="theme-toggle">
                      <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                      <span className="theme-toggle-switch">
                        <span className="theme-toggle-knob" />
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-card">
                <h2>Security</h2>
                <p className="settings-card-desc">Manage your session and security</p>
                <div className="settings-section">
                  <div className="ss-item">
                    <div className="ss-info">
                      <h4>Active Session</h4>
                      <p>You are currently logged in. Logging out will clear your session token.</p>
                    </div>
                    <button className="ss-btn danger" onClick={handleLogout}>
                      <FiLogOut /> Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="settings-card">
                <h2>Data Management</h2>
                <p className="settings-card-desc">Manage your local application data</p>
                <div className="settings-section">
                  <div className="ss-item">
                    <div className="ss-info">
                      <h4>Clear Local Data</h4>
                      <p>This clears locally stored travel plans. Your server-side data is unaffected.</p>
                    </div>
                    <button className="ss-btn warning" onClick={handleClearData}>
                      <FiTrash2 /> Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {toast && <div className="settings-toast">{toast}</div>}
      </div>
    </Layout>
  );
}
