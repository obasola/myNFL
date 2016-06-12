'use strict';

/* Module for Draft */

var draftModule = angular.module('draft.module', ['myApp']);

/**
 * Module for draft
 */
draftModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/draft',    {templateUrl: 'partials/draft/draft_list.html', controller: 'DraftCtrl'});
    $routeProvider.when('/draft/new', {templateUrl: 'partials/draft/draft_form.html', controller: 'DraftCtrl'});
    $routeProvider.when('/draft/:id', {templateUrl: 'partials/draft/draft_form.html', controller: 'DraftCtrl'});
}]);
