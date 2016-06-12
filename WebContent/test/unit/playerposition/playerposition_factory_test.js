'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('playerPosition.module'));
  
  describe('PlayerPosition', function(){
	var $httpBackend, PlayerPosition, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	PlayerPosition = $injector.get('PlayerPosition');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/playerPosition').respond("test");
    	PlayerPosition.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/playerPosition').respond("test");
    	PlayerPosition.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/playerPosition/1').respond("test");
    	PlayerPosition.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		PlayerPosition.create({id:null,name:'playerPosition'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('playerPosition.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/playerPosition').respond("test");
    	PlayerPosition.create({id:'1',name:'playerPosition'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		PlayerPosition.update({id:null,name:'playerPosition'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('playerPosition.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/playerPosition/1').respond("test");
    	PlayerPosition.update({id:'1',name:'playerPosition'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/playerPosition/1').respond("test");
    	PlayerPosition.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});