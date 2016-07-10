
var express=require('express');
var app=express();
var path=require('path');
var pg=require('pg');
var passport=require('../strategy/user.js');
var session=require('express-session');
var bodyParser = require('body-parser');

// body parser middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

//static folder
app.use(express.static( 'public' ));

// include the routes
var index = require('./routes/index');
var failure = require('./routes/failure');
var success = require('./routes/success');
var signUp = require('./routes/signUp');
var logIn = require('./routes/logIn');
var router = require('./routes/router');

//passport session initialized
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));
/// call the routes!
// app.use('/signUp', signUp);
app.use('/*', index);
app.use('/success', success);
app.use('/failure', failure);
app.use('/signUp', signUp);
app.use('/', router);
app.use('/router', router);
app.use('/', signUp);


router.get('/', function(req, res) {
  console.log( 'at base url in app.js' );
  res.sendFile(path.resolve('public/views/index.html'));
});

//spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'And the rest is rust and stardust' );
});
