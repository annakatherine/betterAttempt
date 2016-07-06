var express = require('express');
var path = require('path');
var pg = require('pg');
var passport = require('passport');
var encryptionVariable = require('../modules/encrypt');
var connection = require('../modules/connection');
var userString = require('../modules/userdatabase');

var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.resolve('public/views/success.html'));
});

module.exports = router;
