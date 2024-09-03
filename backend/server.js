// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const pictureRoute = require('./routes/pictureRoute');

const app = express();
app.use(express.json());

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/picshare');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/pictures', pictureRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
