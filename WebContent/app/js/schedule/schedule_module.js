'use strict';

/* Module for Schedule */

var scheduleModule = angular.module('schedule.module', ['myApp']);

/**
 * Module for schedule
 */
scheduleModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/schedule',    {templateUrl: 'partials/schedule/schedule_list.html', controller: 'ScheduleCtrl'});
    $routeProvider.when('/schedule/new', {templateUrl: 'partials/schedule/schedule_form.html', controller: 'ScheduleCtrl'});
    $routeProvider.when('/schedule/:id', {templateUrl: 'partials/schedule/schedule_form.html', controller: 'ScheduleCtrl'});
}]);
