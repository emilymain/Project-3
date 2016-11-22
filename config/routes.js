var express = require('express');
// var router  = new express.Router();
var passport = require('passport');
var NodeGeocoder = require('node-geocoder');
var router = express.Router();
var Listing = require('../models/listings');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_MAPS_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'HomeMe', user: req.user });
});

router.get('/api/listings', function(req, res, next) {
  if (req.query.id) {
    Listing.findOne({'_id': req.query.id}, function(err, listing) {
      if (err) res.send(err);
      res.json(listing);
    });
  } else {
    Listing.find({}, function(err, listings) {
      if (err) res.send(err);
      res.json(listings);
    });
  }
});

router.post('/api/listings', function(req, res, next) {
  var newListing = {
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    zipcode: req.body.zipcode,
    price: req.body.price,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    duration: req.body.duration,
    pets: req.body.pets,
    furnished: req.body.furnished
  }
  geocoder.geocode(newListing.address + ", " + newListing.city + ", " + newListing.state + " " + newListing.zipcode)
  .then(function(data) {
    var firstListing = data[0];
    newListing.formattedAddress = firstListing.formattedAddress;
    newListing.latitude = firstListing.latitude;
    newListing.longitude = firstListing.longitude;
    newListing.googlePlaceId = firstListing.extra.googlePlaceId;
    newListing.neighborhood = firstListing.extra.neighborhood;
    newListing.streetNumber = firstListing.streetNumber;
    newListing.streetName = firstListing.streetName;
    newListing.city = firstListing.city;
    newListing.country = firstListing.country;
    newListing.countryCode = firstListing.countryCode;
    newListing.zipcode = firstListing.zipcode;
    newListing.provider = firstListing.provider;
    console.log(newListing);
    Listing.create(newListing, function(err, listing) {
      if (err) res.send(err);
      res.json(listing);
    })
  })
});

router.delete('/api/listings', function(req, res, next) {
  var id = { "_id": req.body.id }
  Listing.find(id).remove(function(err) {
    if (err) console.log(err);
    res.send(204);
  })
});

router.get('/users', function(req, res, next) {
  res.render('user.ejs', { title: 'HomeMe', user: req.user });
});

router.get('/users/group', function(req, res, next) {
  res.render('group.ejs', { title: 'HomeMe', user: req.user});
})

// google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/users',
    failureRedirect: '/'
  }
));

// OAuth logout router
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
  // antonio: when i try to logout it sends me back to 'choose an account'; if i url to localhost:3000 i'm still logged in
});

module.exports = router;
