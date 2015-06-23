'use strict';

// create app; dependencies for AJAX data, services, controlllers
var myApp = angular.module('myApp', ['ngRoute']);

// routing for static pages (SPA)
myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
		.when('', {
			templateUrl : '/partials/nodejs.html'
		})
		.when('/nodejs', {
			templateUrl : '/partials/nodejs.html'
		})
		.when('/angularjs', {
			templateUrl : '/partials/angularjs.html'
		})
		.when('/bootstrap', {
			templateUrl : '/partials/bootstrap.html'
		})
		.when('/orders', {
			templateUrl : '/partials/orders.html'
		})
		.when('/months', {
			templateUrl : '/partials/months.html'
		})
		.when('/species', {
			templateUrl : '/partials/species.html'
		})
		.otherwise({
			redirectTo: '/nodejs'
      	});
}]); 