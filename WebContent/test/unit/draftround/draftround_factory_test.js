'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('draftRound.module'));
  
  describe('DraftRound', function(){
	var $httpBackend, DraftRound, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	DraftRound = $injector.get('DraftRound');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/draftRound').respond("test");
    	DraftRound.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/draftRound').respond("test");
    	DraftRound.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/draftRound/1').respond("test");
    	DraftRound.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		DraftRound.create({id:null,name:'draftRound'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('draftRound.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/draftRound').respond("test");
    	DraftRound.create({id:'1',name:'draftRound'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		DraftRound.update({id:null,name:'draftRound'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('draftRound.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/draftRound/1').respond("test");
    	DraftRound.update({id:'1',name:'draftRound'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/draftRound/1').respond("test");
    	DraftRound.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});