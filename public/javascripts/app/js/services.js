'use strict';
// services for AJAX/json data
angular.module('myApp.services', ['ngResource'])
	.factory('Months', function($resource) {
		return $resource('/birding/monthsjson');
	})
	.factory('Orders', function($resource) {
		return $resource('/birding/ordersjson');
	})	
	.factory('Species', function($resource) {
		return $resource('/birding/speciesjson');
	});