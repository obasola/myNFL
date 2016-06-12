'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('scheduleType.module'));
  
  describe('ScheduleTypeCtrl', function(){
    var ScheduleTypeCtrl, ScheduleType,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// ScheduleType service
    	ScheduleType = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'scheduleType1'});
    			return deferred.promise;
    		}
    	};
		
				ScheduleTypeCtrl = $controller('ScheduleTypeCtrl', {
    		'ScheduleType': ScheduleType,
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
    	expect($scope.scheduleType).toBeNull();
    	expect($scope.scheduleTypes).toBe('scheduleType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshScheduleTypeList', function() {
    	// given
    	ScheduleType.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'scheduleType2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshScheduleTypeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.scheduleTypes).toBe('scheduleType2');
    });
    
    it('refreshScheduleType', function() {
    	// given
    	ScheduleType.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'scheduleType'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshScheduleType('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.scheduleType).toBe('scheduleType'+'1');
    });
    
	it('goToScheduleTypeList', function() {
    	// given
    	spyOn($scope, "refreshScheduleTypeList");
    	
    	// when
    	$scope.goToScheduleTypeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshScheduleTypeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/scheduleType');
    });
    
    it('goToScheduleType', function() {
    	// given
    	spyOn($scope, "refreshScheduleType");
    	var id = 1;
    	
    	// when
    	$scope.goToScheduleType(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshScheduleType).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/scheduleType'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.scheduleType = {id:'1', name:'scheduleType'};
    	
    	$scope.mode = 'create';
    	ScheduleType.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'scheduleTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.scheduleType).toBe('scheduleTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.scheduleType = {id:'1', name:'scheduleType'};
    	
    	$scope.mode = 'update';
    	ScheduleType.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'scheduleTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.scheduleType).toBe('scheduleTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	ScheduleType.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToScheduleTypeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToScheduleTypeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : scheduleType create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/scheduleType/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.scheduleType).toBeNull();
    	expect($scope.scheduleTypes).toBe('scheduleType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});