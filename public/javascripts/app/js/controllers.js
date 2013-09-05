'use strict';

// controllers
angular.module('myApp.controllers', [])
.controller('OrdersCtrl', ['$scope', 'Orders', function($scope, Orders) {
	// use the same data to draw the table and the Google chart
	$scope.orders = Orders.query(function() {
		mooredatabase.drawChartSpeciesByOrder($scope.orders);
	});

	$scope.orderProp = 'speciesCount';
	$scope.reverse = true;

	$scope.setOrderProp = function(newOrderProp) {
		if (newOrderProp == $scope.orderProp) {
			$scope.reverse = !$scope.reverse;
		} else {
			$scope.orderProp = newOrderProp;
		}
	};
}])
.controller('MonthsCtrl', ['$scope', 'Months', function($scope, Months) {
	// use the same data to draw the table and the Google chart
	$scope.months = Months.query(function() {
		mooredatabase.drawChartSpeciesByMonth($scope.months);
	});

	$scope.orderProp = 'monthNumber';
	$scope.reverse = false;

	$scope.setOrderProp = function(newOrderProp) {
		if (newOrderProp == $scope.orderProp) {
			$scope.reverse = !$scope.reverse;
		} else {
			$scope.orderProp = newOrderProp;
		}
	};
}])
.controller('SpeciesCtrl', ['$scope', 'Species', function($scope, Species) {
	$scope.birds = Species.query();

	$scope.orderProp = 'common_name';
	$scope.reverse = false;

	$scope.setOrderProp = function(newOrderProp) {
		if (newOrderProp == $scope.orderProp) {
			$scope.reverse = !$scope.reverse;
		} else {
			$scope.orderProp = newOrderProp;
		}
	};
}]); 