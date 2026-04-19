/**
 * StampYourMap — global GA4 event layer.
 *
 * - `trackEvent(name, params)` is the one entry point for custom events.
 * - `initGlobalClickTracking()` attaches ONE document-level listener that
 *   fires a `click` event for every <a>, <button>, [role="button"], or any
 *   element with a `data-ga` attribute. This means we don't have to wire
 *   gtag calls into every component by hand.
 * - `initRouteTracking()` fires `page_view` on every SPA route change.
 *
 * GA property: G-QG1S9ETRH6 (configured in public/index.html).
 */

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params);
  } catch (_) { /* never break the app because of analytics */ }
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
