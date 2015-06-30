'use strict';

// services for AJAX/JSON data
myApp.factory('Months', function($http, $q) {
	return {
		getData : function() {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				url : '/birding/monthsjson'
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).error(function(data, status, headers, config) {
				deferred.reject(status);
			});
			return deferred.promise;
		}
	}
}).factory('Orders', function($http, $q) {
	return {
		getData : function() {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				url : '/birding/ordersjson'
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).error(function(data, status, headers, config) {
				deferred.reject(status);
			});
			return deferred.promise;
		}
	}
}).factory('Species', function($http, $q) {
	return {
		getData : function() {
			var deferred = $q.defer();
			$http({
				method : 'GET',
				url : '/birding/speciesjson'
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).error(function(data, status, headers, config) {
				deferred.reject(status);
			});
			return deferred.promise;
		}
	}
})