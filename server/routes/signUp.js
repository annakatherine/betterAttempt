var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// module with bcrypt functions
var encryptLib = require('../modules/encrypt');
var connection = require('../modules/connection');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/primerDB';

console.log('signup.js is in');
// Handles request for HTML file

// Handles POST request with new user data
router.post('/', function(req, res, next) {

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    zip: req.body.zip,
    cohort: req.body.cohort
  };
  console.log('new user:', saveUser);

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO primers (username, password, zip, cohort) VALUES ($1, $2, $3, $4) RETURNING id",
      [saveUser.username, saveUser.password, saveUser.zip, saveUser.cohort],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });
  });

});


module.exports = router;
