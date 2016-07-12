var express = require('express');
var path = require('path');
var pg = require('pg');
var passport = require('passport');

// require module functions
var encryptLib = require('../modules/encrypt');
var connection = require('../modules/connection');
var connectionString = 'postgres://localhost:5432/primerDB';
var router = express.Router();
router.post('/', function(req, res, next) {
  console.log( 'signUp.js is up and at em' );
  // console.log('req.body.username = ', req.body.username);
  // console.log('req.body.password = ', req.body.password);
  var userSaved = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    zip: req.body.zip,
    cohort: req.body.cohort
  };
  console.log('new user:', userSaved);

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO primers (username, password, zip, cohort) VALUES ($1, $2, $3, $4 ) RETURNING id",
      [userSaved.username, userSaved.password, userSaved.zip, userSaved.cohort],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect('/');
          } //end of else
        });//end of client.query
      });//end of pg.connect
    });//end of router.post
module.exports = router;
