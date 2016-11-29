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

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/logIn', function(req, res){
  res.render('login', { user: req.user });
});
//
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function() {
    console.log('And the rest is rust and stardust: ', app.get('port'));
});
