'use strict';

/* Module for Player */

var playerModule = angular.module('player.module', ['myApp']);

/**
 * Module for player
 */
divisionModule.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('player', {
    url: '/player',
    templateUrl: 'partials/player/player_list.html',
    controller: 'PlayerCtrl'
  })
  .state('playerSetup', {
    url: '/playerSetup',
    templateUrl: 'partials/player/player_form.html',
    controller: 'PlayerCtrl'
  })
  .state('playerDetails', {
    url: '/playerDetails/:id',
    templateUrl: 'partials/player/player_form.html',
    controller: 'PlayerCtrl'
  });
}]);
