const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const destinationsRoutes = require('./routes/destinations');

const app = express();

const allowedOrigins = [
  ...Array.from({length: 11}, (_, i) => `http://localhost:30${i}`),
  'https://travel-tracker-enfv.vercel.app'
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

mongoose.connect('mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/travel_dashboard?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/destinations', destinationsRoutes);

app.get('/test', (req, res) => res.send('Server is running!'));

app.get('/api/debug', (req, res) => res.json({ msg: 'Debug route works!' }));

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 