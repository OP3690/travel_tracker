import React, { useState } from 'react';
import Layout from './Layout';
import { FiPlus, FiTrash2, FiCheck, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';
import './TravelPlanner.css';

const defaultTrips = [];

export default function TravelPlanner() {
  const [trips, setTrips] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('travelPlans')) || defaultTrips;
    } catch { return defaultTrips; }
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', destination: '', startDate: '', endDate: '', notes: '' });

  const saveTrips = (newTrips) => {
    setTrips(newTrips);
    localStorage.setItem('travelPlans', JSON.stringify(newTrips));
  };

  const handleAdd = () => {
    if (!form.title.trim() || !form.destination.trim()) return;
    const trip = {
      ...form,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    saveTrips([trip, ...trips]);
    setForm({ title: '', destination: '', startDate: '', endDate: '', notes: '' });
    setShowForm(false);
  };

  const toggleComplete = (id) => {
    saveTrips(trips.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTrip = (id) => {
    saveTrips(trips.filter(t => t.id !== id));
  };

  const upcoming = trips.filter(t => !t.completed);
  const completed = trips.filter(t => t.completed);

  return (
    <Layout>
      <div className="planner-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Travel Planner</h1>
            <p className="page-subtitle">Plan and organize your upcoming trips</p>
          </div>
          <button className="planner-add-btn" onClick={() => setShowForm(!showForm)}>
            <FiPlus /> New Trip
          </button>
        </div>

        {/* Add Trip Form */}
        {showForm && (
          <div className="planner-form-card">
            <h3>Plan a New Trip</h3>
            <div className="planner-form">
              <div className="pf-row">
                <div className="pf-group">
                  <label>Trip Name</label>
                  <input placeholder="e.g., Kerala Backwaters" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="pf-group">
                  <label>Destination</label>
                  <input placeholder="e.g., Kerala" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} />
                </div>
              </div>
              <div className="pf-row">
                <div className="pf-group">
                  <label>Start Date</label>
                  <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div className="pf-group">
                  <label>End Date</label>
                  <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
                </div>
              </div>
              <div className="pf-group">
                <label>Notes</label>
                <textarea placeholder="Any notes or things to remember..." rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div className="pf-actions">
                <button className="pf-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="pf-save" onClick={handleAdd} disabled={!form.title.trim() || !form.destination.trim()}>Save Trip</button>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Trips */}
        <section className="planner-section">
          <h2 className="planner-section-title">
            <FiClock /> Upcoming Trips
            <span className="planner-count">{upcoming.length}</span>
          </h2>
          {upcoming.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><FiMapPin /></div>
              <h3>No trips planned</h3>
              <p>Click "New Trip" to start planning your next adventure</p>
            </div>
          ) : (
            <div className="planner-grid">
              {upcoming.map(trip => (
                <div key={trip.id} className="planner-card">
                  <div className="pc-header">
                    <h3>{trip.title}</h3>
                    <div className="pc-actions">
                      <button className="pc-btn complete" onClick={() => toggleComplete(trip.id)} title="Mark complete">
                        <FiCheck />
                      </button>
                      <button className="pc-btn delete" onClick={() => deleteTrip(trip.id)} title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="pc-dest">
                    <FiMapPin /> {trip.destination}
                  </div>
                  {(trip.startDate || trip.endDate) && (
                    <div className="pc-dates">
                      <FiCalendar />
                      {trip.startDate && <span>{trip.startDate}</span>}
                      {trip.startDate && trip.endDate && <span> - </span>}
                      {trip.endDate && <span>{trip.endDate}</span>}
                    </div>
                  )}
                  {trip.notes && <p className="pc-notes">{trip.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Completed Trips */}
        {completed.length > 0 && (
          <section className="planner-section">
            <h2 className="planner-section-title">
              <FiCheck /> Completed
              <span className="planner-count">{completed.length}</span>
            </h2>
            <div className="planner-grid">
              {completed.map(trip => (
                <div key={trip.id} className="planner-card completed">
                  <div className="pc-header">
                    <h3>{trip.title}</h3>
                    <div className="pc-actions">
                      <button className="pc-btn undo" onClick={() => toggleComplete(trip.id)} title="Undo">
                        <FiClock />
                      </button>
                      <button className="pc-btn delete" onClick={() => deleteTrip(trip.id)} title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="pc-dest">
                    <FiMapPin /> {trip.destination}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
