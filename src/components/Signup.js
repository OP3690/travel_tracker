import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    try {
      await API.post('/api/auth/signup', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
} 