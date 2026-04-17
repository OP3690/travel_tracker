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
import './App.css';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/journal" element={
          <PrivateRoute><TravelJournal /></PrivateRoute>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
