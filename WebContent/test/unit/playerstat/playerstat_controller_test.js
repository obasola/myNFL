'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('playerStat.module'));
  
  describe('PlayerStatCtrl', function(){
    var PlayerStatCtrl, PlayerStat, Player, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// PlayerStat service
    	PlayerStat = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'playerStat1'});
    			return deferred.promise;
    		}
    	};
		
				Player = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				PlayerStatCtrl = $controller('PlayerStatCtrl', {
    		'PlayerStat': PlayerStat,
						'Player': Player,
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
    	expect($scope.playerStat).toBeNull();
    	expect($scope.playerStats).toBe('playerStat1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPlayerStatList', function() {
    	// given
    	PlayerStat.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerStat2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPlayerStatList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.playerStats).toBe('playerStat2');
    });
    
    it('refreshPlayerStat', function() {
    	// given
    	PlayerStat.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'playerStat'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPlayerStat('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.playerStat).toBe('playerStat'+'1');
    });
    
	it('goToPlayerStatList', function() {
    	// given
    	spyOn($scope, "refreshPlayerStatList");
    	
    	// when
    	$scope.goToPlayerStatList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPlayerStatList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/playerStat');
    });
    
    it('goToPlayerStat', function() {
    	// given
    	spyOn($scope, "refreshPlayerStat");
    	var id = 1;
    	
    	// when
    	$scope.goToPlayerStat(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPlayerStat).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/playerStat'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.playerStat = {id:'1', name:'playerStat'};
    	
    	$scope.mode = 'create';
    	PlayerStat.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerStatSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.playerStat).toBe('playerStatSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.playerStat = {id:'1', name:'playerStat'};
    	
    	$scope.mode = 'update';
    	PlayerStat.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerStatSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.playerStat).toBe('playerStatSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	PlayerStat.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPlayerStatList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPlayerStatList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : playerStat create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/playerStat/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.playerStat).toBeNull();
    	expect($scope.playerStats).toBe('playerStat1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});