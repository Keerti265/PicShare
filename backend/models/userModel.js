const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Picture' }]
});
const User = mongoose.models.User || mongoose.model("User",userSchema);
module.exports = User;




