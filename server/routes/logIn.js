var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/router',
        failureRedirect: '/'
    })
);

router.get('/', function( req, res ){
  console.log( 'touched router.get login.js' );
  res.sendFile( path.join ( __dirname, '../public/views/pages/index.html') );
});
module.exports = router;
