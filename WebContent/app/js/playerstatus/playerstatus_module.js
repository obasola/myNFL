'use strict';

/* Module for PlayerStatus */

var playerStatusModule = angular.module('playerStatus.module', ['myApp']);

/**
 * Module for playerStatus
 */
playerStatusModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/playerStatus',    {templateUrl: 'partials/playerstatus/playerstatus_list.html', controller: 'PlayerStatusCtrl'});
    $routeProvider.when('/playerStatus/new', {templateUrl: 'partials/playerstatus/playerstatus_form.html', controller: 'PlayerStatusCtrl'});
    $routeProvider.when('/playerStatus/:id/:statusId', {templateUrl: 'partials/playerstatus/playerstatus_form.html', controller: 'PlayerStatusCtrl'});
}]);
