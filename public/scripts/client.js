console.log( 'bravo' );
var myApp = angular.module( 'myApp', ['ngRoute']);
/// Routes ///
myApp.config(['$routeProvider', function ($routeProvider) {
console.log( 'under myApp.config' );
 $routeProvider
   .when('/signUp', {
     templateUrl: '/views/pages/signUp.html',
     controller: "signUpController"
   })
   .when('/index', {
     templateUrl: '/views/pages/index.html',
     controller: "indexController"
   })
   .when('/failure', {
     templateUrl: '/views/pages/failure.html',
     controller: "failureController"
   })
   .when('/success', {
     templateUrl: '/views/pages/success.html',
     controller: "successController"
   })
   .when('/home', {
     templateUrl: '/views/pages/home.html',
     controller: "homeController"
   })
   .when('/logIn', {
     templateUrl: '/views/pages/logIn.html',
     controller: "logInController"
   })
   .otherwise({
     redirectTo: '/home'
   });
 }]);//end of myapp confug
 myApp.controller( 'indexController', ['$scope', '$http', function( $scope, $http ){
   console.log( 'loaded indexController' );

 }]);//end of index controller
