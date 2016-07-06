var passport = require( 'passport');
var LocalStrategy = require( 'passport-local' ).Strategy;
var pg = require( 'pg' );

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
    usernameField: 'username'
  },
  function(req, username, password, passDone) {
    console.log('hit local strategy');

    pg.connect(conStringUsers, function(err, client, pgDone) {
      //connection error
      if(err){
        console.log(err);
        res.sendStatus(500);
      }

      // find all users
      client.query('SELECT * from primers WHERE username = $1', [username],
        function(err, result) {
          console.log( 'result: ', result.rows );
          console.log( 'result in query: '+ username + ' ' + password);
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

module.exports = passport;
