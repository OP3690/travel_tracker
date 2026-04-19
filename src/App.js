import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import TravelJournal from './components/TravelJournal';
import WorldMapView from './components/WorldMapView';
import Statistics from './components/Statistics';
import TravelPlanner from './components/TravelPlanner';
import Settings from './components/Settings';
import Memories from './components/Memories';
import Friends from './components/Friends';
import FriendProfile from './components/FriendProfile';
import ForgotPassword from './components/ForgotPassword';
import Admin from './components/Admin';
import InstallAppButton from './components/InstallAppButton';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { initGlobalClickTracking, initRouteTracking } from './utils/analytics';
import './App.css';
import './mobile.css';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
    initGlobalClickTracking();
    initRouteTracking();
  }, []);
  return (
    <BrowserRouter>
      <SpeedInsights />
      <InstallAppButton />
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
    </BrowserRouter>
  );
}

export default App;
