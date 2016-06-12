'use strict';

/* Module for Status */

var statusModule = angular.module('status.module', ['myApp']);

/**
 * Module for status
 */
statusModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/status',    {templateUrl: 'partials/status/status_list.html', controller: 'StatusCtrl'});
    $routeProvider.when('/status/new', {templateUrl: 'partials/status/status_form.html', controller: 'StatusCtrl'});
    $routeProvider.when('/status/:id', {templateUrl: 'partials/status/status_form.html', controller: 'StatusCtrl'});
}]);
