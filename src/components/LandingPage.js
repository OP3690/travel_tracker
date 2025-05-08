import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import bgImg from '../assets/marissa-lewis-FT4rqmORl7c-unsplash.jpg';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-bg" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="landing-overlay">
        <div className="landing-hero-card">
          <img src="https://img.icons8.com/ios-filled/100/airplane-take-off.png" alt="Travel" style={{ width: 80, marginBottom: 24 }} />
          <h1>Explore India, Track Your Journey</h1>
          <p>Visualize your travels across Indian states and union territories. Plan, journal, and relive your adventures!</p>
          <div className="landing-actions">
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
} 