'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('draftType.module'));
  
  describe('DraftTypeCtrl', function(){
    var DraftTypeCtrl, DraftType,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// DraftType service
    	DraftType = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'draftType1'});
    			return deferred.promise;
    		}
    	};
		
				DraftTypeCtrl = $controller('DraftTypeCtrl', {
    		'DraftType': DraftType,
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
    	expect($scope.draftType).toBeNull();
    	expect($scope.draftTypes).toBe('draftType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshDraftTypeList', function() {
    	// given
    	DraftType.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftType2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDraftTypeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.draftTypes).toBe('draftType2');
    });
    
    it('refreshDraftType', function() {
    	// given
    	DraftType.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'draftType'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDraftType('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.draftType).toBe('draftType'+'1');
    });
    
	it('goToDraftTypeList', function() {
    	// given
    	spyOn($scope, "refreshDraftTypeList");
    	
    	// when
    	$scope.goToDraftTypeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDraftTypeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/draftType');
    });
    
    it('goToDraftType', function() {
    	// given
    	spyOn($scope, "refreshDraftType");
    	var id = 1;
    	
    	// when
    	$scope.goToDraftType(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDraftType).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/draftType'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.draftType = {id:'1', name:'draftType'};
    	
    	$scope.mode = 'create';
    	DraftType.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.draftType).toBe('draftTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.draftType = {id:'1', name:'draftType'};
    	
    	$scope.mode = 'update';
    	DraftType.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.draftType).toBe('draftTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	DraftType.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToDraftTypeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToDraftTypeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : draftType create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/draftType/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.draftType).toBeNull();
    	expect($scope.draftTypes).toBe('draftType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});