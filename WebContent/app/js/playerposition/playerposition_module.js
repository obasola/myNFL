'use strict';

/* Module for PlayerPosition */

var playerPositionModule = angular.module('playerPosition.module', ['myApp']);

/**
 * Module for playerPosition
 */
playerPositionModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/playerPosition',    {templateUrl: 'partials/playerposition/playerposition_list.html', controller: 'PlayerPositionCtrl'});
    $routeProvider.when('/playerPosition/new', {templateUrl: 'partials/playerposition/playerposition_form.html', controller: 'PlayerPositionCtrl'});
    $routeProvider.when('/playerPosition/:id', {templateUrl: 'partials/playerposition/playerposition_form.html', controller: 'PlayerPositionCtrl'});
}]);
