'use strict';

angular.module('myAppServices', ['ngResource'])
	.factory('Months', function($resource) {
		return $resource('/birding/monthsjson');
	})
	.factory('Orders', function($resource) {
		return $resource('/birding/ordersjson');
	})	
	.factory('Species', function($resource) {
		return $resource('/birding/speciesjson');
	});