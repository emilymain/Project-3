var Listing = require('../models/listing');
var User = require('../models/user');

module.exports = {
  index: index
}

function index(req, res, next) {
  if (req.user) {
    Listing.find({'createdBy': req.user}, function(err, listing) {
      if (err) res.send(err);
      res.json(listing);
    })
  };
  res.render('postedlistings.ejs', { title: 'HomeMe', user: req.user })
};
