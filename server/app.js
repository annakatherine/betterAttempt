var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//server connection
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/primerDB';

//passport connection
var passport = require('./strategy/user.js');
var session = require('express-session');

//Route inclusion
var login = require('./routes/logIn');
var signUp = require('./routes/signUp');
var router = require('./routes/router');
var success = require( './routes/success');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
// console.log( __dirname + '/public' );
app.use(express.static('server/public'));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
// app.use('/signUp', signUp);
app.use('/', signUp);
app.use('/router', router);
app.use('/logIn', login);
app.use('/', login);
app.use('/', success);

// Handle index file separately
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, './public/views/login.html'));
// })

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function() {
    console.log('And the rest is rust and stardust: ', app.get('port'));
});
