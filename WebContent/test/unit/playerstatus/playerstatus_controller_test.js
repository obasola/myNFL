'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('playerStatus.module'));
  
  describe('PlayerStatusCtrl', function(){
    var PlayerStatusCtrl, PlayerStatus, Player,  Status, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// PlayerStatus service
    	PlayerStatus = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'playerStatus1'});
    			return deferred.promise;
    		}
    	};
		
				Player = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Status = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				PlayerStatusCtrl = $controller('PlayerStatusCtrl', {
    		'PlayerStatus': PlayerStatus,
						'Player': Player,
						'Status': Status,
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
    	expect($scope.playerStatus).toBeNull();
    	expect($scope.playerStatuss).toBe('playerStatus1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPlayerStatusList', function() {
    	// given
    	PlayerStatus.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerStatus2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPlayerStatusList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.playerStatuss).toBe('playerStatus2');
    });
    
    it('refreshPlayerStatus', function() {
    	// given
    	PlayerStatus.get = function(id, statusId) {
			var deferred = $q.defer();
			deferred.resolve({data:'playerStatus'+id+statusId});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPlayerStatus('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.playerStatus).toBe('playerStatus'+'1'+'2');
    });
    
	it('goToPlayerStatusList', function() {
    	// given
    	spyOn($scope, "refreshPlayerStatusList");
    	
    	// when
    	$scope.goToPlayerStatusList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPlayerStatusList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/playerStatus');
    });
    
    it('goToPlayerStatus', function() {
    	// given
    	spyOn($scope, "refreshPlayerStatus");
    	var id = 1;
    	var statusId = 2;
    	
    	// when
    	$scope.goToPlayerStatus(id, statusId);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPlayerStatus).toHaveBeenCalledWith(id, statusId);
    	expect($location.path).toHaveBeenCalledWith('/playerStatus'+'/'+id+'/'+statusId);
    });
    
    it('save : create', function() {
    	// given
    	$scope.playerStatus = {id:'1', statusId:'2', name:'playerStatus'};
    	
    	$scope.mode = 'create';
    	PlayerStatus.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerStatusSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.playerStatus).toBe('playerStatusSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.playerStatus = {id:'1', statusId:'2', name:'playerStatus'};
    	
    	$scope.mode = 'update';
    	PlayerStatus.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'playerStatusSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.playerStatus).toBe('playerStatusSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	PlayerStatus.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPlayerStatusList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPlayerStatusList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : playerStatus create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/playerStatus/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.playerStatus).toBeNull();
    	expect($scope.playerStatuss).toBe('playerStatus1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});