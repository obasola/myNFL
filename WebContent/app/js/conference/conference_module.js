'use strict';

/* Module for Conference */

var conferenceModule = angular.module('conference.module', ['myApp']);

/**
 * Module for conference
 */

conferenceModule.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
	  $urlRouterProvider.otherwise('/');
	  $stateProvider
	  .state('conference', {
	    url: '/conference',
	    templateUrl: 'partials/conference/conference_list.html',
	    controller: 'ConferenceCtrl'
	  })
	   .state('conferenceDetails', {
	    url: '/conferenceDetails/:id',
	    templateUrl: 'partials/conference/conference_form.html',
	    controller: 'ConferenceCtrl'
	  })
	  .state('conferenceSetup', {
	    url: '/conferenceSetup',
	    templateUrl: 'partials/conference/conference_form.html',
	    controller: 'ConferenceCtrl'
	  })
}]);