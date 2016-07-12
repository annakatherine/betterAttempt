var express = require('express');
var router = express.Router();
var passport = require('passport');
// var passport=require('strategy/user.js');

var path = require('path');

function annaGoesCrazy(){
  console.log( 'inside the fucking login.js' );
}
// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/router',
        failureRedirect: '/'
    })
);

// Handle index file separately
// Also catches any other request not explicitly matched elsewhere
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
