'use strict';

/* Module for TeamStat */

var teamStatModule = angular.module('teamStat.module', ['myApp']);

/**
 * Module for teamStat
 */
teamStatModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/teamStat',    {templateUrl: 'partials/teamstat/teamstat_list.html', controller: 'TeamStatCtrl'});
    $routeProvider.when('/teamStat/new', {templateUrl: 'partials/teamstat/teamstat_form.html', controller: 'TeamStatCtrl'});
    $routeProvider.when('/teamStat/:id', {templateUrl: 'partials/teamstat/teamstat_form.html', controller: 'TeamStatCtrl'});
}]);
