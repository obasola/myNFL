'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('draft.module'));
  
  describe('DraftCtrl', function(){
    var DraftCtrl, Draft, DraftType, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Draft service
    	Draft = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'draft1'});
    			return deferred.promise;
    		}
    	};
		
				DraftType = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				DraftCtrl = $controller('DraftCtrl', {
    		'Draft': Draft,
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
    	expect($scope.draft).toBeNull();
    	expect($scope.drafts).toBe('draft1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshDraftList', function() {
    	// given
    	Draft.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draft2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDraftList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.drafts).toBe('draft2');
    });
    
    it('refreshDraft', function() {
    	// given
    	Draft.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'draft'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDraft('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.draft).toBe('draft'+'1');
    });
    
	it('goToDraftList', function() {
    	// given
    	spyOn($scope, "refreshDraftList");
    	
    	// when
    	$scope.goToDraftList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDraftList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/draft');
    });
    
    it('goToDraft', function() {
    	// given
    	spyOn($scope, "refreshDraft");
    	var id = 1;
    	
    	// when
    	$scope.goToDraft(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDraft).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/draft'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.draft = {id:'1', name:'draft'};
    	
    	$scope.mode = 'create';
    	Draft.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.draft).toBe('draftSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.draft = {id:'1', name:'draft'};
    	
    	$scope.mode = 'update';
    	Draft.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'draftSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.draft).toBe('draftSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Draft.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToDraftList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToDraftList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : draft create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/draft/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.draft).toBeNull();
    	expect($scope.drafts).toBe('draft1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});