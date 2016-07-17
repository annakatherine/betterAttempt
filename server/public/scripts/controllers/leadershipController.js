myApp.controller( 'leadershipController', ['$scope', '$http', '$location', '$rootScope', function( $scope, $http, $location, $rootScope ){
  console.log( 'loaded leadershipController' );

$rootScope.leadershipArray = [];

$scope.leadershipSearch = function( ){
  console.log( 'leadershipSearch clicked' );

  $http({
    method: 'GET',
    url: '/leadershipSearch'
  }).then(function(response) {
    $rootScope.leadershipArray = response.data;
    // $rootScope.curatedReviewArray = response.data;
    console.log('search by leadership ', $rootScope.leadershipArray);
  }, function myError (response) {
    console.log(response.statusText);
  });
};

$scope.leadershipSearch();
}]);
// ------END OF SEARCH BY LEADERSHIP RATING DESCENDING---------------//
