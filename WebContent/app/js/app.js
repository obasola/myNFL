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
  ,'ui.router'
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
myApp.controller('appController',['$scope', '$state', function($scope,$state) {
  $scope.showHomePage = function() {
    $state.go('home');
  };
  $scope.showTeamHomePage = function(teamName) {

    $state.go('team');
  };
  $scope.showConference= function() {

	    $state.go('conference');
	  };
  $scope.showProspects = function(teamName) {

    $state.go('player');
  };
  $scope.showMockRound = function(roundNumber) {

    $state.go('draftRound');
  };
  $scope.showDraftRound = function(roundNumber) {
    $state.go('draftRound');
  };
}]);
/**
 * Main configuration
 */
myApp.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home',{
    url:'/'
  })


  .state('draft', {
    url: '/draft',
    templateUrl: 'partials/draft/draft_list.html'
  })
  .state('draftRound', {
    url: '/draftRound',
    templateUrl: 'partials/draftround/draftround_list.html'
  })
  .state('draftTeam', {
    url: '/draftTeam',
    templateUrl: 'partials/draftteam/draftteam_list.html'
  })
  .state('draftType', {
    url: '/draftType',
    templateUrl: 'partials/drafttype/drafttype_list.html'
  })


  .state('playerPosition', {
    url: '/playerPosition',
    templateUrl: 'partials/playerposition/playerposition_list.html'
  })
  .state('playerStat', {
    url: '/playerStat',
    templateUrl: 'partials/playerstat/playerstat_list.html'
  })
  .state('playerStatus', {
    url: '/playerStatus',
    templateUrl: 'partials/playerstatus/playerstatus_list.html'
  })
  .state('schedule', {
    url:'/schedule',
    templateUrl:'partials/schedule/schedule_list.html'
  })
  .state('scheduleType', {
    url:'/scheduleType',
    templateUrl:'partials/scheduletype/scheduletype_list.html'
  })
  .state('status', {
    url:'/status',
    templateUrl:'partials/status/status_list.html'
  })
  .state('team', {
    url:'/team',
    templateUrl:'partials/team/team_list.html'
  })
  .state('teamStat', {
    url:'/teamStat',
    templateUrl:'partials/teamstat/teamstat_list.html'
  });
}]);
