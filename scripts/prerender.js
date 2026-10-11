#!/usr/bin/env node
/**
 * Prerender public StampYourMap routes to static HTML.
 *
 * WHY: the app is a client-side React SPA, so Googlebot and Google Ads
 * crawlers see `<div id="root"></div>` on first request. Search Console
 * reports ~70 blog URLs "Discovered — currently not indexed" and Google
 * Ads flags landing pages as "Low value content / Not found" for the
 * same reason. This script serves a real HTML snapshot of every public
 * route so crawlers get the full page on first paint; the React bundle
 * then hydrates on top of it with no visible flash (see src/index.js
 * which switches to ReactDOM.hydrate when the root already has
 * children).
 *
 * HOW: boots a one-off static server over the `build/` directory,
 * launches puppeteer, navigates each route, dumps the rendered DOM to
 * `build/<route>/index.html`. Runs after `npm run build` via the
 * `postbuild` hook.
 *
 * This is the replacement for the deprecated `react-snap` package,
 * whose bundled puppeteer@1.20 (2019) no longer launches on current
 * macOS/Linux. We own ~50 lines instead of pinning an abandoned dep.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const PORT = Number(process.env.PRERENDER_PORT || 4573);
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 4);
const TIMEOUT_MS = 25000;

// Only prerender PUBLIC routes. Private routes (dashboard, memories,
// settings, etc.) require auth and would just snapshot the /login
// redirect — pointless and misleading for crawlers.
function loadRoutes() {
  const base = [
    '/', '/about', '/contact', '/privacy', '/terms', '/cookies',
    '/login', '/signup', '/forgot-password', '/blog',
  ];
  // Pull blog slugs from the central manifest so adding a post
  // auto-adds a prerender target. Falls back to crawling if that
  // file structure changes.
  try {
    const postsPath = path.join(__dirname, '..', 'src', 'components', 'Blog', 'posts.js');
    const src = fs.readFileSync(postsPath, 'utf8');
    const slugs = Array.from(src.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g)).map(m => m[1]);
    const blog = Array.from(new Set(slugs)).map(s => `/blog/${s}`);
    return [...base, ...blog];
  } catch (err) {
    console.warn('[prerender] could not load blog manifest, prerendering base routes only:', err.message);
    return base;
  }
}

// Mime by extension — minimal set needed to serve CRA's build output.
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.map':  'application/json',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
};

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.join(BUILD_DIR, url);
    try {
      const stat = fs.statSync(file);
      if (stat.isDirectory()) file = path.join(file, 'index.html');
    } catch { /* fall through */ }
    // SPA fallback — any unresolved route serves the root index so
    // react-router can take over client-side.
    if (!fs.existsSync(file)) file = path.join(BUILD_DIR, 'index.html');
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(resolve => server.listen(PORT, '127.0.0.1', () => resolve(server)));
}

async function prerenderOne(browser, route) {
  const page = await browser.newPage();
  const url = `http://127.0.0.1:${PORT}${route}`;
  try {
    // Block third-party trackers so prerender is deterministic + fast.
    await page.setRequestInterception(true);
    page.on('request', req => {
      const host = (new URL(req.url())).host;
      const blocked = /googletagmanager|google-analytics|clarity\.ms|googlesyndication|doubleclick|buymeacoffee/i.test(host);
      if (blocked) req.abort(); else req.continue();
    });
    // Stub out the auth check so public pages don't flash a login
    // redirect during snapshot (PrivateRoute reads token from
    // localStorage; a missing token still works for all public routes).
    await page.evaluateOnNewDocument(() => {
      try { window.__PRERENDER__ = true; } catch {}
    });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: TIMEOUT_MS });
    // Wait for the React root to actually have mounted content so we
    // don't snapshot an empty <div id="root"></div>.
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        return root && root.children.length > 0;
      },
      { timeout: TIMEOUT_MS }
    ).catch(() => { /* some routes legitimately have no root content */ });
    // Give lazy-loaded components a beat to paint.
    await new Promise(r => setTimeout(r, 400));
    const html = await page.content();
    const outDir = path.join(BUILD_DIR, route === '/' ? '' : route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    return { route, ok: true, bytes: html.length };
  } catch (err) {
    return { route, ok: false, error: err.message };
  } finally {
    await page.close();
  }
}

async function run() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('[prerender] build directory not found — run `npm run build` first.');
    process.exit(1);
  }
  const routes = loadRoutes();
  console.log(`[prerender] starting static server on :${PORT}`);
  const server = await startStaticServer();

  console.log('[prerender] launching chromium');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  console.log(`[prerender] rendering ${routes.length} routes with concurrency=${CONCURRENCY}`);
  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < routes.length) {
      const my = routes[idx++];
      const start = Date.now();
      const r = await prerenderOne(browser, my);
      const ms = Date.now() - start;
      results.push({ ...r, ms });
      const status = r.ok ? `${(r.bytes / 1024).toFixed(1)} KB` : `FAIL ${r.error}`;
      console.log(`  ${r.ok ? '✓' : '✗'} ${my.padEnd(44)} ${ms}ms  ${status}`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  await browser.close();
  server.close();

  const ok  = results.filter(r => r.ok).length;
  const bad = results.length - ok;
  console.log(`[prerender] done: ${ok} ok, ${bad} failed, ${results.length} total`);
  if (bad > 0) {
    console.warn('[prerender] some routes failed — build still succeeded; failed routes fall back to CSR.');
  }
}

run().catch(err => {
  console.error('[prerender] fatal:', err);
  process.exit(1);
});
