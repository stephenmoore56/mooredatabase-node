'use strict';

// function for sorting tables used by all controllers
var setOrderProp = function($scope, newOrderProp) {
	if (newOrderProp == $scope.orderProp) {
		$scope.reverse = !$scope.reverse;
	} else {
		$scope.orderProp = newOrderProp;
	}	
};
mooredatabase.setOrderProp = setOrderProp;

// controllers
angular.module('myApp.controllers', [])
.controller('OrdersCtrl', ['$scope', 'Orders', function($scope, Orders) {
	// use the same data to draw the table and the Google chart
	$scope.orders = Orders.query(function() {
		mooredatabase.drawChartSpeciesByOrder($scope.orders);
	});

	// initial sort and method to change it
	$scope.orderProp = 'speciesCount';
	$scope.reverse = true;
	$scope.setOrderProp = function(newOrderProp) {
		return mooredatabase.setOrderProp($scope,newOrderProp);
	};
}])
.controller('MonthsCtrl', ['$scope', 'Months', function($scope, Months) {
	// use the same data to draw the table and the Google chart
	$scope.months = Months.query(function() {
		mooredatabase.drawChartSpeciesByMonth($scope.months);
	});

	// initial sort and method to change it
	$scope.orderProp = 'monthNumber';
	$scope.reverse = false;
	$scope.setOrderProp = function(newOrderProp) {
		return mooredatabase.setOrderProp($scope,newOrderProp);
	};
}])
.controller('SpeciesCtrl', ['$scope', 'Species', function($scope, Species) {
	$scope.birds = Species.query();

	// initial sort and method to change it
	$scope.orderProp = 'common_name';
	$scope.reverse = false;
	$scope.setOrderProp = function(newOrderProp) {
		return mooredatabase.setOrderProp($scope,newOrderProp);
	};
}]); 