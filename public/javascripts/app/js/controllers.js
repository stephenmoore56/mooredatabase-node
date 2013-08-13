'use strict';
// controllers
angular.module('myApp.controllers', [])
	.controller('OrdersCtrl', ['$scope','Orders', function($scope, Orders) {
		$scope.orders = Orders.query();
		
		$scope.orderProp = 'speciesCount';
		$scope.reverse = true;
		
		$scope.setOrderProp = function(newOrderProp) {
			if (newOrderProp == $scope.orderProp) {
				$scope.reverse = ! $scope.reverse;
			} else {
	   			$scope.orderProp = newOrderProp;			
			}
	  	}		
	}])
	.controller('MonthsCtrl', ['$scope','Months', function($scope, Months) {
		$scope.months = Months.query();
		
		$scope.orderProp = 'monthNumber';
		$scope.reverse = false;
		
		$scope.setOrderProp = function(newOrderProp) {
			if (newOrderProp == $scope.orderProp) {
				$scope.reverse = ! $scope.reverse;
			} else {
	   			$scope.orderProp = newOrderProp;			
			}
	  	}		
	}])
	.controller('SpeciesCtrl', ['$scope','Species', function($scope, Species) {
		$scope.birds = Species.query();
		
		$scope.orderProp = 'common_name';
		$scope.reverse = false;
		
		$scope.setOrderProp = function(newOrderProp) {
			if (newOrderProp == $scope.orderProp) {
				$scope.reverse = ! $scope.reverse;
			} else {
	   			$scope.orderProp = newOrderProp;			
			}
	  	}	
	}]);