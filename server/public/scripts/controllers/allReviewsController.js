
myApp.controller( 'allReviewsController', ['$scope', '$http', '$location', '$rootScope', function( $scope, $http, $location, $rootScope ){
  console.log( 'loaded allReviewsController' );

//call arrays for displaying reviews on the DOM
$rootScope.reviewArray = [];

//this will query the db to return all reviews in the system in no order.
$scope.showReviews = function() {
  console.log( 'showReviews clicked' );
    $scope.justEnteredForm=false;
    $scope.alltheReviewsForm=true;
    $scope.onlyMyReviews=false;
    $scope.topHalf=false;
    $scope.salaryShow=false;
    $scope.leadershipShow=false;

    $http({
      method: 'GET',
      url: '/getReviews'
    }).then(function(response) {
      $rootScope.reviewArray = response.data;
        console.log('all reviews: ', response.data);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end getReviews

    $scope.showReviews();

  //------------END OF SHOW ALL UNORDERED REVIEWS----------------------\\

  $scope.filterFunction = function(element) {
       return element.company_name.match(/^Ma/) ? true : false;
     };

  $scope.filterKeyword = function(element) {
       return element.review.match(/^Ma/) ? true : false;
      };


  }]);///end of home controller
