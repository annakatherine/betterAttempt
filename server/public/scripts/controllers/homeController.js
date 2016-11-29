
myApp.controller( 'homeController', ['$scope', '$http', '$location', '$rootScope', function( $scope, $http, $location, $rootScope ){
  console.log( 'loaded homeController' );

  //call arrays for displaying reviews on the DOM
  $rootScope.reviewArray = [];
  $rootScope.myReviewArray = [];
  $rootScope.salaryArray = [];
  $rootScope.justEnteredArray = [];
  $rootScope.glassdoorArray = [];
  $rootScope.username = '';
  //toggles the views
  $scope.justEnteredForm=false;
  $scope.alltheReviewsForm=false;
  $scope.editableForm=false;
  $scope.topHalf=true;
  $scope.salaryShow=false;
  $scope.leadershipShow=false;

  //-vvvvvNO IDEA WHERE THIS CAME FROM. WHAT DOES IT DO? ----------
  $scope.searchName = '';

// -----------beginning of logIn logic------------------------//
    $scope.user_id= {};
    // getUser();
    function getUser() {
      console.log( 'inside function getUser in homeController');
    $http.get('/router').then(function(response) {
          if(response.data.username) {
              $scope.userName = response.data.username;
              $scope.user_id = response.data._id;
              // console.log('User Data: ', $scope.userName);
              $rootScope.username = $scope.userName;
              console.log('User Data: ', $rootScope.username);

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
  console.log( 'user: ', $rootScope.username);

    console.log( reviewObject.name + ' ' + reviewObject.salary,
    reviewObject.leadership + ' ' + reviewObject.review, ' ', reviewObject.userID );
//sending review to the DB
    $http({
      method: 'POST',
      url: '/addReview',
      data: reviewObject
    }).then(function(response){
      $rootScope.justEnteredArray = response.data;
      console.log('success: ', response.data);

//adding review upon return from the db to the array for displaying on DOM
      // $scope.justEnteredArray.push( response.data );
      console.log('justEnteredArray: ', $rootScope.justEnteredArray );
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

//------------UNORDERED REVIEWS LOGIC IN allReviewsController-------------//
//------------USER SPECIFIC REVIEWS LOGIC IN myReviewsController-----------//

//---------END OF SHOW BY USER REVIEWS-----------------------------///////

// --THE LEADERSHIP LOGIC MOVED TO LEADERSHIPCONTROLLER.JS-------//

$scope.filterFunction = function(element) {
     return element.company_name.match(/^Ma/) ? true : false;
   };

$scope.filterKeyword = function(element) {
     return element.review.match(/^Ma/) ? true : false;
    };


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
//

$scope.search = function(){
  console.log( 'search clicked' );
  $scope.allglassdoorJobs = [];

  var searchCriteria = $scope.searched;

  var glassdoorAPI = 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=75608&t.k=jtQTmCQF0QA&action=employers&q=technology&l=minnesota';
      $http({
            method: 'POST',
            url: glassdoorAPI,
            dataType: 'jsonp',
            headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8081' }
          }).then( function( response ){
            // log the response from the http call
            console.log( 'retrieved info for ', response.data);
            console.log( 'log', response.data.response.employers[0].name);
            var searchResults={
              Name: response.data.response.employers[0].name,
              Review: response.data.response.employers[0].review,
              }; // end object
            console.log( 'jobObject: ', searchResults );

        for (var i = 0; i < response.data.response.employers.length; i++) {
            console.log( 'inside the for loop of death and destruction' );
            if( searchResults === searchResults.name){
              console.log('searchResults: ' + searchResults.name );
            }
        }
          $scope.allglassdoorJobs.push( searchResults );
          console.log( 'allglassdoorJobs:' + $scope.allglassdoorJobs[0].Name  );

   });

};
}]);///end of home controller

//
// }]); //end of successController
