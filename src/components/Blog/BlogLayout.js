import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import './Blog.css';

const SITE_ORIGIN = 'https://stampyourmap.com';

// Core SEO hook — temporarily overrides the index.html default meta while
// the page is mounted, and restores it on unmount. Accepts any JSON-LD
// schema object so blog articles, About, Contact, etc. can all reuse this.
export function usePageMeta({
  title,
  description,
  url,
  image,
  ogType = 'website',
  keywords,
  jsonLd,
}) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const absUrl = url && url.startsWith('http') ? url : `${SITE_ORIGIN}${url || ''}`;
    const absImage = image && image.startsWith('http') ? image : `${SITE_ORIGIN}${image || ''}`;

    const prevTitle = document.title;
    document.title = title;

    const restore = [];
    const setContent = (selector, content) => {
      const el = document.querySelector(selector);
      if (!el || content == null) return;
      const prev = el.getAttribute('content');
      el.setAttribute('content', content);
      restore.push(() => el.setAttribute('content', prev ?? ''));
    };
    const setHref = (selector, href) => {
      const el = document.querySelector(selector);
      if (!el || href == null) return;
      const prev = el.getAttribute('href');
      el.setAttribute('href', href);
      restore.push(() => el.setAttribute('href', prev ?? ''));
    };

    setContent('meta[name="description"]', description);
    if (keywords) setContent('meta[name="keywords"]', keywords);
    setContent('meta[property="og:title"]', title);
    setContent('meta[property="og:description"]', description);
    setContent('meta[property="og:url"]', absUrl);
    setContent('meta[property="og:type"]', ogType);
    setContent('meta[name="twitter:title"]', title);
    setContent('meta[name="twitter:description"]', description);
    setHref('link[rel="canonical"]', absUrl);

    // Upsert og:image (preview thumbnail on WhatsApp/Slack/Twitter shares)
    let ogImage = document.querySelector('meta[property="og:image"]');
    let ogImageWasCreated = false;
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
      ogImageWasCreated = true;
    }
    const prevOg = ogImage.getAttribute('content');
    ogImage.setAttribute('content', absImage);
    restore.push(() => {
      if (ogImageWasCreated) ogImage.remove();
      else ogImage.setAttribute('content', prevOg ?? '');
    });

    // Upsert twitter:image
    let twImage = document.querySelector('meta[name="twitter:image"]');
    let twImageWasCreated = false;
    if (!twImage) {
      twImage = document.createElement('meta');
      twImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twImage);
      twImageWasCreated = true;
    }
    const prevTw = twImage.getAttribute('content');
    twImage.setAttribute('content', absImage);
    restore.push(() => {
      if (twImageWasCreated) twImage.remove();
      else twImage.setAttribute('content', prevTw ?? '');
    });

    // Optional page-specific JSON-LD
    let ldScript;
    if (jsonLd) {
      ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.id = 'page-jsonld';
      ldScript.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(ldScript);
      restore.push(() => ldScript.remove());
    }

    return () => {
      document.title = prevTitle;
      restore.forEach(fn => {
        try { fn(); } catch (_) { /* ignore */ }
      });
    };
  }, [title, description, url, image, ogType, keywords, jsonLd]);
}

// Blog-post-specific SEO — same meta handling plus an Article JSON-LD
// schema for Google rich results, plus analytics (blog_post_view + scroll-depth milestones).
export function useBlogSEO({
  title,
  description,
  url,
  image,
  datePublished,
  author = 'StampYourMap',
  keywords,
  slug,
  category,
  readMinutes,
}) {
  const absUrl = url && url.startsWith('http') ? url : `${SITE_ORIGIN}${url || ''}`;
  const absImage = image && image.startsWith('http') ? image : `${SITE_ORIGIN}${image || ''}`;
  usePageMeta({
    title,
    description,
    url,
    image,
    ogType: 'article',
    keywords,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      url: absUrl,
      image: [absImage],
      datePublished,
      dateModified: datePublished,
      author: { '@type': 'Organization', name: author, url: SITE_ORIGIN },
      publisher: {
        '@type': 'Organization',
        name: 'StampYourMap',
        url: SITE_ORIGIN,
        logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/icon-512.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': absUrl },
    },
  });
  // Fire `blog_post_view` + scroll-depth milestones (25 / 50 / 75 / 100).
  // Derives slug from url path if not explicitly provided.
  const derivedSlug = slug || (url ? url.replace(/^\/blog\//, '').replace(/\/+$/, '') : '');
  useBlogAnalytics({
    slug: derivedSlug,
    title,
    category,
    readMinutes,
  });
}

// Fires `blog_post_view` on mount, then tracks scroll depth and fires
// `blog_scroll_depth` at 25 / 50 / 75% and `blog_read_complete` at ≥90%.
// One-shot per milestone — we don't spam events on every scroll tick.
export function useBlogAnalytics({ slug, title, category, readMinutes }) {
  useEffect(() => {
    if (typeof window === 'undefined' || !slug) return;

    const startedAt = Date.now();
    trackEvent('blog_post_view', {
      post_slug: slug,
      post_title: title || '',
      post_category: category || '',
      read_minutes_est: readMinutes || 0,
    });

    const hit = { 25: false, 50: false, 75: false, 100: false };
    const onScroll = () => {
      const docEl = document.documentElement;
      const scrollTop = window.scrollY || docEl.scrollTop || 0;
      const viewport = window.innerHeight || docEl.clientHeight || 0;
      const fullHeight = docEl.scrollHeight || document.body.scrollHeight || 0;
      const scrollable = Math.max(fullHeight - viewport, 1);
      const pct = Math.min(100, Math.round((scrollTop / scrollable) * 100));

      [25, 50, 75].forEach(m => {
        if (!hit[m] && pct >= m) {
          hit[m] = true;
          trackEvent('blog_scroll_depth', {
            post_slug: slug,
            depth: m,
            seconds_since_open: Math.round((Date.now() - startedAt) / 1000),
          });
        }
      });
      if (!hit[100] && pct >= 90) {
        hit[100] = true;
        trackEvent('blog_read_complete', {
          post_slug: slug,
          seconds_to_read: Math.round((Date.now() - startedAt) / 1000),
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Fire once in case the page is already scrolled (e.g. anchor-link entry)
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug, title, category, readMinutes]);
}

// IntersectionObserver-driven reveal: any element with className="blog-reveal"
// inside the article fades up as it enters the viewport.
export function useRevealOnScroll() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // Progressive fallback: show everything immediately
      document.querySelectorAll('.blog-reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.08 }
    );
    const nodes = document.querySelectorAll('.blog-reveal');
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
}

export function BlogNav() {
  return (
    <nav className="blog-nav" aria-label="Primary">
      <Link to="/" className="blog-nav-brand">▲ StampYourMap</Link>
      <div className="blog-nav-links">
        <Link to="/blog">Blog</Link>
        <a href="/#features">Features</a>
        <Link to="/signup" className="blog-nav-cta">Get my map — free</Link>
      </div>
    </nav>
  );
}

export function BlogShell({ children }) {
  return (
    <div className="blog-shell">
      <BlogNav />
      {children}
    </div>
  );
}
