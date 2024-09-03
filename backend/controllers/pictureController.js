const Picture = require('../models/pictureModel');
const User = require('../models/userModel');

// Get all pictures
exports.getAllPictures = async (req, res) => {
  try {
    const pictures = await Picture.find().sort({ uploadDate: -1 }); // Ensure uploadDate is a field in your model
    res.status(200).json(pictures);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Share a new picture
exports.sharePicture = async (req, res) => {
  const { pictureUrl, title } = req.body;
  const userId = req.userId; // Use userId from request if required

  if (!pictureUrl || !title) {
    return res.status(400).json({ message: 'Picture URL and title are required' });
  }

  try {
    const newPicture = new Picture({
      pictureUrl,
      title,
      userId, // Store the user ID who shared the picture
      favorites: [] // Initialize an empty favorites array
    });

    await newPicture.save();
    res.status(201).json(newPicture);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Toggle favorite status of a picture
exports.toggleFavorite = async (req, res) => {
  const { pictureId } = req.params;
  const userId = req.userId; // Ensure userId is set by middleware

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const picture = await Picture.findById(pictureId);
    if (!picture) {
      return res.status(404).json({ message: 'Picture not found' });
    }

    const pictureIndex = picture.favorites.indexOf(userId);

    if (pictureIndex > -1) {
      picture.favorites.splice(pictureIndex, 1); // Remove from favorites
    } else {
      picture.favorites.push(userId); // Add to favorites
    }

    await picture.save();
    res.status(200).json(picture);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get favorite pictures of a user
exports.getFavoritePictures = async (req, res) => {
  const userId = req.userId; // Use userId from request

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const favorites = await Picture.find({ favorites: userId });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
