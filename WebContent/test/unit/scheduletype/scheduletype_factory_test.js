'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('scheduleType.module'));
  
  describe('ScheduleType', function(){
	var $httpBackend, ScheduleType, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	ScheduleType = $injector.get('ScheduleType');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/scheduleType').respond("test");
    	ScheduleType.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/scheduleType').respond("test");
    	ScheduleType.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/scheduleType/1').respond("test");
    	ScheduleType.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		ScheduleType.create({id:null,name:'scheduleType'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('scheduleType.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/scheduleType').respond("test");
    	ScheduleType.create({id:'1',name:'scheduleType'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		ScheduleType.update({id:null,name:'scheduleType'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('scheduleType.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/scheduleType/1').respond("test");
    	ScheduleType.update({id:'1',name:'scheduleType'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/scheduleType/1').respond("test");
    	ScheduleType.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});