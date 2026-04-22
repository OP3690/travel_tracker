import React, { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BlogShell, usePageMeta, useRevealOnScroll } from './BlogLayout';
import { POSTS } from './posts';

const POSTS_PER_PAGE = 9;

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

function slugifyCategory(cat) {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

function buildCategories(posts) {
  const counts = new Map();
  posts.forEach(p => {
    counts.set(p.category, (counts.get(p.category) || 0) + 1);
  });
  return [
    { id: 'all', label: 'All guides', count: posts.length },
    ...Array.from(counts.entries()).map(([cat, count]) => ({
      id: slugifyCategory(cat),
      label: cat.replace(/\s+Travel$/, ''),
      count,
    })),
  ];
}

// Build a compact page-number list like [1, 2, 3, '…', 8] for long paginations.
function buildPageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, 2, total - 1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter(n => n >= 1 && n <= total).sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…');
    result.push(sorted[i]);
  }
  return result;
}

export default function BlogIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const rawPage = parseInt(searchParams.get('page'), 10);
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  usePageMeta({
    title: 'Travel Blog — USA, Europe, Japan, Thailand, Italy, Philippines | StampYourMap',
    description:
      `${POSTS.length} long-form, research-heavy travel guides across 6 regions — road-trip itineraries, city deep-dives, food guides, budget breakdowns and bucket lists. Cross-linked, data-rich, always free.`,
    url: '/blog',
    image: '/felix-rostig-UmV2wr-Vbq8-unsplash.jpg',
    keywords:
      'travel blog, usa travel, europe travel, japan travel, thailand travel, italy travel, philippines travel, travel itineraries, travel guides, stampyourmap blog',
  });
  useRevealOnScroll();

  // Re-run reveal-on-scroll when the filter or page changes so newly-mounted cards animate in.
  useEffect(() => {
    // Let React commit the new cards, then kick the IntersectionObserver
    const t = setTimeout(() => {
      document.querySelectorAll('.blog-reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
      });
    }, 0);
    return () => clearTimeout(t);
  }, [activeCategory, currentPage]);

  const categories = useMemo(() => buildCategories(POSTS), []);
  const categoryCount = categories.length - 1; // excluding "All"

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return POSTS;
    return POSTS.filter(p => slugifyCategory(p.category) === activeCategory);
  }, [activeCategory]);

  // On page 1 of "All" view, the first post is the "Featured" hero card and the
  // rest populate the paginated grid. On filtered views or non-first pages,
  // every post goes into the grid.
  const isFirstPageAll = activeCategory === 'all' && currentPage === 1;
  const featured = isFirstPageAll ? filteredPosts[0] : null;
  const gridSource = isFirstPageAll ? filteredPosts.slice(1) : filteredPosts;

  const totalPages = Math.max(1, Math.ceil(gridSource.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * POSTS_PER_PAGE;
  const pagePosts = gridSource.slice(startIdx, startIdx + POSTS_PER_PAGE);
  const pageList = buildPageList(safePage, totalPages);

  const setCategory = (catId) => {
    const next = new URLSearchParams(searchParams);
    if (catId === 'all') next.delete('category');
    else next.set('category', catId);
    next.delete('page');
    setSearchParams(next, { replace: false });
  };

  const setPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    const next = new URLSearchParams(searchParams);
    if (pageNum === 1) next.delete('page');
    else next.set('page', String(pageNum));
    setSearchParams(next, { replace: false });
    // Smooth scroll to the grid so the user sees the new posts
    setTimeout(() => {
      document.getElementById('blog-grid-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <BlogShell>
      {/* Hero */}
      <header className="blog-index-hero">
        <span className="blog-index-eyebrow">The StampYourMap Journal</span>
        <h1>Travel Guides, Built on Real Data.</h1>
        <p>
          Long-form travel stories, itineraries and interactive maps for travelers
          who want more than a top-10 list.{' '}
          <strong>{POSTS.length} posts</strong> across{' '}
          <strong>{categoryCount} regions</strong>, cross-linked, data-rich, and always free.
        </p>
      </header>

      {/* Category filter pills */}
      <nav className="blog-filter-bar" aria-label="Filter guides by region">
        {categories.map(c => {
          const isActive = activeCategory === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              aria-pressed={isActive}
              className={`blog-filter-pill ${isActive ? 'active' : ''}`}
            >
              <span>{c.label}</span>
              <span className="blog-filter-count">{c.count}</span>
            </button>
          );
        })}
      </nav>

      {/* Featured card (only on page 1 of "All" view) */}
      {featured && (
        <Link
          to={`/blog/${featured.slug}`}
          className="blog-featured-card blog-reveal"
          aria-label={`Featured: ${featured.title}`}
        >
          <div className="blog-featured-inner">
            <div className="blog-featured-top">
              <span className="blog-featured-chip">✨ Featured</span>
              <span className="blog-featured-cat">{featured.category}</span>
            </div>
            <h2>
              <span className="blog-featured-emoji" aria-hidden="true">{featured.heroEmoji}</span>
              {featured.title}
            </h2>
            <p>{featured.description}</p>
            <div className="blog-featured-meta">
              <span>{formatDate(featured.datePublished)}</span>
              <span className="blog-featured-sep">·</span>
              <span>{featured.readMinutes} min read</span>
              <span className="blog-featured-arrow">Read guide →</span>
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      <div id="blog-grid-anchor" />
      {pagePosts.length > 0 ? (
        <section className="blog-index-grid">
          {pagePosts.map(p => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="blog-card blog-reveal"
            >
              <span className="cat">{p.category}</span>
              <h3>
                <span className="blog-card-emoji" aria-hidden="true">{p.heroEmoji}</span>
                {p.title}
              </h3>
              <p>{p.description}</p>
              <div className="meta">
                {formatDate(p.datePublished)} · {p.readMinutes} min read
              </div>
            </Link>
          ))}
        </section>
      ) : !featured ? (
        <div className="blog-empty-state">
          <p>No guides here yet. Try another region — we publish new posts every week.</p>
        </div>
      ) : null}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="blog-pagination" aria-label="Pagination">
          <button
            type="button"
            onClick={() => setPage(safePage - 1)}
            disabled={safePage <= 1}
            className="blog-page-arrow"
            aria-label="Previous page"
          >
            ← Previous
          </button>
          <div className="blog-page-numbers" role="list">
            {pageList.map((p, i) => p === '…' ? (
              <span key={`ellipsis-${i}`} className="blog-page-ellipsis" aria-hidden="true">…</span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`blog-page-num ${p === safePage ? 'active' : ''}`}
                aria-label={`Page ${p}`}
                aria-current={p === safePage ? 'page' : undefined}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPage(safePage + 1)}
            disabled={safePage >= totalPages}
            className="blog-page-arrow"
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}

      {/* Results summary */}
      <div className="blog-index-summary" aria-live="polite">
        Showing{' '}
        <strong>
          {(featured ? 1 : 0) + pagePosts.length} of {filteredPosts.length}
        </strong>{' '}
        {filteredPosts.length === 1 ? 'guide' : 'guides'}
        {activeCategory !== 'all'
          ? ` in ${categories.find(c => c.id === activeCategory)?.label || activeCategory}`
          : ''}
      </div>
    </BlogShell>
  );
}
