var express = require('express');
var router  = new express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'HomeMe', user: req.user });
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
    successRedirect: '/user',
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
