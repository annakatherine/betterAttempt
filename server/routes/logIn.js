var express = require('express');
// var app = express();
var router = express.Router();
var passport = require('passport');
var path = require('path');
var HerokuStrategy = require('passport-heroku').Strategy;

console.log('inside login.js');

// Handles login form POST from index.html

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/'
    })
  );
// });

router.get('/', function( req, res ){
  console.log( 'touched router.get login.js' );
  res.sendFile( path.join ( __dirname, '../public/views/pages/index.html') );
});
module.exports = router;
