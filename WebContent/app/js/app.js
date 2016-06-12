'use strict';

// Add "endsWith" function to the String object
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
   'ngRoute'
  ,'ngResource' 
  ,'ngCookies'
  ,'ngMaterial'
  ,'i18n'
  ,'pascalprecht.translate'
  ,'tmh.dynamicLocale'
  ,'mgcrea.ngStrap.tooltip'
  ,'mgcrea.ngStrap.datepicker'
  ,'myApp.filters'
  ,'myApp.services'
  ,'myApp.directives'
  ,'messageHandler.module'
  ,'conference.module'
  ,'division.module'
  ,'draft.module'
  ,'draftRound.module'
  ,'draftTeam.module'
  ,'draftType.module'
  ,'player.module'
  ,'playerPosition.module'
  ,'playerStat.module'
  ,'playerStatus.module'
  ,'schedule.module'
  ,'scheduleType.module'
  ,'status.module'
  ,'team.module'
  ,'teamStat.module'
]);

/**
 * Main configuration
 */
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/welcome.html'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
