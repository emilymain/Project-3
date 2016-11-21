var mongoose = require('mongoose');

//trying to upload images
var multer = require ('multer')
var upload = multer({dest: 'public/uploads/'})
//
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
