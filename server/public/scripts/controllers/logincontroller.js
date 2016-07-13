myApp.controller('logInController', ['$scope', '$http', '$window',
'$location', function($scope, $http, $window, $location) {
  console.log( 'login controller loaded');
    $scope.user = {
      username: '',
      password: '',
      zip: '',
      cohort: '',
    };

///------login function---------------------------------------
    $scope.message = '';
        $scope.logIn = function() {
          console.log( 'login clicked' );
          if($scope.user.username === '' || $scope.user.password === '') {
            $scope.message = "Enter your username and password!";
          } else {
            console.log('logging in... ', $scope.user);
            $http.post('/logIn', $scope.user).then(function(response) {
              if(response.data.username) {
                console.log('success: ', response.data);
                // location works with SPA (ng-route)
                $location.path('/home');
              } else {
                console.log('failure: ', response);
                $scope.message = "no.";
              }
            });
          }
        };
//-----------------signUpfunction--------------------------
        $scope.signUpNewUser = function() {
          console.log( 'signUpNewUser clicked' );
          if($scope.user.username === '' || $scope.user.password === '') {
            $scope.message = "Choose a username and password!";
          } else {
            console.log('signing Up... ', $scope.user);
            $http.post('/', $scope.user).then(function(response) {
              console.log('made it past the post call for signUp in logincontroller');
              $location.path('/success');
            },
            function(response) {
              console.log('error');
              $scope.message = "Please try again.";
            });
          }
        };


}]);//end of login controller
//
// angular.module('app')
// .controller('LoginCtrl', ['$scope', loginCtrlFunc]);
//
// function loginCtrlFunc($scope){
//
// }
