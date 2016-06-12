'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('draftTeam.module'));
  
  describe('DraftTeam', function(){
	var $httpBackend, DraftTeam, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	DraftTeam = $injector.get('DraftTeam');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/draftTeam').respond("test");
    	DraftTeam.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/draftTeam').respond("test");
    	DraftTeam.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/draftTeam/1').respond("test");
    	DraftTeam.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		DraftTeam.create({id:null,name:'draftTeam'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('draftTeam.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/draftTeam').respond("test");
    	DraftTeam.create({id:'1',name:'draftTeam'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		DraftTeam.update({id:null,name:'draftTeam'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('draftTeam.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/draftTeam/1').respond("test");
    	DraftTeam.update({id:'1',name:'draftTeam'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/draftTeam/1').respond("test");
    	DraftTeam.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});