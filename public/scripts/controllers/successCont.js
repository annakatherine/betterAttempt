
myApp.controller( 'successController', ['$scope', '$http', function( $scope, $http ){
  console.log( 'loaded successController' );

$scope.glassdoorSearch = function(){

// declare empty array to hold API search results
  $scope.allglassdoorJobs = [];

//------API results get made into an objec----------------------------------------

  console.log( 'hit glassdoorSearch' );
    var glassdoorAPI = 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=75608&t.k=jtQTmCQF0QA&action=employers&q=technology&l=minnesota';
    $http({
          method: 'GET',
          url: glassdoorAPI,
          dataType: 'jsonp',
          headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8081' }
        }).then( function( response ){
          // log the response from the http call
          console.log( 'retrieved info for ', response.data);
          console.log( 'log', response.data.response.employers[0].name);
          var jobObject={
            Name: response.data.response.employers[0].name,
            industry: response.data.response.employers[0].industry,
            overallRating: response.data.response.employers[0].overallRating,
            cultureAndValuesRating: response.data.response.employers[0].cultureAndValuesRating,
            seniorLeadershipRating: response.data.response.employers[0].seniorLeadershipRating,
            compensationAndBenefitsRating: response.data.response.employers[0].compensationAndBenefitsRating,
            workLifeBalanceRating: response.data.response.employers[0].workLifeBalanceRating,
            careerOpportunitiesRating: response.data.response.employers[0].careerOpportunitiesRating,
            recommendToFriendRating: response.data.response.employers[0].recommendToFriend,
          }; // end object
          console.log( 'jobObject: ', jobObject );

      for (var i = 0; i < response.data.response.employers.length; i++) {
          console.log( 'inside the for loop of death and destruction' );
      }
        $scope.allglassdoorJobs.push( jobObject );
        console.log( 'allglassdoorJobs:' + $scope.allglassdoorJobs[0].Name  );

////----------user input gets made into an object--------------------------------------------------
var overallIn = $scope.overallRatingModel;
var cultureAndValuesRatingIn = $scope.cultureAndValuesRatingModel;
var seniorLeadershipRatingIn = $scope.seniorLeadershipRatingModel;
var compensationAndBenefitsRatingIn = $scope.compensationAndBenefitsRatingModel;
var workLifeBalanceRatingIn = $scope.workLifeBalanceRatingModel;
var careerOpportunitiesRatingIn = $scope.careerOpportunitiesRatingModel;
var recommendToFriendRatingIn = $scope.recommendToFriendRatingModel;

$scope.resultsArray = [];

var userPriorities = {
  overall: overallIn,
  cultureAndValuesRating: cultureAndValuesRatingIn,
  seniorLeadershipRating: seniorLeadershipRatingIn,
  compensationAndBenefitsRating: compensationAndBenefitsRatingIn,
  workLifeBalanceRating: workLifeBalanceRatingIn,
  careerOpportunitiesRating: careerOpportunitiesRatingIn,
  recommendToFriendRating: recommendToFriendRatingIn
};

$scope.resultsArray.push( userPriorities );
// console.log( 'resultsArray: ' + $scope.resultsArray );
// console.log( 'userPriorities: '+
// 'overall: ', userPriorities.overall,
// 'cultureAndValuesRating: ', cultureAndValuesRating,
// 'seniorLeadershipRating: ', userPriorities.seniorLeadershipRating,
// 'compensationAndBenefitsRating: ', userPriorities.compensationAndBenefitsRating,
// 'workLifeBalanceRating: ', workLifeBalanceRating,
// 'careerOpportunitiesRating: ', careerOpportunitiesRating,
// 'recommendToFriendRating: ', recommendToFriendRating  );
console.log( 'in resultsArray: ', $scope.resultsArray );
//
console.log( 'allglassdoorJobs.length: ', $scope.allglassdoorJobs.length );
}); //end then after API call

};// end glassdoorSearch
}]); //end of successController
