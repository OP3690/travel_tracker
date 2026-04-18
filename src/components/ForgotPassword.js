import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import { FaEnvelope, FaKey, FaLock, FaArrowLeft, FaCheckCircle, FaMountain } from 'react-icons/fa';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=email, 2=OTP, 3=new pw, 4=success
  const [emailAddr, setEmailAddr] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resetToken, setResetToken] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [notRegistered, setNotRegistered] = useState(false);
  const otpRefs = useRef([]);

  useEffect(() => { if (step === 2) otpRefs.current[0]?.focus(); }, [step]);

  const requestOtp = async () => {
    setError(''); setInfo(''); setNotRegistered(false);
    if (!emailAddr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddr)) {
      setError('Please enter a valid email'); return;
    }
    setLoading(true);
    try {
      const res = await API.post('/api/auth/forgot-password', { email: emailAddr });
      setInfo(res.data.message || 'Check your email for the code.');
      setStep(2);
    } catch (err) {
      const data = err?.response?.data;
      if (err?.response?.status === 404 || data?.error === 'email_not_registered') {
        setNotRegistered(true);
      } else {
        setError(data?.message || data?.error || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (idx, val) => {
    const v = val.replace(/\D/g, '').slice(0, 1);
    const next = [...otp];
    next[idx] = v;
    setOtp(next);
    if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      otpRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  const verifyOtp = async () => {
    setError('');
    const code = otp.join('');
    if (code.length !== 6) { setError('Enter the 6-digit code'); return; }
    setLoading(true);
    try {
      const res = await API.post('/api/auth/verify-otp', { email: emailAddr, otp: code });
      setResetToken(res.data.resetToken);
      setStep(3);
      setInfo('');
    } catch (err) {
      setError(err?.response?.data?.error || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setError('');
    if (newPw.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (newPw !== confirmPw) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      await API.post('/api/auth/reset-password', {
        email: emailAddr, resetToken, newPassword: newPw,
      });
      setStep(4);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <FaMountain />
          <span>StampYourMap</span>
        </div>

        {step === 1 && (
          <>
            <h1>Forgot your password?</h1>
            <p className="auth-subtitle">No worries. We'll email you a 6-digit code to reset it.</p>
            <div className="auth-field">
              <label><FaEnvelope /> Email address</label>
              <input
                type="email" autoFocus
                placeholder="you@example.com"
                value={emailAddr}
                onChange={e => { setEmailAddr(e.target.value); setNotRegistered(false); }}
                onKeyDown={e => e.key === 'Enter' && requestOtp()}
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            {notRegistered && (
              <div className="auth-not-registered">
                <div className="anr-icon">🙁</div>
                <div className="anr-body">
                  <strong>This email isn't registered with StampYourMap.</strong>
                  <p>Double-check for typos, or create a new account to start stamping your world.</p>
                  <button
                    type="button"
                    className="anr-cta"
                    onClick={() => navigate(`/signup?email=${encodeURIComponent(emailAddr)}`)}
                  >
                    Create an account →
                  </button>
                </div>
              </div>
            )}
            <button className="auth-primary-btn" onClick={requestOtp} disabled={loading}>
              {loading ? 'Sending…' : 'Send 6-Digit Code'}
            </button>
            <Link to="/login" className="auth-back"><FaArrowLeft /> Back to login</Link>
          </>
        )}

        {step === 2 && (
          <>
            <h1>Check your email 📧</h1>
            <p className="auth-subtitle">We sent a 6-digit code to <strong>{emailAddr}</strong>. It expires in 10 minutes.</p>
            <div className="auth-otp-row" onPaste={handleOtpPaste}>
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={el => otpRefs.current[i] = el}
                  type="text" inputMode="numeric" maxLength={1}
                  value={d}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(i, e)}
                  className="auth-otp-box"
                />
              ))}
            </div>
            {info && <div className="auth-info">{info}</div>}
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-primary-btn" onClick={verifyOtp} disabled={loading}>
              {loading ? 'Verifying…' : 'Verify Code'}
            </button>
            <button className="auth-link-btn" onClick={() => { setStep(1); setOtp(['', '', '', '', '', '']); setInfo(''); }}>
              Didn't get it? Try again
            </button>
            <div className="auth-back-row">
              <Link to="/" className="auth-back"><FaArrowLeft /> Back to home</Link>
              <Link to="/login" className="auth-back">Log in instead</Link>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1>Create a new password</h1>
            <p className="auth-subtitle">Pick something you'll remember. Minimum 6 characters.</p>
            <div className="auth-field">
              <label><FaLock /> New password</label>
              <input type="password" autoFocus value={newPw} onChange={e => setNewPw(e.target.value)} />
            </div>
            <div className="auth-field">
              <label><FaKey /> Confirm password</label>
              <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && resetPassword()} />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-primary-btn" onClick={resetPassword} disabled={loading}>
              {loading ? 'Updating…' : 'Reset Password'}
            </button>
            <Link to="/" className="auth-back"><FaArrowLeft /> Back to home</Link>
          </>
        )}

        {step === 4 && (
          <>
            <div className="auth-success-icon"><FaCheckCircle /></div>
            <h1>Password updated 🎉</h1>
            <p className="auth-subtitle">Log in with your new password to continue stamping the world.</p>
            <button className="auth-primary-btn" onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
