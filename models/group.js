var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  text: String
});

var groupSchema = new mongoose.Schema({
  name: { type: String, unique: true},
  faveListings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}],
  messages: [messageSchema],
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var Group = mongoose.model('Group', groupSchema);
module.exports = Group;
