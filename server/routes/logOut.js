var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
//
// router.get('/', function(req, res) {
//   res.sendFile(path.resolve('public/views/index.html'));
// });


module.exports = router;
