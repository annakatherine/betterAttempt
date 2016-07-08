
myApp.controller( 'successController', ['$scope', '$http', function( $scope, $http ){
  console.log( 'loaded successController' );
$scope.allglassdoorJobs = [];
///this is hte function that should run when search button is clicked
$scope.glassdoorSearch = function(){

  // make object out of radio button selections
  $scope.allglassdoorJobs=[];
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
            workLifeBalanceRating: response.data.response.employers[0].workLifeBalanceRating,
            careerOpportunitiesRating: response.data.response.employers[0].careerOpportunitiesRating,
            recommendToFriendRating: response.data.response.employers[0].recommendToFriend,
          }; // end object
          console.log( 'jobObject: ', jobObject );
        $scope.allglassdoorJobs.push( jobObject );
      }); //end then
      console.log( 'allglassdoorJobs:' + $scope.allglassdoorJobs  );

    };// end glassdoorSearch
}]); //end of successController
