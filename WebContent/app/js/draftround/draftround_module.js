'use strict';

/* Module for DraftRound */

var draftRoundModule = angular.module('draftRound.module', ['myApp']);

/**
 * Module for draftRound
 */
draftRoundModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/draftRound',    {templateUrl: 'partials/draftround/draftround_list.html', controller: 'DraftRoundCtrl'});
    $routeProvider.when('/draftRound/new', {templateUrl: 'partials/draftround/draftround_form.html', controller: 'DraftRoundCtrl'});
    $routeProvider.when('/draftRound/:id', {templateUrl: 'partials/draftround/draftround_form.html', controller: 'DraftRoundCtrl'});
}]);
