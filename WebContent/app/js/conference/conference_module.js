'use strict';

/* Module for Conference */

var conferenceModule = angular.module('conference.module', ['myApp']);

/**
 * Module for conference
 */
conferenceModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/conference',    {templateUrl: 'partials/conference/conference_list.html', controller: 'ConferenceCtrl'});
    $routeProvider.when('/conference/new', {templateUrl: 'partials/conference/conference_form.html', controller: 'ConferenceCtrl'});
    $routeProvider.when('/conference/:id', {templateUrl: 'partials/conference/conference_form.html', controller: 'ConferenceCtrl'});
}]);
