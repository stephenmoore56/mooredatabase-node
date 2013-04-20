OrdersCtrl = function($scope, $http) {
	$http.get('/birding/ordersjson').success(function(data) {
		$scope.orders = data;
	});
	
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
MonthsCtrl = function($scope, $http) {
	$http.get('/birding/monthsjson').success(function(data) {
		$scope.months = data;
	});
	
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