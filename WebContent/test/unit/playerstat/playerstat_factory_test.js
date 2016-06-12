'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('playerStat.module'));
  
  describe('PlayerStat', function(){
	var $httpBackend, PlayerStat, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	PlayerStat = $injector.get('PlayerStat');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/playerStat').respond("test");
    	PlayerStat.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/playerStat').respond("test");
    	PlayerStat.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/playerStat/1').respond("test");
    	PlayerStat.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		PlayerStat.create({id:null,name:'playerStat'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('playerStat.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/playerStat').respond("test");
    	PlayerStat.create({id:'1',name:'playerStat'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		PlayerStat.update({id:null,name:'playerStat'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('playerStat.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/playerStat/1').respond("test");
    	PlayerStat.update({id:'1',name:'playerStat'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/playerStat/1').respond("test");
    	PlayerStat.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});