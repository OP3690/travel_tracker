const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// Define a proper schema for destinations
const destinationSchema = new mongoose.Schema({
  state: { type: String, required: true },
  type: { type: String, required: true },
  destinations: [{ type: String }],
  topDestinations: [{ type: String }]
}, { strict: false });

const Destination = mongoose.model('Destination', destinationSchema, 'destinations');

// GET all destinations
router.get('/', auth, async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.json(destinations);
  } catch (err) {
    console.error('Error fetching destinations:', err);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

// POST new destination
router.post('/', auth, async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (err) {
    console.error('Error creating destination:', err);
    res.status(500).json({ error: 'Failed to create destination' });
  }
});

// PUT update destination
router.put('/:id', auth, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(destination);
  } catch (err) {
    console.error('Error updating destination:', err);
    res.status(500).json({ error: 'Failed to update destination' });
  }
});

// DELETE destination
router.delete('/:id', auth, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json({ message: 'Destination deleted successfully' });
  } catch (err) {
    console.error('Error deleting destination:', err);
    res.status(500).json({ error: 'Failed to delete destination' });
  }
});

// Add a new destination to a state/UT
router.post('/:id/destination', auth, async (req, res) => {
  try {
    const { destination } = req.body; // string
    const doc = await Destination.findByIdAndUpdate(
      req.params.id,
      { $push: { destinations: destination } },
      { new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add destination' });
  }
});

// Edit a destination in a state/UT
router.put('/:id/destination', auth, async (req, res) => {
  try {
    const { oldName, newName } = req.body;
    const doc = await Destination.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    doc.destinations = doc.destinations.map(d => d === oldName ? newName : d);
    doc.topDestinations = doc.topDestinations.map(d => d === oldName ? newName : d);
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to edit destination' });
  }
});

// Delete a destination from a state/UT
router.delete('/:id/destination', auth, async (req, res) => {
  try {
    const name = req.query.name;
    const id = req.params.id;
    console.log('DELETE /:id/destination', { id, name });
    if (!name) return res.status(400).json({ error: 'Destination name is required' });
    const doc = await Destination.findByIdAndUpdate(
      id,
      { $pull: { destinations: name, topDestinations: name } },
      { new: true }
    );
    console.log('MongoDB update result:', doc);
    res.json(doc);
  } catch (err) {
    console.error('Error in DELETE /:id/destination:', err);
    res.status(500).json({ error: 'Failed to delete destination' });
  }
});

module.exports = router; 