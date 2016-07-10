var express = require('express');
var path = require('path');
var pg = require('pg');
var connection = require('../modules/connection');
var userString = require('../modules/userdatabase');

var router = express.Router();

router.get('/', function(req, res) {
  console.log( 'inside the success.js');
  res.sendFile(path.resolve('public/views/success.html'));
});

router.get('/results', function( req, res ){
  console.log( 'inside results call' );

});

module.exports = router;
