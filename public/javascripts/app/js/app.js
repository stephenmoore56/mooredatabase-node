'use strict';

// create app; dependencies for AJAX data, services, controlllers
var myApp = angular.module('myApp', ['ngResource','myApp.services','myApp.controllers']);

// routing for static pages (SPA)
myApp.config(function($routeProvider){
	$routeProvider
		.when('',
		{
			templateUrl: '/partials/backend.html'
		})
		.when('/backend',
		{
			templateUrl: '/partials/backend.html'
		})		
		.when('/frontend',
		{
			templateUrl: '/partials/frontend.html'
		});
});