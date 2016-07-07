var express = require('express');
var path = require('path');
var pg = require('pg');
var passport = require('passport');

// require module functions
var encryptionVariable = require('../modules/encrypt');
var connection = require('../modules/connection');
var userString = require('../modules/userdatabase');

var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.resolve('public/views/signUp.html'));
});

router.post('/', function(req, res) {
  console.log('we hit the register route');
  console.log('req.body.username = ', req.body.username);
  console.log('req.body.password = ', req.body.password);

  //test the db connection
  pg.connect(userString, function (err, client, done) {

    var userSaved = {
      username: req.body.username,
      password: encryptionVariable.encryptPassword(req.body.password),
      zip: req.body.zip,
      cohort: req.body.cohort
    };

    //client.query takes the query, params, and optional callback
    client.query("INSERT INTO primers (username, password, zip, cohort) VALUES ($1, $2, $3, $4) RETURNING id",
      [userSaved.username, userSaved.password, userSaved.zip, userSaved.cohort],
        function(err, result) {

          done();
          if(err){
            console.log(err);
            res.sendStatus(500);
          } else{
            console.log('id of user = ', result.rows[0].id);

            // router.post('/',
                        // );


            //
            // router.get('/', function(req, res) {
            //   res.sendFile(path.resolve('public/views/success.html'));
            // });
            // res.redirect('/success.html');
          }
    }); //end of client query
  }); //end of pg connect
  passport.authenticate('local', { successRedirect: '/views/pages/success.html',
                                   failureRedirect: '/views/pages/failure.html',
                                });
                                res.sendFile(path.resolve('public/views/pages/success.html'));

}); //end of post

module.exports = router;
