var Listing = require('../models/listing');
var User = require('../models/user');

module.exports = {
  index: index
}

function index(req, res, next) {
  res.render('postedlistings.ejs', { title: 'HomeMe', user: req.user, faves: faves });
}
