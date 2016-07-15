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
  console.log( 'inside router.post for reviews', req.user );
    var reviewSaved = {
      // id: req.body.id,
      company_name: req.body.name,
      salary: req.body.salary,
      leadership: req.body.leadership,
      review: req.body.review
      // userID: req.body.userID
    };
    console.log('new review:', reviewSaved);

    pg.connect(connectionString, function(err, client, done) {
      var queriedReview = client.query("INSERT INTO jobreviews ( company_name, salary, leadership, review, reviewer_id  ) VALUES ( $1, $2, $3, $4, $5 ) RETURNING id",
        [ reviewSaved.company_name, reviewSaved.salary, reviewSaved.leadership, reviewSaved.review, req.user.id ],
          function (err, result) {
            if(err) {
              console.log("Error inserting data: ", err);
              next(err);
            } else {
              console.log( 'req.body.id: ', req.body.id);
            }
  // console.log( 'req.body.id: ', req.body.id );
            console.log( 'result: ', result );
              reviewSaved.id = result.rows[0].id;
              reviewSaved.reviewerID = req.user.id;
              res.send( reviewSaved );
               done();
            // client.end();

              // res.redirect('/');
             //end of else
          });//end of client.query
        });//end of pg.connect
      });//end of router.add post


//------------attempt at a search function ---------------------------/////
//   router.post('/searchJobs', function (req, res){
//   console.log('in searchJobs ', req.body.searchResults );
//   var searchedJob = [];
//   pg.connect(connectionString, function(err, client, done){
//     // var jobQuery = client.query( "SELECT * FROM jobreviews WHERE company_name LIKE 'r%'");
//     var jobQuery = client.query( "SELECT * FROM jobreviews WHERE company_name::text ILIKE '%" + req.body.company_name + "%'");
//     // console.log('after jobQuery', jobQuery );
//     jobQuery.on('row', function(row){
//       searchedJob.push(row);
//       console.log('searchedJob' + searchedJob);
//     });
//     jobQuery.on('end', function(){
//       console.log(searchedJob);
//       return res.json(searchedJob);
//     });
//   });// end pg.connect
// });//end searchJobs POST


router.delete('/deleteReview/:id', function( req, res ){
  console.log( 'reached router.delete' );
  pg.connect(connectionString, function(err, client, done){
    console.log( 'err: ', err );
    // console.log( req.body.name );
    // var reviewToDelete = req.body.name;
   client.query("DELETE FROM jobreviews WHERE id =" + req.params.id, function(err ){
     console.log( 'req.params.id ', req.params.id );
   if(err){
     console.log( 'err: ', err );
     res.sendStatus(500);
   } else {
     res.sendStatus(200);
   }
   done();
  });
 });
});

// this is not going to work today.
// router.put( '/editReview/:id', function( req, res ){
//   console.log( 'inside the put: ', req.params.id );
//   console.log( 'body: ', req.body );
//   pg.connect( );
// });


router.get('/getReviews', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var reviewsReturned = client.query('SELECT * FROM jobreviews;');
    // push each row in query into our results array
    reviewsReturned.on('row', function(row) {
      results.push(row);
    }); // end query push
    reviewsReturned.on('end', function(){
      console.log('results from reviewsReturned: ', results);
      return res.json(results);
    });
    if(err) {
      console.log(err);
    }
  }); // end pg connect
});//end of get reivews

router.get('/showUserReviews', function(req, res) {
  console.log( 'inside showUserReviews, req.user: ', req.user, 'user.id: ', req.user.id );
  var myReviews = [];
  pg.connect(connectionString, function(err, client, done) {
    var reviewsReturned = client.query('SELECT * FROM jobreviews WHERE reviewer_id=' + req.user.id );
    // push each row in query into our results array
    reviewsReturned.on('row', function(row) {
      console.log(reviewsReturned );
      myReviews.push(row);
    }); // end query push
    reviewsReturned.on('end', function(){
      console.log('results from reviewsReturned: ', myReviews);
      return res.json(myReviews);
    });
    if(err) {
      console.log(err);
    }
  }); // end pg connect
});//end of get reivews

//---------------delete function -------------------------------//

module.exports = router;
