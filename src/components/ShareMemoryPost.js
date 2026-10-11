import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { FaTimes, FaDownload, FaInstagram, FaFacebook, FaPinterest, FaSnapchat, FaCopy, FaMapPin, FaPalette } from 'react-icons/fa';
import API from '../api/api';
import allCountries from '../utils/countries';
import countryToCode from '../utils/countryCodeMap';
import './ShareMemoryPost.css';

// Re-use the same static maps CountryMap does — needed for path rendering inside the post
import India from '@svg-maps/india';
import USA from '@svg-maps/usa';
import Japan from '@svg-maps/japan';
import Brazil from '@svg-maps/brazil';
import Italy from '@svg-maps/italy';
import FranceRegions from '@svg-maps/france.regions';
import Germany from '@svg-maps/germany';
import Canada from '@svg-maps/canada';
import Spain from '@svg-maps/spain';
import Mexico from '@svg-maps/mexico';
import Nigeria from '@svg-maps/nigeria';
import Romania from '@svg-maps/romania';
import Taiwan from '@svg-maps/taiwan';
import Thailand from '@svg-maps/thailand';
import SouthKorea from '@svg-maps/south-korea';
import Australia from '@svg-maps/australia';
import China from '@svg-maps/china';
import Vietnam from '@svg-maps/vietnam';
import Ukraine from '@svg-maps/ukraine';
import Denmark from '@svg-maps/denmark';
import SaudiArabia from '@svg-maps/saudi-arabia';
import Colombia from '@svg-maps/colombia';
import Austria from '@svg-maps/austria';
import Uzbekistan from '@svg-maps/uzbekistan';
import Indonesia from '@svg-maps/indonesia';

const staticMaps = {
  India, USA, Japan, Brazil, Italy,
  France: FranceRegions, Germany, Canada, Spain, Mexico,
  Nigeria, Romania, Taiwan, Thailand, 'South Korea': SouthKorea,
  Australia, China, Vietnam, Ukraine, Denmark,
  'Saudi Arabia': SaudiArabia, Colombia, Austria, Uzbekistan, Indonesia,
};

const MAX_MESSAGE = 320;
const DEFAULT_MESSAGE = "Every pin on your map tells a story. From first solo trips to unforgettable sunsets and streets you never planned to find—your journey is uniquely yours. Keep exploring, keep collecting memories, and watch your world grow one destination at a time. 🌍✈️";

function flagFor(country) {
  const c = allCountries.find(x => x.value === country);
  return c?.flag || '🌍';
}
function formatDate(d) {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }); }
  catch { return ''; }
}

function getMapDataForCountry(country) {
  // Sync: check static first
  if (staticMaps[country]) return Promise.resolve(staticMaps[country]);
  const code = countryToCode[country];
  if (!code) return Promise.resolve(null);
  return import(`../assets/maps/${code}.json`).then(mod => mod.default || mod).catch(() => null);
}

// Find the path of the selected region to place a pin at its centroid
function getRegionCentroid(mapData, regionName) {
  if (!mapData || !regionName) return null;
  const loc = (mapData.locations || []).find(
    l => (l.name || '').toLowerCase() === regionName.toLowerCase()
  );
  if (!loc?.path) return null;

  // Parse the path's M/L/C coords to approximate a centroid.
  // Fast-and-good: just extract all numeric pairs and average.
  const nums = (loc.path.match(/-?\d+(\.\d+)?/g) || []).map(Number);
  if (nums.length < 4) return null;
  let sumX = 0, sumY = 0, count = 0;
  for (let i = 0; i < nums.length - 1; i += 2) {
    sumX += nums[i];
    sumY += nums[i + 1];
    count++;
  }
  return count > 0 ? { x: sumX / count, y: sumY / count } : null;
}

// Trip-type tags — one-tap categorization that renders as a stamp on
// the poster ("HONEYMOON · ROME 2026"). Covers the common life moments
// people share from (first solo trip, honeymoon, bucket-list hit, work
// travel, etc.). A "Custom" option lets the user write their own, so
// the list stays short + opinionated instead of a sprawling dropdown.
const TRIP_TAGS = [
  { id: 'first_solo',   label: 'My First Solo Trip', emoji: '🎒' },
  { id: 'solo',         label: 'Solo Trip',          emoji: '🧳' },
  { id: 'honeymoon',    label: 'Honeymoon',          emoji: '💍' },
  { id: 'anniversary',  label: 'Anniversary',        emoji: '🥂' },
  { id: 'family',       label: 'Family Trip',        emoji: '👨‍👩‍👧' },
  { id: 'friends',      label: 'With Friends',       emoji: '👯' },
  { id: 'summer',       label: 'Summer Vacation',    emoji: '☀️' },
  { id: 'winter',       label: 'Winter Escape',      emoji: '❄️' },
  { id: 'business',     label: 'Business Trip',      emoji: '💼' },
  { id: 'school',       label: 'School Trip',        emoji: '🎓' },
  { id: 'reunion',      label: 'Reunion',            emoji: '🤝' },
  { id: 'birthday',     label: 'Birthday Trip',      emoji: '🎂' },
  { id: 'bucket',       label: 'Bucket List',        emoji: '✨' },
  { id: 'roadtrip',     label: 'Road Trip',          emoji: '🚗' },
  { id: 'adventure',    label: 'Adventure',          emoji: '⛰️' },
  { id: 'backpacking',  label: 'Backpacking',        emoji: '🥾' },
  { id: 'wellness',     label: 'Wellness Retreat',   emoji: '🧘' },
  { id: 'festival',     label: 'Festival',           emoji: '🎉' },
  { id: 'pilgrimage',   label: 'Pilgrimage',         emoji: '🙏' },
  { id: 'weekend',      label: 'Weekend Getaway',    emoji: '🌴' },
];

// Caption vibes — curated 1-click message presets. Keeps the user from
// staring at a blank textarea; most people pick one and lightly edit.
// Each preset uses {{title}} / {{place}} tokens so the vibe stays specific.
const CAPTION_PRESETS = [
  {
    id: 'wander',
    label: '✈️ Wanderer',
    text: "Chasing stories {{place}} will never stop telling. {{title}} stays with me — the smells, the strangers who became friends, the detours that turned into the trip. 🌍",
  },
  {
    id: 'reflect',
    label: '🌙 Reflective',
    text: "Some places change the way you see yourself. {{title}} — a chapter I didn't know I was writing until the plane was taking off again. Grateful for every detour.",
  },
  {
    id: 'hype',
    label: '🔥 Hype',
    text: "Okay {{place}}, you understood the assignment. {{title}} = unreal. Bags still packed in spirit. Who's coming next time? 🚀",
  },
  {
    id: 'minimal',
    label: '🤍 Minimal',
    text: "{{title}}. {{place}}. Enough said. 📍",
  },
  {
    id: 'poetic',
    label: '📖 Poetic',
    text: "{{place}} doesn't shout. It hums. It stays. {{title}} is one of those memories I'll walk past on a Tuesday and feel again, warm and whole.",
  },
];

// Hashtag suggestions — click to append to the caption. Mix of broad reach
// (#travel #travelgram), the place itself, and intent (#bucketlist).
function buildHashtagChips(memory) {
  const base = ['#travel', '#travelgram', '#wanderlust', '#stampyourmap', '#bucketlist', '#traveldiaries'];
  const place = (memory?.country || '').replace(/\s+/g, '');
  const region = (memory?.region  || '').replace(/\s+/g, '');
  const extras = [place && `#${place}`, region && `#${region}`, place && `#visit${place}`].filter(Boolean);
  return [...extras, ...base].slice(0, 10);
}

// Human-friendly "days ago" badge shown on the poster so viewers get a
// sense of recency without reading the date.
function daysAgoBadge(d) {
  if (!d) return null;
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
  if (isNaN(diff) || diff < 0) return null;
  if (diff === 0)   return 'TODAY';
  if (diff === 1)   return '1 DAY AGO';
  if (diff < 30)    return `${diff} DAYS AGO`;
  if (diff < 365)   return `${Math.round(diff / 30)} MONTHS AGO`;
  const years = (diff / 365).toFixed(diff < 730 ? 1 : 0);
  return `${years} ${years === '1' || years === '1.0' ? 'YEAR' : 'YEARS'} AGO`;
}

const TEMPLATES = [
  { id: 'midnight',   name: 'Midnight',   palette: ['#1e1b4b', '#0a0820', '#fbbf24'] },
  { id: 'sunset',     name: 'Sunset',     palette: ['#fb923c', '#db2777', '#fef3c7'] },
  { id: 'polaroid',   name: 'Polaroid',   palette: ['#fffbeb', '#d6a266', '#1f2937'] },
  { id: 'minimal',    name: 'Minimal',    palette: ['#ffffff', '#0f172a', '#6366f1'] },
  { id: 'neon',       name: 'Neon',       palette: ['#0b0218', '#a21caf', '#22d3ee'] },
  { id: 'ocean',      name: 'Ocean',      palette: ['#0c4a6e', '#0369a1', '#67e8f9'] },
  { id: 'forest',     name: 'Forest',     palette: ['#064e3b', '#065f46', '#a7f3d0'] },
  { id: 'mono',       name: 'Monochrome', palette: ['#0a0a0a', '#404040', '#fafafa'] },
  { id: 'retro',      name: 'Retro',      palette: ['#0f766e', '#facc15', '#fef3c7'] },
  { id: 'rosegold',   name: 'Rose Gold',  palette: ['#fed7d7', '#d4a373', '#92400e'] },
  { id: 'aurora',     name: 'Aurora',     palette: ['#065f46', '#7c3aed', '#f472b6'] },
  { id: 'cinema',     name: 'Cinema',     palette: ['#0a0a0a', '#b45309', '#f5e6c8'] },
];

export default function ShareMemoryPost({ memory, userName, onClose }) {
  const [message, setMessage] = useState('');
  const [mapData, setMapData] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [template, setTemplate] = useState('polaroid');
  const [brokenSrcs, setBrokenSrcs] = useState(() => new Set());
  // Trip tag ("Honeymoon", "First Solo Trip", custom text). Persists per
  // memory in localStorage so a user who picks a tag, closes the modal,
  // and reopens later still sees their choice.
  const [tripTag, setTripTag] = useState('');
  const [customTagInput, setCustomTagInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const posterRef = useRef(null);
  const scalerRef = useRef(null);

  // Auto-fit poster scale to the scaler width so the 1080x1350 card always
  // renders exactly inside its wrapper — critical for mobile where the
  // wrapper width changes with viewport.
  useEffect(() => {
    const el = scalerRef.current;
    if (!el) return;
    const apply = () => {
      const w = el.clientWidth || 0;
      if (w > 0) el.style.setProperty('--smp-scale', String(w / 1080));
    };
    apply();
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(apply);
      ro.observe(el);
    } else {
      window.addEventListener('resize', apply);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', apply);
    };
  }, []);

  // Load user's preferred template
  useEffect(() => {
    API.get('/api/auth/me').then(r => {
      const u = r.data?.user;
      if (u?.cardTemplate) setTemplate(u.cardTemplate);
    }).catch(() => {});
  }, []);

  // Persist template choice on change (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      API.put('/api/user/profile', { cardTemplate: template }).catch(() => {});
    }, 600);
    return () => clearTimeout(t);
  }, [template]);

  useEffect(() => {
    setMessage(DEFAULT_MESSAGE.slice(0, MAX_MESSAGE));
  }, [memory]);

  // Load the previously picked trip tag for this memory, if any.
  useEffect(() => {
    if (!memory?._id) return;
    try {
      const saved = localStorage.getItem(`smp-trip-tag:${memory._id}`);
      if (saved) setTripTag(saved);
      else setTripTag('');
    } catch { /* localStorage denied — fall through */ }
  }, [memory]);

  // Persist on change (and clear the key when the tag is cleared).
  useEffect(() => {
    if (!memory?._id) return;
    try {
      if (tripTag) localStorage.setItem(`smp-trip-tag:${memory._id}`, tripTag);
      else         localStorage.removeItem(`smp-trip-tag:${memory._id}`);
    } catch { /* localStorage denied */ }
  }, [tripTag, memory]);

  useEffect(() => {
    if (!memory?.country) { setMapData(null); return; }
    let cancelled = false;
    getMapDataForCountry(memory.country).then(d => { if (!cancelled) setMapData(d); });
    return () => { cancelled = true; };
  }, [memory]);

  const photos = (memory?.photos || []).filter(src => !brokenSrcs.has(src)).slice(0, 5);
  const regionSelected = memory?.region ? memory.region.split(',')[0].trim() : null;
  const city = memory?.region && memory.region.includes(',') ? memory.region.split(',').slice(1).join(',').trim() : '';
  const centroid = mapData && regionSelected ? getRegionCentroid(mapData, regionSelected) : null;
  const viewBox = mapData?.viewBox || '0 0 1000 600';
  const parts = viewBox.split(/\s+/).map(Number);
  const vbW = parts[2] || 1000;
  const vbH = parts[3] || 600;
  const pinRadius = Math.max(vbW, vbH) * 0.022;

  const initials = (userName || 'SY').split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2);

  const downloadPng = async () => {
    if (!posterRef.current) return;
    setGenerating(true);
    setError('');

    const node = posterRef.current;
    const origTransform = node.style.transform;

    // Light templates need dark fallback text; dark templates need white
    const lightTemplates = ['polaroid', 'minimal', 'rosegold'];
    const fallback = lightTemplates.includes(template) ? '#0f172a' : '#ffffff';

    // Wait for every <img> inside the poster to finish loading. Unresolved
    // images with naturalWidth === 0 are what trigger html2canvas's
    // `createPattern` error on some browsers — decode() resolves the race.
    const imgs = Array.from(node.querySelectorAll('img'));
    await Promise.all(imgs.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }));

    // Any image that still has zero dimensions will crash html2canvas —
    // flag its src as broken so React re-renders without it, then continue.
    const zeroSized = imgs.filter(img => !img.naturalWidth || !img.naturalHeight);
    if (zeroSized.length) {
      setBrokenSrcs(prev => {
        const next = new Set(prev);
        zeroSized.forEach(img => img.src && next.add(img.src));
        return next;
      });
      // Give React one paint to drop the broken <img> nodes before capture
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    }

    const scrubClone = (doc) => {
      // html2canvas doesn't support `background-clip: text` — it paints the
      // gradient as a solid rectangle behind the text. Force solid text on
      // the export clone so the downloaded PNG looks symmetrical.
      doc.querySelectorAll('.smp-location-region').forEach(el => {
        el.style.background = 'none';
        el.style.webkitBackgroundClip = 'border-box';
        el.style.backgroundClip = 'border-box';
        el.style.webkitTextFillColor = fallback;
        el.style.color = fallback;
      });
      // Drop backdrop-filter (also unsupported)
      doc.querySelectorAll('.smp-message, .smp-social-chip, .smp-map-panel').forEach(el => {
        el.style.backdropFilter = 'none';
        el.style.webkitBackdropFilter = 'none';
      });
      // Last-ditch safety: remove any cloned <img> that has no decoded pixels.
      // html2canvas's URL-background pattern path (createPattern) throws on
      // zero-size images — this is the specific cause of
      // "Failed to execute 'createPattern' on 'CanvasRenderingContext'".
      doc.querySelectorAll('img').forEach(img => {
        if (!img.naturalWidth || !img.naturalHeight) img.remove();
      });
    };

    const runCapture = (opts = {}) => html2canvas(node, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      logging: false,
      imageTimeout: 15000,
      width: 1080,
      height: 1350,
      windowWidth: 1080,
      windowHeight: 1350,
      onclone: (doc) => {
        scrubClone(doc);
        if (opts.dropPhotos) {
          doc.querySelectorAll('.smp-photos').forEach(el => el.remove());
        }
      },
    });

    try {
      node.style.transform = 'none';

      let canvas;
      try {
        canvas = await runCapture();
      } catch (e) {
        // Known failure mode: html2canvas choked on a photo element.
        // Retry once with photos removed so users still get their card.
        if (/createPattern/i.test(String(e && e.message))) {
          console.warn('html2canvas failed on photos, retrying without them', e);
          canvas = await runCapture({ dropPhotos: true });
        } else {
          throw e;
        }
      }

      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `stampyourmap-${(memory.title || 'memory').toLowerCase().replace(/\s+/g, '-').slice(0, 40)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
      setError('Could not generate the image. Try again.');
    } finally {
      node.style.transform = origTransform;
      setGenerating(false);
    }
  };

  const shareUrl = 'https://stampyourmap.com';
  const shareText = `${memory?.title || 'My travel memory'} — on StampYourMap 🗺️`;

  const openShare = (platform) => {
    const t = encodeURIComponent(shareText);
    const u = encodeURIComponent(shareUrl);
    const shares = {
      facebook:  `https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${t}`,
      pinterest: `https://www.pinterest.com/pin/create/button/?url=${u}&description=${t}`,
      twitter:   `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    };
    if (shares[platform]) {
      window.open(shares[platform], '_blank', 'width=640,height=720');
    }
  };

  const copyCaption = async () => {
    const caption = `${memory.title}\n\n${message}\n\n📍 ${memory.region || ''}${memory.country ? ' · ' + memory.country : ''}\n\nStamped on StampYourMap 🗺️\n${shareUrl}`;
    try {
      await navigator.clipboard.writeText(caption);
      setError('Caption copied!');
      setTimeout(() => setError(''), 2000);
    } catch {
      setError('Copy failed — try again');
    }
  };

  return (
    <div className="smp-overlay" onClick={onClose}>
      <div className="smp-modal" onClick={e => e.stopPropagation()}>
        <div className="smp-header">
          <div>
            <h2>Share your stamp</h2>
            <p>
              Download an HD image to put story at{' '}
              <span className="smp-brand-pill smp-brand-wa">WhatsApp</span>,{' '}
              <span className="smp-brand-pill smp-brand-ig">Instagram</span>,{' '}
              <span className="smp-brand-pill smp-brand-fb">Facebook</span>{' '}
              or post it straight to your social media.
            </p>
          </div>
          <button className="smp-close" onClick={onClose} aria-label="Close"
            data-ga-label="Share modal: close" data-ga-category="share"><FaTimes /></button>
        </div>

        <div className="smp-body">
          {/* LEFT: poster preview */}
          <div className="smp-preview-wrap">
            <div className="smp-preview-scaler" ref={scalerRef}>
              <div className="smp-poster" data-template={template} ref={posterRef}>
                <div className="smp-poster-grain" />

                {/* Brand header — now also carries a "recency" badge
                    ("12 DAYS AGO" / "3 YEARS AGO") so the viewer gets
                    a sense of when this moment happened without
                    reading the date. */}
                <div className="smp-poster-header">
                  <div className="smp-brand">
                    <span className="smp-brand-mark">🗺️</span>
                    <span className="smp-brand-text">StampYourMap</span>
                  </div>
                  <div className="smp-header-right">
                    {daysAgoBadge(memory?.dateVisited) && (
                      <span className="smp-recency-badge">{daysAgoBadge(memory.dateVisited)}</span>
                    )}
                    {memory?.dateVisited && (
                      <div className="smp-date">{formatDate(memory.dateVisited)}</div>
                    )}
                  </div>
                </div>

                {/* User row */}
                <div className="smp-user">
                  <div className="smp-avatar">{initials}</div>
                  <div className="smp-user-info">
                    <div className="smp-user-name">
                      <span>{userName}</span>
                      <svg className="smp-verified" viewBox="0 0 24 24" aria-label="Verified">
                        <path fill="#1D9BF0" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"/>
                        <path fill="#fff" d="M9.64 16.95l-3.79-3.79 1.41-1.41 2.38 2.38 5.66-5.66 1.41 1.41z"/>
                      </svg>
                    </div>
                    <div className="smp-user-sub">just stamped {flagFor(memory?.country)} {memory?.country}</div>
                  </div>
                </div>

                {/* Trip-tag stamp — rendered as a passport-style stamp,
                    rotated slightly so it reads as "stamped on" the card
                    rather than drawn on later. Only shows when the user
                    has picked a tag. */}
                {tripTag && (
                  <div className="smp-trip-stamp" aria-hidden="true">
                    <div className="smp-trip-stamp-inner">
                      <span className="smp-trip-stamp-top">★ ★ ★</span>
                      <span className="smp-trip-stamp-label">{tripTag}</span>
                      <span className="smp-trip-stamp-bot">
                        {memory?.dateVisited ? new Date(memory.dateVisited).getFullYear() : new Date().getFullYear()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Map panel with photos */}
                <div className="smp-map-panel">
                  <svg className="smp-map-svg" viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="smpGradHi" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                      <filter id="smpGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {mapData && (mapData.locations || []).map(loc => {
                      const isHi = regionSelected && (loc.name || '').toLowerCase() === regionSelected.toLowerCase();
                      return (
                        <path
                          key={loc.id || loc.name}
                          d={loc.path}
                          fill={isHi ? 'url(#smpGradHi)' : 'rgba(255,255,255,0.08)'}
                          stroke={isHi ? '#ffffff' : 'rgba(255,255,255,0.25)'}
                          strokeWidth={isHi ? (Math.max(vbW, vbH) * 0.0015) : (Math.max(vbW, vbH) * 0.0008)}
                          filter={isHi ? 'url(#smpGlow)' : undefined}
                        />
                      );
                    })}
                    {centroid && (
                      <g>
                        <circle cx={centroid.x} cy={centroid.y} r={pinRadius * 1.4} fill="#ffffff" opacity="0.25" />
                        <circle cx={centroid.x} cy={centroid.y} r={pinRadius} fill="#f43f5e" stroke="#fff" strokeWidth={pinRadius * 0.15} />
                        <circle cx={centroid.x} cy={centroid.y} r={pinRadius * 0.4} fill="#fff" />
                      </g>
                    )}
                  </svg>

                  {/* Photo strip — absolutely positioned around the map */}
                  {photos.length > 0 && (
                    <div className="smp-photos">
                      {photos.map((src, i) => (
                        <div key={src} className={`smp-photo smp-photo-${i}`}>
                          <img
                            src={src}
                            alt={`memory ${i + 1}`}
                            crossOrigin="anonymous"
                            onError={() => setBrokenSrcs(prev => {
                              const next = new Set(prev);
                              next.add(src);
                              return next;
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pin icon badge overlay */}
                  <div className="smp-pin-badge"><FaMapPin /></div>
                </div>

                {/* Location title */}
                <div className="smp-location">
                  <div className="smp-location-eyebrow">
                    <span className="smp-eyebrow-line" />
                    <span className="smp-eyebrow-text">Just Stamped</span>
                    <span className="smp-eyebrow-line" />
                  </div>
                  <div className="smp-location-region">{regionSelected || memory?.country || ''}</div>
                  <div className="smp-location-sub">
                    {flagFor(memory?.country)} {memory?.country}{city ? ` · ${city}` : ''}
                  </div>
                </div>

                {/* Message */}
                {message && (
                  <div className="smp-message">
                    <span className="smp-quote-open">"</span>
                    {message}
                    <span className="smp-quote-close">"</span>
                  </div>
                )}

                {/* Footer */}
                <div className="smp-footer">
                  <span className="smp-footer-brand">stampyourmap.com</span>
                  <span className="smp-footer-sub">Stamp every country you've visited</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: controls */}
          <div className="smp-controls">
            {/* Template picker — compact horizontal scroll */}
            <div className="smp-ctrl-field">
              <label><FaPalette /> Template <span className="smp-count">{TEMPLATES.findIndex(t => t.id === template) + 1}/{TEMPLATES.length}</span></label>
              <div className="smp-templates">
                {TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className={`smp-template ${template === t.id ? 'active' : ''}`}
                    data-template={t.id}
                    onClick={() => setTemplate(t.id)}
                    title={t.name}
                    data-ga-label={`Share template: ${t.name}`}
                    data-ga-category="share"
                  >
                    <span
                      className="smp-template-swatch"
                      style={{
                        background: `linear-gradient(135deg, ${t.palette[0]} 0%, ${t.palette[0]} 40%, ${t.palette[1]} 40%, ${t.palette[1]} 75%, ${t.palette[2]} 75%)`
                      }}
                    />
                    <span className="smp-template-name">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TRIP TAG — a one-tap category that renders on the poster
                as a stamp. Covers the common "why" of the trip (first
                solo trip, honeymoon, business, bucket list) and lets
                the user go off-script with a custom tag. */}
            <div className="smp-ctrl-field">
              <label>
                Trip tag <span className="smp-count">(optional — appears on card)</span>
              </label>
              <div className="smp-trip-tags" role="group" aria-label="Trip tag">
                <button
                  type="button"
                  className={`smp-trip-tag ${!tripTag ? 'active' : ''}`}
                  onClick={() => { setTripTag(''); setShowCustomInput(false); }}
                  data-ga-label="Trip tag: none" data-ga-category="share"
                >None</button>
                {TRIP_TAGS.map(t => {
                  const active = tripTag.toUpperCase() === t.label.toUpperCase();
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`smp-trip-tag ${active ? 'active' : ''}`}
                      onClick={() => { setTripTag(t.label); setShowCustomInput(false); }}
                      data-ga-label={`Trip tag: ${t.id}`}
                      data-ga-category="share"
                    >
                      <span className="smp-trip-tag-emoji">{t.emoji}</span>
                      {t.label}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className={`smp-trip-tag smp-trip-tag-custom ${showCustomInput || (tripTag && !TRIP_TAGS.find(t => t.label.toUpperCase() === tripTag.toUpperCase())) ? 'active' : ''}`}
                  onClick={() => setShowCustomInput(v => !v)}
                  data-ga-label="Trip tag: custom" data-ga-category="share"
                >✍️ Custom</button>
              </div>
              {showCustomInput && (
                <div className="smp-trip-custom">
                  <input
                    type="text"
                    maxLength={32}
                    placeholder="e.g. Girls Trip to Bali"
                    value={customTagInput}
                    onChange={e => setCustomTagInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && customTagInput.trim()) {
                        setTripTag(customTagInput.trim());
                        setShowCustomInput(false);
                      }
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="smp-trip-custom-apply"
                    disabled={!customTagInput.trim()}
                    onClick={() => {
                      setTripTag(customTagInput.trim());
                      setShowCustomInput(false);
                    }}
                  >Apply</button>
                </div>
              )}
              {tripTag && !TRIP_TAGS.find(t => t.label.toUpperCase() === tripTag.toUpperCase()) && !showCustomInput && (
                <div className="smp-trip-custom-active">
                  Using custom tag: <strong>{tripTag}</strong>
                  <button type="button" onClick={() => setTripTag('')} aria-label="Remove custom tag">
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="smp-ctrl-field">
              <label>
                Message to print on card
                <span className={`smp-count ${message.length > MAX_MESSAGE ? 'over' : ''}`}>
                  {message.length} / {MAX_MESSAGE}
                </span>
              </label>
              {/* One-tap caption vibes — tokens are swapped for this
                  memory's title + place so the preset lands specific,
                  not generic. */}
              <div className="smp-presets" role="group" aria-label="Caption vibes">
                {CAPTION_PRESETS.map(p => {
                  const resolved = p.text
                    .replace(/\{\{title\}\}/g, memory?.title || 'this moment')
                    .replace(/\{\{place\}\}/g, memory?.region || memory?.country || 'this place');
                  const active = message.trim() === resolved.trim();
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className={`smp-preset-chip ${active ? 'active' : ''}`}
                      onClick={() => setMessage(resolved.slice(0, MAX_MESSAGE))}
                      data-ga-label={`Share preset: ${p.id}`}
                      data-ga-category="share"
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
              <textarea
                rows={5}
                maxLength={MAX_MESSAGE}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="A short line you want printed on the card — the view, the food, the moment."
              />
              {/* Hashtag chips — click to append. Instagram caps at 30
                  tags; we show 10 highly relevant ones. */}
              <div className="smp-hashtags" aria-label="Suggested hashtags">
                <span className="smp-hashtags-label"># Add tags</span>
                {buildHashtagChips(memory).map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className="smp-hashtag-chip"
                    onClick={() => {
                      const next = message.trim();
                      const already = new RegExp(`(^|\\s)${tag.replace(/#/, '#')}(\\s|$)`, 'i').test(next);
                      if (already) return;
                      const sep = next.length === 0 ? '' : (next.endsWith(' ') ? '' : ' ');
                      const combined = `${next}${sep}${tag}`;
                      setMessage(combined.slice(0, MAX_MESSAGE));
                    }}
                    data-ga-label={`Share hashtag: ${tag}`}
                    data-ga-category="share"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="smp-btn-primary"
              onClick={downloadPng}
              disabled={generating}
              data-ga-label="Share: Download HD PNG"
              data-ga-event="share_card_download"
              data-ga-category="share"
            >
              <FaDownload /> {generating ? 'Generating HD image…' : 'Download HD (PNG)'}
            </button>

            {error && <div className={`smp-note ${error === 'Caption copied!' ? 'ok' : 'warn'}`}>{error}</div>}

            <div className="smp-share-block">
              <div className="smp-share-head">
                <span className="smp-share-title">Share on social</span>
                <span className="smp-share-divider" />
              </div>
              <button className="smp-share-copy-big" onClick={copyCaption}
                data-ga-label="Share: Copy caption" data-ga-event="share_copy_caption" data-ga-category="share">
                <FaCopy /> Copy caption &amp; link
              </button>
              <div className="smp-share-row">
                <button className="smp-share-tile" data-plat="ig" onClick={downloadPng} title="Download HD, then upload in Instagram"
                  data-ga-label="Share: Instagram" data-ga-event="share_to" data-ga-category="share">
                  <span className="smp-share-tile-icon"><FaInstagram /></span>
                  <span className="smp-share-tile-label">Instagram</span>
                </button>
                <button className="smp-share-tile" data-plat="fb" onClick={() => openShare('facebook')} title="Share this page on Facebook"
                  data-ga-label="Share: Facebook" data-ga-event="share_to" data-ga-category="share">
                  <span className="smp-share-tile-icon"><FaFacebook /></span>
                  <span className="smp-share-tile-label">Facebook</span>
                </button>
                <button className="smp-share-tile" data-plat="pin" onClick={() => openShare('pinterest')} title="Pin on Pinterest"
                  data-ga-label="Share: Pinterest" data-ga-event="share_to" data-ga-category="share">
                  <span className="smp-share-tile-icon"><FaPinterest /></span>
                  <span className="smp-share-tile-label">Pinterest</span>
                </button>
                <button className="smp-share-tile" data-plat="sc" onClick={downloadPng} title="Download HD, then upload in Snapchat"
                  data-ga-label="Share: Snapchat" data-ga-event="share_to" data-ga-category="share">
                  <span className="smp-share-tile-icon"><FaSnapchat /></span>
                  <span className="smp-share-tile-label">Snapchat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
