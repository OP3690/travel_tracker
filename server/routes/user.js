const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

const ADMIN_EMAIL = 'global5665@gmail.com';

// ============================================
// SELECTED LOCATIONS (legacy — map pins)
// ============================================
router.get('/selected', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ selectedLocations: user.selectedLocations || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/selected', auth, async (req, res) => {
  try {
    const { selectedLocations } = req.body;
    await User.findByIdAndUpdate(
      req.userId,
      { $set: { selectedLocations } },
      { new: true }
    );
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// VISITED DESTINATIONS (within regions)
// ============================================
router.get('/visited-destinations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ visitedDestinations: user.visitedDestinations || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/visited-destinations', auth, async (req, res) => {
  try {
    const { state, destination, country, dateVisited, note, rating } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const exists = user.visitedDestinations.some(
      d => d.state === state && d.destination === destination
    );
    if (exists) {
      await User.findByIdAndUpdate(req.userId, { $pull: { visitedDestinations: { state, destination } } });
      return res.json({ message: 'Removed' });
    } else {
      await User.findByIdAndUpdate(req.userId, {
        $push: { visitedDestinations: { state, destination, country, dateVisited, note, rating } }
      });
      return res.json({ message: 'Added' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// USER-ADDED DESTINATIONS
// ============================================
router.get('/destinations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ userDestinations: user.userDestinations || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/destination', auth, async (req, res) => {
  try {
    const { state, destination, country, dateVisited, note } = req.body;
    if (!state || !destination) return res.status(400).json({ error: 'state and destination required' });
    await User.findByIdAndUpdate(req.userId, {
      $push: { userDestinations: { state, destination, country, dateVisited, note } }
    });
    res.json({ message: 'Added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/destination', auth, async (req, res) => {
  try {
    const { state, destination } = req.query;
    if (!state || !destination) return res.status(400).json({ error: 'state and destination required' });
    await User.findByIdAndUpdate(req.userId, { $pull: { userDestinations: { state, destination } } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// TRIP PLANS (was localStorage, now server-side)
// ============================================
router.get('/trip-plans', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ tripPlans: user.tripPlans || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const TRIP_FIELDS = [
  'title', 'destination', 'country', 'region', 'cities',
  'tripType', 'purpose', 'travelers', 'status',
  'startDate', 'endDate', 'budget',
  'notes', 'checklist', 'itinerary', 'bookings', 'coTravelers', 'completed',
];

router.post('/trip-plans', auth, async (req, res) => {
  try {
    if (!req.body.title) return res.status(400).json({ error: 'title required' });
    const user = await User.findById(req.userId);
    const payload = {};
    for (const f of TRIP_FIELDS) if (req.body[f] !== undefined) payload[f] = req.body[f];
    user.tripPlans.push(payload);
    await user.save();
    const created = user.tripPlans[user.tripPlans.length - 1];
    res.json({ trip: created, tripPlans: user.tripPlans });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/trip-plans/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const plan = user.tripPlans.id(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Trip plan not found' });
    for (const f of TRIP_FIELDS) if (req.body[f] !== undefined) plan[f] = req.body[f];
    plan.updatedAt = new Date();
    await user.save();
    res.json({ trip: plan, tripPlans: user.tripPlans });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/trip-plans/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.tripPlans = user.tripPlans.filter(p => p._id.toString() !== req.params.id);
    await user.save();
    res.json({ tripPlans: user.tripPlans });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// MEMORIES (photos + story per place, stamp a map)
// ============================================
const MAX_PHOTOS = 4;
const MAX_STORY_WORDS = 1000;

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

router.get('/memories', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const memories = (user.memories || []).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ memories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const VALID_VISIBILITY = ['public', 'friends', 'private'];

router.post('/memories', auth, async (req, res) => {
  try {
    const { title, country, region, story, photos, dateVisited, visibility } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ error: 'Title is required' });
    if (countWords(story) > MAX_STORY_WORDS) {
      return res.status(400).json({ error: `Story exceeds ${MAX_STORY_WORDS} words` });
    }
    const vis = VALID_VISIBILITY.includes(visibility) ? visibility : 'friends';
    const safePhotos = Array.isArray(photos) ? photos.slice(0, MAX_PHOTOS) : [];
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.memories.push({
      title: title.trim(),
      country,
      region,
      story: story || '',
      photos: safePhotos,
      dateVisited: dateVisited || null,
      visibility: vis,
    });
    await user.save();
    const created = user.memories[user.memories.length - 1];
    res.status(201).json({ memory: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/memories/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const mem = user.memories.id(req.params.id);
    if (!mem) return res.status(404).json({ error: 'Memory not found' });
    const { title, country, region, story, photos, dateVisited, visibility } = req.body;
    if (title !== undefined) mem.title = String(title).trim();
    if (country !== undefined) mem.country = country;
    if (region !== undefined) mem.region = region;
    if (story !== undefined) {
      if (countWords(story) > MAX_STORY_WORDS) {
        return res.status(400).json({ error: `Story exceeds ${MAX_STORY_WORDS} words` });
      }
      mem.story = story;
    }
    if (Array.isArray(photos)) mem.photos = photos.slice(0, MAX_PHOTOS);
    if (dateVisited !== undefined) mem.dateVisited = dateVisited;
    if (visibility !== undefined && VALID_VISIBILITY.includes(visibility)) mem.visibility = visibility;
    mem.updatedAt = new Date();
    await user.save();
    res.json({ memory: mem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/memories/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.memories = user.memories.filter(m => m._id.toString() !== req.params.id);
    await user.save();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// PROFILE UPDATE
// ============================================
router.put('/profile', auth, async (req, res) => {
  try {
    const allowed = ['name', 'mobile', 'phoneCode', 'bio', 'avatar', 'dateOfBirth', 'gender', 'social', 'cardTemplate'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    const user = await User.findByIdAndUpdate(req.userId, { $set: updates }, { new: true });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// PREFERENCES (theme, units, language)
// ============================================
router.put('/preferences', auth, async (req, res) => {
  try {
    const allowed = ['theme', 'units', 'language'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    const user = await User.findByIdAndUpdate(req.userId, { $set: updates }, { new: true });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// ADMIN-ONLY: Change country
// ============================================
router.post('/country', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.email !== ADMIN_EMAIL && user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin can change country' });
    }
    const { country } = req.body;
    if (!country) return res.status(400).json({ error: 'Country required' });
    await User.findByIdAndUpdate(req.userId, { $set: { country } });
    res.json({ message: 'Country updated', country });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// ACCOUNT: Soft delete
// ============================================
router.delete('/account', auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $set: { isDeleted: true, deletedAt: new Date() }
    });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test
router.get('/test', (req, res) => {
  res.json({ msg: 'User routes working!' });
});

module.exports = router;
