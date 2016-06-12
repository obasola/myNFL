'use strict';

/* Module for DraftType */

var draftTypeModule = angular.module('draftType.module', ['myApp']);

/**
 * Module for draftType
 */
draftTypeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/draftType',    {templateUrl: 'partials/drafttype/drafttype_list.html', controller: 'DraftTypeCtrl'});
    $routeProvider.when('/draftType/new', {templateUrl: 'partials/drafttype/drafttype_form.html', controller: 'DraftTypeCtrl'});
    $routeProvider.when('/draftType/:id', {templateUrl: 'partials/drafttype/drafttype_form.html', controller: 'DraftTypeCtrl'});
}]);
