const express = require('express');
const router = express.Router();
const Favorite = require('../models/favoriteModel'); // Import the Favorite model

// Get all favorites for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId; // Assume userId is passed as a query parameter
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const favorites = await Favorite.find({ userId }).populate('pictureId', 'url description'); // Populate with picture details
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new favorite
router.post('/add', async (req, res) => {
  try {
    const { userId, pictureId } = req.body;
    if (!userId || !pictureId) return res.status(400).json({ error: 'User ID and Picture ID are required' });

    const favorite = new Favorite({ userId, pictureId });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a favorite
router.delete('/remove', async (req, res) => {
  try {
    const { userId, pictureId } = req.body;
    if (!userId || !pictureId) return res.status(400).json({ error: 'User ID and Picture ID are required' });

    const result = await Favorite.deleteOne({ userId, pictureId });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Favorite not found' });

    res.status(200).json({ message: 'Favorite removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
