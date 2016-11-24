var Listing = require('../models/listing');

module.exports = {
  index: index,
  newListing:  newListing
}

function index(req, res, next) {
  res.render('listings.ejs', { title: 'sup', user: req.user });
}

function newListing(req, res, next) {
  res.render('newlisting.ejs', { title: 'HomeMe', user: req.user });
}
