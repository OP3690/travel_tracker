import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import TravelJournal from './components/TravelJournal';
import WorldMapView from './components/WorldMapView';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/journal" element={
          <PrivateRoute>
            <TravelJournal />
          </PrivateRoute>
        } />
        <Route path="/worldmap" element={
          <PrivateRoute>
            <WorldMapView />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 