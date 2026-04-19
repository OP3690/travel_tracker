const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');

require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const destinationsRoutes = require('./routes/destinations');
const friendsRoutes = require('./routes/friends');
const adminRoutes = require('./routes/admin');

const app = express();

// Gzip every response over ~1 KB — typical JSON payloads (memories, users)
// compress 60-80%, which dramatically reduces time-to-interactive after login.
app.use(compression({ threshold: 1024 }));
app.set('etag', 'strong');

// Explicit allow-list
const allowedOrigins = [
  ...Array.from({ length: 11 }, (_, i) => `http://localhost:${3000 + i}`),
  'https://stampyourmap.com',
  'https://www.stampyourmap.com',
  'https://travel-tracker-enfv.vercel.app',
  // Optional extras from env (comma-separated). Set CORS_ORIGINS on Render
  // to whitelist preview/custom domains without a code push.
  ...(process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
];

// Regex patterns — every Vercel preview deployment for this project
const allowedOriginPatterns = [
  /^https:\/\/stampyourmap-[a-z0-9-]+\.vercel\.app$/,
  /^https:\/\/travel-tracker-[a-z0-9-]+\.vercel\.app$/,
  /^https:\/\/[a-z0-9-]+-omprakash-utahas-projects\.vercel\.app$/,
];

function isAllowedOrigin(origin) {
  if (!origin) return true;                              // curl / same-origin
  if (allowedOrigins.includes(origin)) return true;
  return allowedOriginPatterns.some(re => re.test(origin));
}

app.use(cors({
  origin: function (origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      console.warn('[CORS] blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '25mb' }));

const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/travel_dashboard?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI, {
  // Tighter timeouts + larger pool so Atlas connects faster on boot and
  // concurrent auth requests don't block waiting for a socket.
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 20,
  minPoolSize: 2,
  autoIndex: process.env.NODE_ENV !== 'production', // build indexes in dev; skip in prod after initial deploy
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
mongoose.set('strictQuery', true);

// Lightweight warmup endpoint — the frontend pings this on app mount so
// Render's free-tier instance (or a cold MongoDB pool) is already warm
// before the user submits login/signup.
app.get('/warmup', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ ok: true, db: mongoose.connection.readyState === 1 });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/destinations', destinationsRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/test', (req, res) => res.send('Server is running!'));

app.get('/api/debug', (req, res) => res.json({ msg: 'Debug route works!' }));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
