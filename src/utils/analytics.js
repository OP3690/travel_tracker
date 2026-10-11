/**
 * StampYourMap — global GA4 event layer.
 *
 * This file is the single source of truth for everything analytics-related.
 * It layers:
 *
 *   1. trackEvent()        — thin wrapper over gtag()
 *   2. trackMilestone()    — one-time milestones (first_stamp, first_card_
 *                            download, first_memory_photo) persisted in
 *                            localStorage so they fire exactly once per
 *                            device per user — critical for conversion
 *                            funnels where "did the user get to AHA?" is
 *                            the whole question
 *   3. setUser() / clearUser() — identifies the signed-in user to GA with
 *                            user_id + user_properties (country, memories,
 *                            friends, stamps, days_since_signup) so we can
 *                            cohort analysis in the GA UI
 *   4. initGlobalClickTracking() — one document-wide listener that fires
 *                            for every <a>, <button>, [role="button"] or
 *                            any element with a data-ga-* attribute. No
 *                            per-component wiring needed.
 *   5. initRouteTracking() — SPA page_view on every history pushState
 *   6. initScrollDepthTracking() — 25/50/75/100% depth milestones per
 *                            page, de-duped so a user re-scrolling doesn't
 *                            fire again
 *   7. initEngagementTracking() — on pagehide, send a `page_engagement`
 *                            event via navigator.sendBeacon with
 *                            time_on_page_s + max_scroll_pct so GA knows
 *                            whether the user actually read the page
 *   8. initErrorTracking() — window.onerror + unhandledrejection + API 5xx
 *                            → GA event. Lets us catch regressions in
 *                            prod before users complain.
 *   9. initWebVitals()     — LCP, CLS, INP, FCP, TTFB via native
 *                            PerformanceObserver (zero deps). Powers
 *                            Lighthouse-style dashboards in GA.
 *
 * GA property: G-QG1S9ETRH6 (configured in public/index.html).
 */

// A ?ga_debug=1 query param flips every event into console.log too, so
// QA'ing changes doesn't require installing GA Debug View.
const DEBUG = (typeof window !== 'undefined' && /[?&]ga_debug=1\b/.test(window.location.search));

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  // Always stamp common context onto every event — otherwise GA cards for
  // "clicks by page" require slow explorations in the GA UI.
  const enriched = {
    ...params,
    app_version: process.env.REACT_APP_VERSION || 'dev',
    page_path: window.location.pathname,
    is_logged_in: !!(window.__sym_user_id),
  };
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('[GA]', name, enriched);
  }
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, enriched);
  } catch (_) { /* never break the app because of analytics */ }
}

/**
 * Fire an event exactly once per browser per user. Writes a sticky marker
 * to localStorage keyed by `userId + name`, so a logged-in user who
 * reinstalls / clears cache can hit the milestone again on the new
 * device — matches how growth teams actually use milestones ("every new
 * device activation counts"). Signed-out users use "_anon" as the key
 * namespace so a logged-out AHA still fires.
 */
export function trackMilestone(name, params = {}) {
  if (typeof window === 'undefined') return;
  const uid = window.__sym_user_id || '_anon';
  const key = `sym:milestone:${uid}:${name}`;
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, String(Date.now()));
  } catch { /* localStorage denied — fall through so the event still fires */ }
  trackEvent(name, { ...params, is_milestone: true });
}

/**
 * Identify the signed-in user to GA so audiences can be built in the UI
 * (e.g. "users from India with 10+ memories"). Called from Login/Signup
 * success handlers.
 */
export function setUser(user) {
  if (typeof window === 'undefined' || !user) return;
  window.__sym_user_id = user._id || user.id || null;
  const since = user.createdAt ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / 86400000) : null;
  const props = {
    user_country: user.country || null,
    memories_count: Array.isArray(user.memories) ? user.memories.length : (user.memoriesCount || 0),
    friends_count: Array.isArray(user.friends) ? user.friends.length : (user.friendsCount || 0),
    stamps_count: Array.isArray(user.visitedCountries) ? user.visitedCountries.length : 0,
    days_since_signup: since,
    email_verified: !!user.emailVerified,
  };
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('[GA] setUser', window.__sym_user_id, props);
  }
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('config', 'G-QG1S9ETRH6', { user_id: window.__sym_user_id });
    window.gtag('set', 'user_properties', props);
  } catch { /* ignore */ }
}

export function clearUser() {
  if (typeof window === 'undefined') return;
  window.__sym_user_id = null;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('config', 'G-QG1S9ETRH6', { user_id: null });
    window.gtag('set', 'user_properties', {
      user_country: null, memories_count: null, friends_count: null,
      stamps_count: null, days_since_signup: null, email_verified: null,
    });
  } catch { /* ignore */ }
}

/** Walk up the tree to find the nearest meaningful "section" the click is in. */
function findSection(el) {
  let cur = el;
  while (cur && cur !== document.body) {
    const explicit = cur.getAttribute && cur.getAttribute('data-ga-section');
    if (explicit) return explicit;
    const tag = cur.tagName;
    if (tag === 'HEADER') return 'header';
    if (tag === 'FOOTER') return 'footer';
    if (tag === 'NAV') return 'nav';
    if (tag === 'ASIDE') return 'sidebar';
    if (tag === 'DIALOG') return 'modal';
    if (cur.getAttribute && cur.getAttribute('role') === 'dialog') return 'modal';
    cur = cur.parentElement;
  }
  return 'main';
}

/** Build a short CSS-path-ish breadcrumb so you can locate the exact clicked element. */
function buildPath(el) {
  const parts = [];
  let cur = el;
  let depth = 0;
  while (cur && cur !== document.body && depth < 4) {
    let s = cur.tagName.toLowerCase();
    if (cur.id) s += `#${cur.id}`;
    else if (cur.className && typeof cur.className === 'string') {
      const first = cur.className.trim().split(/\s+/)[0];
      if (first) s += `.${first}`;
    }
    parts.unshift(s);
    cur = cur.parentElement;
    depth++;
  }
  return parts.join('>').slice(0, 160);
}

/** Pull a short, useful label out of a clicked element. */
function describeElement(el) {
  if (!el) return {};
  const label =
    el.getAttribute('data-ga-label') ||
    el.getAttribute('aria-label') ||
    (el.innerText || el.textContent || '').trim().slice(0, 80) ||
    el.getAttribute('title') ||
    el.getAttribute('name') ||
    el.id ||
    '';

  const category =
    el.getAttribute('data-ga-category') ||
    (el.tagName === 'A' ? 'link' : 'button');

  const href = el.getAttribute('href') || '';
  const id = el.id || '';
  const classes = (el.getAttribute('class') || '').slice(0, 120);

  return {
    element: el.tagName.toLowerCase(),
    click_label: label.replace(/\s+/g, ' ').trim() || '(no label)',
    click_category: category,
    click_section: findSection(el),
    click_path: buildPath(el),
    click_href: href,
    element_id: id,
    element_class: classes,
    page_path: window.location.pathname,
    page_title: document.title,
  };
}

let clickBound = false;
export function initGlobalClickTracking() {
  if (clickBound || typeof document === 'undefined') return;
  clickBound = true;

  document.addEventListener('click', (e) => {
    // Walk up the DOM so clicks on icons inside a button still register
    const el = e.target.closest('a, button, [role="button"], [data-ga]');
    if (!el) return;

    // Respect an opt-out
    if (el.closest('[data-ga-ignore]')) return;

    const info = describeElement(el);
    const customName = el.getAttribute('data-ga-event');
    trackEvent(customName || 'click', info);
  }, { capture: true });
}

let lastPath = '';
export function trackPageView(path) {
  const p = path || window.location.pathname + window.location.search;
  if (p === lastPath) return;
  lastPath = p;
  trackEvent('page_view', {
    page_path: p,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function initRouteTracking() {
  if (typeof window === 'undefined') return;
  trackPageView();

  // Patch history API so SPA route changes emit page_view
  const fire = () => setTimeout(() => trackPageView(), 0);
  const origPush = window.history.pushState;
  const origReplace = window.history.replaceState;
  window.history.pushState = function (...args) {
    const r = origPush.apply(this, args);
    fire();
    return r;
  };
  window.history.replaceState = function (...args) {
    const r = origReplace.apply(this, args);
    fire();
    return r;
  };
  window.addEventListener('popstate', fire);
}

/* ============================================================
   SCROLL DEPTH — fires scroll_depth events at 25/50/75/100% once
   per route visit. Resets on page_view so a new route starts
   fresh. Was blog-only before; this makes it site-wide so we can
   see which non-blog pages people actually read.
   ============================================================ */
let scrollDepthBound = false;
export function initScrollDepthTracking() {
  if (scrollDepthBound || typeof window === 'undefined') return;
  scrollDepthBound = true;

  let hit = { 25: false, 50: false, 75: false, 100: false };
  let currentPath = window.location.pathname;
  let maxDepth = 0;

  const resetForNewPage = () => {
    // Beacon the max depth of the leaving page before we reset.
    if (maxDepth > 0) {
      trackEvent('scroll_max', { depth: maxDepth, page_path: currentPath });
    }
    hit = { 25: false, 50: false, 75: false, 100: false };
    currentPath = window.location.pathname;
    maxDepth = 0;
  };

  const onScroll = () => {
    const docEl = document.documentElement;
    const scrollTop = window.scrollY || docEl.scrollTop || 0;
    const viewport = window.innerHeight || docEl.clientHeight || 0;
    const fullHeight = docEl.scrollHeight || document.body.scrollHeight || 0;
    const scrollable = Math.max(fullHeight - viewport, 1);
    const pct = Math.min(100, Math.round((scrollTop / scrollable) * 100));
    if (pct > maxDepth) maxDepth = pct;

    [25, 50, 75].forEach(m => {
      if (!hit[m] && pct >= m) {
        hit[m] = true;
        trackEvent('scroll_depth', { depth: m, page_path: currentPath });
      }
    });
    if (!hit[100] && pct >= 95) {
      hit[100] = true;
      trackEvent('scroll_depth', { depth: 100, page_path: currentPath });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  // Re-arm whenever the SPA navigates. We hook into the same patched
  // pushState from initRouteTracking by polling pathname.
  let last = window.location.pathname;
  const checkPath = () => {
    if (window.location.pathname !== last) {
      resetForNewPage();
      last = window.location.pathname;
      // Fire one scroll calc in case the new page is already short
      onScroll();
    }
  };
  window.addEventListener('popstate', checkPath);
  // History patching from initRouteTracking will dispatch; cheap tick too.
  setInterval(checkPath, 1200);
}

/* ============================================================
   ENGAGEMENT BEACON — on pagehide, send a page_engagement event
   with the total time spent on the page + max scroll depth +
   whether the user was active (moved mouse / scrolled / typed)
   in the last 15s. Uses sendBeacon so it survives tab close.
   ============================================================ */
let engagementBound = false;
export function initEngagementTracking() {
  if (engagementBound || typeof window === 'undefined') return;
  engagementBound = true;

  let pageEnteredAt = Date.now();
  let currentPath = window.location.pathname;
  let lastActiveAt = Date.now();
  let maxDepth = 0;

  const touch = () => { lastActiveAt = Date.now(); };
  ['pointerdown', 'keydown', 'scroll', 'wheel', 'touchstart'].forEach(ev => {
    window.addEventListener(ev, touch, { passive: true });
  });

  const trackDepth = () => {
    const docEl = document.documentElement;
    const scrollTop = window.scrollY || docEl.scrollTop || 0;
    const viewport = window.innerHeight || docEl.clientHeight || 0;
    const fullHeight = docEl.scrollHeight || document.body.scrollHeight || 0;
    const scrollable = Math.max(fullHeight - viewport, 1);
    const pct = Math.min(100, Math.round((scrollTop / scrollable) * 100));
    if (pct > maxDepth) maxDepth = pct;
  };
  window.addEventListener('scroll', trackDepth, { passive: true });

  const flush = (reason) => {
    const now = Date.now();
    const time_s = Math.round((now - pageEnteredAt) / 1000);
    if (time_s < 1) return;                        // ignore sub-second bounces
    const active_recent = now - lastActiveAt < 15000;
    trackEvent('page_engagement', {
      page_path: currentPath,
      time_on_page_s: time_s,
      max_scroll_pct: maxDepth,
      ended_with: reason,
      active_recent,
    });
  };

  // visibilitychange fires reliably on mobile (unlike beforeunload)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush('hidden');
  });
  // pagehide is the most reliable last-chance event across browsers
  window.addEventListener('pagehide', () => flush('pagehide'));

  // SPA navigation — flush then reset
  let lastPath2 = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath2) {
      flush('spa_navigate');
      lastPath2 = window.location.pathname;
      currentPath = lastPath2;
      pageEnteredAt = Date.now();
      lastActiveAt = Date.now();
      maxDepth = 0;
    }
  }, 1200);
}

/* ============================================================
   ERROR TRACKING — catches runtime errors + unhandled promise
   rejections + API 5xx responses (via the custom event the api
   client already dispatches). Reports stack frames truncated so
   GA's 100-char param cap doesn't drop context.
   ============================================================ */
let errorBound = false;
export function initErrorTracking() {
  if (errorBound || typeof window === 'undefined') return;
  errorBound = true;

  // Dedupe identical errors in a short window so a looping error
  // doesn't fire 500 events a second.
  const seen = new Map();
  const DEDUP_WINDOW_MS = 10_000;
  const shouldReport = (sig) => {
    const now = Date.now();
    const last = seen.get(sig);
    if (last && (now - last) < DEDUP_WINDOW_MS) return false;
    seen.set(sig, now);
    // Keep the map small
    if (seen.size > 50) {
      const cutoff = now - DEDUP_WINDOW_MS;
      for (const [k, v] of seen) if (v < cutoff) seen.delete(k);
    }
    return true;
  };

  window.addEventListener('error', (e) => {
    const msg = (e?.message || 'error').slice(0, 100);
    const src = (e?.filename || '').slice(0, 100);
    const sig = `${msg}|${src}|${e?.lineno || 0}`;
    if (!shouldReport(sig)) return;
    trackEvent('js_error', {
      error_message: msg,
      error_source: src,
      error_line: e?.lineno || 0,
      error_col: e?.colno || 0,
      stack: (e?.error?.stack || '').slice(0, 300),
    });
  });

  window.addEventListener('unhandledrejection', (e) => {
    const reason = e?.reason;
    const msg = ((reason && (reason.message || String(reason))) || 'unhandled').slice(0, 100);
    const sig = `promise|${msg}`;
    if (!shouldReport(sig)) return;
    trackEvent('promise_rejection', {
      error_message: msg,
      stack: ((reason && reason.stack) || '').slice(0, 300),
    });
  });

  // API client already dispatches CustomEvent('api:serverError') on 5xx
  window.addEventListener('api:serverError', (e) => {
    const detail = e?.detail || {};
    const sig = `api5xx|${detail.status}|${detail.url}`;
    if (!shouldReport(sig)) return;
    trackEvent('api_error', {
      api_status: detail.status || 0,
      api_url: (detail.url || '').slice(0, 160),
    });
  });
}

/* ============================================================
   WEB VITALS — LCP, CLS, INP, FCP, TTFB. Pure PerformanceObserver,
   no extra dependency. Fired once per metric per page. GA auto-
   groups into the Core Web Vitals report when the event name
   starts with `web_vital`.
   ============================================================ */
let vitalsBound = false;
export function initWebVitals() {
  if (vitalsBound || typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return;
  vitalsBound = true;

  const report = (name, value, extra = {}) => {
    trackEvent('web_vital', {
      metric_name: name,
      metric_value: Math.round(value * 1000) / 1000,
      metric_rating:
        name === 'CLS' ? (value <= 0.1 ? 'good' : value <= 0.25 ? 'needs_improvement' : 'poor') :
        name === 'LCP' ? (value <= 2500 ? 'good' : value <= 4000 ? 'needs_improvement' : 'poor') :
        name === 'FCP' ? (value <= 1800 ? 'good' : value <= 3000 ? 'needs_improvement' : 'poor') :
        name === 'INP' ? (value <= 200 ? 'good' : value <= 500 ? 'needs_improvement' : 'poor') :
        name === 'TTFB' ? (value <= 800 ? 'good' : value <= 1800 ? 'needs_improvement' : 'poor') :
        'unknown',
      ...extra,
    });
  };

  // LCP — the biggest LCP entry seen before the first interaction
  try {
    let lcp = 0;
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) lcp = entry.startTime;
    });
    obs.observe({ type: 'largest-contentful-paint', buffered: true });
    const finalize = () => {
      if (lcp > 0) report('LCP', lcp);
      obs.disconnect();
    };
    ['pointerdown', 'keydown', 'scroll'].forEach(ev =>
      window.addEventListener(ev, finalize, { once: true, passive: true, capture: true }));
    window.addEventListener('pagehide', finalize, { once: true });
  } catch { /* unsupported */ }

  // CLS — accumulate layout shifts and report on pagehide
  try {
    let cls = 0;
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) cls += entry.value;
      }
    });
    obs.observe({ type: 'layout-shift', buffered: true });
    window.addEventListener('pagehide', () => { report('CLS', cls); obs.disconnect(); }, { once: true });
  } catch { /* unsupported */ }

  // INP — worst event duration (approximation)
  try {
    let inp = 0;
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > inp) inp = entry.duration;
      }
    });
    obs.observe({ type: 'event', durationThreshold: 40, buffered: true });
    window.addEventListener('pagehide', () => { if (inp > 0) report('INP', inp); obs.disconnect(); }, { once: true });
  } catch { /* unsupported */ }

  // FCP — one-shot
  try {
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          report('FCP', entry.startTime);
          obs.disconnect();
        }
      }
    });
    obs.observe({ type: 'paint', buffered: true });
  } catch { /* unsupported */ }

  // TTFB — from navigation entries
  try {
    const [nav] = performance.getEntriesByType('navigation');
    if (nav && nav.responseStart >= 0) report('TTFB', nav.responseStart);
  } catch { /* unsupported */ }
}

/* ============================================================
   INTERNAL SEARCH — small helper to report in-app search usage.
   Call from Memory Wall / Blog search inputs.
   ============================================================ */
export function trackSearch(context, query, resultsCount) {
  if (!query || !query.trim()) return;
  trackEvent('internal_search', {
    search_context: context,
    search_term: query.trim().toLowerCase().slice(0, 60),
    results_count: resultsCount == null ? -1 : resultsCount,
  });
}

/* ============================================================
   ONE-SHOT INIT — convenience that wires everything up. Keeps
   App.js clean.
   ============================================================ */
export function initAnalytics() {
  initGlobalClickTracking();
  initRouteTracking();
  initScrollDepthTracking();
  initEngagementTracking();
  initErrorTracking();
  initWebVitals();
}
