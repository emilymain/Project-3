var Groupchat = require('../models/groupchat');

module.exports = {
  home: home,
  show: show,
  index: index,
  create: create,
  destroy: destroy
}

function home(req, res, next) {
  res.render('groupchats/index.ejs', { title: 'HomeMe', user: req.user });
}

function show(req, res, next) {
  res.render('groupchats/show.ejs', { title: 'HomeMe', user: req.user });
}

function index(req, res, next) {
  Groupchat.find({}, function(err, groupchats) {
    if (err) next(err);

    res.json(groupchats);
  });
}

function create(req, res, next) {
  var newGroupchat = new Groupchat(req.body);
  newGroupchat.save(function(err, savedGroupchat) {
    if (err) next(err);

    res.json(savedGroupchat);
  });
}

function destroy(req, res, next) {
  var id = req.params.id;

  Groupchat.remove({ _id: id}, function(err) {
    // Only triggers if there is a major problem; will not fail if trying to remove something that isn't there
    if (err) next(err);

    // Let us know if it's a successful delete
    res.json({msg: "Deleted groupchat"});
  });
}
