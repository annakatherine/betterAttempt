var express = require('express');
var path = require('path');
var pg = require('pg');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var router = express.Router();
router.post('/',

  passport.authenticate('local', { successRedirect: '/views/pages/success.html',
                                 failureRedirect: '/views/pages/failure.html',

                              })
                            );

router.get('/', function(req, res){
  console.log( 'inside login.js' );

    res.sendFile(path.resolve('public/views/pages/success.html'));
});
 //end of post

module.exports = router;
