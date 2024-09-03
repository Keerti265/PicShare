const express = require('express');
const router = express.Router();
const Picture = require('../models/pictureModel');
const User = require('../models/userModel');

// Middleware to set userId from request (ensure this is used in your server file)
router.use((req, res, next) => {
  const userId = req.headers['user-id']; // Get userId from headers or any other source
  if (userId) {
    req.userId = userId;
  }
  next();
});

// Get all pictures
router.get('/', async (req, res) => {
  try {
    const pictures = await Picture.find();
    res.json(pictures);
  } catch (err) {
    console.error('Error fetching pictures:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Share a new picture
router.post('/', async (req, res) => {
  console.log('Received request body:', req.body);
  const { url, description } = req.body;

  if (!url || !description) {
    return res.status(400).json({ message: 'Picture URL and description are required' });
  }

  try {
    const newPicture = new Picture({ url, description });
    await newPicture.save();
    res.status(201).json(newPicture);
  } catch (error) {
    res.status(500).json({ message: 'Error saving picture', error });
  }
});

// Toggle favorite status
router.post('/:pictureId/toggle-favorite', async (req, res) => {
  const { pictureId } = req.params;
  const userId = req.userId; // Ensure userId is set by middleware

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const picture = await Picture.findById(pictureId);
    const user = await User.findById(userId);
    
    if (!picture || !user) {
      return res.status(404).json({ message: 'Picture or User not found' });
    }

    const pictureIndex = picture.favorites.indexOf(userId);
    const userIndex = user.favorites.indexOf(pictureId);

    if (pictureIndex > -1) {
      picture.favorites.splice(pictureIndex, 1);
    } else {
      picture.favorites.push(userId);
    }

    if (userIndex > -1) {
      user.favorites.splice(userIndex, 1);
    } else {
      user.favorites.push(pictureId);
    }

    await picture.save();
    await user.save();

    res.json({ pictureFavorites: picture.favorites, userFavorites: user.favorites });
  } catch (err) {
    console.error('Error toggling favorite:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
