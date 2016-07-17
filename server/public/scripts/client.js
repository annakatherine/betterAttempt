var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

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
		.when('/allReviews', {
			templateUrl: '/views/pages/allReviews.html',
			controller: "allReviewsController"
		})
		.when('/myReviews', {
			templateUrl: '/views/pages/myReviews.html',
			controller: "myReviewsController"
		})
		.otherwise({
			redirectTo: 'login'
		});
}]);
