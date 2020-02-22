const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  email: { type: String, unique: true },
  access_token: String,
  expires_in: Number,
});

module.exports = mongoose.model('User', userSchema);
