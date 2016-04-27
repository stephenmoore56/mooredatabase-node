(function() {
    'use strict';
    // services for AJAX/JSON data
    myApp.factory('MonthsDataFactory', ['$http', function($http) {
            return {
                getData: function() {
                    return $http.get("/birding/monthsjson")
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        }])
        .factory('OrdersDataFactory', ['$http', function($http) {
            return {
                getData: function() {
                    return $http.get("/birding/ordersjson")
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        }])
        .factory('SpeciesDataFactory', ['$http', function($http) {
            return {
                getData: function() {
                    return $http.get("/birding/speciesjson")
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        }])
        .factory('YearsDataFactory', ['$http', function($http) {
            return {
                getData: function() {
                    return $http.get("/birding/yearsjson")
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        }])
        .factory('DetailDataFactory', ['$http', function($http) {
            return {
                getData: function(id) {
                    return $http.get("/birding/detailjson/" + id)
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        }])
        .factory('DetailMonthsDataFactory', ['$http', function($http) {
            return {
                getData: function(id) {
                    return $http.get("/birding/detailmonthsjson/" + id)
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        }]);
})();
