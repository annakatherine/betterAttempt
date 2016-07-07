var passport = require( 'passport');
var LocalStrategy = require( 'passport-local' ).Strategy;
var pg = require( 'pg' );
var Auth0Strategy = require('passport-auth0');


var strategy = new Auth0Strategy({
    domain:       'primetime.auth0.com',
    clientID:     'tfynhUQ3sH7fUv9UCDd5leqe4MyWkfBM',
    clientSecret: 'nr25ytvQxkl1QRdcZkGNsJeKHSN-R-0wXhDwBnx2WFCbz5L-cwXLJOUoB9jziOJZ',
    callbackURL:  '/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

  passport.use(strategy);

///require modules
var encrypt=require('../server/modules/encrypt');
var connection= require('../server/modules/connection');
var conStringUsers=require('../server/modules/userdatabase');

//serialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, passDone) {
  console.log('called deserializeUser');

  pg.connect(conStringUsers, function(err, client, pgDone) {
    //connection error
    if(err){
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM primers WHERE id = $1", [id], function(err, results) {
      pgDone();

      if(results.rows.length >= 1){
        console.log(results.rows[0]);
        return passDone(null, results.rows[0]);
      }

      // handle errors
      if(err){
        console.log(err);
      }

    });
  });
});

//local strategy
passport.use('local', new LocalStrategy(
  {
    passReqToCallback: true,
    emailField: 'email'
  },
  function(req, email, password, passDone) {
    console.log('hit local strategy');

    pg.connect(conStringUsers, function(err, client, pgDone) {
      //connection error
      if(err){
        console.log(err);
        res.sendStatus(500);
      }

      // find all users
      client.query('SELECT * from primers WHERE email = $1', [email],
        function(err, result) {
          console.log( 'result: ', result.rows );
          console.log( 'result in query: '+ email + ' ' + password);
          pgDone();

          //catch query error
          if(err){
            console.log(err);
            return passDone(null, false);

          }else{
            //check the length of the result set
            // console.log( 'result.length: ' + result.row.length );
            if (result.rows.length >= 1){
              console.log( 'result.rows.length: ' + result );
              var passwordDb = result.rows[0].password;
              //if given password matches dbs password

              // compare encrypted password with stored password
              if(encrypt.comparePassword(password, passwordDb)){
                console.log('correct pass');
                return passDone(null, result.rows[0]);
              }
            }

            // console.log('nope');
            // if fewer than 1 row or incorrect password - fail
            return passDone(null, false, {message: 'try again'});
          }
      });
    });
  }
));
module.exports = strategy;

module.exports = passport;
