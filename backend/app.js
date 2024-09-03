const express = require('express');
const mongoose = require('mongoose');
const cors=require("cors")
const authRoutes = require('./routes/authRoutes');
const pictureRoute = require('./routes/pictureRoute');

const app = express();
app.use(express.json());
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
  

// Routes
app.use('/auth', authRoutes);
app.use('/pictures', pictureRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
