var express = require('express'),
    router  = new express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HomeMe' });
});

module.exports = router;
