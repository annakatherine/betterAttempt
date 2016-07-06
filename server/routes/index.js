var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();

router.post('/',
  passport.authenticate('local', { successRedirect: '/views/success.html',
                                   failureRedirect: '/views/failure.html',
                                })
);

router.get('/', function(req, res) {
  res.sendFile(path.resolve('public/views/index.html'));
});


module.exports = router;
