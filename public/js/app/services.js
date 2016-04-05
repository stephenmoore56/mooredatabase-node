(function() {
    'use strict';
    // services for AJAX/JSON data
    myApp.factory('MonthsDataFactory', function($http) {
            return {
                getData: function() {
                    return $http.get("/birding/monthsjson")
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        })
        .factory('OrdersDataFactory', function($http) {
            return {
                getData: function() {
                    return $http.get("/birding/ordersjson")
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        })
        .factory('SpeciesDataFactory', function($http) {
            return {
                getData: function() {
                    return $http.get("/birding/speciesjson")
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        })
        .factory('YearsDataFactory', function($http) {
            return {
                getData: function() {
                    return $http.get("/birding/yearsjson")
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        })
        .factory('DetailDataFactory', function($http) {
            return {
                getData: function(id) {
                    return $http.get("/birding/detailjson/" + id.toString())
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        })
        .factory('DetailMonthsDataFactory', function($http) {
            return {
                getData: function(id) {
                    return $http.get("/birding/detailmonthsjson/" + id.toString())
                        .then(function(response) {
                            return response.data;
                        });
                }
            };
        });
})();