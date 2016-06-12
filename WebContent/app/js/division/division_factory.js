'use strict';

/**
 * Factory for Division
 */
divisionModule.factory('Division', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage division
    var entityURL = restURL + '/division';
	
	/**
     * Validate division
     * @param division division
     * @throws validation exception
     */
	var validate = function (division) {
		var errors = [];
        if( division.id == null || division.id == '' ) {
			errors.push('division.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all divisions as list items
         * @return all divisions as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/division');
    	},

        /**
         * Get all divisions
         * @return all divisions
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get division
         * @param id id
         * @return division
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new division
         * @param division division
         * @return division saved
         */
		create: function(division) {
			validate(division)
			var url = entityURL;
			return $http.post(url, division);
    	},

        /**
         * Update division
         * @param division division
         * @return division saved
         */
    	update: function(division) {
			validate(division)
			var url = entityURL + '/' + division.id;
			return $http.put(url, division);
    	},

		/**
         * Delete division
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

