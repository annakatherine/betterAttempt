var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: '/views/pages/logIn.html',
			controller: "bananaController"
		})
		.when('/signUp', {
			templateUrl: '/views/pages/signUp.html',
			controller: "bananaController"
		})
		.when('/home', {
			templateUrl: '/views/pages/home.html',
			controller: "homeController"
		})
		.when('/leadership', {
			templateUrl: '/views/pages/leadership.html',
			controller: "leadershipController"
		})
		.when('/salary', {
			templateUrl: '/views/pages/salary.html',
			controller: "salaryController"
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
