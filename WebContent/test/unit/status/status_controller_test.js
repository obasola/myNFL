'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('status.module'));
  
  describe('StatusCtrl', function(){
    var StatusCtrl, Status,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Status service
    	Status = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'status1'});
    			return deferred.promise;
    		}
    	};
		
				StatusCtrl = $controller('StatusCtrl', {
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
    	expect($scope.status).toBeNull();
    	expect($scope.statuss).toBe('status1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshStatusList', function() {
    	// given
    	Status.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'status2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshStatusList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.statuss).toBe('status2');
    });
    
    it('refreshStatus', function() {
    	// given
    	Status.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'status'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshStatus('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.status).toBe('status'+'1');
    });
    
	it('goToStatusList', function() {
    	// given
    	spyOn($scope, "refreshStatusList");
    	
    	// when
    	$scope.goToStatusList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshStatusList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/status');
    });
    
    it('goToStatus', function() {
    	// given
    	spyOn($scope, "refreshStatus");
    	var id = 1;
    	
    	// when
    	$scope.goToStatus(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshStatus).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/status'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.status = {id:'1', name:'status'};
    	
    	$scope.mode = 'create';
    	Status.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'statusSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.status).toBe('statusSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.status = {id:'1', name:'status'};
    	
    	$scope.mode = 'update';
    	Status.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'statusSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.status).toBe('statusSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Status.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToStatusList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToStatusList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : status create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/status/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.status).toBeNull();
    	expect($scope.statuss).toBe('status1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});