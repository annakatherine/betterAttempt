myApp.controller( 'salaryController', ['$scope', '$http', '$location', '$rootScope', function( $scope, $http, $location, $rootScope ){
  console.log( 'loaded salaryController' );

$rootScope.salaryArray = [];
//queries the db and returns in order of salary best to worst
$rootScope.salarySearch = function( ){
  console.log( 'salarySearch clicked' );
  $scope.justEnteredForm=false;
  $scope.alltheReviewsForm=false;
  $scope.onlyMyReviews=false;
  $scope.topHalf=false;
  $scope.salaryShow=true; ////
  $scope.leadershipShow=false;


  $http({
    method: 'GET',
    url: '/salarySearch'
  }).then(function(response) {
    $rootScope.salaryArray = response.data;
    $rootScope.salaryArray.push( response.data );
    console.log('all reviews in search by salary ', $rootScope.salaryArray);
  }, function myError (response) {
    console.log(response.statusText);
  }); //end of .then
}; //end of salary search function

$scope.salarySearch();

// ------END OF SEARCH BY SALARY DESCENDING----------------------//
}]);
// ------END OF SEARCH BY SALARY RATING DESCENDING---------------//
