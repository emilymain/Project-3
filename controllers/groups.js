var Group = require('../models/group');

module.exports = {
  show: show,
  index: index,
  create: create,
}

function show(req, res, next) {
  res.render('group.ejs', { title: 'HomeMe', user: req.user });
}

function index(req, res, next) {
  Group.find({}, function(err, messages) {
    if (err) next (err);

    res.json(messages);
  });
}

function create(req, res, next) {
  var newMessage = new Group(req.body);
  newMessage.save(function(err, savedMessage) {
    if (err) next (err);

    res.json(savedMessage);
  });
}
