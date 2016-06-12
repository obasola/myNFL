'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('conference.module'));
  
  describe('ConferenceCtrl', function(){
    var ConferenceCtrl, Conference,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Conference service
    	Conference = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'conference1'});
    			return deferred.promise;
    		}
    	};
		
				ConferenceCtrl = $controller('ConferenceCtrl', {
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
    	expect($scope.conference).toBeNull();
    	expect($scope.conferences).toBe('conference1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshConferenceList', function() {
    	// given
    	Conference.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'conference2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshConferenceList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.conferences).toBe('conference2');
    });
    
    it('refreshConference', function() {
    	// given
    	Conference.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'conference'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshConference('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.conference).toBe('conference'+'1');
    });
    
	it('goToConferenceList', function() {
    	// given
    	spyOn($scope, "refreshConferenceList");
    	
    	// when
    	$scope.goToConferenceList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshConferenceList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/conference');
    });
    
    it('goToConference', function() {
    	// given
    	spyOn($scope, "refreshConference");
    	var id = 1;
    	
    	// when
    	$scope.goToConference(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshConference).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/conference'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.conference = {id:'1', name:'conference'};
    	
    	$scope.mode = 'create';
    	Conference.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'conferenceSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.conference).toBe('conferenceSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.conference = {id:'1', name:'conference'};
    	
    	$scope.mode = 'update';
    	Conference.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'conferenceSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.conference).toBe('conferenceSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Conference.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToConferenceList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToConferenceList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : conference create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/conference/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.conference).toBeNull();
    	expect($scope.conferences).toBe('conference1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});