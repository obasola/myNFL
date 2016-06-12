'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('playerStatus.module'));
  
  describe('PlayerStatus', function(){
	var $httpBackend, PlayerStatus, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	PlayerStatus = $injector.get('PlayerStatus');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/playerStatus').respond("test");
    	PlayerStatus.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/playerStatus').respond("test");
    	PlayerStatus.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/playerStatus/1/2').respond("test");
    	PlayerStatus.get('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		PlayerStatus.create({id:null, statusId:null,name:'playerStatus'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('playerStatus.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/playerStatus').respond("test");
    	PlayerStatus.create({id:'1', statusId:'2',name:'playerStatus'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		PlayerStatus.update({id:null, statusId:null,name:'playerStatus'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('playerStatus.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/playerStatus/1/2').respond("test");
    	PlayerStatus.update({id:'1', statusId:'2',name:'playerStatus'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/playerStatus/1/2').respond("test");
    	PlayerStatus.delete('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});