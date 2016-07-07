myApp.controller( 'logInController', ['$scope', '$http', function( $scope, $http ){
  console.log( 'loaded LogInController' );

  $scope.googleLogIn = function(){
     auth0.signin({connection: 'google-oauth2'}); // use connection identifier
};
}]);//end of index controller
