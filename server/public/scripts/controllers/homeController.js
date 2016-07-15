
myApp.controller( 'homeController', ['$scope', '$http', '$location', '$rootScope', function( $scope, $http, $location, $rootScope ){
  console.log( 'loaded homeController' );
  $rootScope.reviewArray = [];

  $scope.topHalf=true;
  $scope.bottomHalf=false;
  $scope.searchName = '';

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
//-------------------------------------------------------------------------
  $scope.submitReview = function( ){
    console.log( 'submitReview clicked by: ', $scope.reviewArray.user_id );
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

    $http({
      method: 'POST',
      url: '/addReview',
      data: reviewObject
    }).then(function(response){
      $scope.reviewsAll = response.data;
      console.log('success: ', response.data);
      $scope.reviewArray.push( response.data );
      console.log('reviewArray: ', $scope.reviewArray );
    });

    $scope.companyNameModel = '';
    $scope.salaryModel = '';
    $scope.leadershipModel = '';
    $scope.reviewModel = '';
  };//end of submitReview
//-----------------------------------------------------------------------------
///making the stars align
$scope.rate = 7;
$scope.max = 10;
$scope.isReadonly = false;

$scope.hoveringOver = function(value) {
  $scope.overStar = value;
  $scope.percent = 100 * (value / $scope.max);
};
//end of the stars aligning
//----------------------

$scope.deleteReview = function(recordID){
    // event.preventDefault();
     console.log("In the delete");
     console.log( 'recordID: ', recordID);
     var sendID = {id: recordID};
    //  alert( sendID );
     $http({
       method: 'DELETE',
       url: '/deleteReview/' + recordID,
       headers: {'Content-Type': 'application/json;charset=utf-8'}
     }).then(function(){
       $scope.reviewArray.splice( sendID, 1 );

       console.log( 'at the end of delete' );
     });//end of .then
   };// End delete review

//--------------------end of deleteReview-------------------///
//   get method to retrieve data from server to display
    $scope.showReviews = function() {
      console.log( 'showReviews clicked' );
      $http({
        method: 'GET',
        url: '/getReviews'
      }).then(function(response) {
        $rootScope.reviewArray = response.data;
        $rootScope.curatedReviewArray = response.data;
        console.log('all reviews: ', response.data);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end displayPlaymates

//------------showMyReviews----------------------\\

$scope.showMyReviews = function( ){
  console.log( 'showMyReviews clicked' );
  $http({
    method: 'GET',
    url: '/showUserReviews'
  }).then(function(response) {
    $rootScope.reviewArray = response.data;
    $rootScope.curatedReviewArray = response.data;
    console.log('all reviews: ', response.data);
  }, function myError (response) {
    console.log(response.statusText);
  });
};
    // $scope.curateReviews = function(){
    //   for (var i = 0; i < $scope.reviewArray.length; i++) {
    //     if( $scope.reviewArray.company_name !== $scope.searchedReview ){
    //       $scope.reviewArray.company_name.splice( $scope.searchedReview );
    //     }
    //   }


    // for loop through $rootScope.curatedReviewArray
    // remove any that don't have name of $scope.searchName
    // $rootScope.curatedReviewArray
    // };

    ///if you want to display upon load later this spot worksvvv---//
    // $scope.showReviews();

//---------END OF SHOW REVIEWS-----------------------------///////


// $scope.editReview = function( recordID ){
//   $scope.topHalf = !$scope.topHalf;
//   $scope.bottomHalf = !$scope.bottomHalf;
// };
//
// $scope.banananananana = function( recordID ){
//   console.log( 'editReview clicked' );
//   $http({
//     method: 'PUT',
//     url: '/editReview/' + recordID,
//     data: recordID
//   }).then(function(response){
//     console.log( 'put then function ');
//     $scope.updatedReview = response.data;
//
//   }); //end of then
// };

$scope.filterFunction = function(element) {
     return element.company_name.match(/^Ma/) ? true : false;
   };
// $scope.editFormOpen = function( ){
//   $scope.topHalf = !$scope.topHalf;
//   $scope.bottomHalf = !$scope.bottomHalf;
//
// };

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
