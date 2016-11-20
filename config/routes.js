var express = require('express');
var router  = new express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/user', function(req, res, next) {
  res.render('user', {  });
});

// google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// OAuth logout router
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
