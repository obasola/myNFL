'use strict';

/* Module for PlayerStat */

var playerStatModule = angular.module('playerStat.module', ['myApp']);

/**
 * Module for playerStat
 */
playerStatModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/playerStat',    {templateUrl: 'partials/playerstat/playerstat_list.html', controller: 'PlayerStatCtrl'});
    $routeProvider.when('/playerStat/new', {templateUrl: 'partials/playerstat/playerstat_form.html', controller: 'PlayerStatCtrl'});
    $routeProvider.when('/playerStat/:id', {templateUrl: 'partials/playerstat/playerstat_form.html', controller: 'PlayerStatCtrl'});
}]);
