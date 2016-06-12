'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('draftRound.module'));
  
  describe('DraftRoundCtrl', function(){
    var DraftRoundCtrl, DraftRound, DraftTeam, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// DraftRound service
    	DraftRound = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'draftRound1'});
    			return deferred.promise;
    		}
    	};
		
				DraftTeam = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				DraftRoundCtrl = $controller('DraftRoundCtrl', {
    		'DraftRound': DraftRound,
						'DraftTeam': DraftTeam,
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
    	expect($scope.draftRound).toBeNull();
    	expect($scope.draftRounds).toBe('draftRound1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshDraftRoundList', function() {
    	// given
    	DraftRound.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftRound2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDraftRoundList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.draftRounds).toBe('draftRound2');
    });
    
    it('refreshDraftRound', function() {
    	// given
    	DraftRound.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'draftRound'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDraftRound('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.draftRound).toBe('draftRound'+'1');
    });
    
	it('goToDraftRoundList', function() {
    	// given
    	spyOn($scope, "refreshDraftRoundList");
    	
    	// when
    	$scope.goToDraftRoundList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDraftRoundList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/draftRound');
    });
    
    it('goToDraftRound', function() {
    	// given
    	spyOn($scope, "refreshDraftRound");
    	var id = 1;
    	
    	// when
    	$scope.goToDraftRound(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDraftRound).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/draftRound'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.draftRound = {id:'1', name:'draftRound'};
    	
    	$scope.mode = 'create';
    	DraftRound.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftRoundSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.draftRound).toBe('draftRoundSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.draftRound = {id:'1', name:'draftRound'};
    	
    	$scope.mode = 'update';
    	DraftRound.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftRoundSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.draftRound).toBe('draftRoundSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	DraftRound.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToDraftRoundList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToDraftRoundList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : draftRound create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/draftRound/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.draftRound).toBeNull();
    	expect($scope.draftRounds).toBe('draftRound1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});