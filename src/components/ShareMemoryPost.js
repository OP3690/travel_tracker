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
    try {
      // Temporarily unscale for capture
      const node = posterRef.current;
      const origTransform = node.style.transform;
      node.style.transform = 'none';

      // Light templates need dark fallback text; dark templates need white
      const lightTemplates = ['polaroid', 'minimal', 'rosegold'];
      const fallback = lightTemplates.includes(template) ? '#0f172a' : '#ffffff';

      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 1080,
        height: 1350,
        windowWidth: 1080,
        windowHeight: 1350,
        onclone: (doc) => {
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
        },
      });
      node.style.transform = origTransform;

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

                {/* Brand header */}
                <div className="smp-poster-header">
                  <div className="smp-brand">
                    <span className="smp-brand-mark">🗺️</span>
                    <span className="smp-brand-text">StampYourMap</span>
                  </div>
                  {memory?.dateVisited && (
                    <div className="smp-date">{formatDate(memory.dateVisited)}</div>
                  )}
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

            <div className="smp-ctrl-field">
              <label>
                Message to print on card
                <span className={`smp-count ${message.length > MAX_MESSAGE ? 'over' : ''}`}>
                  {message.length} / {MAX_MESSAGE}
                </span>
              </label>
              <textarea
                rows={5}
                maxLength={MAX_MESSAGE}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="A short line you want printed on the card — the view, the food, the moment."
              />
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
