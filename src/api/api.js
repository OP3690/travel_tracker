import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5050';

const API = axios.create({ baseURL: BASE });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Response interceptor — auto-handle expired/invalid tokens.
// Before this, a 401 on any silent .catch(() => {}) call left the user
// sitting on a private page with a stale token, watching saves silently
// fail. Now we drop the token and bounce to /login on 401, and surface
// 5xx via a custom event the app can toast on.
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      // Only redirect on genuine auth pages, not for /api/auth/me probes
      // that legitimately return 401 when the user is logged-out.
      const url = err?.config?.url || '';
      const isAuthProbe = /\/api\/auth\/me/.test(url);
      if (!isAuthProbe && localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          // soft redirect so React Router picks it up if it can
          window.location.assign('/login?reason=session_expired');
        }
      }
    } else if (status >= 500) {
      try {
        window.dispatchEvent(new CustomEvent('api:serverError', {
          detail: { status, url: err?.config?.url },
        }));
      } catch (_) { /* ignore */ }
    }
    return Promise.reject(err);
  }
);

// Fire-and-forget warmup ping. On Render's free tier the backend may be
// cold (30–60s cold start) — hitting /warmup as soon as the user lands on
// any page means the server and MongoDB pool are ready by the time they
// submit login/signup. We also use `fetch` (not axios) with keepalive so
// the request survives a tab navigation.
let warmedAt = 0;
export function warmupApi() {
  const now = Date.now();
  // Cache the warmup for 2 min so we don't hammer the server on every mount
  if (now - warmedAt < 2 * 60 * 1000) return;
  warmedAt = now;
  try {
    if (typeof fetch === 'function') {
      fetch(`${BASE}/warmup`, { method: 'GET', keepalive: true, credentials: 'omit' }).catch(() => {});
    } else {
      API.get('/warmup').catch(() => {});
    }
  } catch (_) { /* never break the app on warmup failure */ }
}

export default API;
