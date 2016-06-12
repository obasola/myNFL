'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('player.module'));
  
  describe('PlayerCtrl', function(){
    var PlayerCtrl, Player, PlayerPosition,  Team, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Player service
    	Player = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'player1'});
    			return deferred.promise;
    		}
    	};
		
				PlayerPosition = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Team = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				PlayerCtrl = $controller('PlayerCtrl', {
    		'Player': Player,
						'PlayerPosition': PlayerPosition,
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
    	expect($scope.player).toBeNull();
    	expect($scope.players).toBe('player1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPlayerList', function() {
    	// given
    	Player.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'player2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPlayerList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.players).toBe('player2');
    });
    
    it('refreshPlayer', function() {
    	// given
    	Player.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'player'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPlayer('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.player).toBe('player'+'1');
    });
    
	it('goToPlayerList', function() {
    	// given
    	spyOn($scope, "refreshPlayerList");
    	
    	// when
    	$scope.goToPlayerList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPlayerList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/player');
    });
    
    it('goToPlayer', function() {
    	// given
    	spyOn($scope, "refreshPlayer");
    	var id = 1;
    	
    	// when
    	$scope.goToPlayer(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPlayer).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/player'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.player = {id:'1', name:'player'};
    	
    	$scope.mode = 'create';
    	Player.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.player).toBe('playerSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.player = {id:'1', name:'player'};
    	
    	$scope.mode = 'update';
    	Player.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.player).toBe('playerSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Player.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPlayerList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPlayerList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : player create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/player/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.player).toBeNull();
    	expect($scope.players).toBe('player1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});