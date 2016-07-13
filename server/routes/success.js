var express = require('express');
var path = require('path');
var pg = require('pg');
var app = express();
var bodyParser = require('body-parser');

// var connection = require('../modules/connection');
// var userString = require('../modules/userdatabase');
var connectionString = 'postgres://localhost:5432/primerDB';
var router = express.Router();
// router.get('/', function(req, res) {
//   console.log( 'inside the success.js');
//   res.sendFile(path.resolve('public/views/success.html'));
// });
// router.get('/results', function( req, res ){
//   console.log( 'inside results call' );
// });
router.post('/addReview', function( req, res, next ){
  console.log( 'inside router.post for reviews' );
    var reviewSaved = {
      // id: req.body.id,
      company_name: req.body.name,
      salary: req.body.salary,
      leadership: req.body.leadership,
      review: req.body.review
    };
    console.log('new review:', reviewSaved);

    pg.connect(connectionString, function(err, client, done) {
      client.query("INSERT INTO jobreviews ( company_name, salary, leadership, review) VALUES ($1, $2, $3, $4 ) RETURNING id",
        [ reviewSaved.company_name, reviewSaved.salary, reviewSaved.leadership, reviewSaved.review],
          function (err, result) {
            // console.log( req.body.id );
            client.end();
            if(err) {
              console.log("Error inserting data: ", err);
              next(err);
            } else {
              console.log( 'req.body.id: ', req.body.id);
              res.redirect('/');
            } //end of else
          });//end of client.query
        });//end of pg.connect
      });//end of router.add post


//------------attempt at a search function ---------------------------/////
  router.post('/searchJobs', function (req, res){
  console.log('in searchJobs ', req.body.searchResults );
  var searchedJob = [];
  pg.connect(connectionString, function(err, client, done){
    // var jobQuery = client.query( "SELECT * FROM jobreviews WHERE company_name LIKE 'r%'");
    var jobQuery = client.query( "SELECT * FROM jobreviews WHERE company_name::text ILIKE '%" + req.body.company_name + "%'");
    // console.log('after jobQuery', jobQuery );
    jobQuery.on('row', function(row){
      searchedJob.push(row);
      console.log('searchedJob' + searchedJob);
    });
    jobQuery.on('end', function(){
      console.log(searchedJob);
      return res.json(searchedJob);
    });
  });// end pg.connect
});//end searchJobs POST



router.delete('/deleteReview', function( req, res ){
  console.log( 'reached router.delete' );
  pg.connect(connectionString, function(err, client, done){
    // console.log( req.body.name );
    // var reviewToDelete = req.body.name;
   client.query('DELETE from jobreviews WHERE id =' +req.body.id+ ';' );
   if(err){
     res.sendStatus(500);
   } else {
     res.sendStatus(200);
   }
   done();

 });
});

//---------------delete function -------------------------------//

module.exports = router;
