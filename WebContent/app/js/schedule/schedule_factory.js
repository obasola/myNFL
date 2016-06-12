'use strict';

/**
 * Factory for Schedule
 */
scheduleModule.factory('Schedule', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage schedule
    var entityURL = restURL + '/schedule';
	
	/**
     * Validate schedule
     * @param schedule schedule
     * @throws validation exception
     */
	var validate = function (schedule) {
		var errors = [];
        if( schedule.id == null || schedule.id == '' ) {
			errors.push('schedule.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all schedules as list items
         * @return all schedules as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/schedule');
    	},

        /**
         * Get all schedules
         * @return all schedules
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get schedule
         * @param id id
         * @return schedule
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new schedule
         * @param schedule schedule
         * @return schedule saved
         */
		create: function(schedule) {
			validate(schedule)
			var url = entityURL;
			return $http.post(url, schedule);
    	},

        /**
         * Update schedule
         * @param schedule schedule
         * @return schedule saved
         */
    	update: function(schedule) {
			validate(schedule)
			var url = entityURL + '/' + schedule.id;
			return $http.put(url, schedule);
    	},

		/**
         * Delete schedule
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

