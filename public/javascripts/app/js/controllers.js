(function () {
    'use strict';
    myApp.controller('OrdersCtrl', function OrdersCtrl($scope, OrdersDataFactory) {

        // use the same data to draw the table and the Google chart
        OrdersDataFactory.getData().then(function (data) {
            $scope.orders = data;
            mooredatabase.drawChartSpeciesByOrder($scope.orders);
        });

        // initial sort and method to change it
        $scope.predicate = '-speciesCount';
        $scope.sortResults = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
    }).controller('MonthsCtrl', function MonthsCtrl($scope, MonthsDataFactory) {

        // use the same data to draw the table and the Google chart
        MonthsDataFactory.getData().then(function (data) {
            $scope.months = data;
            mooredatabase.drawChartSpeciesByMonth($scope.months);
        });

        // initial sort and method to change it
        $scope.predicate = 'monthNumber';
        $scope.sortResults = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
    }).controller('SpeciesCtrl', function SpeciesCtrl($scope, SpeciesDataFactory) {

        // use the same data to draw the table and the Google chart
        SpeciesDataFactory.getData().then(function (data) {
            $scope.birds = data;
        });

        // initial sort and method to change it
        $scope.predicate = 'common_name';
        $scope.sortResults = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
    });
})();