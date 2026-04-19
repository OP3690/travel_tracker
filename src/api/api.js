import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5050';

const API = axios.create({ baseURL: BASE });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

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
