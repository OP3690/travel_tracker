import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import API from '../api/api';
import AddMemoryModal from './AddMemoryModal';
import { FaPlus, FaMapMarkerAlt, FaCalendar, FaCamera, FaEdit, FaTrash, FaTimes, FaChevronLeft, FaChevronRight, FaHeart, FaShareAlt, FaHome, FaPlane, FaBookOpen, FaImages } from 'react-icons/fa';
import allCountries from '../utils/countries';
import ShareMemoryPost from './ShareMemoryPost';
import './Memories.css';

function flagFor(country) {
  const c = allCountries.find(x => x.value === country);
  return c?.flag || '🌍';
}

function formatDate(d) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

// Auto-cycling photo for a memory card preview. Crossfades through each uploaded
// photo every ~3.5s. Single-photo cards stay static.
function CardPhoto({ photos, title, onClick, staggerIndex = 0 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!photos || photos.length <= 1) return;
    // Offset each card's cycle by 600ms so the grid doesn't flip in sync
    const start = setTimeout(() => {
      setIdx(i => (i + 1) % photos.length);
    }, 3500 + (staggerIndex * 600));
    return () => clearTimeout(start);
  }, [photos, idx, staggerIndex]);

  if (!photos || photos.length === 0) {
    return <div className="mem-card-no-photo" onClick={onClick}>📝</div>;
  }
  return (
    <>
      {photos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={title || ''}
          className={`mem-cp-img ${i === idx ? 'active' : ''}`}
        />
      ))}
      {photos.length > 1 && (
        <div className="mem-cp-dots">
          {photos.map((_, i) => (
            <span key={i} className={`mem-cp-dot ${i === idx ? 'active' : ''}`} />
          ))}
        </div>
      )}
    </>
  );
}

function MemoryViewer({ memory, onClose }) {
  const [idx, setIdx] = useState(0);
  const photos = memory?.photos || [];
  const hasMany = photos.length > 1;

  if (!memory) return null;

  return (
    <div className="mem-viewer-overlay" onClick={onClose}>
      <div className="mem-viewer" onClick={e => e.stopPropagation()}>
        <button className="mem-viewer-close" onClick={onClose} aria-label="Close"><FaTimes /></button>
        <div className="mem-viewer-content">
          {photos.length > 0 && (
            <div className="mem-viewer-photo-wrap">
              <img src={photos[idx]} alt={memory.title} />
              {hasMany && (
                <>
                  <button className="mem-viewer-nav prev" onClick={() => setIdx(i => (i - 1 + photos.length) % photos.length)}><FaChevronLeft /></button>
                  <button className="mem-viewer-nav next" onClick={() => setIdx(i => (i + 1) % photos.length)}><FaChevronRight /></button>
                  <div className="mem-viewer-dots">
                    {photos.map((_, i) => (
                      <span key={i} className={`mv-dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          <div className="mem-viewer-info">
            <div className="mem-viewer-meta">
              {memory.country && <span className="mvm-chip">{flagFor(memory.country)} {memory.country}</span>}
              {memory.region && <span className="mvm-chip"><FaMapMarkerAlt /> {memory.region}</span>}
              {memory.dateVisited && <span className="mvm-chip"><FaCalendar /> {formatDate(memory.dateVisited)}</span>}
            </div>
            <h2>{memory.title}</h2>
            {memory.story && <p className="mem-viewer-story">{memory.story}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Memories() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMemory, setEditMemory] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [sharing, setSharing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [filter, setFilter] = useState('all');        // 'all' | 'domestic' | 'international' | <country name>
  const [userName, setUserName] = useState('Explorer');
  const [userCountry, setUserCountry] = useState('');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored?.name) setUserName(stored.name);
      if (stored?.country) setUserCountry(stored.country);
    } catch {}
  }, []);

  const fetchMemories = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/user/memories');
      setMemories(res.data.memories || []);
    } catch {
      setMemories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMemories(); }, []);

  const confirmDelete = async () => {
    if (!deleting) return;
    const id = deleting._id;
    try {
      await API.delete(`/api/user/memories/${id}`);
      setMemories(prev => prev.filter(m => m._id !== id));
    } catch {}
    setDeleting(null);
  };

  const openEdit = (mem) => {
    setEditMemory(mem);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMemory(null);
  };

  // Domestic/International segmentation
  const countries = Array.from(new Set(memories.map(m => m.country).filter(Boolean)));
  const isDomestic = (m) => !!userCountry && (m.country === userCountry);
  const domesticMemories = memories.filter(isDomestic);
  const internationalMemories = memories.filter(m => m.country && !isDomestic(m));

  let filtered = memories;
  if (filter === 'domestic') filtered = domesticMemories;
  else if (filter === 'international') filtered = internationalMemories;
  else if (filter !== 'all') filtered = memories.filter(m => m.country === filter);

  const totalPhotos = memories.reduce((sum, m) => sum + (m.photos?.length || 0), 0);
  const totalWords = memories.reduce((sum, m) => sum + (m.story || '').trim().split(/\s+/).filter(Boolean).length, 0);

  return (
    <Layout>
      <div className="memories-page">
        <div className="mem-page-header">
          <h1 className="mem-page-title"><FaHeart className="mpt-icon" /> Memory Wall</h1>
        </div>

        {/* Nudge banner — turn memories into shareable cards */}
        <div className="mem-nudge">
          <span className="mem-nudge-emoji">📸</span>
          <div className="mem-nudge-text">
            <strong>Upload photos to any memory</strong> and turn it into a gorgeous shareable card — ready for{' '}
            <span className="brand-pill brand-wa">WhatsApp</span>,{' '}
            <span className="brand-pill brand-ig">Instagram</span>{' '}&amp;{' '}
            <span className="brand-pill brand-fb">Facebook</span>.
          </div>
          <button className="mem-nudge-cta" onClick={() => setShowModal(true)}
            data-ga-label="Memories: Nudge New Memory" data-ga-category="memory">
            <FaPlus /> New Memory
          </button>
        </div>

        {/* Stats strip — Memories · Domestic · International · Photos · Words */}
        <div className="mem-stats-strip">
          <div className="mss-item">
            <div className="mss-icon" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}><FaBookOpen /></div>
            <div className="mss-body">
              <span className="mss-num">{memories.length}</span>
              <span className="mss-label">Memories</span>
            </div>
          </div>
          <div className="mss-item">
            <div className="mss-icon" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}><FaHome /></div>
            <div className="mss-body">
              <span className="mss-num">{domesticMemories.length}</span>
              <span className="mss-label">Domestic</span>
              <span className="mss-sub">{userCountry ? `in ${userCountry}` : 'set country in settings'}</span>
            </div>
          </div>
          <div className="mss-item">
            <div className="mss-icon" style={{ background: 'rgba(244,114,182,0.12)', color: '#f472b6' }}><FaPlane /></div>
            <div className="mss-body">
              <span className="mss-num">{internationalMemories.length}</span>
              <span className="mss-label">International</span>
              <span className="mss-sub">across {Math.max(0, countries.length - (domesticMemories.length > 0 ? 1 : 0))} countries</span>
            </div>
          </div>
          <div className="mss-item">
            <div className="mss-icon" style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}><FaImages /></div>
            <div className="mss-body">
              <span className="mss-num">{totalPhotos}</span>
              <span className="mss-label">Photos</span>
              <span className="mss-sub">{totalWords.toLocaleString()} words written</span>
            </div>
          </div>
        </div>

        {/* Filter chips — All / Domestic / International + country-specific */}
        {memories.length > 0 && (
          <div className="mem-filters" data-ga-section="memory-filters">
            <button className={`mem-filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}
              data-ga-label="Memory filter: All" data-ga-category="filter">
              All <span className="mfc-count">{memories.length}</span>
            </button>
            {domesticMemories.length > 0 && (
              <button className={`mem-filter-chip ${filter === 'domestic' ? 'active' : ''}`} onClick={() => setFilter('domestic')}
                data-ga-label="Memory filter: Domestic" data-ga-category="filter">
                <FaHome /> Domestic <span className="mfc-count">{domesticMemories.length}</span>
              </button>
            )}
            {internationalMemories.length > 0 && (
              <button className={`mem-filter-chip ${filter === 'international' ? 'active' : ''}`} onClick={() => setFilter('international')}
                data-ga-label="Memory filter: International" data-ga-category="filter">
                <FaPlane /> International <span className="mfc-count">{internationalMemories.length}</span>
              </button>
            )}
            {countries.length > 1 && <span className="mem-filter-divider" aria-hidden="true" />}
            {countries.map(c => (
              <button
                key={c}
                className={`mem-filter-chip ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
                data-ga-label={`Memory filter: ${c}`}
                data-ga-category="filter"
              >
                {flagFor(c)} {c}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="mem-grid">
            {[0, 1, 2].map(i => <div key={i} className="mem-card-skeleton" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mem-empty">
            <div className="mem-empty-icon">📸</div>
            <h3>{memories.length === 0 ? 'No memories yet' : 'No memories for this filter'}</h3>
            <p>{memories.length === 0 ? 'Capture your first travel moment — photos, stories, the feeling of being there.' : 'Try another country or clear the filter.'}</p>
            {memories.length === 0 && (
              <button className="mem-add-btn" onClick={() => setShowModal(true)}
                data-ga-label="Memories: Add first memory" data-ga-category="memory">
                <FaPlus /> Add Your First Memory
              </button>
            )}
          </div>
        ) : (
          <div className="mem-grid">
            {filtered.map((mem, mi) => (
              <div key={mem._id} className="mem-card">
                <div className="mem-card-photo" onClick={() => setViewing(mem)}>
                  <CardPhoto photos={mem.photos} title={mem.title} staggerIndex={mi} />
                  {mem.isDemo && (
                    <span className="mem-card-demo-tag">✨ Demo</span>
                  )}
                  {mem.photos?.length > 1 && (
                    <span className="mem-card-photo-count"><FaCamera /> {mem.photos.length}</span>
                  )}
                </div>
                <div className="mem-card-body">
                  <div className="mem-card-meta">
                    {mem.country && <span className="mcm-chip">{flagFor(mem.country)} {mem.country}</span>}
                    {mem.region && <span className="mcm-chip-light">{mem.region}</span>}
                  </div>
                  <h3 className="mem-card-title" onClick={() => setViewing(mem)}>{mem.title}</h3>
                  {mem.dateVisited && <p className="mem-card-date"><FaCalendar /> {formatDate(mem.dateVisited)}</p>}
                  {mem.story && (
                    <p className="mem-card-story">{mem.story.slice(0, 140)}{mem.story.length > 140 ? '…' : ''}</p>
                  )}
                  <div className="mem-card-actions">
                    <button className="mca-btn primary wide" onClick={() => setSharing(mem)}
                      data-ga-label="Memory card: Get Your Card" data-ga-event="share_card_open" data-ga-category="share">
                      <FaShareAlt /> Get Your Card
                    </button>
                    <div className="mem-card-subactions">
                      <button className="mca-btn icon-btn" onClick={() => openEdit(mem)} title="Edit memory" aria-label="Edit"
                        data-ga-label="Memory card: Edit" data-ga-category="memory"><FaEdit /></button>
                      <button className="mca-btn icon-btn danger" onClick={() => setDeleting(mem)} title="Delete memory" aria-label="Delete"
                        data-ga-label="Memory card: Delete" data-ga-category="memory"><FaTrash /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <AddMemoryModal
            onClose={closeModal}
            onSaved={fetchMemories}
            editMemory={editMemory}
          />
        )}
        {viewing && <MemoryViewer memory={viewing} onClose={() => setViewing(null)} />}
        {sharing && <ShareMemoryPost memory={sharing} userName={userName} onClose={() => setSharing(null)} />}

        {deleting && (
          <div className="mem-confirm-overlay" onClick={() => setDeleting(null)}>
            <div className="mem-confirm" onClick={e => e.stopPropagation()}>
              <div className="mem-confirm-icon"><FaTrash /></div>
              <h3 className="mem-confirm-title">Delete this memory?</h3>
              <p className="mem-confirm-body">
                <strong>"{deleting.title}"</strong> will be permanently removed, along with its{' '}
                {deleting.photos?.length || 0} photo{(deleting.photos?.length || 0) === 1 ? '' : 's'}
                {' '}and story.
                <br />
                <span className="mem-confirm-warn">This action can't be undone.</span>
              </p>
              <div className="mem-confirm-actions">
                <button className="mem-confirm-cancel" onClick={() => setDeleting(null)}>Keep it</button>
                <button className="mem-confirm-del" onClick={confirmDelete}><FaTrash /> Yes, delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
