'use strict';

/* Module for Division */

var divisionModule = angular.module('division.module', ['myApp']);

/**
 * Module for division
 */
divisionModule.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('division', {
    url: '/division',
    templateUrl: 'partials/division/division_list.html',
    controller: 'DivisionCtrl'
  })
  .state('divisionSetup', {
    url: '/divisionSetup',
    templateUrl: 'partials/division/division_form.html',
    controller: 'DivisionCtrl'
  })
  .state('divisionDetails', {
    url: '/divisionDetails/:id',
    templateUrl: 'partials/division/division_form.html',
    controller: 'DivisionCtrl'
  });
}]);
