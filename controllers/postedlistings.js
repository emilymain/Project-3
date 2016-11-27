var Listing = require('../models/listing');
var User = require('../models/user');

module.exports = {
  index: index
}

function index(req, res, next) {
  // if (req.user._id) {
  //   console.log('*****', req.user._id);
    Listing.findOne({}, function(err, listing) {
      if (err) throw err;
      res.render('postedlistings.ejs', {title: 'HomeMe', user: req.user, listing: listing});
    })
  // };
};
