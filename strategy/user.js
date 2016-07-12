/*
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username VARCHAR(100) NOT NULL UNIQUE,
 password VARCHAR(120) NOT NULL
);
*/

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../server/modules/encrypt');
var connection = require('../server/modules/connection');
var pg = require('pg');
// var connectionString = 'postgres://localhost:5432/primerDB';
//-----------------------------------------------------------------------------------------
// Does actual work of logging in
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
    }, function(req, username, password, done){
	    pg.connect(connection, function (err, client) {
	    	console.log('called local - pg');
	    	var user = {};
        console.log( 'user being tested for authentication: ', user );
        var banana = client.query("SELECT * FROM primers WHERE username = $1", [username]);
        console.log( 'made it through the banana query' );

        banana.on('row', function (row) {
        	console.log('User obj getting fred out of the database', row);
        	user = row;

          // Hash and compare
          if(encryptLib.comparePassword(password, user.password)) {
            // all good!
            console.log('matched passwords for the user being tested in user.js aka the strategy');
            done(null, user);
          } else {
            console.log('nope');
            done(null, false, {message: 'Incorrect credentials.'});
          }
        });
        // After all data is returned, close connection and return results
        banana.on('end', function () {
            client.end();
        });
        // Handle Errors
        if (err) {
            console.log(err);
        }
	    });
    }
));

passport.serializeUser(function(user, done) {
  console.log( 'inside serializeUser');
    done(null, user.id);
});
//--------------------------------------------
passport.deserializeUser(function(id, done) {
// SQL query
  console.log('called deserializeUser');
  pg.connect(connection, function (err, client) {

    var user = {};
    console.log('called deserializeUser - pg');
      var query = client.query("SELECT * FROM primers WHERE id = $1", [id]);

      query.on('row', function (row) {
        console.log('User row', row);
        user = row;
        done(null, user);
      });

      // After all data is returned, close connection and return results
      query.on('end', function () {
          client.end();
      });

      // Handle Errors
      if (err) {
          console.log(err);
      }
  });
});

module.exports = passport;
