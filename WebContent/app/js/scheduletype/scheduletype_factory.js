'use strict';

/**
 * Factory for ScheduleType
 */
scheduleTypeModule.factory('ScheduleType', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage scheduleType
    var entityURL = restURL + '/scheduleType';
	
	/**
     * Validate scheduleType
     * @param scheduleType scheduleType
     * @throws validation exception
     */
	var validate = function (scheduleType) {
		var errors = [];
        if( scheduleType.id == null || scheduleType.id == '' ) {
			errors.push('scheduleType.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all scheduleTypes as list items
         * @return all scheduleTypes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/scheduleType');
    	},

        /**
         * Get all scheduleTypes
         * @return all scheduleTypes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get scheduleType
         * @param id id
         * @return scheduleType
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new scheduleType
         * @param scheduleType scheduleType
         * @return scheduleType saved
         */
		create: function(scheduleType) {
			validate(scheduleType)
			var url = entityURL;
			return $http.post(url, scheduleType);
    	},

        /**
         * Update scheduleType
         * @param scheduleType scheduleType
         * @return scheduleType saved
         */
    	update: function(scheduleType) {
			validate(scheduleType)
			var url = entityURL + '/' + scheduleType.id;
			return $http.put(url, scheduleType);
    	},

		/**
         * Delete scheduleType
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

