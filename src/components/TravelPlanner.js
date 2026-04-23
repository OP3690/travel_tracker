import React, { useState, useEffect, useMemo } from 'react';
import Layout from './Layout';
import API from '../api/api';
import {
  FiPlus, FiTrash2, FiCheck, FiCalendar, FiMapPin, FiClock, FiEdit2, FiX,
  FiUsers, FiDollarSign, FiList, FiBookOpen, FiBriefcase, FiCompass,
  FiCreditCard, FiAward, FiAlertCircle, FiChevronRight, FiMail, FiUserPlus, FiSearch
} from 'react-icons/fi';
import { FaPlane, FaHome, FaHotel, FaCar, FaTrain, FaMapMarkerAlt } from 'react-icons/fa';
import allCountries from '../utils/countries';
import { getCountryRegions } from '../utils/getCountryRegions';
import './TravelPlanner.css';

const STATUSES = [
  { value: 'idea',       label: 'Idea',       color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.15)' },
  { value: 'planning',   label: 'Planning',   color: '#818cf8', bg: 'rgba(129, 140, 248, 0.15)' },
  { value: 'booked',     label: 'Booked',     color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' },
  { value: 'completed',  label: 'Completed',  color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)' },
  { value: 'cancelled',  label: 'Cancelled',  color: '#f87171', bg: 'rgba(248, 113, 113, 0.15)' },
];
const statusMap = Object.fromEntries(STATUSES.map(s => [s.value, s]));

const PURPOSES = [
  { value: 'leisure',    label: 'Leisure',    icon: '🏖️' },
  { value: 'business',   label: 'Business',   icon: '💼' },
  { value: 'family',     label: 'Family',     icon: '👨‍👩‍👧' },
  { value: 'adventure',  label: 'Adventure',  icon: '⛰️' },
  { value: 'honeymoon',  label: 'Honeymoon',  icon: '💕' },
  { value: 'road-trip',  label: 'Road Trip',  icon: '🚗' },
  { value: 'solo',       label: 'Solo',       icon: '🎒' },
  { value: 'other',      label: 'Other',      icon: '✈️' },
];
const purposeMap = Object.fromEntries(PURPOSES.map(p => [p.value, p]));

const CHECKLIST_CATEGORIES = [
  { value: 'documents',  label: 'Documents',  icon: '📄' },
  { value: 'packing',    label: 'Packing',    icon: '🎒' },
  { value: 'booking',    label: 'Bookings',   icon: '📅' },
  { value: 'essentials', label: 'Essentials', icon: '⭐' },
  { value: 'activities', label: 'Activities', icon: '🎯' },
  { value: 'other',      label: 'Other',      icon: '📝' },
];

const BOOKING_TYPES = [
  { value: 'flight',   label: 'Flight',   icon: <FaPlane /> },
  { value: 'hotel',    label: 'Hotel',    icon: <FaHotel /> },
  { value: 'car',      label: 'Car',      icon: <FaCar /> },
  { value: 'train',    label: 'Train',    icon: <FaTrain /> },
  { value: 'activity', label: 'Activity', icon: <FiAward /> },
  { value: 'other',    label: 'Other',    icon: <FiCreditCard /> },
];

// Items marked `perPerson: true` will be duplicated for each traveler
// (main user + co-travelers + unnamed seats up to `travelers` count).
const CHECKLIST_TEMPLATES = {
  international: [
    { text: 'Passport (valid 6+ months)', category: 'documents', perPerson: true },
    { text: 'Visa (if required)',          category: 'documents', perPerson: true },
    { text: 'Travel insurance',            category: 'documents', perPerson: true },
    { text: 'Boarding pass',               category: 'documents', perPerson: true },
    { text: 'Flight tickets',              category: 'booking' },
    { text: 'Hotel confirmations',         category: 'booking' },
    { text: 'Airport transfers',           category: 'booking' },
    { text: 'Local currency / forex card', category: 'essentials' },
    { text: 'International adapter',       category: 'packing' },
    { text: 'Power bank',                  category: 'packing' },
    { text: 'Medications',                 category: 'essentials', perPerson: true },
  ],
  domestic: [
    { text: 'ID proof',                    category: 'documents', perPerson: true },
    { text: 'Transport bookings',          category: 'booking' },
    { text: 'Hotel confirmation',          category: 'booking' },
    { text: 'Cash + cards',                category: 'essentials' },
    { text: 'Charger + power bank',        category: 'packing' },
    { text: 'Weather-appropriate clothes', category: 'packing' },
    { text: 'Medications',                 category: 'essentials', perPerson: true },
  ],
};

function flagFor(country) {
  const c = allCountries.find(x => x.value === country);
  if (!c) return '🌍';
  // Countries store the flag as the first characters of `label` (e.g. "🇯🇵 Japan").
  // Extract the two regional-indicator code points that make up the flag glyph.
  if (c.flag) return c.flag;
  const match = (c.label || '').match(/^([\p{Regional_Indicator}]{2})/u);
  return match ? match[1] : '🌍';
}
function fmtDate(d) {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); }
  catch { return ''; }
}
function daysBetween(a, b) {
  if (!a || !b) return 0;
  const ms = new Date(b) - new Date(a);
  return Math.max(0, Math.round(ms / 86400000) + 1);
}
function daysUntil(d) {
  if (!d) return null;
  const ms = new Date(d) - new Date();
  return Math.ceil(ms / 86400000);
}

function StatusPill({ status }) {
  const s = statusMap[status] || statusMap.planning;
  return (
    <span className="tp-status-pill" style={{ background: s.bg, color: s.color }}>{s.label}</span>
  );
}

function Countdown({ startDate, status }) {
  if (status === 'completed' || status === 'cancelled') return null;
  const d = daysUntil(startDate);
  if (d === null) return null;
  if (d < 0) return <span className="tp-countdown ongoing">In progress</span>;
  if (d === 0) return <span className="tp-countdown today">Today!</span>;
  if (d <= 30) return <span className="tp-countdown soon">{d} day{d === 1 ? '' : 's'} to go</span>;
  return <span className="tp-countdown">{d} days</span>;
}

/* ------------------------- CREATE / EDIT MODAL ------------------------- */

function TripFormModal({ editing, onClose, onSaved }) {
  const isEdit = Boolean(editing?._id);
  const [tab, setTab] = useState('basics');
  const [form, setForm] = useState(() => ({
    title: '',
    destination: '',
    country: '',
    region: '',
    cities: [],
    cityInput: '',
    tripType: 'international',
    purpose: 'leisure',
    travelers: 1,
    status: 'planning',
    startDate: '',
    endDate: '',
    budget: { estimated: '', spent: '', currency: 'USD' },
    notes: '',
    checklist: [],
    coTravelers: [],
  }));
  const [availableRegions, setAvailableRegions] = useState([]);
  const [friends, setFriends] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [inviteQ, setInviteQ] = useState('');

  // Load friends list for the picker
  useEffect(() => {
    API.get('/api/friends').then(r => setFriends(r.data.friends || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (editing) {
      setForm(f => ({
        ...f,
        title: editing.title || '',
        destination: editing.destination || '',
        country: editing.country || '',
        region: editing.region || '',
        cities: editing.cities || [],
        tripType: editing.tripType || 'international',
        purpose: editing.purpose || 'leisure',
        travelers: editing.travelers || 1,
        status: editing.status || 'planning',
        startDate: editing.startDate ? editing.startDate.split('T')[0] : '',
        endDate: editing.endDate ? editing.endDate.split('T')[0] : '',
        budget: {
          estimated: editing.budget?.estimated ?? '',
          spent: editing.budget?.spent ?? '',
          currency: editing.budget?.currency || 'USD',
        },
        notes: editing.notes || '',
        checklist: editing.checklist || [],
        coTravelers: editing.coTravelers || [],
      }));
    } else {
      // Prefill from user profile
      try {
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        if (stored.country) setForm(f => ({ ...f, country: stored.country, tripType: 'domestic' }));
      } catch {}
    }
  }, [editing]);

  // Load regions when country changes
  useEffect(() => {
    if (!form.country) { setAvailableRegions([]); return; }
    let cancelled = false;
    getCountryRegions(form.country).then(list => { if (!cancelled) setAvailableRegions(list); });
    return () => { cancelled = true; };
  }, [form.country]);

  // Auto-detect domestic/international
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      if (form.country && stored.country) {
        setForm(f => ({ ...f, tripType: f.country === stored.country ? 'domestic' : 'international' }));
      }
    } catch {}
  }, [form.country]);

  const addCity = () => {
    const c = form.cityInput.trim();
    if (!c) return;
    if (form.cities.includes(c)) return;
    setForm(f => ({ ...f, cities: [...f.cities, c], cityInput: '' }));
  };
  const removeCity = (c) => setForm(f => ({ ...f, cities: f.cities.filter(x => x !== c) }));

  // Co-traveler helpers
  const addFriendAsCoTraveler = (friend) => {
    if (form.coTravelers.some(c => c.userId === friend._id)) return;
    setForm(f => ({
      ...f,
      coTravelers: [...f.coTravelers, { userId: friend._id, name: friend.name, email: friend.email, status: 'friend' }],
    }));
    setInviteQ('');
  };
  const inviteByEmail = () => {
    const email = inviteQ.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email to invite'); return; }
    setError('');
    if (form.coTravelers.some(c => c.email?.toLowerCase() === email.toLowerCase())) return;
    setForm(f => ({ ...f, coTravelers: [...f.coTravelers, { name: email.split('@')[0], email, status: 'invited' }] }));
    setInviteQ('');
  };
  const removeCoTraveler = (idx) => {
    setForm(f => ({ ...f, coTravelers: f.coTravelers.filter((_, i) => i !== idx) }));
  };

  const friendSuggestions = useMemo(() => {
    const q = inviteQ.trim().toLowerCase();
    const taken = new Set(form.coTravelers.map(c => c.userId).filter(Boolean));
    const list = friends.filter(f => !taken.has(f._id));
    if (!q) return list.slice(0, 5);
    return list.filter(f =>
      (f.name || '').toLowerCase().includes(q) || (f.email || '').toLowerCase().includes(q)
    ).slice(0, 5);
  }, [friends, form.coTravelers, inviteQ]);
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteQ.trim());

  // Build the list of named travelers: main user first, then co-travelers,
  // padded out to `form.travelers` count with "Traveler N" placeholders.
  const travelerNames = useMemo(() => {
    const firstName = (s) => (s || '').trim().split(/\s+/)[0] || '';
    const me = (() => {
      try { return firstName(JSON.parse(localStorage.getItem('user') || '{}').name) || 'You'; }
      catch { return 'You'; }
    })();
    const names = [me, ...form.coTravelers.map(c => firstName(c.name) || firstName(c.email) || 'Friend')];
    const count = Math.max(Number(form.travelers) || 1, names.length);
    while (names.length < count) names.push(`Traveler ${names.length + 1}`);
    return names.slice(0, count);
  }, [form.coTravelers, form.travelers]);

  const loadTemplate = () => {
    const templ = CHECKLIST_TEMPLATES[form.tripType] || [];
    const existing = new Set(form.checklist.map(c => c.text.toLowerCase()));
    const added = [];
    templ.forEach(t => {
      if (t.perPerson && travelerNames.length > 1) {
        travelerNames.forEach(name => {
          const text = `${t.text} — ${name}`;
          if (!existing.has(text.toLowerCase())) {
            added.push({ text, category: t.category, done: false });
          }
        });
      } else {
        if (!existing.has(t.text.toLowerCase())) {
          added.push({ text: t.text, category: t.category, done: false });
        }
      }
    });
    setForm(f => ({ ...f, checklist: [...f.checklist, ...added] }));
  };

  const addChecklistItem = (category = 'other') => {
    setForm(f => ({ ...f, checklist: [...f.checklist, { text: '', done: false, category }] }));
  };
  const updateChecklistItem = (i, patch) => {
    setForm(f => ({ ...f, checklist: f.checklist.map((c, j) => j === i ? { ...c, ...patch } : c) }));
  };
  const removeChecklistItem = (i) => {
    setForm(f => ({ ...f, checklist: f.checklist.filter((_, j) => j !== i) }));
  };

  const save = async () => {
    if (!form.title.trim()) { setError('Trip name is required'); setTab('basics'); return; }
    setSaving(true); setError('');
    try {
      const payload = {
        title: form.title.trim(),
        destination: form.destination.trim() || form.country,
        country: form.country || undefined,
        region: form.region || undefined,
        cities: form.cities,
        tripType: form.tripType,
        purpose: form.purpose,
        travelers: Number(form.travelers) || 1,
        status: form.status,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
        budget: {
          estimated: Number(form.budget.estimated) || 0,
          spent: Number(form.budget.spent) || 0,
          currency: form.budget.currency || 'USD',
        },
        notes: form.notes,
        checklist: form.checklist.filter(c => c.text && c.text.trim()),
        coTravelers: form.coTravelers,
      };
      if (isEdit) {
        await API.put(`/api/user/trip-plans/${editing._id}`, payload);
      } else {
        await API.post('/api/user/trip-plans', payload);
      }

      // Fire invite emails for any new invited co-travelers (non-friends)
      const originalEmails = new Set((editing?.coTravelers || []).filter(c => c.status === 'invited').map(c => c.email));
      const newInvites = form.coTravelers.filter(c => c.status === 'invited' && c.email && !originalEmails.has(c.email));
      for (const inv of newInvites) {
        try {
          await API.post('/api/friends/invite', {
            email: inv.email,
            message: `Join me on StampYourMap — I'm planning a trip: "${form.title.trim()}" and would love to have you along.`,
          });
        } catch {}
      }

      onSaved && onSaved();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to save trip');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header">
          <div>
            <h2>{isEdit ? 'Edit Trip' : 'Plan a New Trip'}</h2>
            <p>{isEdit ? 'Update details for your trip' : 'Shape your next adventure — start broad, add detail later'}</p>
          </div>
          <button className="tp-close" onClick={onClose}><FiX /></button>
        </div>

        <div className="tp-modal-tabs">
          {[
            { id: 'basics',    label: 'Basics' },
            { id: 'when',      label: 'When & Who' },
            { id: 'budget',    label: 'Budget' },
            { id: 'checklist', label: 'Checklist' },
          ].map(t => (
            <button
              key={t.id}
              className={`tp-modal-tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >{t.label}</button>
          ))}
        </div>

        <div className="tp-modal-body">
          {tab === 'basics' && (
            <div className="tp-form-section">
              <div className="tp-field">
                <label>Trip Name *</label>
                <input placeholder="e.g. 10 days in Japan"
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="tp-field-row">
                <div className="tp-field">
                  <label>Country</label>
                  <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value, region: '' }))}>
                    <option value="">Select country</option>
                    {allCountries.map(c => <option key={c.value} value={c.value}>{c.flag} {c.label}</option>)}
                  </select>
                </div>
                <div className="tp-field">
                  <label>Region / State</label>
                  {availableRegions.length > 0 ? (
                    <select value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))}>
                      <option value="">Any</option>
                      {availableRegions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  ) : (
                    <input placeholder={form.country ? 'e.g. Tokyo' : 'Pick a country first'}
                      value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} disabled={!form.country} />
                  )}
                </div>
              </div>
              <div className="tp-field">
                <label>Cities you'll visit <span className="tp-optional">(optional)</span></label>
                <div className="tp-chips-input">
                  {form.cities.map(c => (
                    <span key={c} className="tp-chip">{c} <button onClick={() => removeCity(c)}><FiX /></button></span>
                  ))}
                  <input
                    placeholder="Type a city and press Enter"
                    value={form.cityInput}
                    onChange={e => setForm(f => ({ ...f, cityInput: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCity(); } }}
                  />
                </div>
              </div>
              <div className="tp-field">
                <label>Trip Type</label>
                <div className="tp-seg">
                  {[
                    { value: 'domestic',      label: 'Domestic',      icon: <FaHome /> },
                    { value: 'international', label: 'International', icon: <FaPlane /> },
                  ].map(o => (
                    <button key={o.value}
                      type="button"
                      className={`tp-seg-btn ${form.tripType === o.value ? 'active' : ''}`}
                      onClick={() => setForm(f => ({ ...f, tripType: o.value }))}
                    >{o.icon} {o.label}</button>
                  ))}
                </div>
              </div>
              <div className="tp-field">
                <label>Purpose</label>
                <div className="tp-purpose-grid">
                  {PURPOSES.map(p => (
                    <button key={p.value}
                      type="button"
                      className={`tp-purpose-btn ${form.purpose === p.value ? 'active' : ''}`}
                      onClick={() => setForm(f => ({ ...f, purpose: p.value }))}
                    >
                      <span className="tp-purpose-emoji">{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="tp-field">
                <label>Status</label>
                <div className="tp-seg">
                  {STATUSES.filter(s => s.value !== 'cancelled').map(s => (
                    <button key={s.value}
                      type="button"
                      className={`tp-seg-btn ${form.status === s.value ? 'active' : ''}`}
                      onClick={() => setForm(f => ({ ...f, status: s.value }))}
                      style={{ '--seg-color': s.color }}
                    >{s.label}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'when' && (
            <div className="tp-form-section">
              <div className="tp-field-row">
                <div className="tp-field">
                  <label>Start Date</label>
                  <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
                </div>
                <div className="tp-field">
                  <label>End Date</label>
                  <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
                </div>
              </div>
              {form.startDate && form.endDate && (
                <div className="tp-duration-chip">
                  <FiClock /> {daysBetween(form.startDate, form.endDate)} day{daysBetween(form.startDate, form.endDate) === 1 ? '' : 's'} total
                  {daysUntil(form.startDate) >= 0 && ` · ${daysUntil(form.startDate)} days from today`}
                </div>
              )}
              <div className="tp-field">
                <label>Number of Travelers</label>
                <div className="tp-stepper">
                  <button type="button" onClick={() => setForm(f => ({ ...f, travelers: Math.max(1, f.travelers - 1) }))}>−</button>
                  <span><FiUsers /> {form.travelers}</span>
                  <button type="button" onClick={() => setForm(f => ({ ...f, travelers: Math.min(50, f.travelers + 1) }))}>+</button>
                </div>
              </div>

              {/* CO-TRAVELERS */}
              <div className="tp-field">
                <label>Co-travelers <span className="tp-optional">(invite friends or add by email)</span></label>

                {form.coTravelers.length > 0 && (
                  <div className="tp-cotravelers-list">
                    {form.coTravelers.map((c, i) => (
                      <div key={i} className="tp-cotraveler-chip">
                        <span className="tp-cotraveler-avatar">
                          {(c.name || c.email || '?').split(' ').map(s => s[0]).filter(Boolean).join('').toUpperCase().slice(0, 2)}
                        </span>
                        <div className="tp-cotraveler-info">
                          <span className="tp-cotraveler-name">{c.name || c.email}</span>
                          <span className="tp-cotraveler-sub">
                            {c.status === 'invited' ? <><FiMail /> Will be emailed an invite</> : <><FiUsers /> Friend</>}
                          </span>
                        </div>
                        <button type="button" className="tp-btn-icon-danger" onClick={() => removeCoTraveler(i)}><FiX /></button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="tp-invite-box">
                  <div className="tp-invite-input">
                    <FiSearch />
                    <input
                      type="text"
                      placeholder="Search friends by name/email, or type a new email to invite"
                      value={inviteQ}
                      onChange={e => setInviteQ(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && looksLikeEmail) { e.preventDefault(); inviteByEmail(); } }}
                    />
                    {looksLikeEmail && (
                      <button type="button" className="tp-btn-primary small" onClick={inviteByEmail}>
                        <FiMail /> Invite
                      </button>
                    )}
                  </div>
                  {friendSuggestions.length > 0 && (
                    <div className="tp-friend-suggestions">
                      {friendSuggestions.map(f => (
                        <button key={f._id} type="button" className="tp-friend-suggestion" onClick={() => addFriendAsCoTraveler(f)}>
                          <span className="tp-cotraveler-avatar small">
                            {(f.name || '?').split(' ').map(s => s[0]).filter(Boolean).join('').toUpperCase().slice(0, 2)}
                          </span>
                          <span className="tp-friend-name">{f.name}</span>
                          <span className="tp-friend-email">{f.email}</span>
                          <FiUserPlus />
                        </button>
                      ))}
                    </div>
                  )}
                  {!friendSuggestions.length && inviteQ && !looksLikeEmail && (
                    <p className="tp-hint">No matching friends. Type a full email to invite them.</p>
                  )}
                  {!friendSuggestions.length && !inviteQ && friends.length === 0 && (
                    <p className="tp-hint">You don't have friends yet — invite someone by entering their email.</p>
                  )}
                </div>
              </div>

              <div className="tp-field">
                <label>Notes</label>
                <textarea rows={5}
                  placeholder="Restaurants to try, must-see spots, travel reminders…"
                  value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
            </div>
          )}

          {tab === 'budget' && (
            <div className="tp-form-section">
              <div className="tp-field">
                <label>Currency</label>
                <select value={form.budget.currency}
                  onChange={e => setForm(f => ({ ...f, budget: { ...f.budget, currency: e.target.value } }))}>
                  {['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'AED', 'SGD'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="tp-field-row">
                <div className="tp-field">
                  <label>Estimated Budget</label>
                  <input type="number" min="0" placeholder="0"
                    value={form.budget.estimated}
                    onChange={e => setForm(f => ({ ...f, budget: { ...f.budget, estimated: e.target.value } }))} />
                </div>
                <div className="tp-field">
                  <label>Already Spent</label>
                  <input type="number" min="0" placeholder="0"
                    value={form.budget.spent}
                    onChange={e => setForm(f => ({ ...f, budget: { ...f.budget, spent: e.target.value } }))} />
                </div>
              </div>
              <p className="tp-hint">Track flights, stays, activities, and incidentals. Update as you go — it helps plan the next one.</p>
            </div>
          )}

          {tab === 'checklist' && (
            <div className="tp-form-section">
              <div className="tp-checklist-header">
                <span>{form.checklist.length} item{form.checklist.length === 1 ? '' : 's'}</span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button type="button" className="tp-btn-ghost" onClick={loadTemplate}>
                    <FiAward /> Use {form.tripType} template
                  </button>
                  <button type="button" className="tp-btn-ghost" onClick={() => addChecklistItem('other')}>
                    <FiPlus /> Add item
                  </button>
                </div>
              </div>

              {/* Smart hint — explains per-traveler duplication */}
              {travelerNames.length > 1 && (
                <div className="tp-smart-hint">
                  <FiAward />
                  <span>
                    Planning for <strong>{travelerNames.length} travelers</strong>
                    {travelerNames.length <= 4 && ` (${travelerNames.join(', ')})`}.
                    Per-person items like passport &amp; ID are added for each.
                  </span>
                </div>
              )}

              {form.checklist.length === 0 ? (
                <p className="tp-empty-small">Nothing here yet. Load a template above or add items manually.</p>
              ) : (
                <div className="tp-checklist-edit-groups">
                  {CHECKLIST_CATEGORIES.map(cat => {
                    const items = form.checklist
                      .map((c, i) => ({ ...c, _i: i }))
                      .filter(c => c.category === cat.value);
                    if (!items.length) return null;
                    return (
                      <div className="tp-checklist-edit-group" key={cat.value}>
                        <div className="tp-checklist-edit-group-head">
                          <span className="tp-checklist-edit-group-title">
                            <span className="tp-checklist-edit-group-emoji">{cat.icon}</span>
                            {cat.label}
                            <span className="tp-checklist-edit-group-count">{items.length}</span>
                          </span>
                          <button
                            type="button"
                            className="tp-checklist-edit-add"
                            onClick={() => addChecklistItem(cat.value)}
                            aria-label={`Add ${cat.label} item`}
                          >
                            <FiPlus /> Add
                          </button>
                        </div>
                        <div className="tp-checklist-edit-list">
                          {items.map(c => (
                            <div key={c._i} className="tp-checklist-edit-row">
                              <span className="tp-checklist-edit-emoji" aria-hidden="true">{cat.icon}</span>
                              <input
                                placeholder={`What do you need for ${cat.label.toLowerCase()}?`}
                                value={c.text}
                                onChange={e => updateChecklistItem(c._i, { text: e.target.value })}
                              />
                              <button
                                type="button"
                                className="tp-btn-icon-danger"
                                onClick={() => removeChecklistItem(c._i)}
                                aria-label="Remove item"
                              ><FiTrash2 /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {error && <div className="tp-error"><FiAlertCircle /> {error}</div>}
        </div>

        <div className="tp-modal-footer">
          <button className="tp-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="tp-btn-primary" onClick={save} disabled={saving || !form.title.trim()}>
            <FiCheck /> {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Trip'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- TRIP DETAIL MODAL -------------------------- */

function TripDetailModal({ trip, onClose, onUpdate, onDelete }) {
  const [tab, setTab] = useState('overview');
  const [local, setLocal] = useState(trip);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setLocal(trip); }, [trip]);

  if (!local) return null;

  const patch = async (partial) => {
    const next = { ...local, ...partial };
    setLocal(next);
    setSaving(true);
    try {
      const res = await API.put(`/api/user/trip-plans/${local._id}`, partial);
      onUpdate && onUpdate(res.data.trip || next);
    } catch {}
    setSaving(false);
  };

  const toggleChecklist = (i) => {
    const next = local.checklist.map((c, j) => j === i ? { ...c, done: !c.done } : c);
    patch({ checklist: next });
  };
  const addChecklist = (text, category) => {
    patch({ checklist: [...(local.checklist || []), { text, category: category || 'other', done: false }] });
  };
  const removeChecklist = (i) => {
    patch({ checklist: local.checklist.filter((_, j) => j !== i) });
  };

  const itinerary = local.itinerary || [];
  const addItineraryDay = () => {
    const dayNum = itinerary.length + 1;
    patch({ itinerary: [...itinerary, { day: dayNum, title: `Day ${dayNum}`, activities: [] }] });
  };
  const updateItineraryDay = (i, partial) => {
    patch({ itinerary: itinerary.map((d, j) => j === i ? { ...d, ...partial } : d) });
  };
  const removeItineraryDay = (i) => {
    patch({ itinerary: itinerary.filter((_, j) => j !== i).map((d, k) => ({ ...d, day: k + 1 })) });
  };

  const bookings = local.bookings || [];
  const addBooking = () => patch({ bookings: [...bookings, { type: 'flight', title: '', confirmation: '', url: '', cost: 0 }] });
  const updateBooking = (i, partial) => patch({ bookings: bookings.map((b, j) => j === i ? { ...b, ...partial } : b) });
  const removeBooking = (i) => patch({ bookings: bookings.filter((_, j) => j !== i) });

  const totalChecklist = local.checklist?.length || 0;
  const doneChecklist = local.checklist?.filter(c => c.done).length || 0;
  const checklistPct = totalChecklist > 0 ? Math.round((doneChecklist / totalChecklist) * 100) : 0;

  const budgetPct = local.budget?.estimated > 0
    ? Math.min(100, Math.round((local.budget.spent / local.budget.estimated) * 100)) : 0;

  const purpose = purposeMap[local.purpose] || purposeMap.leisure;
  const cd = daysUntil(local.startDate);

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal tp-detail" onClick={e => e.stopPropagation()}>
        <div className="tp-detail-hero" style={{ background: `linear-gradient(135deg, ${statusMap[local.status]?.color || '#818cf8'}20, ${statusMap[local.status]?.color || '#818cf8'}08)` }}>
          <button className="tp-close on-hero" onClick={onClose}><FiX /></button>
          <div className="tp-detail-hero-info">
            <div className="tp-detail-chips">
              <StatusPill status={local.status} />
              <span className="tp-chip-light">{purpose.icon} {purpose.label}</span>
              {local.tripType === 'domestic'
                ? <span className="tp-chip-light"><FaHome /> Domestic</span>
                : <span className="tp-chip-light"><FaPlane /> International</span>}
              <span className="tp-chip-light"><FiUsers /> {local.travelers || 1}</span>
            </div>
            <h2>{local.title}</h2>
            <div className="tp-detail-meta">
              {local.country && <span>{flagFor(local.country)} {local.country}</span>}
              {local.region && <span> · {local.region}</span>}
              {local.startDate && <span> · {fmtDate(local.startDate)}{local.endDate ? ` → ${fmtDate(local.endDate)}` : ''}</span>}
            </div>
          </div>
          {cd !== null && local.status !== 'completed' && local.status !== 'cancelled' && (
            <div className="tp-detail-countdown">
              {cd < 0 ? <><span className="cd-big">In progress</span></> :
               cd === 0 ? <><span className="cd-big">Today!</span></> :
               <><span className="cd-big">{cd}</span><span className="cd-sub">days to go</span></>}
            </div>
          )}
        </div>

        <div className="tp-modal-tabs">
          {[
            { id: 'overview',  label: 'Overview',  icon: <FiCompass /> },
            { id: 'itinerary', label: 'Itinerary', icon: <FiCalendar /> },
            { id: 'checklist', label: `Checklist${totalChecklist ? ` · ${doneChecklist}/${totalChecklist}` : ''}`, icon: <FiList /> },
            { id: 'budget',    label: 'Budget',    icon: <FiDollarSign /> },
            { id: 'bookings',  label: 'Bookings',  icon: <FiBriefcase /> },
          ].map(t => (
            <button key={t.id} className={`tp-modal-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="tp-modal-body">
          {tab === 'overview' && (
            <div className="tp-form-section">
              <div className="tp-overview-grid">
                <div className="tp-ov-card" data-accent="indigo">
                  <div className="tp-ov-icon"><FiCalendar /></div>
                  <div className="tp-ov-label">Duration</div>
                  <div className="tp-ov-value">
                    {local.startDate && local.endDate ? `${daysBetween(local.startDate, local.endDate)} days` : '—'}
                  </div>
                </div>
                <div className="tp-ov-card" data-accent="rose">
                  <div className="tp-ov-icon"><FiUsers /></div>
                  <div className="tp-ov-label">Travelers</div>
                  <div className="tp-ov-value">{local.travelers || 1}</div>
                </div>
                <div className="tp-ov-card" data-accent="amber">
                  <div className="tp-ov-icon"><FiDollarSign /></div>
                  <div className="tp-ov-label">Budget</div>
                  <div className="tp-ov-value">
                    {local.budget?.estimated ? `${local.budget.currency || '$'} ${local.budget.estimated.toLocaleString()}` : '—'}
                  </div>
                </div>
                <div className="tp-ov-card" data-accent="emerald">
                  <div className="tp-ov-icon"><FiList /></div>
                  <div className="tp-ov-label">Checklist</div>
                  <div className="tp-ov-value">{doneChecklist}/{totalChecklist}</div>
                  {totalChecklist > 0 && (
                    <div className="tp-ov-bar"><span style={{ width: `${checklistPct}%` }} /></div>
                  )}
                </div>
              </div>
              {local.cities?.length > 0 && (
                <div className="tp-ov-section">
                  <div className="tp-ov-h">Cities</div>
                  <div className="tp-chip-row">
                    {local.cities.map(c => <span key={c} className="tp-chip-light"><FiMapPin /> {c}</span>)}
                  </div>
                </div>
              )}
              {local.coTravelers?.length > 0 && (
                <div className="tp-ov-section">
                  <div className="tp-ov-h">Co-travelers</div>
                  <div className="tp-cotravelers-list compact">
                    {local.coTravelers.map((c, i) => (
                      <div key={i} className="tp-cotraveler-chip compact">
                        <span className="tp-cotraveler-avatar small">
                          {(c.name || c.email || '?').split(' ').map(s => s[0]).filter(Boolean).join('').toUpperCase().slice(0, 2)}
                        </span>
                        <span className="tp-cotraveler-name">{c.name || c.email}</span>
                        {c.status === 'invited' && <span className="tp-chip-light" style={{ fontSize: '0.7rem' }}>Invited</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {local.notes && (
                <div className="tp-ov-section">
                  <div className="tp-ov-h">Notes</div>
                  <p className="tp-ov-notes">{local.notes}</p>
                </div>
              )}
              <div className="tp-ov-section">
                <div className="tp-ov-h">Status</div>
                <div className="tp-seg">
                  {STATUSES.map(s => (
                    <button key={s.value}
                      className={`tp-seg-btn ${local.status === s.value ? 'active' : ''}`}
                      onClick={() => patch({ status: s.value })}
                      style={{ '--seg-color': s.color }}
                    >{s.label}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'itinerary' && (
            <div className="tp-form-section">
              <div className="tp-checklist-header">
                <span>Day-by-day plan</span>
                <button className="tp-btn-ghost" onClick={addItineraryDay}><FiPlus /> Add day</button>
              </div>
              {itinerary.length === 0 ? (
                <p className="tp-empty-small">Break your trip into days. Add activities, spots to visit, meals to try.</p>
              ) : (
                <div className="tp-itinerary-list">
                  {itinerary.map((d, i) => (
                    <ItineraryDayEditor key={i} day={d} idx={i} onChange={p => updateItineraryDay(i, p)} onRemove={() => removeItineraryDay(i)} />
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'checklist' && (
            <div className="tp-form-section">
              <div className="tp-progress-bar-wrap">
                <div className="tp-progress-bar" style={{ width: `${checklistPct}%` }} />
                <span>{checklistPct}% done</span>
              </div>
              <ChecklistEditor
                items={local.checklist || []}
                onToggle={toggleChecklist}
                onAdd={addChecklist}
                onRemove={removeChecklist}
              />
            </div>
          )}

          {tab === 'budget' && (
            <BudgetEditor local={local} onPatch={patch} budgetPct={budgetPct} />
          )}

          {tab === 'bookings' && (
            <div className="tp-form-section">
              <div className="tp-checklist-header">
                <span>Confirmations &amp; reservations</span>
                <button className="tp-btn-ghost" onClick={addBooking}><FiPlus /> Add booking</button>
              </div>
              {bookings.length === 0 ? (
                <p className="tp-empty-small">Track flight confirmations, hotel bookings, rentals — one place for everything.</p>
              ) : (
                <div className="tp-bookings-list">
                  {bookings.map((b, i) => (
                    <BookingEditor key={i} booking={b} onChange={p => updateBooking(i, p)} onRemove={() => removeBooking(i)} currency={local.budget?.currency} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="tp-modal-footer between">
          <button className="tp-btn-danger" onClick={() => { if (window.confirm('Delete this trip?')) onDelete(local._id); }}>
            <FiTrash2 /> Delete
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {saving && <span className="tp-saving">Saving…</span>}
            <button className="tp-btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItineraryDayEditor({ day, idx, onChange, onRemove }) {
  const [activityInput, setActivityInput] = useState('');
  const addActivity = () => {
    const a = activityInput.trim(); if (!a) return;
    onChange({ activities: [...(day.activities || []), a] });
    setActivityInput('');
  };
  const removeActivity = (i) => onChange({ activities: day.activities.filter((_, j) => j !== i) });
  return (
    <div className="tp-itinerary-day">
      <div className="tp-itinerary-head">
        <div className="tp-day-num">Day {day.day || idx + 1}</div>
        <input className="tp-day-title" placeholder="What's this day about?"
          value={day.title || ''} onChange={e => onChange({ title: e.target.value })} />
        <input type="date" value={day.date ? day.date.split('T')[0] : ''}
          onChange={e => onChange({ date: e.target.value })} />
        <button className="tp-btn-icon-danger" onClick={onRemove}><FiTrash2 /></button>
      </div>
      <div className="tp-activities">
        {(day.activities || []).map((a, i) => (
          <div key={i} className="tp-activity-row">
            <FiChevronRight />
            <span>{a}</span>
            <button className="tp-btn-icon-danger" onClick={() => removeActivity(i)}><FiX /></button>
          </div>
        ))}
        <div className="tp-activity-add">
          <input placeholder="Add an activity or spot"
            value={activityInput}
            onChange={e => setActivityInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addActivity(); } }}
          />
          <button className="tp-btn-ghost" onClick={addActivity}><FiPlus /></button>
        </div>
      </div>
    </div>
  );
}

function ChecklistEditor({ items, onToggle, onAdd, onRemove }) {
  const [text, setText] = useState('');
  const [cat, setCat] = useState('other');
  const grouped = useMemo(() => {
    const g = {};
    items.forEach((it, i) => {
      const c = it.category || 'other';
      if (!g[c]) g[c] = [];
      g[c].push({ ...it, _i: i });
    });
    return g;
  }, [items]);

  const submit = () => {
    const t = text.trim();
    if (!t) return;
    onAdd(t, cat);
    setText('');
  };

  return (
    <>
      <div className="tp-checklist-add">
        <select value={cat} onChange={e => setCat(e.target.value)}>
          {CHECKLIST_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
        </select>
        <input placeholder="Add checklist item"
          value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }} />
        <button className="tp-btn-primary small" onClick={submit}><FiPlus /> Add</button>
      </div>
      {CHECKLIST_CATEGORIES.filter(c => grouped[c.value]?.length).map(cat => (
        <div key={cat.value} className="tp-checklist-group">
          <div className="tp-checklist-group-title">{cat.icon} {cat.label}</div>
          {grouped[cat.value].map(it => (
            <div key={it._i} className={`tp-checklist-item ${it.done ? 'done' : ''}`}>
              <button className="tp-check" onClick={() => onToggle(it._i)}>
                {it.done && <FiCheck />}
              </button>
              <span className="tp-check-text">{it.text}</span>
              <button className="tp-btn-icon-danger" onClick={() => onRemove(it._i)}><FiTrash2 /></button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

function BudgetEditor({ local, onPatch, budgetPct }) {
  const [est, setEst] = useState(local.budget?.estimated || 0);
  const [spent, setSpent] = useState(local.budget?.spent || 0);
  const [currency, setCurrency] = useState(local.budget?.currency || 'USD');

  useEffect(() => {
    setEst(local.budget?.estimated || 0);
    setSpent(local.budget?.spent || 0);
    setCurrency(local.budget?.currency || 'USD');
  }, [local]);

  const save = () => {
    onPatch({ budget: { estimated: Number(est) || 0, spent: Number(spent) || 0, currency } });
  };

  const remaining = Math.max(0, (Number(est) || 0) - (Number(spent) || 0));
  const over = (Number(spent) || 0) > (Number(est) || 0);

  return (
    <div className="tp-form-section">
      <div className="tp-budget-hero">
        <div className="tp-budget-big">
          <span className="tp-budget-num">{currency} {(Number(spent) || 0).toLocaleString()}</span>
          <span className="tp-budget-lbl">of {currency} {(Number(est) || 0).toLocaleString()}</span>
        </div>
        <div className="tp-budget-progress">
          <div className="tp-budget-progress-fill" style={{ width: `${Math.min(100, budgetPct)}%`, background: over ? '#f87171' : 'linear-gradient(90deg, #6366f1, #10b981)' }} />
        </div>
        <div className="tp-budget-stats">
          <span>{over ? `Over by ${currency} ${((Number(spent) || 0) - (Number(est) || 0)).toLocaleString()}` : `${currency} ${remaining.toLocaleString()} left`}</span>
          <span>{budgetPct}% used</span>
        </div>
      </div>
      <div className="tp-field-row">
        <div className="tp-field">
          <label>Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)}>
            {['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'AED', 'SGD'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="tp-field">
          <label>Estimated</label>
          <input type="number" min="0" value={est} onChange={e => setEst(e.target.value)} />
        </div>
        <div className="tp-field">
          <label>Spent</label>
          <input type="number" min="0" value={spent} onChange={e => setSpent(e.target.value)} />
        </div>
      </div>
      <button className="tp-btn-primary" onClick={save}><FiCheck /> Save Budget</button>
    </div>
  );
}

function BookingEditor({ booking, onChange, onRemove, currency }) {
  return (
    <div className="tp-booking-row">
      <div className="tp-booking-top">
        <select value={booking.type || 'flight'} onChange={e => onChange({ type: e.target.value })}>
          {BOOKING_TYPES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>
        <input placeholder="Title (e.g. Delta DL408, Hilton Times Sq)"
          value={booking.title || ''} onChange={e => onChange({ title: e.target.value })} />
        <button className="tp-btn-icon-danger" onClick={onRemove}><FiTrash2 /></button>
      </div>
      <div className="tp-booking-bottom">
        <input placeholder="Confirmation #" value={booking.confirmation || ''} onChange={e => onChange({ confirmation: e.target.value })} />
        <input placeholder="Booking URL" value={booking.url || ''} onChange={e => onChange({ url: e.target.value })} />
        <input type="number" min="0" placeholder={`Cost (${currency || 'USD'})`}
          value={booking.cost || ''} onChange={e => onChange({ cost: Number(e.target.value) || 0 })} />
        <input type="date" value={booking.date ? booking.date.split('T')[0] : ''} onChange={e => onChange({ date: e.target.value })} />
      </div>
    </div>
  );
}

/* ------------------------------ MAIN PAGE ------------------------------ */

export default function TravelPlanner() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');
  const [formModal, setFormModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [detailTrip, setDetailTrip] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/user/trip-plans');
      setTrips(res.data.tripPlans || []);
    } catch { setTrips([]); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const { filtered, stats, isUpcoming, isOngoing } = useMemo(() => {
    const now = new Date();
    const isUpcoming = t => t.status !== 'completed' && t.status !== 'cancelled' && (!t.startDate || new Date(t.startDate) >= now);
    const isOngoing = t => t.startDate && t.endDate && new Date(t.startDate) <= now && new Date(t.endDate) >= now && t.status !== 'completed' && t.status !== 'cancelled';

    let list;
    if (filter === 'all') list = trips;
    else if (filter === 'upcoming') list = trips.filter(isUpcoming);
    else if (filter === 'ongoing') list = trips.filter(isOngoing);
    else if (filter === 'completed') list = trips.filter(t => t.status === 'completed');
    else list = trips.filter(t => t.status === filter);
    const filtered = [...list].sort((a, b) => {
      if (a.startDate && b.startDate) return new Date(a.startDate) - new Date(b.startDate);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const active = trips.filter(t => t.status !== 'completed' && t.status !== 'cancelled');
    const nextTrip = [...active].filter(t => t.startDate && new Date(t.startDate) >= now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];
    const countries = new Set(trips.map(t => t.country).filter(Boolean));
    const totalBudget = trips.reduce((s, t) => s + (t.budget?.estimated || 0), 0);

    return {
      filtered,
      isUpcoming,
      isOngoing,
      stats: { total: trips.length, active: active.length, nextTrip, countries: countries.size, totalBudget },
    };
  }, [trips, filter]);

  const handleSaved = async () => { await load(); };
  const handleUpdateTrip = (updated) => {
    setTrips(prev => prev.map(t => t._id === updated._id ? { ...t, ...updated } : t));
    setDetailTrip(prev => prev ? { ...prev, ...updated } : prev);
  };
  const handleDelete = async (id) => {
    try { await API.delete(`/api/user/trip-plans/${id}`); } catch {}
    setTrips(prev => prev.filter(t => t._id !== id));
    setDetailTrip(null);
  };

  return (
    <Layout>
      <div className="planner-page">
        {/* Header */}
        <div className="planner-hdr">
          <div>
            <h1 className="planner-title">Trip Planner</h1>
            <p className="planner-subtitle">The best trips are the ones you actually plan. Here's your command center.</p>
          </div>
          <button className="tp-btn-primary big" onClick={() => { setEditingTrip(null); setFormModal(true); }}>
            <FiPlus /> New Trip
          </button>
        </div>

        {/* Stats */}
        <div className="planner-stats">
          <div className="pst-card">
            <div className="pst-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}><FiBookOpen /></div>
            <div><div className="pst-num">{stats.total}</div><div className="pst-lbl">Total trips</div></div>
          </div>
          <div className="pst-card">
            <div className="pst-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#10b981' }}><FiCompass /></div>
            <div><div className="pst-num">{stats.active}</div><div className="pst-lbl">Active plans</div></div>
          </div>
          <div className="pst-card">
            <div className="pst-icon" style={{ background: 'rgba(244, 114, 182, 0.15)', color: '#ec4899' }}><FaMapMarkerAlt /></div>
            <div><div className="pst-num">{stats.countries}</div><div className="pst-lbl">Countries planned</div></div>
          </div>
          <div className="pst-card pst-highlight">
            <div className="pst-icon" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#f59e0b' }}><FiClock /></div>
            <div>
              {stats.nextTrip ? (
                <>
                  <div className="pst-num">{daysUntil(stats.nextTrip.startDate) ?? '—'}</div>
                  <div className="pst-lbl">days to <strong>{stats.nextTrip.title}</strong></div>
                </>
              ) : (
                <><div className="pst-num">—</div><div className="pst-lbl">No next trip</div></>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="planner-tabs">
          {[
            { v: 'upcoming',  l: 'Upcoming',  n: trips.filter(isUpcoming).length },
            { v: 'ongoing',   l: 'Ongoing',   n: trips.filter(isOngoing).length },
            { v: 'planning',  l: 'Planning',  n: trips.filter(t => t.status === 'planning').length },
            { v: 'booked',    l: 'Booked',    n: trips.filter(t => t.status === 'booked').length },
            { v: 'idea',      l: 'Ideas',     n: trips.filter(t => t.status === 'idea').length },
            { v: 'completed', l: 'Completed', n: trips.filter(t => t.status === 'completed').length },
            { v: 'all',       l: 'All',       n: trips.length },
          ].map(t => (
            <button key={t.v}
              className={`planner-tab ${filter === t.v ? 'active' : ''}`}
              onClick={() => setFilter(t.v)}
            >{t.l}{t.n > 0 && <span className="planner-tab-count">{t.n}</span>}</button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="planner-grid">{[0,1,2].map(i => <div key={i} className="planner-card skeleton-card" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState filter={filter} onNew={() => { setEditingTrip(null); setFormModal(true); }} />
        ) : (
          <div className="planner-grid">
            {filtered.map(trip => (
              <TripCard
                key={trip._id}
                trip={trip}
                onOpen={() => setDetailTrip(trip)}
                onEdit={() => { setEditingTrip(trip); setFormModal(true); }}
                onDelete={() => { if (window.confirm('Delete this trip?')) handleDelete(trip._id); }}
              />
            ))}
          </div>
        )}

        {formModal && (
          <TripFormModal
            editing={editingTrip}
            onClose={() => { setFormModal(false); setEditingTrip(null); }}
            onSaved={handleSaved}
          />
        )}
        {detailTrip && (
          <TripDetailModal
            trip={detailTrip}
            onClose={() => setDetailTrip(null)}
            onUpdate={handleUpdateTrip}
            onDelete={handleDelete}
          />
        )}
      </div>
    </Layout>
  );
}

function TripCard({ trip, onOpen, onEdit, onDelete }) {
  const purpose = purposeMap[trip.purpose] || purposeMap.leisure;
  const duration = daysBetween(trip.startDate, trip.endDate);
  const totalChecklist = trip.checklist?.length || 0;
  const doneChecklist = trip.checklist?.filter(c => c.done).length || 0;
  const checklistPct = totalChecklist > 0 ? (doneChecklist / totalChecklist) * 100 : 0;
  const budgetPct = trip.budget?.estimated > 0 ? Math.min(100, (trip.budget.spent / trip.budget.estimated) * 100) : 0;

  return (
    <div className="planner-card" onClick={onOpen}>
      <div className="pc-top">
        <div className="pc-flag-col">
          <span className="pc-flag">{flagFor(trip.country)}</span>
          <span className="pc-purpose" title={purpose.label}>{purpose.icon}</span>
        </div>
        <div className="pc-title-col">
          <h3 className="pc-title">{trip.title}</h3>
          <div className="pc-dest"><FiMapPin /> {trip.destination || trip.country || 'Destination TBD'}{trip.region ? ` · ${trip.region}` : ''}</div>
        </div>
        <StatusPill status={trip.status} />
      </div>

      <div className="pc-meta">
        {(trip.startDate || trip.endDate) && (
          <div className="pc-meta-item">
            <FiCalendar /> {fmtDate(trip.startDate)}{trip.endDate ? ` → ${fmtDate(trip.endDate)}` : ''}
            {duration > 0 && <span className="pc-meta-sub"> · {duration} day{duration === 1 ? '' : 's'}</span>}
          </div>
        )}
        <div className="pc-meta-item"><FiUsers /> {trip.travelers || 1} traveler{(trip.travelers || 1) > 1 ? 's' : ''}</div>
        {trip.coTravelers?.length > 0 && (
          <div className="pc-meta-item">
            <div className="tp-avatar-stack">
              {trip.coTravelers.slice(0, 4).map((c, i) => (
                <span key={i} className="tp-avatar-tiny" title={c.name || c.email}>
                  {(c.name || c.email || '?').split(' ').map(s => s[0]).filter(Boolean).join('').toUpperCase().slice(0, 2)}
                </span>
              ))}
              {trip.coTravelers.length > 4 && <span className="tp-avatar-tiny more">+{trip.coTravelers.length - 4}</span>}
            </div>
            <span>{trip.coTravelers.length} with you</span>
          </div>
        )}
      </div>

      <Countdown startDate={trip.startDate} status={trip.status} />

      {(totalChecklist > 0 || trip.budget?.estimated > 0) && (
        <div className="pc-progress-rows">
          {totalChecklist > 0 && (
            <div className="pc-progress-row">
              <div className="pc-progress-label"><FiList /> Checklist <span>{doneChecklist}/{totalChecklist}</span></div>
              <div className="pc-progress-track"><div className="pc-progress-fill" style={{ width: `${checklistPct}%`, background: '#10b981' }} /></div>
            </div>
          )}
          {trip.budget?.estimated > 0 && (
            <div className="pc-progress-row">
              <div className="pc-progress-label"><FiDollarSign /> Budget <span>{Math.round(budgetPct)}%</span></div>
              <div className="pc-progress-track"><div className="pc-progress-fill" style={{ width: `${budgetPct}%`, background: budgetPct > 100 ? '#f87171' : 'linear-gradient(90deg, #6366f1, #10b981)' }} /></div>
            </div>
          )}
        </div>
      )}

      <div className="pc-actions" onClick={e => e.stopPropagation()}>
        <button className="pc-btn" onClick={onOpen}>Open <FiChevronRight /></button>
        <button className="pc-btn ghost" onClick={onEdit} title="Edit"><FiEdit2 /></button>
        <button className="pc-btn danger" onClick={onDelete} title="Delete"><FiTrash2 /></button>
      </div>
    </div>
  );
}

function EmptyState({ filter, onNew }) {
  const messages = {
    upcoming: { title: 'No upcoming trips', desc: 'Your calendar is wide open. Plan something bold.' },
    ongoing: { title: 'No trip in progress right now', desc: 'When you\'re on a trip, you\'ll see it here in real time.' },
    planning: { title: 'No trips being planned', desc: 'Start plotting a future adventure — set a destination and dates.' },
    booked: { title: 'No booked trips yet', desc: 'Once flights and hotels are locked in, move trips to Booked.' },
    idea: { title: 'No wishlist trips', desc: 'Drop bucket-list ideas here. No pressure, no dates required.' },
    completed: { title: 'No completed trips yet', desc: 'When you finish a trip, mark it complete to build your travel resume.' },
    all: { title: 'No trips yet', desc: 'Your first plan is a few clicks away.' },
  };
  const m = messages[filter] || messages.all;
  return (
    <div className="planner-empty">
      <div className="planner-empty-icon"><FiCompass /></div>
      <h3>{m.title}</h3>
      <p>{m.desc}</p>
      <button className="tp-btn-primary" onClick={onNew}><FiPlus /> New Trip</button>
    </div>
  );
}
