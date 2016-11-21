var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var index = require('./config/routes');
var io = require('socket.io');
// //not sure if these below are necessary, following a markdown for image uploade
// var server = require('http').createServer(app);
// var controllers = require('./controllers');
// var Zillow = require('node-zillow');


// load the env var
require('dotenv').load();

var app = express();

// connect to the MongoDB with mongoose
require('./config/database');

// configure passport
require('./config/passport');

// Michael's zillow code for map
// var zillow = new Zillow(process.env.ZILLOW_KEY, {});
//
// zillow.get('GetRegionChildren', {
//   'state': 'ca',
//   'city': 'santa monica'
// }).then(function(data) {
//   // console.log(JSON.stringify(data, null, 2));
//   console.log(data["response"]["list"]["region"][4]["latitude"]);
//   console.log(data["response"]["list"]["region"][4]["longitude"]);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'HomeMe',
  resave: false,
  saveUnitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
