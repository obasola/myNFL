'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('playerPosition.module'));
  
  describe('PlayerPositionCtrl', function(){
    var PlayerPositionCtrl, PlayerPosition,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// PlayerPosition service
    	PlayerPosition = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'playerPosition1'});
    			return deferred.promise;
    		}
    	};
		
				PlayerPositionCtrl = $controller('PlayerPositionCtrl', {
    		'PlayerPosition': PlayerPosition,
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
    	expect($scope.playerPosition).toBeNull();
    	expect($scope.playerPositions).toBe('playerPosition1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPlayerPositionList', function() {
    	// given
    	PlayerPosition.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerPosition2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPlayerPositionList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.playerPositions).toBe('playerPosition2');
    });
    
    it('refreshPlayerPosition', function() {
    	// given
    	PlayerPosition.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'playerPosition'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPlayerPosition('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.playerPosition).toBe('playerPosition'+'1');
    });
    
	it('goToPlayerPositionList', function() {
    	// given
    	spyOn($scope, "refreshPlayerPositionList");
    	
    	// when
    	$scope.goToPlayerPositionList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPlayerPositionList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/playerPosition');
    });
    
    it('goToPlayerPosition', function() {
    	// given
    	spyOn($scope, "refreshPlayerPosition");
    	var id = 1;
    	
    	// when
    	$scope.goToPlayerPosition(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPlayerPosition).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/playerPosition'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.playerPosition = {id:'1', name:'playerPosition'};
    	
    	$scope.mode = 'create';
    	PlayerPosition.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerPositionSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.playerPosition).toBe('playerPositionSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.playerPosition = {id:'1', name:'playerPosition'};
    	
    	$scope.mode = 'update';
    	PlayerPosition.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerPositionSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.playerPosition).toBe('playerPositionSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	PlayerPosition.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPlayerPositionList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPlayerPositionList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : playerPosition create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/playerPosition/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.playerPosition).toBeNull();
    	expect($scope.playerPositions).toBe('playerPosition1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});