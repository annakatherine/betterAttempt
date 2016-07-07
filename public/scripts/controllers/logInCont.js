myApp.controller( 'logInController', ['$scope', '$http', function( $scope, $http ){
  console.log( 'loaded LogInController' );

  var auth0 = new Auth0({
    domain:         'primetime.auth0.com',
    clientID:       'tfynhUQ3sH7fUv9UCDd5leqe4MyWkfBM',
    callbackURL:    ''
  });

  $scope.logInGoogle = function(){
    console.log( 'logInGoogle clicked' );
     auth0.signin({connection: 'google-oauth2'}); // use connection identifier
};

$scope.logInGooglePopUp = function(){
  console.log( 'google popup button clicked' );
  auth0.signin({popup: true, connection: 'google-oauth2'},
                function(err, profile, id_token, access_token, state) {
                    /*
                      store the profile and id_token in a cookie or local storage
                        $.cookie('profile', profile);
                        $.cookie('id_token', id_token);
                    */
                });

};//end of logInGooglePopUp

$scope.logInDB = function(){
  auth0.signin({
    connection: 'foo',
    username: 'bar',
    password: 'foobar'
  },
  function (err, profile, id_token, access_token, state) {
    // /*
        // store the profile and id_token in a cookie or local storage
          $.cookie('profile', profile);
          $.cookie('id_token', id_token);
    //   */
  });
};
}]);//end of index controller
