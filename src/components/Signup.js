import React, { useEffect, useState } from 'react';
import API, { warmupApi } from '../api/api';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { FaMountain, FaUser, FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash, FaGlobeAsia } from 'react-icons/fa';
import allCountries from '../utils/countries';
import countryCodes from '../utils/countryCodes';
import { trackEvent } from '../utils/analytics';
import signupBg from '../assets/signup-travel-map.jpg';
import './Auth.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', password: '', confirmPassword: '', country: 'USA', phoneCode: '+1|United States' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invitedBy = searchParams.get('ref') || '';

  useEffect(() => {
    warmupApi();
    trackEvent('signup_page_view', {
      page_path: '/signup',
      has_invite_ref: !!invitedBy,
      invite_ref_source: invitedBy ? 'referral_link' : 'direct',
    });
  }, [invitedBy]);

  const filteredCountries = countrySearch
    ? allCountries.filter(c => c.value.toLowerCase().includes(countrySearch.toLowerCase()) || c.label.toLowerCase().includes(countrySearch.toLowerCase()))
    : allCountries;

  const selectedCountryObj = allCountries.find(c => c.value === form.country);
  const selectedCountryLabel = selectedCountryObj ? selectedCountryObj.label : form.country;

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
    // Match by country value OR by label text (handles "USA" -> "United States")
    let match = countryCodes.find(c => c.country === country);
    if (!match) {
      const obj = allCountries.find(c => c.value === country);
      if (obj) {
        const name = obj.label.replace(/^[^\s]+\s/, '');
        match = countryCodes.find(c => c.country === name || c.country.includes(name) || name.includes(c.country));
      }
    }
    setForm({ ...form, country, phoneCode: match ? `${match.code}|${match.country}` : '+1|United States' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      trackEvent('signup_validation_error', { reason: 'password_mismatch' });
      return setError('Passwords do not match');
    }
    if (form.password.length < 6) {
      trackEvent('signup_validation_error', { reason: 'password_too_short' });
      return setError('Password must be at least 6 characters');
    }
    // Keep email out of analytics — only the domain is logged (e.g. "gmail.com")
    const emailDomain = (form.email.split('@')[1] || '').toLowerCase();
    trackEvent('signup_attempt', {
      country: form.country,
      email_domain: emailDomain,
      has_mobile: !!form.mobile,
      has_invite_ref: !!invitedBy,
    });
    setLoading(true);
    try {
      const actualCode = form.phoneCode.split('|')[0];
      await API.post('/api/auth/signup', { ...form, mobile: actualCode + ' ' + form.mobile, invitedBy: invitedBy || undefined });
      trackEvent('signup_success', {
        country: form.country,
        email_domain: emailDomain,
        has_invite_ref: !!invitedBy,
      });
      // GA4 recommended conversion event — fires on the client so Google Ads can attribute
      trackEvent('sign_up', {
        method: 'email',
        country: form.country,
      });
      navigate('/login');
    } catch (err) {
      const reason = err.response?.data?.error || 'unknown';
      trackEvent('signup_error', {
        reason: String(reason).slice(0, 120),
        status: err.response?.status || 0,
        country: form.country,
      });
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
            <ul className="auth-visual-pills" aria-hidden="true">
              <li>✓ Free forever</li>
              <li>✓ 195 countries</li>
              <li>✓ Memory wall</li>
              <li>✓ Shareable cards</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <Link to="/" className="auth-back-link">
            <FaArrowRight style={{ transform: 'rotate(180deg)' }} /> Back to home
          </Link>
          <h1 className="auth-title">Join the Adventure</h1>
          <p className="auth-desc">One account. 195 countries. Your journey begins here.</p>

          {error && <div className="auth-error"><span>{error}</span></div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Name */}
            <div className="input-group">
              <label>What's Your Name, Buddy?</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>
            </div>

            {/* Country - Smart Search Dropdown */}
            <div className="input-group">
              <label>Your Home Country</label>
              <div className="country-dropdown-wrap">
                <div
                  className="country-dropdown-trigger"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <FaGlobeAsia className="input-icon" />
                  <span className="country-selected">{selectedCountryLabel}</span>
                  <span className="country-chevron">{showCountryDropdown ? '▲' : '▼'}</span>
                </div>
                {showCountryDropdown && (
                  <div className="country-dropdown-menu">
                    <input
                      className="country-search-input"
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={e => setCountrySearch(e.target.value)}
                      autoFocus
                    />
                    <div className="country-dropdown-list">
                      {filteredCountries.length === 0 ? (
                        <div className="country-dropdown-empty">No countries found</div>
                      ) : (
                        filteredCountries.map(c => (
                          <div
                            key={c.value}
                            className={`country-dropdown-item ${form.country === c.value ? 'active' : ''}`}
                            onClick={() => {
                              handleCountryChange({ target: { value: c.value } });
                              setShowCountryDropdown(false);
                              setCountrySearch('');
                            }}
                          >
                            {c.label}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
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
                    <option key={i} value={`${c.code}|${c.country}`}>{c.flag} {c.code}</option>
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
              <label>Email Address <span className="label-funny">— We won't spam, We can't even afford a marketing budget ;)</span></label>
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

            <button type="submit" className="auth-submit" disabled={loading}
              data-ga-label="Signup: Submit" data-ga-event="signup_submit" data-ga-category="auth">
              {loading ? <span className="auth-spinner" /> : <>Create Account <FaArrowRight /></>}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login" data-ga-label="Signup: Switch to login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
