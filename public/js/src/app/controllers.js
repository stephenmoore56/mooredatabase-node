(function() {
    'use strict';
    myApp.controller('OrdersCtrl', ['$scope', 'OrdersDataFactory', 'ReportCharts',
            function OrdersCtrl($scope, OrdersDataFactory, ReportCharts) {
                // change active nav pill
                mooredatabaseCustom.setNavPill();
                // use the same data to draw the table and the chart
                OrdersDataFactory.getData()
                    .then(function(data) {
                        if (data.errors) {
                            $scope.error = data.errors[0];
                        } else {
                            $scope.orders = data;
                            ReportCharts.drawChartSpeciesByOrder($scope.orders, 'chart_div');
                        }
                    });
                // initial sort and method to change it
                $scope.predicate = '-speciesCount';
                $scope.sortResults = function(predicate) {
                    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                    $scope.predicate = predicate;
                };
            }
        ])
        .controller('MonthsCtrl', ['$scope', 'MonthsDataFactory', 'ReportCharts',
            function MonthsCtrl($scope, MonthsDataFactory, ReportCharts) {
                // change active nav pill
                mooredatabaseCustom.setNavPill();
                // use the same data to draw the table and the chart
                MonthsDataFactory.getData()
                    .then(function(data) {
                        if (data.errors) {
                            $scope.error = data.errors[0];
                        } else {
                            $scope.months = data;
                            ReportCharts.drawChartSpeciesByMonth($scope.months, 'chart_div');
                        }
                    });
                // initial sort and method to change it
                $scope.predicate = 'monthNumber';
                $scope.sortResults = function(predicate) {
                    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                    $scope.predicate = predicate;
                };
            }
        ])
        .controller('SpeciesCtrl', ['$scope', 'SpeciesDataFactory',
            function SpeciesCtrl($scope, SpeciesDataFactory) {
                // change active nav pill
                mooredatabaseCustom.setNavPill();
                SpeciesDataFactory.getData()
                    .then(function(data) {
                        if (data.errors) {
                            $scope.error = data.errors[0];
                        } else {
                            $scope.birds = data;
                        }
                    });
                // initial sort and method to change it
                $scope.predicate = 'common_name';
                $scope.sortResults = function(predicate) {
                    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                    $scope.predicate = predicate;
                };
            }
        ])
        .controller('YearsCtrl', ['$scope', 'YearsDataFactory', 'ReportCharts',
            function YearsCtrl($scope, YearsDataFactory, ReportCharts) {
                // change active nav pill
                mooredatabaseCustom.setNavPill();
                // use the same data to draw the table and the chart
                YearsDataFactory.getData()
                    .then(function(data) {
                        if (data.errors) {
                            $scope.error = data.errors[0];
                        } else {
                            $scope.years = data;
                            ReportCharts.drawChartSpeciesByYear($scope.years, 'chart_div');
                        }
                    });
                // initial sort and method to change it
                $scope.predicate = 'yearNumber';
                $scope.sortResults = function(predicate) {
                    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                    $scope.predicate = predicate;
                };
            }
        ])
        .controller('DetailCtrl', ['$scope', '$routeParams', 'DetailDataFactory', 'DetailMonthsDataFactory', 'ReportCharts',
            function DetailCtrl($scope, $routeParams, DetailDataFactory, DetailMonthsDataFactory, ReportCharts) {
                // change active nav pill
                mooredatabaseCustom.setNavPill();
                $scope.id = $routeParams.id;
                $scope.goBack = function() {
                    window.history.back();
                };
                DetailDataFactory.getData($scope.id)
                    .then(function(data) {
                        if (data.errors) {
                            $scope.error = data.errors[0];
                        } else {
                            $scope.bird = data[0];
                        }
                    });
                DetailMonthsDataFactory.getData($scope.id)
                    .then(function(data) {
                        if (data.errors) {
                            $scope.error = data.errors[0];
                        } else {
                            ReportCharts.drawChartMonthsForSpecies(data, 'chart_div');
                        }
                    });
            }
        ]);
})();
