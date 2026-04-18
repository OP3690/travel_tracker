import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { FaMountain, FaUser, FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash, FaGlobeAsia } from 'react-icons/fa';
import allCountries from '../utils/countries';
import countryCodes from '../utils/countryCodes';
import signupBg from '../assets/signup-travel-map.jpg';
import './Auth.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', password: '', confirmPassword: '', country: 'USA', phoneCode: '+1' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const getPasswordStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw) && /[^a-zA-Z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getPasswordStrength(form.password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'var(--rose-500)', 'var(--amber-500)', 'var(--primary-500)', 'var(--accent-500)'];

  // When country changes, auto-set the phone code
  const handleCountryChange = (e) => {
    const country = e.target.value;
    const match = countryCodes.find(c => c.country === country);
    setForm({ ...form, country, phoneCode: match ? match.code : '+1' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      await API.post('/api/auth/signup', { ...form, mobile: form.phoneCode + ' ' + form.mobile });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual" style={{ backgroundImage: `url(${signupBg})` }}>
        <div className="auth-visual-content">
          <div className="auth-visual-shapes">
            <div className="auth-shape auth-shape-1" />
            <div className="auth-shape auth-shape-2" />
          </div>
          <div className="auth-visual-text">
            <FaMountain className="auth-visual-icon" />
            <h2>Start Your Journey</h2>
            <p>195 countries. Infinite adventures. Your travel map starts now.</p>
          </div>
        </div>
      </div>
      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <Link to="/" className="auth-back-link">
            <FaArrowRight style={{ transform: 'rotate(180deg)' }} /> Back to home
          </Link>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-desc">Fill in your details to start mapping your travels</p>

          {error && <div className="auth-error"><span>{error}</span></div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Name */}
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>
            </div>

            {/* Country */}
            <div className="input-group">
              <label>Your Country</label>
              <div className="input-wrapper">
                <FaGlobeAsia className="input-icon" />
                <select name="country" value={form.country} onChange={handleCountryChange} className="input-select">
                  {allCountries.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone with country code */}
            <div className="input-group">
              <label>Mobile Number</label>
              <div className="phone-input-row">
                <select
                  name="phoneCode"
                  value={form.phoneCode}
                  onChange={handleChange}
                  className="phone-code-select"
                >
                  {countryCodes.map((c, i) => (
                    <option key={i} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <div className="input-wrapper phone-input-wrapper">
                  <input
                    name="mobile"
                    type="tel"
                    placeholder="Phone number"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    className="phone-number-input"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            {/* Password row */}
            <div className="input-row">
              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Min 6 chars" value={form.password} onChange={handleChange} required />
                </div>
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Re-enter" value={form.confirmPassword} onChange={handleChange} required />
                  <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password strength */}
            {form.password && (
              <div className="password-strength">
                <div className="strength-bars">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="strength-bar" style={{ background: i <= strength ? strengthColors[strength] : 'var(--border-default)' }} />
                  ))}
                </div>
                <span className="strength-label" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
              </div>
            )}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <span className="auth-spinner" /> : <>Create Account <FaArrowRight /></>}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
