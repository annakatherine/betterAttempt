var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//server connection
var fs = require('file-system');
var https = require('https');
// var options = {
//    key  : fs.readFileSync('server.key'),
//    cert : fs.readFileSync('server.crt')
// };
var pg = require('pg');
var connectionString = 'postgres://pzycofpzsxekhq:U8BIrxQyWUoagknLPqmYgSs4_5@ec2-54-243-200-159.compute-1.amazonaws.com:5432/d5eo9mo48rhsrt';
pg.defaults.ssl = true;


// https.createServer(options, app).listen(3000, function () {
//    console.log('Started!');
// });

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
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');
//
//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });


// function setup (ssl) {
//    if (ssl && ssl.active) {
//       return {
//          key  : fs.readFileSync(ssl.key),
//          cert : fs.readFileSync(ssl.certificate)
//       };
//    }
// }
//
// function start (app, options) {
//    if (options)
//       return require('https').createServer(options, app);
//
//    return require('http').createServer(app);
// }
//
// module.exports = {
//    create: function (settings, app, cb) {
//       var options = setup(settings.ssl);
//       return start(app, options).listen(settings.port, cb);
//    }
// };

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function() {
    console.log('And the rest is rust and stardust: ', app.get('port'));
});
