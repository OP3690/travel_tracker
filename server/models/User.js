const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
  selectedLocations: [mongoose.Schema.Types.Mixed],
  visitedDestinations: [{
    state: String,
    destination: String
  }],
  userDestinations: [{
    state: String,
    destination: String
  }],
});

module.exports = mongoose.model('User', userSchema); 