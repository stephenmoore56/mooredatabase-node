'use strict';

var OrdersCtrl = function($scope, $http, Orders) {
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
}
var MonthsCtrl = function($scope, $http, Months) {
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
}
var SpeciesCtrl = function($scope, $http, Species) {
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
}