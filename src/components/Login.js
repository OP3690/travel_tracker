import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { FaMountain, FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import loginBg from '../assets/login-travel-map.jpg';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual" style={{ backgroundImage: `url(${loginBg})` }}>
        <div className="auth-visual-content">
          <div className="auth-visual-shapes">
            <div className="auth-shape auth-shape-1" />
            <div className="auth-shape auth-shape-2" />
          </div>
          <div className="auth-visual-text">
            <FaMountain className="auth-visual-icon" />
            <h2>Welcome Back</h2>
            <p>Your maps are waiting. Log in and keep exploring.</p>
            <ul className="auth-visual-pills" aria-hidden="true">
              <li>✓ Pick up where you left off</li>
              <li>✓ Memories synced</li>
              <li>✓ Plans waiting</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <Link to="/" className="auth-back-link">
            <FaArrowRight style={{ transform: 'rotate(180deg)' }} /> Back to home
          </Link>
          <h1 className="auth-title">Log In</h1>
          <p className="auth-desc">Enter your credentials to access your account</p>

          {error && (
            <div className="auth-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
              <Link to="/forgot-password" style={{ fontSize: '0.82rem', color: 'var(--primary-400)', textDecoration: 'none', fontWeight: 600 }}
                data-ga-label="Login: Forgot password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}
              data-ga-label="Login: Submit" data-ga-event="login_submit" data-ga-category="auth">
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>Log In <FaArrowRight /></>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup" data-ga-label="Login: Switch to signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
