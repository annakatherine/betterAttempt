myApp.controller('logInController', ['$scope', '$http', '$window',
'$location', function($scope, $http, $window, $location) {
    $scope.user = {
      username: '',
      password: '',
      zip: '',
      cohort: '',
    };
    $scope.message = '';
        $scope.login = function() {
          console.log( 'login clicked' );
          if($scope.user.username === '' || $scope.user.password === '') {
            $scope.message = "Enter your username and password!";
          } else {
            console.log('sending to server...', $scope.user);
            $http.post('/', $scope.user).then(function(response) {
              if(response.data.username) {
                console.log('success: ', response.data);
                // location works with SPA (ng-route)
                $location.path('/success');
              } else {
                console.log('failure: ', response);
                $scope.message = "Wrong!!";
              }
            });
          }
        };

        $scope.signUpNewUser = function() {
          if($scope.user.username === '' || $scope.user.password === '') {
            $scope.message = "Choose a username and password!";
          } else {
            console.log('sending to server...', $scope.user);
            $http.post('/signUp', $scope.user).then(function(response) {
              console.log('success');
              $location.path('/success');
            },
            function(response) {
              console.log('error');
              $scope.message = "Please try again.";
            });
          }
        };


}]);//end of login controller
