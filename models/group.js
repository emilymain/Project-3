var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  // name: { type: String, unique: true},
  // favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}],
  // username: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

  username: String,
  message: String
});

var Group = mongoose.model('Group', groupSchema);
module.exports = Group;
