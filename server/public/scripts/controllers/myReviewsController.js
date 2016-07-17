
myApp.controller( 'myReviewsController', ['$scope', '$http', '$location', '$rootScope', function( $scope, $http, $location, $rootScope ){
  console.log( 'loaded myReviewsController' );
  //call arrays for displaying reviews on the DOM
  $rootScope.myReviewArray = [];

    //-vvvvvNO IDEA WHERE THIS CAME FROM. WHAT DOES IT DO? ----------
    $scope.searchName = '';

//this will query the db to return all reviews in the system in no order.
//this will show only the reviews entered by the user currently logged in.
$scope.showMyReviews = function( ){
  console.log( 'showMyReviews clicked' );
  $scope.justEnteredForm=false;
  $scope.alltheReviewsForm=false;
  $scope.onlyMyReviews=true;
  $scope.topHalf=true;
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

$scope.showMyReviews();

  //------------END OF SHOW ALL UNORDERED REVIEWS----------------------\\


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
         $rootScope.reviewArray.splice( sendID, 1 );
         $scope.showMyReviews();
         console.log( 'at the end of delete' );
       });//end of .then
     };

  //--------------------end of deleteReview-------------------///

    $scope.filterFunction = function(element) {
       return element.company_name.match(/^Ma/) ? true : false;
     };

  $scope.filterKeyword = function(element) {
       return element.review.match(/^Ma/) ? true : false;
      };


  }]);///end of home controller
