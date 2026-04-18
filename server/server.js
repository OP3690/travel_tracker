const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const destinationsRoutes = require('./routes/destinations');
const friendsRoutes = require('./routes/friends');
const adminRoutes = require('./routes/admin');

const app = express();

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
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/destinations', destinationsRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/test', (req, res) => res.send('Server is running!'));

app.get('/api/debug', (req, res) => res.json({ msg: 'Debug route works!' }));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
