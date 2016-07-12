//
// angular.module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute'])
// .config(['$routeProvider', 'authProvider', configFunction])
// .run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location', runFunction]);


var express=require('express');
var app=express();
var path=require('path');
var pg=require('pg');
var passport=require('../strategy/user.js');
var session=require('express-session');
var bodyParser = require('body-parser');
var connectionString = 'postgres://localhost:5432/primerDB';


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
// app.use('/*', index);
app.use('/', success);
app.use('/failure', failure);
app.use('/signUp', signUp);
app.use('/', router);
app.use('/router', router);
// app.use('/', signUp);
app.use('/logIn', logIn);
app.use('/', logIn);


router.get('/', function(req, res) {
  console.log( 'at base url in app.js' );
  res.sendFile(path.resolve('public/views/index.html'));
});


router.post('/glassdoorAPI', function (req, res){
  console.log('hi from router.post' );
  var results = [];
  pg.connect(connectionString, function(err, client, done){
    var glassdoorQuery = client.query( "SELECT * FROM glassdoorAPI WHERE name::text ILIKE '%" + req.body.name + "%'");
    console.log('');
    glassdoorQuery.on('row', function(row){
      results.push(row);
      console.log('results' + results);
    });
    glassdoorQuery.on('end', function(){
      console.log(results);
      return res.json(results);
    });
  });//end scotchDB connectionString
});
//spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'And the rest is rust and stardust' );
});
