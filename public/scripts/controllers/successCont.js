
myApp.controller( 'successController', ['$scope', '$http', function( $scope, $http ){
  console.log( 'loaded successController' );
$scope.allglassdoorJobs = [];
///this is hte function that should run when search button is clicked
$scope.glassdoorSearch = function(){
  console.log( 'glassdoorSearch clicked' );
  var glassdoorAPI = 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=75608&t.k=jtQTmCQF0QA&action=employers&q=pharmaceuticals&userip=192.168.43.42&useragent=Mozilla/%2F4.0';
  $http({
        method: 'GET',
        url: glassdoorAPI
      }).then( function( response ){
        // log the response from the http call
        console.log( 'retrieved info for ' + response.data.name );
        var jobObject={
          State: response.data.Name,
          numJobs: response.data.numJobs,
          longitude: response.data.longitude,
          latitude: response.data.latitude
        }; // end object
      $scope.allglassdoorJobs.push( jobObject );
    }); //end then
  };// end glassdoorSearch
}]);//end of testController
