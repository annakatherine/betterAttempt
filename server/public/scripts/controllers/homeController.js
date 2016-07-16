
myApp.controller( 'homeController', ['$scope', '$http', '$location', '$rootScope', function( $scope, $http, $location, $rootScope ){
  console.log( 'loaded homeController' );

  //call arrays for displaying reviews on the DOM
  $rootScope.reviewArray = [];
  $rootScope.myReviewArray = [];
  $rootScope.salaryArray = [];
  $rootScope.leadershipArray = [];

  //toggles the views
  $scope.justEnteredForm=true;
  $scope.alltheReviewsForm=false;
  $scope.editableForm=false;
  $scope.topHalf=true;
  $scope.salaryShow=false;
  $scope.leadershipShow=false;

  //-vvvvvNO IDEA WHERE THIS CAME FROM. WHAT DOES IT DO? ----------
  $scope.searchName = '';

// -----------beginning of logIn logic------------------------//
    $scope.user_id= {};
    getUser();

    function getUser() {
    $http.get('/router').then(function(response) {
          if(response.data.username) {
              $scope.userName = response.data.username;
              $scope.user_id = response.data._id;
              console.log('User Data: ', $scope.userName, response.data._id);
          } else {
              $location.path("/login");
          }
      });
    }

    $scope.logout = function() {
      $http.get('/router/logout').then(function(response) {
        console.log('logged out');
        $location.path("/login");
      });
    };
//-------END OF LOGIN LOGIC----------------------------------//

//click functionality to add a review to db
  $scope.submitReview = function( ){
    console.log( 'submitReview clicked by: ', $scope.reviewArray.user_id );
    $scope.justEnteredForm=true;
    $scope.alltheReviewsForm=false;
    $scope.editableForm=false;
    $scope.topHalf=false;
    $scope.salaryShow=false;
    $scope.leadershipShow=false;


    //declare an empty array to hold review details for viewing
    var reviewObject = {
      name: $scope.companyNameModel,
      salary: $scope.salaryModel,
      leadership: $scope.leadershipModel,
      review: $scope.reviewModel,
      // username: $scope.username
  };
    console.log( reviewObject.name + ' ' + reviewObject.salary,
    reviewObject.leadership + ' ' + reviewObject.review, ' ', reviewObject.userID );
//sending review to the DB
    $http({
      method: 'POST',
      url: '/addReview',
      data: reviewObject
    }).then(function(response){
      $scope.reviewsAll = response.data;
      console.log('success: ', response.data);

//adding review upon return from the db to the array for displaying on DOM
      $scope.reviewArray.push( response.data );
      console.log('reviewArray: ', $scope.reviewArray );
    });

//clears input fields for the next submission
    $scope.companyNameModel = '';
    $scope.salaryModel = '';
    $scope.leadershipModel = '';
    $scope.reviewModel = '';
  };

//------------------END OF SUBMIT REVIEW---------------------------------

///making the stars align
$scope.rate = 7;
$scope.max = 10;
$scope.isReadonly = false;

$scope.hoveringOver = function(value) {
  $scope.overStar = value;
  $scope.percent = 100 * (value / $scope.max);
};
//--------------END OF STARS ALIGNING-----------------------------//

//click function to delete review
$scope.deleteReview = function(recordID){
    event.preventDefault();
     console.log("In the delete");
     console.log( 'recordID: ', recordID);
     var sendID = {id: recordID};

//sending delete request to DB
     $http({
       method: 'DELETE',
       url: '/deleteReview/' + recordID,
       headers: {'Content-Type': 'application/json;charset=utf-8'}
     }).then(function(){

       //takes deleted review off the DOM and shows new list
       $scope.reviewArray.splice( sendID, 1 );
       $scope.showMyReviews();
       console.log( 'at the end of delete' );
     });//end of .then
   };

//--------------------end of deleteReview-------------------///

//this will query the db to return all reviews in the system in no order.
    $scope.showReviews = function() {
      console.log( 'showReviews clicked' );
      $scope.justEnteredForm=false;
      $scope.alltheReviewsForm=true;
      $scope.onlyMyReviews=false;
      $scope.topHalf=true;
      $scope.salaryShow=false;
      $scope.leadershipShow=false;


      $http({
        method: 'GET',
        url: '/getReviews'
      }).then(function(response) {
        $rootScope.reviewArray = response.data;
        // $rootScope.curatedReviewArray = response.data;
        console.log('all reviews: ', response.data);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end getReviews

//------------END OF SHOW ALL UNORDERED REVIEWS----------------------\\

//this will show only the reviews entered by the user currently logged in.
$scope.showMyReviews = function( ){
  console.log( 'showMyReviews clicked' );
  $scope.justEnteredForm=false;
  $scope.alltheReviewsForm=false;
  $scope.onlyMyReviews=true;
  $scope.topHalf=false;
  $scope.salaryShow=false;
  $scope.leadershipShow=false;


  $http({
    method: 'GET',
    url: '/showUserReviews'
  }).then(function(response) {
    $rootScope.myReviewArray = response.data;
    // $rootScope.curatedReviewArray = response.data;
    console.log('all reviews in showMyReviews ', $rootScope.myReviewArray);
  }, function myError (response) {
    console.log(response.statusText);
  });
};

    ///if you want to display upon load later this spot worksvvv---//
    // $scope.showReviews();

//---------END OF SHOW BY USER REVIEWS-----------------------------///////

//queries the db and returns in order of salary best to worst
$scope.salarySearch = function( ){
  console.log( 'salarySearch clicked' );
  $scope.justEnteredForm=false;
  $scope.alltheReviewsForm=false;
  $scope.onlyMyReviews=false;
  $scope.topHalf=false;
  $scope.salaryShow=true;
  $scope.leadershipShow=false;




  $http({
    method: 'GET',
    url: '/salarySearch'
  }).then(function(response) {
    $rootScope.salaryArray = response.data;
    $rootScope.salaryArray.push( response.data );

    // $rootScope.curatedReviewArray = response.data;
    console.log('all reviews in search by salary ', $rootScope.salaryArray);
  }, function myError (response) {
    console.log(response.statusText);
  }); //end of .then
};
// ------END OF SEARCH BY SALARY DESCENDING----------------------//

$scope.leadershipSearch = function( ){
  console.log( 'leadershipSearch clicked' );
  $scope.justEnteredForm=false;
  $scope.alltheReviewsForm=false;
  $scope.onlyMyReviews=false;
  $scope.topHalf=false;
  $scope.salaryShow=false;
  $scope.leadershipShow=true;

  $http({
    method: 'GET',
    url: '/leadershipSearch'
  }).then(function(response) {
    $rootScope.leadershipArray = response.data;
    // $rootScope.curatedReviewArray = response.data;
    console.log('all reviews in search by leadership ', $rootScope.leadershipArray);
  }, function myError (response) {
    console.log(response.statusText);
  });
};

// ------END OF SEARCH BY LEADERSHIP RATING DESCENDING---------------//

$scope.filterFunction = function(element) {
     return element.company_name.match(/^Ma/) ? true : false;
   };

}]);///end of home controller
//
// var overallIn = $scope.overallRatingModel;
// var cultureAndValuesRatingIn = $scope.cultureAndValuesRatingModel;
// var seniorLeadershipRatingIn = $scope.seniorLeadershipRatingModel;
// var compensationAndBenefitsRatingIn = $scope.compensationAndBenefitsRatingModel;
// var workLifeBalanceRatingIn = $scope.workLifeBalanceRatingModel;
// var careerOpportunitiesRatingIn = $scope.careerOpportunitiesRatingModel;
// var recommendToFriendRatingIn = $scope.recommendToFriendRatingModel;
//
// $scope.resultsArray = [];
//
// var userPriorities = {
//   overall: overallIn,
//   cultureAndValuesRating: cultureAndValuesRatingIn,
//   seniorLeadershipRating: seniorLeadershipRatingIn,
//   compensationAndBenefitsRating: compensationAndBenefitsRatingIn,
//   workLifeBalanceRating: workLifeBalanceRatingIn,
//   careerOpportunitiesRating: careerOpportunitiesRatingIn,
//   recommendToFriendRating: recommendToFriendRatingIn
// };
//
// $scope.resultsArray.push( userPriorities );
// // console.log( 'resultsArray: ' + $scope.resultsArray );
// // console.log( 'userPriorities: '+
// // 'overall: ', userPriorities.overall,
// // 'cultureAndValuesRating: ', cultureAndValuesRating,
// // 'seniorLeadershipRating: ', userPriorities.seniorLeadershipRating,
// // 'compensationAndBenefitsRating: ', userPriorities.compensationAndBenefitsRating,
// // 'workLifeBalanceRating: ', workLifeBalanceRating,
// // 'careerOpportunitiesRating: ', careerOpportunitiesRating,
// // 'recommendToFriendRating: ', recommendToFriendRating  );
// console.log( 'in resultsArray: ', $scope.resultsArray );
//
 //end then after API call

// $scope.search = function(){
  // console.log( 'search clicked' );
  // $scope.searchedJobs = [];
  //
  // var searchCriteria = $scope.searched;
  // alert( searchCriteria );

  // var glassdoorAPI = 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=75608&t.k=jtQTmCQF0QA&action=employers&q=technology&l=minnesota';
      // $http({
      //       method: 'POST',
      //       url: '/searchJobs',
      //       dataType: 'jsonp',
      //       headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8081' }
      //     }).then( function( response ){
            // log the response from the http call
            // console.log( 'retrieved info for ', response.data.searchCriteria);
            // console.log( 'log', response.data.response.employers[0].name);
        //     var searchResults={
        //       Name: response.data.response.employers[0].name,
        //       Review: response.data.response.employers[0].review,
        //       }; // end object
        //     console.log( 'jobObject: ', searchResults );
        //
        // for (var i = 0; i < response.data.response.employers.length; i++) {
        //     console.log( 'inside the for loop of death and destruction' );
        //     if( searchResults === searchResults.name){
        //       console.log('searchResults: ' + searchResults.name );
        //     }
        // }
//           $scope.searchedJobs.push( searchCriteria );
//           console.log( 'searchedJobs:' + $scope.searchedJobs  );
//
//    });
//
// };
//
// $scope.search = function(){
//   console.log( 'search clicked' );
//   $scope.allglassdoorJobs = [];
//
//   var searchCriteria = $scope.searched;
//
//   var glassdoorAPI = 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=75608&t.k=jtQTmCQF0QA&action=employers&q=technology&l=minnesota';
//       $http({
//             method: 'POST',
//             url: glassdoorAPI,
//             dataType: 'jsonp',
//             headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8081' }
//           }).then( function( response ){
//             // log the response from the http call
//             console.log( 'retrieved info for ', response.data);
//             console.log( 'log', response.data.response.employers[0].name);
//             var searchResults={
//               Name: response.data.response.employers[0].name,
//               Review: response.data.response.employers[0].review,
//               }; // end object
//             console.log( 'jobObject: ', searchResults );
//
//         for (var i = 0; i < response.data.response.employers.length; i++) {
//             console.log( 'inside the for loop of death and destruction' );
//             if( searchResults === searchResults.name){
//               console.log('searchResults: ' + searchResults.name );
//             }
//         }
//           $scope.allglassdoorJobs.push( searchResults );
//           console.log( 'allglassdoorJobs:' + $scope.allglassdoorJobs[0].Name  );
//
//    });
//
// };

//
// }]); //end of successController
