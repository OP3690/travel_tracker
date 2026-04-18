import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaCamera, FaTrash, FaMapMarkerAlt, FaCalendar, FaPen, FaCheck, FaGlobe, FaUserFriends, FaLock, FaCity } from 'react-icons/fa';
import API from '../api/api';
import allCountries from '../utils/countries';
import { getCountryRegions } from '../utils/getCountryRegions';
import './AddMemoryModal.css';

const MAX_PHOTOS = 4;
const MAX_WORDS = 1000;
const MAX_DIMENSION = 2400;
const MAX_SIZE_KB = 2500;

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

// Canvas-based client compression to keep base64 size reasonable
async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.85;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        while (dataUrl.length / 1024 > MAX_SIZE_KB && quality > 0.3) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AddMemoryModal({ onClose, onSaved, editMemory }) {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [story, setStory] = useState('');
  const [dateVisited, setDateVisited] = useState('');
  const [photos, setPhotos] = useState([]);
  const [visibility, setVisibility] = useState('friends');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [availableRegions, setAvailableRegions] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editMemory) {
      setTitle(editMemory.title || '');
      setCountry(editMemory.country || '');
      // Legacy memories stored "Region, City" in a single field — try to split
      const raw = editMemory.region || '';
      if (raw.includes(',')) {
        const [r, ...rest] = raw.split(',');
        setRegion(r.trim());
        setCity(rest.join(',').trim());
      } else {
        setRegion(raw);
        setCity(editMemory.city || '');
      }
      setStory(editMemory.story || '');
      setDateVisited(editMemory.dateVisited ? editMemory.dateVisited.split('T')[0] : '');
      setPhotos(editMemory.photos || []);
      setVisibility(editMemory.visibility || 'friends');
    } else {
      try {
        const stored = JSON.parse(localStorage.getItem('user'));
        if (stored?.country) setCountry(stored.country);
      } catch {}
    }
  }, [editMemory]);

  // Load regions when country changes
  useEffect(() => {
    let cancelled = false;
    if (!country) { setAvailableRegions([]); return; }
    getCountryRegions(country).then(list => {
      if (!cancelled) setAvailableRegions(list);
    });
    return () => { cancelled = true; };
  }, [country]);

  const wordCount = countWords(story);
  const wordsLeft = MAX_WORDS - wordCount;
  const overLimit = wordCount > MAX_WORDS;

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) {
      setError(`Maximum ${MAX_PHOTOS} photos allowed`);
      return;
    }
    const toProcess = files.slice(0, remaining);
    setError('');
    try {
      const compressed = await Promise.all(toProcess.map(compressImage));
      setPhotos(prev => [...prev, ...compressed]);
    } catch {
      setError('Failed to process one or more images');
    }
    e.target.value = '';
  };

  const removePhoto = (idx) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!title.trim()) { setError('Please add a title'); return; }
    if (overLimit) { setError(`Story must be ${MAX_WORDS} words or less`); return; }
    setSaving(true);
    setError('');
    try {
      // Combine region + city into single field for backward-compat with backend schema
      const combinedRegion = [region, city].filter(Boolean).join(city && region ? ', ' : '').trim();
      const payload = {
        title: title.trim(),
        country: country || undefined,
        region: combinedRegion || undefined,
        story,
        photos,
        dateVisited: dateVisited || undefined,
        visibility,
      };
      if (editMemory?._id) {
        await API.put(`/api/user/memories/${editMemory._id}`, payload);
      } else {
        await API.post('/api/user/memories', payload);
      }
      onSaved && onSaved();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to save memory');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mem-modal-overlay" onClick={onClose}>
      <div className="mem-modal" onClick={e => e.stopPropagation()}>
        <div className="mem-modal-header">
          <div className="mem-modal-header-text">
            <h2>{editMemory ? '✏️ Edit Memory' : '✨ New Memory'}</h2>
            <p>Capture the place, the moment, the feeling.</p>
          </div>
          <button className="mem-close" onClick={onClose} aria-label="Close"><FaTimes /></button>
        </div>

        <div className="mem-modal-body">
          {/* SECTION: WHERE */}
          <div className="mem-section">
            <div className="mem-section-head">
              <span className="mem-section-num">1</span>
              <div>
                <h3>Where were you?</h3>
                <span className="mem-section-sub">Country, then a region or city</span>
              </div>
            </div>
            <div className="mem-section-body">
              <div className="mem-field-row" style={{ gridTemplateColumns: '1fr 180px' }}>
                <div className="mem-field">
                  <label><FaMapMarkerAlt /> Country</label>
                  <select value={country} onChange={e => { setCountry(e.target.value); setRegion(''); }}>
                    <option value="">Select country</option>
                    {allCountries.map(c => (
                      <option key={c.value} value={c.value}>{c.flag} {c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="mem-field">
                  <label><FaCalendar /> Date</label>
                  <input type="date" value={dateVisited} onChange={e => setDateVisited(e.target.value)} />
                </div>
              </div>

              <div className="mem-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="mem-field">
                  <label>State / Province / Region</label>
                  {availableRegions.length > 0 ? (
                    <select value={region} onChange={e => setRegion(e.target.value)}>
                      <option value="">Select a region</option>
                      {availableRegions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={country ? 'e.g. California' : 'Pick a country first'}
                      value={region}
                      onChange={e => setRegion(e.target.value)}
                      disabled={!country}
                    />
                  )}
                </div>
                <div className="mem-field">
                  <label><FaCity /> City / Location <span className="mem-optional">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: STORY */}
          <div className="mem-section">
            <div className="mem-section-head">
              <span className="mem-section-num">2</span>
              <div>
                <h3>The story</h3>
                <span className="mem-section-sub">Give it a title and write the memory</span>
              </div>
            </div>
            <div className="mem-section-body">
              <div className="mem-field">
                <label><FaPen /> Title</label>
                <input
                  type="text"
                  placeholder="e.g. Golden Gate at sunset"
                  value={title}
                  maxLength={120}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="mem-field">
                <label>
                  Your Story
                  <span className={`mem-count ${overLimit ? 'over' : ''}`}>
                    {wordCount} / {MAX_WORDS} words
                  </span>
                </label>
                <textarea
                  rows={8}
                  placeholder="Tell the story. The view from the bridge, the street food, the stranger who gave you directions — the little things that made it unforgettable."
                  value={story}
                  onChange={e => setStory(e.target.value)}
                />
                <p className="mem-hint">
                  {overLimit
                    ? `${-wordsLeft} words over the limit — please trim`
                    : `${wordsLeft} words remaining`}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION: PHOTOS */}
          <div className="mem-section">
            <div className="mem-section-head">
              <span className="mem-section-num">3</span>
              <div>
                <h3>Photos <span className="mem-sh-count">{photos.length}/{MAX_PHOTOS}</span></h3>
                <span className="mem-section-sub">Up to 4, max 2.5&nbsp;MB each — auto-optimised</span>
              </div>
            </div>
            <div className="mem-section-body">
              <div className="mem-photos-grid">
                {photos.map((p, i) => (
                  <div key={i} className="mem-photo-thumb">
                    <img src={p} alt={`memory ${i + 1}`} />
                    <button type="button" className="mem-photo-remove" onClick={() => removePhoto(i)} aria-label="Remove"><FaTrash /></button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    className="mem-photo-add"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaCamera />
                    <span>Add photo</span>
                    <span className="mem-photo-add-hint">JPG, PNG, HEIC</span>
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* SECTION: VISIBILITY */}
          <div className="mem-section">
            <div className="mem-section-head">
              <span className="mem-section-num">4</span>
              <div>
                <h3>Who can see this?</h3>
                <span className="mem-section-sub">You control who sees each memory</span>
              </div>
            </div>
            <div className="mem-section-body">
              <div className="mem-visibility-row">
                {[
                  { value: 'public', icon: <FaGlobe />, title: 'Public', desc: 'Anyone on StampYourMap' },
                  { value: 'friends', icon: <FaUserFriends />, title: 'Friends', desc: 'Only your friends' },
                  { value: 'private', icon: <FaLock />, title: 'Private', desc: 'Only you' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`mem-vis-opt ${visibility === opt.value ? 'active' : ''}`}
                    onClick={() => setVisibility(opt.value)}
                  >
                    <span className="mem-vis-icon">{opt.icon}</span>
                    <span className="mem-vis-title">{opt.title}</span>
                    <span className="mem-vis-desc">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && <div className="mem-error">{error}</div>}
        </div>

        <div className="mem-modal-footer">
          <button className="mem-btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="mem-btn-primary" onClick={handleSave} disabled={saving || overLimit || !title.trim()}>
            <FaCheck /> {saving ? 'Saving…' : editMemory ? 'Save Changes' : 'Save Memory'}
          </button>
        </div>
      </div>
    </div>
  );
}
