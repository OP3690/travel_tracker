import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import InstallAppButton from './components/InstallAppButton';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { initGlobalClickTracking, initRouteTracking } from './utils/analytics';
import { warmupApi } from './api/api';
import './App.css';
import './mobile.css';

// Code-split every non-critical route so the initial bundle is just landing + login.
const Signup          = lazy(() => import('./components/Signup'));
const Dashboard       = lazy(() => import('./components/Dashboard'));
const TravelJournal   = lazy(() => import('./components/TravelJournal'));
const WorldMapView    = lazy(() => import('./components/WorldMapView'));
const Statistics      = lazy(() => import('./components/Statistics'));
const TravelPlanner   = lazy(() => import('./components/TravelPlanner'));
const Settings        = lazy(() => import('./components/Settings'));
const Memories        = lazy(() => import('./components/Memories'));
const Friends         = lazy(() => import('./components/Friends'));
const FriendProfile   = lazy(() => import('./components/FriendProfile'));
const ForgotPassword  = lazy(() => import('./components/ForgotPassword'));
const Admin           = lazy(() => import('./components/Admin'));

function RouteFallback() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted, #888)',
      fontSize: 14,
    }}>
      Loading…
    </div>
  );
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
    initGlobalClickTracking();
    initRouteTracking();
    // Warm Render free-tier dyno + Mongo pool early so auth feels instant
    warmupApi();
  }, []);
  return (
    <BrowserRouter>
      <SpeedInsights />
      <InstallAppButton />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
          <Route path="/discover" element={
            <PrivateRoute><TravelJournal /></PrivateRoute>
          } />
          <Route path="/passport" element={
            <PrivateRoute><TravelJournal /></PrivateRoute>
          } />
          <Route path="/journal" element={
            <PrivateRoute><TravelJournal /></PrivateRoute>
          } />
          <Route path="/friends" element={
            <PrivateRoute><Friends /></PrivateRoute>
          } />
          <Route path="/u/:userId" element={
            <PrivateRoute><FriendProfile /></PrivateRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={
            <PrivateRoute><Admin /></PrivateRoute>
          } />
          <Route path="/worldmap" element={
            <PrivateRoute><WorldMapView /></PrivateRoute>
          } />
          <Route path="/statistics" element={
            <PrivateRoute><Statistics /></PrivateRoute>
          } />
          <Route path="/planner" element={
            <PrivateRoute><TravelPlanner /></PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute><Settings /></PrivateRoute>
          } />
          <Route path="/memories" element={
            <PrivateRoute><Memories /></PrivateRoute>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
