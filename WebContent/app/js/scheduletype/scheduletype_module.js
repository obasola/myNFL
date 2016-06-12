'use strict';

/* Module for ScheduleType */

var scheduleTypeModule = angular.module('scheduleType.module', ['myApp']);

/**
 * Module for scheduleType
 */
scheduleTypeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/scheduleType',    {templateUrl: 'partials/scheduletype/scheduletype_list.html', controller: 'ScheduleTypeCtrl'});
    $routeProvider.when('/scheduleType/new', {templateUrl: 'partials/scheduletype/scheduletype_form.html', controller: 'ScheduleTypeCtrl'});
    $routeProvider.when('/scheduleType/:id', {templateUrl: 'partials/scheduletype/scheduletype_form.html', controller: 'ScheduleTypeCtrl'});
}]);
