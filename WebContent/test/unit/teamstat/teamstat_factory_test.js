'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('teamStat.module'));
  
  describe('TeamStat', function(){
	var $httpBackend, TeamStat, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TeamStat = $injector.get('TeamStat');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/teamStat').respond("test");
    	TeamStat.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/teamStat').respond("test");
    	TeamStat.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/teamStat/1').respond("test");
    	TeamStat.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TeamStat.create({id:null,name:'teamStat'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('teamStat.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/teamStat').respond("test");
    	TeamStat.create({id:'1',name:'teamStat'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TeamStat.update({id:null,name:'teamStat'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('teamStat.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/teamStat/1').respond("test");
    	TeamStat.update({id:'1',name:'teamStat'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/teamStat/1').respond("test");
    	TeamStat.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});