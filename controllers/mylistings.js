// var Listing = require('../models/listing');

module.exports = {
  index: index
}

function index(req, res, next) {
  res.render('mylistings.ejs', { title: 'HomeMe', user: req.user });
}
