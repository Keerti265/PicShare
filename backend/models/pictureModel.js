const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Picture', pictureSchema);
