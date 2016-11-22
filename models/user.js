var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}],
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
