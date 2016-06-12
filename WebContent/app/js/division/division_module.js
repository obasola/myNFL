'use strict';

/* Module for Division */

var divisionModule = angular.module('division.module', ['myApp']);

/**
 * Module for division
 */
divisionModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/division',    {templateUrl: 'partials/division/division_list.html', controller: 'DivisionCtrl'});
    $routeProvider.when('/division/new', {templateUrl: 'partials/division/division_form.html', controller: 'DivisionCtrl'});
    $routeProvider.when('/division/:id', {templateUrl: 'partials/division/division_form.html', controller: 'DivisionCtrl'});
}]);
