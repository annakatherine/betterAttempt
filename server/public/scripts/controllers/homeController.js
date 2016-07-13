
myApp.controller( 'homeController', ['$scope', '$http', '$location', function( $scope, $http, $location ){
  console.log( 'loaded homeController' );
  $scope.reviewArray = [];

  $scope.top = true;
  // $scope.bottom = false;

    $scope.user_id= {};
    getUser();

    function getUser() {
    $http.get('/router').then(function(response) {
          if(response.data.username) {
              $scope.userName = response.data.username;
              $scope.user_id = response.data._id;
              console.log('User Data: ', $scope.userName);
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
    console.log( 'submitReview clicked' );
    //declare an empty array to hold review details for viewing
    var reviewObject = {

      name: $scope.companyNameModel,
      salary: $scope.salaryModel,
      leadership: $scope.leadershipModel,
      review: $scope.reviewModel,
  };
    console.log( reviewObject.name + ' ' + reviewObject.salary,
    reviewObject.leadership + ' ' + reviewObject.review );

    $http({
      method: 'POST',
      url: '/addReview',
      data: reviewObject
    }).then(function(response){
      $scope.reviewsAll = response.data;
      console.log('success: ', response.data);

    });
    $scope.reviewArray.push( reviewObject );


    $scope.companyNameModel = '';
    $scope.salaryModel = '';
    $scope.leadershipModel = '';
    $scope.reviewModel = '';
  };//end of submitReview

///making the stars align
$scope.rate = 7;
$scope.max = 10;
$scope.isReadonly = false;

$scope.hoveringOver = function(value) {
  $scope.overStar = value;
  $scope.percent = 100 * (value / $scope.max);
};
//end of the stars aligning
$scope.deleteReview = function(reviewID){
    event.preventDefault();

     console.log("In the d");

     var sendID = {id: reviewID};
     alert( sendID );
     $http({

       method: 'DELETE',
       url: '/deleteReview',
       data: sendID,
       headers: {'Content-Type': 'application/json;charset=utf-8'}

     }).then(function(){
       console.log( 'at the end of delete' );

     });
   };// End delete revie

//--------------------end of deleteReview-------------------///

$scope.showReviews = function(){
  $http({
    method: 'GET',
    url: '/getmyReviews'
  }).then(function(response){
    $scope.allReviews = response.data;
    console.log('here is what I entered');
  });
};//end showReviews

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
