var express = require('express');
var router  = new express.Router();
var passport = require('passport');

// require controllers
var welcomeController = require('../controllers/welcome');
var listingController = require('../controllers/listings');
var groupController = require('../controllers/groups');

/* GET root path. */
router.route('/')
  .get(welcomeController.welcome)

// first page upon logging in
router.route('/listings')
  .get(listingController.index)

// route to post a new listing
router.route('/listings/new')
  .get(listingController.newListing)

// route to see your group chat
router.route('/group')
  .get(groupController.show)

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
