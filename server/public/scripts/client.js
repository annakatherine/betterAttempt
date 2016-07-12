var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: '/views/pages/logIn.html',
			controller: "logInController"
		})
		.when('/signUp', {
			templateUrl: '/views/pages/signUp.html',
			controller: "logInController"
		})
		.when('/home', {
			templateUrl: '/views/pages/home.html',
			controller: "homeController"
		})
		.when('/other', {
			templateUrl: '/views/pages/other.html',
			controller: "successController"
		})
		.otherwise({
			redirectTo: 'login'
		});
}]);
