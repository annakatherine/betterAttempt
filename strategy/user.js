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
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
//
// passport.deserializeUser(function(id, passDone) {
//   console.log('called deserializeUser');
//
//   pg.connect(conStringUsers, function(err, client, pgDone) {
    //connection error
    // if(err){
    //   console.log(err);
    //   res.sendStatus(500);
    // }
    //
    // client.query("SELECT * FROM primers WHERE id = $1", [id], function(err, results) {
    //   pgDone();
    //
    //   if(results.rows.length >= 1){
    //     console.log(results.rows[0]);
    //     return passDone(null, results.rows[0]);
    //   }
    //
      // handle errors
//       if(err){
//         console.log(err);
//       }
//
//     });
//   });
// });
module.exports = strategy;

module.exports = passport;
