'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('team.module'));
  
  describe('TeamCtrl', function(){
    var TeamCtrl, Team, Division, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Team service
    	Team = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'team1'});
    			return deferred.promise;
    		}
    	};
		
				Division = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TeamCtrl = $controller('TeamCtrl', {
    		'Team': Team,
						'Division': Division,
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
    	expect($scope.team).toBeNull();
    	expect($scope.teams).toBe('team1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTeamList', function() {
    	// given
    	Team.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'team2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTeamList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.teams).toBe('team2');
    });
    
    it('refreshTeam', function() {
    	// given
    	Team.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'team'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTeam('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.team).toBe('team'+'1');
    });
    
	it('goToTeamList', function() {
    	// given
    	spyOn($scope, "refreshTeamList");
    	
    	// when
    	$scope.goToTeamList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTeamList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/team');
    });
    
    it('goToTeam', function() {
    	// given
    	spyOn($scope, "refreshTeam");
    	var id = 1;
    	
    	// when
    	$scope.goToTeam(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTeam).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/team'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.team = {id:'1', name:'team'};
    	
    	$scope.mode = 'create';
    	Team.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'teamSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.team).toBe('teamSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.team = {id:'1', name:'team'};
    	
    	$scope.mode = 'update';
    	Team.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'teamSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.team).toBe('teamSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Team.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTeamList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTeamList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : team create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/team/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.team).toBeNull();
    	expect($scope.teams).toBe('team1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});