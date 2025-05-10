const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get selected locations
router.get('/selected', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ selectedLocations: user.selectedLocations });
});

// Update selected locations
router.post('/selected', auth, async (req, res) => {
  try {
    const { selectedLocations } = req.body;
    console.log('Updating user:', req.userId, 'with:', selectedLocations);
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: { selectedLocations } },
      { new: true }
    );
    console.log('Updated user document:', updatedUser);
    res.json({ message: 'Updated' });
  } catch (err) {
    console.error('Error updating selectedLocations:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get visited destinations
router.get('/visited-destinations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ visitedDestinations: user.visitedDestinations || [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visited destinations' });
  }
});

// Toggle (add/remove) a visited destination
router.post('/visited-destinations', auth, async (req, res) => {
  try {
    const { state, destination } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const exists = user.visitedDestinations.some(
      d => d.state === state && d.destination === destination
    );
    let update;
    if (exists) {
      // Remove
      update = { $pull: { visitedDestinations: { state, destination } } };
    } else {
      // Add
      update = { $push: { visitedDestinations: { state, destination } } };
    }
    await User.findByIdAndUpdate(req.userId, update);
    res.json({ message: exists ? 'Removed' : 'Added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update visited destinations' });
  }
});

// Add a user-specific destination
router.post('/destination', auth, async (req, res) => {
  try {
    const { state, destination } = req.body;
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { userDestinations: { state, destination } } }
    );
    res.json({ message: 'User destination added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user destination' });
  }
});

// Get all user-specific destinations
router.get('/destinations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ userDestinations: user.userDestinations || [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user destinations' });
  }
});

// Delete a user-specific destination
router.delete('/destination', auth, async (req, res) => {
  try {
    const { state, destination } = req.query;
    if (!state || !destination) return res.status(400).json({ error: 'State and destination are required' });
    await User.findByIdAndUpdate(
      req.userId,
      { $pull: { userDestinations: { state, destination } } }
    );
    res.json({ message: 'User destination deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user destination' });
  }
});

// Test route to confirm router is mounted
router.get('/test', (req, res) => {
  res.json({ msg: 'User route works!' });
});

module.exports = router; 