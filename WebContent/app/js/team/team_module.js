'use strict';

/* Module for Team */

var teamModule = angular.module('team.module', ['myApp']);

/**
 * Module for team
 */
teamModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/team',    {templateUrl: 'partials/team/team_list.html', controller: 'TeamCtrl'});
    $routeProvider.when('/team/new', {templateUrl: 'partials/team/team_form.html', controller: 'TeamCtrl'});
    $routeProvider.when('/team/:id', {templateUrl: 'partials/team/team_form.html', controller: 'TeamCtrl'});
}]);
