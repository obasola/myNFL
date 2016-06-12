'use strict';

/* Module for DraftTeam */

var draftTeamModule = angular.module('draftTeam.module', ['myApp']);

/**
 * Module for draftTeam
 */
draftTeamModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/draftTeam',    {templateUrl: 'partials/draftteam/draftteam_list.html', controller: 'DraftTeamCtrl'});
    $routeProvider.when('/draftTeam/new', {templateUrl: 'partials/draftteam/draftteam_form.html', controller: 'DraftTeamCtrl'});
    $routeProvider.when('/draftTeam/:id', {templateUrl: 'partials/draftteam/draftteam_form.html', controller: 'DraftTeamCtrl'});
}]);
