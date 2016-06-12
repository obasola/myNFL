'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('teamStat.module'));
  
  describe('TeamStatCtrl', function(){
    var TeamStatCtrl, TeamStat, Team, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// TeamStat service
    	TeamStat = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'teamStat1'});
    			return deferred.promise;
    		}
    	};
		
				Team = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TeamStatCtrl = $controller('TeamStatCtrl', {
    		'TeamStat': TeamStat,
						'Team': Team,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.teamStat).toBeNull();
    	expect($scope.teamStats).toBe('teamStat1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTeamStatList', function() {
    	// given
    	TeamStat.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'teamStat2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTeamStatList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.teamStats).toBe('teamStat2');
    });
    
    it('refreshTeamStat', function() {
    	// given
    	TeamStat.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'teamStat'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTeamStat('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.teamStat).toBe('teamStat'+'1');
    });
    
	it('goToTeamStatList', function() {
    	// given
    	spyOn($scope, "refreshTeamStatList");
    	
    	// when
    	$scope.goToTeamStatList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTeamStatList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/teamStat');
    });
    
    it('goToTeamStat', function() {
    	// given
    	spyOn($scope, "refreshTeamStat");
    	var id = 1;
    	
    	// when
    	$scope.goToTeamStat(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTeamStat).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/teamStat'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.teamStat = {id:'1', name:'teamStat'};
    	
    	$scope.mode = 'create';
    	TeamStat.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'teamStatSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.teamStat).toBe('teamStatSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.teamStat = {id:'1', name:'teamStat'};
    	
    	$scope.mode = 'update';
    	TeamStat.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'teamStatSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.teamStat).toBe('teamStatSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TeamStat.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTeamStatList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTeamStatList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : teamStat create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/teamStat/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.teamStat).toBeNull();
    	expect($scope.teamStats).toBe('teamStat1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});