var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//server connection
var fs = require('file-system');
var https = require('https');
var pg = require('pg');
var HerokuStrategy = require('passport-heroku').Strategy;
var connectionString = 'postgres://pzycofpzsxekhq:U8BIrxQyWUoagknLPqmYgSs4_5@ec2-54-243-200-159.compute-1.amazonaws.com:5432/d5eo9mo48rhsrt';
pg.defaults.ssl = true;

var HEROKU_CLIENT_ID = process.env.HEROKU_CLIENT_ID;
var HEROKU_CLIENT_SECRET = process.env.HEROKU_CLIENT_SECRET;

//passport connection
var passport = require('./strategy/user.js');
var session = require('express-session');

//Route inclusion
var login = require('./routes/logIn');
var signUp = require('./routes/signUp');
var router = require('./routes/router');
var success = require( './routes/success');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
// console.log( __dirname + '/public' );
app.use(express.static('server/public'));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', signUp);
app.use('/router', router);
app.use('/logIn', login);
app.use('/', login);
app.use('/', success);

//
// var express = require("express")
//   , app = express()
//   , passport = require('passport')
//   , util = require('util')
//   , HerokuStrategy = require('passport-heroku').Strategy;



app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/logIn', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/heroku
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Heroku authentication will involve redirecting
//   the user to heroku.com.  After authorization, Herokuwill redirect the user
//   back to this application at /auth/heroku/callback
app.get('/auth/heroku',
  passport.authenticate('heroku'),
  function(req, res){
    // The request will be redirected to Heroku for authentication, so this
    // function will not be called.
  });

// GET /auth/heroku/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/heroku/callback',
        passport.authenticate('heroku', { failureRedirect: '/login' }),
        function(req, res) {
          res.redirect('/');
        });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// app.listen(3000);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/logIn');
}
/////
app.get('/auth/heroku',
  passport.authenticate('heroku'));

app.get('/auth/heroku/callback',
  passport.authenticate('heroku', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function() {
    console.log('And the rest is rust and stardust: ', app.get('port'));
});
