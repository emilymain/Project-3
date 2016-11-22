var User = require('../models/user');

module.exports = {
  welcome: welcome,
};

function welcome(req, res, next) {
  res.render('welcome.ejs', { title: 'HomeMe', user: req.user });
};
