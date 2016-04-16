// create app
var myApp = angular.module('myApp', ['ngRoute']);

// routing for static pages (SPA)
myApp.config(['$routeProvider',
    function($routeProvider) {
        'use strict';
        $routeProvider.when('', {
                templateUrl: '/templates/nodejs.html'
            })
            .when('/nodejs', {
                templateUrl: '/templates/nodejs.html'
            })
            .when('/angularjs', {
                templateUrl: '/templates/angularjs.html'
            })
            .when('/bootstrap', {
                templateUrl: '/templates/bootstrap.html'
            })
            .when('/birding', {
                templateUrl: '/templates/orders.html'
            })
            .when('/orders', {
                templateUrl: '/templates/orders.html'
            })
            .when('/months', {
                templateUrl: '/templates/months.html'
            })
            .when('/years', {
                templateUrl: '/templates/years.html'
            })
            .when('/species', {
                templateUrl: '/templates/species.html'
            })
            .when('/detail/:id', {
                templateUrl: '/templates/detail.html'
            })
            .otherwise({
                redirectTo: '/nodejs'
            });
    }
]);