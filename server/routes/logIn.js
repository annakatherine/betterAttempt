var express = require('express');
var path = require('path');
var pg = require('pg');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var router = express.Router();

router.get('/', function(req, res) {
  console.log( 'inside router.get in login.js: ');
  res.sendFile(path.resolve('public/views/logIn.html'));
});

passport.authenticate('local', { successRedirect: '/views/pages/success.html',
                                 failureRedirect: '/views/pages/failure.html',
                              });
                              res.sendFile(path.resolve('public/views/pages/success.html'));

}); //end of post

module.exports = router;
