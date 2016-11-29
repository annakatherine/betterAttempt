
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encrypt');
var connection = require('../modules/connection');
var pg = require('pg');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('called deserializeUser');
  pg.connect(connection, function (err, client, complete) {

    var user = {};
    // console.log('deserialize this');
      var query = client.query("SELECT * FROM primers WHERE id = $1", [id]);

      query.on('row', function (row) {
        console.log('User row inside user.js line 21', row);
        user = row;
        done(null, user);
      });

      // After all data is returned, close connection and return results
      query.on('end', function () {
          // client.end();
          complete();
      });

      // Handle Errors
      if (err) {
          console.log(err);
      }
  });
});

// Does actual work of logging in
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
    }, function(req, username, password, done){
	    pg.connect(connection, function (err, client, complete) {
	    	console.log('called local strategy in user.js ');
	    	var user = {};
        var query = client.query("SELECT * FROM primers WHERE username = $1", [username]);

        query.on('row', function (row) {
        	console.log('User obj in user.js', row);
        	user = row;

          // Hash and compare
          if(encryptLib.comparePassword(password, user.password)) {
            // all good!
            console.log('matched');
            done(null, user);
          } else {
            console.log('nope');
            done(null, false, {message: 'Incorrect credentials.'});
          }

        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            // client.end();
            complete();
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
	    });
    }
));

module.exports = passport;
