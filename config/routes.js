var express = require('express');
var router  = new express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'HomeMe', user: req.user });
});

router.get('/listings/new', function(req, res, next) {
  res.render('newlisting.ejs', { title: 'HomeMe', user: req.user });
});

router.get('/users', function(req, res, next) {
  res.render('user.ejs', { title: 'HomeMe', user: req.user});
});

router.get('/groups', function(req, res, next) {
  res.render('group.ejs', { title: 'HomeMe', user: req.user});
});

// /* GET root path. */
// router.route('/')
//   .get(pagesCtrl.welcome)
//
// // user home page after logging in
// router.route('/user')
//   .get(usersCtrl.index)
// // user page for posting the listing
// router.route('/user/postlisting')
//   .get(usersCtrl.postListing)
// // user page for group chat
// router.route('/user/group')
//   .get(usersCtrl.groupChat)

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
});

module.exports = router;
