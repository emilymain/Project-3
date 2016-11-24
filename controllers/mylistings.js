var Listing = require('../models/listing');
var User = require('../models/user');

module.exports = {
  index: index
}

function index(req, res, next) {
  console.log(req.user);
  // User.find(req.user._id, function(err, user){
  //   if (err) throw err
  //   Listing.find({}, function(err, listings) {
  //     if(err) throw err;
  //     var list = listings[0]
  //     User.findOneAndUpdate(user, {$push: {'favorites': list}}, {upsert: true}, function(err, user){
  //       console.log(user)
  //     })
  //   });
  // })
  var user = req.user;
  var faves = [];
  user.favorites.forEach(function(list) {
    Listing.findById(list._id, function(err, listing) {
      if(err) throw err;

      faves.push(listing);
    });
  });
  res.render('mylistings.ejs', { title: 'HomeMe', user: req.user, faves: faves });
}
