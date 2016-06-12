'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('division.module'));
  
  describe('DivisionCtrl', function(){
    var DivisionCtrl, Division, Conference, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Division service
    	Division = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'division1'});
    			return deferred.promise;
    		}
    	};
		
				Conference = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				DivisionCtrl = $controller('DivisionCtrl', {
    		'Division': Division,
						'Conference': Conference,
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
    	expect($scope.division).toBeNull();
    	expect($scope.divisions).toBe('division1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshDivisionList', function() {
    	// given
    	Division.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'division2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDivisionList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.divisions).toBe('division2');
    });
    
    it('refreshDivision', function() {
    	// given
    	Division.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'division'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDivision('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.division).toBe('division'+'1');
    });
    
	it('goToDivisionList', function() {
    	// given
    	spyOn($scope, "refreshDivisionList");
    	
    	// when
    	$scope.goToDivisionList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDivisionList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/division');
    });
    
    it('goToDivision', function() {
    	// given
    	spyOn($scope, "refreshDivision");
    	var id = 1;
    	
    	// when
    	$scope.goToDivision(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDivision).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/division'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.division = {id:'1', name:'division'};
    	
    	$scope.mode = 'create';
    	Division.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'divisionSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.division).toBe('divisionSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.division = {id:'1', name:'division'};
    	
    	$scope.mode = 'update';
    	Division.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'divisionSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.division).toBe('divisionSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Division.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToDivisionList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToDivisionList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : division create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/division/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.division).toBeNull();
    	expect($scope.divisions).toBe('division1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});