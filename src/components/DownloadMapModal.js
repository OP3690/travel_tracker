import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes, FaDownload, FaPalette, FaCheck, FaSlidersH, FaQuoteLeft, FaMagic, FaFolderOpen, FaShareAlt } from 'react-icons/fa';
import API from '../api/api';
import {
  TEMPLATES,
  getTemplate,
  prepareMapImage,
  renderMapCardCanvas,
  downloadMapCard,
} from '../utils/downloadMapCard';
import { TAGLINES, pickRandomTagline } from '../utils/mapTaglines';
import './DownloadMapModal.css';

const MAX_TAGLINE = 140;

// Debounce any value change — used so tagline typing doesn't re-render the
// preview on every keystroke.
function useDebounced(value, delay = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function DownloadMapModal({
  svgElement,
  title,
  subtitle,
  userName,
  stats,
  visitedNames,
  pendingFill,
  pendingStroke,
  filename,
  eyebrow,
  onClose,
}) {
  const [tab, setTab] = useState('template');
  const [templateId, setTemplateId] = useState('midnight');
  const [tagline, setTagline] = useState('');
  const [showUserName, setShowUserName] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [showVisitedList, setShowVisitedList] = useState(true);

  const [previewUrl, setPreviewUrl] = useState('');
  const [rendering, setRendering] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [error, setError] = useState('');

  // Lock the page under the modal while it's open — otherwise the user
  // can still wheel/pinch-scroll the dashboard behind the overlay, which
  // reads as the modal "scrolling". Restore the original overflow on
  // unmount so we don't strand the body in a hidden state if the modal
  // closes unexpectedly.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);
  // Cache prepared map images keyed by "fill|stroke" so switching between
  // templates that share a palette doesn't re-rasterize the SVG every time.
  const mapImageCacheRef = useRef(new Map());

  const debouncedTagline = useDebounced(tagline, 350);

  // Load user's preferred template (shared w/ the share poster)
  useEffect(() => {
    API.get('/api/auth/me').then(r => {
      const pref = r.data?.user?.cardTemplate;
      if (pref && TEMPLATES.some(t => t.id === pref)) setTemplateId(pref);
    }).catch(() => {});
  }, []);

  // Persist template choice (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      API.put('/api/user/profile', { cardTemplate: templateId }).catch(() => {});
    }, 500);
    return () => clearTimeout(t);
  }, [templateId]);

  // Resolve the fill/stroke for the current template. The template's
  // own palette wins; caller-supplied props are the default.
  const resolveColors = (tplId) => {
    const cfg = getTemplate(tplId).config;
    return {
      fill: cfg.pendingFill || pendingFill,
      stroke: cfg.pendingStroke || pendingStroke,
    };
  };

  // Return a prepared <img>, caching by color key so switching templates
  // that share a palette is instant.
  const getCachedImage = async (tplId) => {
    const { fill, stroke } = resolveColors(tplId);
    const key = `${fill || ''}|${stroke || ''}`;
    const cache = mapImageCacheRef.current;
    if (!cache.has(key)) {
      if (!svgElement) throw new Error('No map available');
      cache.set(key, prepareMapImage(svgElement, { pendingFill: fill, pendingStroke: stroke }));
    }
    return cache.get(key);
  };

  // Re-render preview on any relevant change
  const renderKey = useMemo(() => JSON.stringify({
    templateId, tagline: debouncedTagline, showUserName, showStats, showVisitedList,
  }), [templateId, debouncedTagline, showUserName, showStats, showVisitedList]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setRendering(true);
        const mapImage = await getCachedImage(templateId);
        if (cancelled) return;
        const canvas = await renderMapCardCanvas({
          mapImage,
          templateId,
          title, subtitle, userName, stats, visitedNames,
          eyebrow,
          customTagline: debouncedTagline,
          showUserName, showStats, showVisitedList,
        });
        if (cancelled) return;
        const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
        if (cancelled || !blob) return;
        const url = URL.createObjectURL(blob);
        setPreviewUrl(prev => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch (e) {
        if (!cancelled) setError('Preview render failed.');
      } finally {
        if (!cancelled) setRendering(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderKey]);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    setDownloadSuccess(false);
    setError('');
    try {
      await downloadMapCard({
        svgElement,
        title, subtitle, userName, stats, visitedNames,
        pendingFill, pendingStroke,
        templateId,
        eyebrow,
        customTagline: debouncedTagline,
        showUserName, showStats, showVisitedList,
        filename: `${filename || 'stampyourmap-map'}-${templateId}`,
      });
      // Show the success celebration popup so the user has an obvious
      // "it worked" moment + a nudge to share. Chrome on macOS auto-saves
      // to Downloads with no system dialog, so without this the download
      // click feels like it did nothing.
      setDownloadSuccess(true);
    } catch (e) {
      setError('Download failed. Try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Portal into <body> so the modal's position:fixed can't be hijacked
  // by any ancestor transform / filter / contain property (which would
  // turn it into a position:absolute inside the parent and strand it
  // below the fold inside .dashboard-page instead of over the viewport).
  return ReactDOM.createPortal((
    <div className="dmm-overlay" onClick={onClose}>
      <div className="dmm-modal" onClick={e => e.stopPropagation()}>
        <div className="dmm-header">
          <div>
            <h2>Download your map</h2>
            <p>Pick a template, customize it live, then save a <strong>1200×1500</strong> HD PNG — perfect for stories, prints, and profile backgrounds.</p>
          </div>
          <button className="dmm-close" onClick={onClose} aria-label="Close"
            data-ga-label="Download map: close" data-ga-category="download">
            <FaTimes />
          </button>
        </div>

        <div className="dmm-body">
          <div className="dmm-preview-wrap">
            <div className="dmm-preview-frame">
              {previewUrl ? (
                <img src={previewUrl} alt="Map preview" className={rendering ? 'dmm-preview-img loading' : 'dmm-preview-img'} />
              ) : (
                <div className="dmm-preview-skeleton" />
              )}
              {rendering && previewUrl && <div className="dmm-preview-spinner">Rendering</div>}
            </div>
          </div>

          <div className="dmm-controls">
            {/* Tab switcher */}
            <div className="dmm-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={tab === 'template'}
                className={`dmm-tab ${tab === 'template' ? 'active' : ''}`}
                onClick={() => setTab('template')}
                data-ga-label="Download map: templates tab" data-ga-category="download"
              >
                <FaPalette /> Templates
                <span className="dmm-tab-count">{TEMPLATES.length}</span>
              </button>
              <button
                role="tab"
                aria-selected={tab === 'customize'}
                className={`dmm-tab ${tab === 'customize' ? 'active' : ''}`}
                onClick={() => setTab('customize')}
                data-ga-label="Download map: customize tab" data-ga-category="download"
              >
                <FaSlidersH /> Customize
              </button>
            </div>

            {tab === 'template' && (
              <div className="dmm-ctrl-field">
                <label>
                  <FaPalette /> Template
                  <span className="dmm-count">
                    {TEMPLATES.findIndex(t => t.id === templateId) + 1}/{TEMPLATES.length}
                  </span>
                </label>
                <div className="dmm-templates">
                  {TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      className={`dmm-template ${templateId === t.id ? 'active' : ''}`}
                      onClick={() => setTemplateId(t.id)}
                      title={t.name}
                      data-ga-label={`Download map: pick ${t.name}`}
                      data-ga-category="download"
                    >
                      <span
                        className="dmm-template-swatch"
                        style={{
                          background: `linear-gradient(135deg, ${t.palette[0]} 0%, ${t.palette[1]} 55%, ${t.palette[2]} 100%)`,
                        }}
                      />
                      <span className="dmm-template-name">{t.name}</span>
                      <span className="dmm-template-check" aria-hidden="true"><FaCheck /></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tab === 'customize' && (
              <div className="dmm-customize">
                <div className="dmm-ctrl-field">
                  <label>
                    <FaQuoteLeft /> Personal tagline
                    <button
                      type="button"
                      className="dmm-ai-btn"
                      onClick={() => setTagline(pickRandomTagline(tagline).slice(0, MAX_TAGLINE))}
                      title={`Pull a random line from ${TAGLINES.length}+ ideas`}
                      data-ga-label="Download map: generate tagline" data-ga-category="download"
                    >
                      <FaMagic /> Generate by AI
                    </button>
                    <span className={`dmm-count ${tagline.length > MAX_TAGLINE ? 'over' : ''}`}>
                      {tagline.length}/{MAX_TAGLINE}
                    </span>
                  </label>
                  <textarea
                    className="dmm-textarea"
                    rows={3}
                    maxLength={MAX_TAGLINE}
                    placeholder="A short line that captures this chapter of your travels…"
                    value={tagline}
                    onChange={e => setTagline(e.target.value.slice(0, MAX_TAGLINE))}
                    data-ga-label="Download map: edit tagline" data-ga-category="download"
                  />
                </div>

                <div className="dmm-ctrl-field">
                  <label>Layout</label>
                  <div className="dmm-toggles">
                    <ToggleRow
                      label="Show your name"
                      hint="Prints “by {name}” under the title"
                      value={showUserName}
                      onChange={setShowUserName}
                    />
                    <ToggleRow
                      label="Show stats row"
                      hint="Visited · Pending · Coverage cards"
                      value={showStats}
                      onChange={setShowStats}
                    />
                    <ToggleRow
                      label="Show stamped list"
                      hint="Comma list of visited regions at the bottom"
                      value={showVisitedList}
                      onChange={setShowVisitedList}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="dmm-reset"
                  onClick={() => {
                    setTagline('');
                    setShowUserName(true);
                    setShowStats(true);
                    setShowVisitedList(true);
                  }}
                  data-ga-label="Download map: reset customization" data-ga-category="download"
                >
                  Reset to defaults
                </button>
              </div>
            )}

            <button
              className="dmm-btn-primary"
              onClick={handleDownload}
              disabled={downloading || rendering || !!error}
              data-ga-label="Download map: Save HD PNG"
              data-ga-event="map_download"
              data-ga-category="download"
            >
              <FaDownload /> {downloading ? 'Saving…' : 'Download HD (PNG)'}
            </button>

            {error && <div className="dmm-note warn">{error}</div>}

            <p className="dmm-tip">
              Your template choice is saved to your profile automatically.
            </p>
          </div>
        </div>

        {/* Download success celebration — appears on top of the modal
            after a successful save. Chrome auto-saves to Downloads with
            no OS dialog, so without this the user often can't tell the
            click did anything. The sheet acknowledges the save and nudges
            toward a share so the download converts to reach. */}
        {downloadSuccess && (
          <DownloadSuccessSheet
            filename={`${(filename || 'stampyourmap-map').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)}-${templateId}.png`}
            onDismiss={() => setDownloadSuccess(false)}
            onDone={onClose}
          />
        )}
      </div>
    </div>
  ), document.body);
}

/* Visible "your card is ready" confirmation. Sits over the modal so the
   user doesn't need to open their Downloads folder to confirm the save
   worked. Share buttons are copy-and-open helpers — the OS/web share
   sheet still handles actual delivery. */
function DownloadSuccessSheet({ filename, onDismiss, onDone }) {
  const [copied, setCopied] = useState(false);

  const copyShareText = async () => {
    const text = `Just stamped my travel map on StampYourMap! https://stampyourmap.com`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard denied — fall through */ }
  };

  const useNativeShare = async () => {
    if (!navigator.share) { copyShareText(); return; }
    try {
      await navigator.share({
        title: 'My travel map — StampYourMap',
        text: 'Just stamped my travel map on StampYourMap!',
        url: 'https://stampyourmap.com',
      });
    } catch { /* user cancelled */ }
  };

  return (
    <div className="dmm-success-sheet" role="dialog" aria-modal="true" aria-labelledby="dmm-success-title">
      <div className="dmm-success-card">
        <button className="dmm-success-close" onClick={onDismiss} aria-label="Dismiss"><FaTimes /></button>
        <div className="dmm-success-icon"><FaCheck /></div>
        <h3 id="dmm-success-title" className="dmm-success-title">Your travel card is ready!</h3>
        <p className="dmm-success-sub">
          Saved as <code>{filename}</code> to your Downloads folder.
        </p>
        <div className="dmm-success-actions">
          <button className="dmm-success-primary" onClick={useNativeShare}>
            <FaShareAlt /> Share it
          </button>
          <button className="dmm-success-secondary" onClick={copyShareText}>
            {copied ? <><FaCheck /> Copied!</> : <>Copy share link</>}
          </button>
        </div>
        <div className="dmm-success-row">
          <span className="dmm-success-hint">
            <FaFolderOpen /> Can't find it? Check <strong>~/Downloads</strong> or your browser's download bar.
          </span>
        </div>
        <div className="dmm-success-footer">
          <button className="dmm-success-link" onClick={onDismiss}>Pick another template</button>
          <button className="dmm-success-link primary" onClick={onDone}>Done</button>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, hint, value, onChange }) {
  return (
    <label className="dmm-toggle">
      <span className="dmm-toggle-text">
        <span className="dmm-toggle-label">{label}</span>
        {hint && <span className="dmm-toggle-hint">{hint}</span>}
      </span>
      <span className={`dmm-switch ${value ? 'on' : 'off'}`}>
        <input
          type="checkbox"
          checked={value}
          onChange={e => onChange(e.target.checked)}
        />
        <span className="dmm-switch-knob" />
      </span>
    </label>
  );
}
