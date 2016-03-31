(function () {
    'use strict';
    // services for AJAX/JSON data
    myApp.factory('MonthsDataFactory', function ($http) {
        return {
            getData: function () {
                return $http.get("/birding/monthsjson").then(function (response) {
                    return response.data;
                });
            }
        };
    }).factory('OrdersDataFactory', function ($http) {
        return {
            getData: function () {
                return $http.get("/birding/ordersjson").then(function (response) {
                    return response.data;
                });
            }
        };
    }).factory('SpeciesDataFactory', function ($http) {
        return {
            getData: function () {
                return $http.get("/birding/speciesjson").then(function (response) {
                    return response.data;
                });
            }
        };
    }).factory('YearsDataFactory', function ($http) {
        return {
            getData: function () {
                return $http.get("/birding/yearsjson").then(function (response) {
                    return response.data;
                });
            }
        };
    });
})();
