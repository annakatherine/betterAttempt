myApp.controller( 'logInController', ['$scope', '$http', function( $scope, $http ){
  console.log( 'loaded LogInController' );

  var auth0 = new Auth0({
    domain:         'primetime.auth0.com',
    clientID:       'tfynhUQ3sH7fUv9UCDd5leqe4MyWkfBM',
    callbackURL:    ''
  });

  $scope.slackLogIn = function() {
      auth0.signin({popup: true, connection: 'https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=3545121647.57738599220'},
                  function(err, client_id, scope, redirect_uri, state, team) {

                        // store the profile and id_token in a cookie or local storage
                          $.cookie('profile', profile);
                          $.cookie('id_token', id_token);

                  });
    };
}]);//end of index controller
