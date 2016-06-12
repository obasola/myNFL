'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('schedule.module'));
  
  describe('ScheduleCtrl', function(){
    var ScheduleCtrl, Schedule, Team,  ScheduleType, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Schedule service
    	Schedule = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'schedule1'});
    			return deferred.promise;
    		}
    	};
		
				Team = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				ScheduleType = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				ScheduleCtrl = $controller('ScheduleCtrl', {
    		'Schedule': Schedule,
						'Team': Team,
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
    	expect($scope.schedule).toBeNull();
    	expect($scope.schedules).toBe('schedule1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshScheduleList', function() {
    	// given
    	Schedule.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'schedule2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshScheduleList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.schedules).toBe('schedule2');
    });
    
    it('refreshSchedule', function() {
    	// given
    	Schedule.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'schedule'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSchedule('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.schedule).toBe('schedule'+'1');
    });
    
	it('goToScheduleList', function() {
    	// given
    	spyOn($scope, "refreshScheduleList");
    	
    	// when
    	$scope.goToScheduleList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshScheduleList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/schedule');
    });
    
    it('goToSchedule', function() {
    	// given
    	spyOn($scope, "refreshSchedule");
    	var id = 1;
    	
    	// when
    	$scope.goToSchedule(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSchedule).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/schedule'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.schedule = {id:'1', name:'schedule'};
    	
    	$scope.mode = 'create';
    	Schedule.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'scheduleSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.schedule).toBe('scheduleSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.schedule = {id:'1', name:'schedule'};
    	
    	$scope.mode = 'update';
    	Schedule.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'scheduleSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.schedule).toBe('scheduleSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Schedule.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToScheduleList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToScheduleList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : schedule create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/schedule/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.schedule).toBeNull();
    	expect($scope.schedules).toBe('schedule1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});