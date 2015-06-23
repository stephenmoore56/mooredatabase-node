'use strict';

// controllers
myApp
	.controller('OrdersCtrl', function OrdersCtrl($scope, Orders) {

		// use the same data to draw the table and the Google chart
		Orders.getData().then(function(data) {
			$scope.orders = data;
			mooredatabase.drawChartSpeciesByOrder($scope.orders);
		});

		// initial sort and method to change it
		$scope.predicate = 'speciesCount';
	    $scope.sortResults = function(predicate) {
	          $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
	          $scope.predicate = predicate;
	    };	
	})
	.controller('MonthsCtrl', function MonthsCtrl($scope, Months) {

		// use the same data to draw the table and the Google chart
		Months.getData().then(function(data) {
			$scope.months = data;
			mooredatabase.drawChartSpeciesByMonth($scope.months);
		});	

		// initial sort and method to change it
		$scope.predicate = 'monthNumber';
	    $scope.sortResults = function(predicate) {
	          $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
	          $scope.predicate = predicate;
	    };	
	})
	.controller('SpeciesCtrl', function SpeciesCtrl($scope, Species) {

		// use the same data to draw the table and the Google chart
		Species.getData().then(function(data) {
			$scope.birds = data;
		});		

		// initial sort and method to change it
		$scope.predicate = 'common_name';
	    $scope.sortResults = function(predicate) {
	          $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
	          $scope.predicate = predicate;
	    };	
	})