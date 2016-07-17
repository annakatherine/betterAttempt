//
// myApp.controller( 'searchNavController', ['$scope', '$http', '$location', '$rootScope', function( $scope, $http, $location, $rootScope ){
//   console.log( 'loaded searchNavController' );
//
//   //call arrays for displaying reviews on the DOM
//   $rootScope.reviewArray = [];
//   $rootScope.myReviewArray = [];
//   $rootScope.salaryArray = [];
//   $rootScope.leadershipArray = [];
//   $rootScope.justEnteredArray = [];
//   $rootScope.glassdoorArray = [];
//   $rootScope.username = '';
//   //toggles the views
//   $scope.justEnteredForm=false;
//   $scope.alltheReviewsForm=false;
//   $scope.editableForm=false;
//   $scope.topHalf=true;
//   $scope.salaryShow=false;
//   $scope.leadershipShow=false;
//
// //---------SHOW BY USER REVIEWS IS IN MYREVIEWCONTROLLER--------------///////
// //---------SHOW ALL UNORDERED IS IN allReviewsController--------------///////
//
// //queries the db and returns in order of salary best to worst
// $rootScope.salarySearch = function( ){
//   console.log( 'salarySearch clicked' );
//   $scope.justEnteredForm=false;
//   $scope.alltheReviewsForm=false;
//   $scope.onlyMyReviews=false;
//   $scope.topHalf=false;
//   $scope.salaryShow=true; ////
//   $scope.leadershipShow=false;
//
//
//   $http({
//     method: 'GET',
//     url: '/salarySearch'
//   }).then(function(response) {
//     $rootScope.salaryArray = response.data;
//     $rootScope.salaryArray.push( response.data );
//
//     // $rootScope.curatedReviewArray = response.data;
//     console.log('all reviews in search by salary ', $rootScope.salaryArray);
//   }, function myError (response) {
//     console.log(response.statusText);
//   }); //end of .then
// };
// // ------END OF SEARCH BY SALARY DESCENDING----------------------//
//
// $scope.leadershipSearch = function( ){
//   console.log( 'leadershipSearch clicked' );
//   $scope.justEnteredForm=false;
//   $scope.alltheReviewsForm=false;
//   $scope.onlyMyReviews=false;
//   $scope.topHalf=false;
//   $scope.salaryShow=false;
//   $scope.leadershipShow=true; ////
//
//   $http({
//     method: 'GET',
//     url: '/leadershipSearch'
//   }).then(function(response) {
//     $rootScope.leadershipArray = response.data;
//     // $rootScope.curatedReviewArray = response.data;
//     console.log('all reviews in search by leadership ', $rootScope.leadershipArray);
//   }, function myError (response) {
//     console.log(response.statusText);
//   });
// };
// //
// // // ------END OF SEARCH BY LEADERSHIP RATING DESCENDING---------------//
//
// $scope.filterFunction = function(element) {
//      return element.company_name.match(/^Ma/) ? true : false;
//    };
//
// $scope.filterKeyword = function(element) {
//      return element.review.match(/^Ma/) ? true : false;
//     };
//
//
// }]);///end of searchNav controller
