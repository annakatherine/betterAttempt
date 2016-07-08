
var express=require('express');
var app=express();
var path=require('path');
var pg=require('pg');
var passport=require('../strategy/user.js');
var session=require('express-session');
var bodyParser = require('body-parser');
var strategy = require('strategy');
var cookieParser = require('cookie-parser');


app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'And the rest is rust and stardust' );
});

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: 'nr25ytvQxkl1QRdcZkGNsJeKHSN-R-0wXhDwBnx2WFCbz5L-cwXLJOUoB9jziOJZ', resave: false,  saveUninitialized: false }));

//static folder
app.use(express.static( 'public' ));

// include the routes to the modules
var signUp = require( './routes/signUp');
var index = require('./routes/index');
var failure = require('./routes/failure');
var success = require('./routes/success');

//passport session initialized
app.use(passport.initialize());
app.use(passport.session());

/// call the routes!
// app.use('/signUp', signUp);
app.use('/*', index);
app.use('/success', success);
app.use('/failure', failure);

//passport session specifics
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

app.get('/signUp',
  passport.authenticate('auth0', { failureRedirect: '/home' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/success");
  });
  app.get('/signUp', function (req, res) {
  res.render('user', {
    user: req.user
  });
});
