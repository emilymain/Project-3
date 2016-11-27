var express = require('express');
var passport = require('passport');
var NodeGeocoder = require('node-geocoder');
var router = express.Router();
var Listing = require('../models/listing');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_MAPS_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

// require controllers
var welcomeController = require('../controllers/welcome');
var listingsController = require('../controllers/listings');
var messagesController = require('../controllers/messages');
var mylistingsController = require('../controllers/mylistings');
var postedlistingsController = require('../controllers/postedlistings');
var groupchatsController = require('../controllers/groupchats');

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
    furnished: req.body.furnished,
    imageurl: req.body.imageurl,
    createdBy: req.user._id
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

router.route('/api/listings').delete(authenticatedUser, function(req, res, next) {
  var id = { "_id": req.body.id }
  console.log(req.user._id);
  Listing.findOne(id, function(err, listing) {
    console.log(listing);
    if (err) throw err
    else if (req.user._id.toString() == listing.createdBy) {
      listing.remove(function(err) {
        if (err) console.log('delete failed -> ', err);
        res.send(204);
      })
    } else {
      res.send(401);
    }
  })
});

router.route('/api/listings').put(authenticatedUser, function(req, res, next) {
  console.log('here is body', req.body)
  var id = { "_id": req.body.id }
  console.log('searching for: ', id);
  Listing.findOne(id, function(err, listing) {
    console.log('put ->', listing);
    console.log('req body ->', req.body);
    if (err) throw err
    else if (req.user._id.toString() == listing.createdBy) {
      console.log('OKAY GOING IN FOR UPDATE');
      Listing.findOneAndUpdate({_id: req.body.id}, req.body, function(err) {
        if (err) console.log('update failed -> ', err);
        res.send(204);
      })
    } else {
      res.send(401);
    }
  })
});

function authenticatedUser(req, res, next) {
  // if user authenticated, continue to next execution
  if(req.isAuthenticated()) return next();
  // otherwise always redirect to root route
  res.redirect('/');
}

/* GET root path. */
router.route('/')
  .get(welcomeController.welcome)
// first page upon logging in
router.route('/listings')
  .get(authenticatedUser, listingsController.index)
// route to post a new listing
router.route('/listings/new')
  .get(authenticatedUser, listingsController.newListing)

// HEAD from

//route to favorited listings
router.route('/listings/favorites')
  .get(authenticatedUser, mylistingsController.index)
//route to posted listings
router.route('/listings/postedlistings')
  .get(authenticatedUser, postedlistingsController.index)
//route to listings/id
// =======
// posts listings to favorited listings array
router.route('/listings/favorites/:id')
  .post(mylistingsController.addFaves)
// route to listings/id
// >>>>>>> a14364a78da230029c188736142aaea22f98e02a
router.route('/listings/:id')
  .get(authenticatedUser, listingsController.show)


// route to create a groupchat
router.route('/groupchats')
  .get(authenticatedUser, groupchatsController.home)
// route to speicfic groupchat
router.route('/groupchats/:id')
  .get(authenticatedUser, groupchatsController.show)
// api for groupchats
router.route('/api/groupchats')
  .get(authenticatedUser, groupchatsController.index)
  .post(groupchatsController.create)
router.route('/api/groupchats/:id')
  .delete(groupchatsController.destroy)

router.route('/api/groupchats/:id/messages')
  .get(messagesController.index)
  .post(messagesController.create)


// google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/listings',
    failureRedirect: '/'
  }
));

// OAuth logout router
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
