var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/primerDB';

// Handles Ajax request for user information if user is authenticated
router.post('/', function(req, res) {
  console.log( 'req' );
    // check if logged in
    if(req.isAuthenticated()) {
        console.log( 'below req.isAuthenticated' );
          // send back user object from database
        res.send(req.user);
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
        console.log( ' where false would be ' );
    }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});



module.exports = router;
