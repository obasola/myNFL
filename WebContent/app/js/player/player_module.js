'use strict';

/* Module for Player */

var playerModule = angular.module('player.module', ['myApp']);

/**
 * Module for player
 */
playerModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/player',    {templateUrl: 'partials/player/player_list.html', controller: 'PlayerCtrl'});
    $routeProvider.when('/player/new', {templateUrl: 'partials/player/player_form.html', controller: 'PlayerCtrl'});
    $routeProvider.when('/player/:id', {templateUrl: 'partials/player/player_form.html', controller: 'PlayerCtrl'});
}]);
