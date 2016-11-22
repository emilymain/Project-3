var Group = require('../models/group');

module.exports = {
  show: show
}

function show(req, res, next) {
  res.render('group.ejs', { title: 'HomeMe', user: req.user });
}
