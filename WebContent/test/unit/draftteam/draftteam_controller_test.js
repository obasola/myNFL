'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('draftTeam.module'));
  
  describe('DraftTeamCtrl', function(){
    var DraftTeamCtrl, DraftTeam, Draft, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// DraftTeam service
    	DraftTeam = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'draftTeam1'});
    			return deferred.promise;
    		}
    	};
		
				Draft = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				DraftTeamCtrl = $controller('DraftTeamCtrl', {
    		'DraftTeam': DraftTeam,
						'Draft': Draft,
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
    	expect($scope.draftTeam).toBeNull();
    	expect($scope.draftTeams).toBe('draftTeam1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshDraftTeamList', function() {
    	// given
    	DraftTeam.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftTeam2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDraftTeamList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.draftTeams).toBe('draftTeam2');
    });
    
    it('refreshDraftTeam', function() {
    	// given
    	DraftTeam.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'draftTeam'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDraftTeam('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.draftTeam).toBe('draftTeam'+'1');
    });
    
	it('goToDraftTeamList', function() {
    	// given
    	spyOn($scope, "refreshDraftTeamList");
    	
    	// when
    	$scope.goToDraftTeamList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDraftTeamList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/draftTeam');
    });
    
    it('goToDraftTeam', function() {
    	// given
    	spyOn($scope, "refreshDraftTeam");
    	var id = 1;
    	
    	// when
    	$scope.goToDraftTeam(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDraftTeam).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/draftTeam'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.draftTeam = {id:'1', name:'draftTeam'};
    	
    	$scope.mode = 'create';
    	DraftTeam.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftTeamSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.draftTeam).toBe('draftTeamSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.draftTeam = {id:'1', name:'draftTeam'};
    	
    	$scope.mode = 'update';
    	DraftTeam.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftTeamSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.draftTeam).toBe('draftTeamSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	DraftTeam.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToDraftTeamList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToDraftTeamList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : draftTeam create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/draftTeam/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.draftTeam).toBeNull();
    	expect($scope.draftTeams).toBe('draftTeam1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});