'use strict';

/**
 * Factory for Status
 */
statusModule.factory('Status', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage status
    var entityURL = restURL + '/status';
	
	/**
     * Validate status
     * @param status status
     * @throws validation exception
     */
	var validate = function (status) {
		var errors = [];
        if( status.id == null || status.id == '' ) {
			errors.push('status.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all statuss as list items
         * @return all statuss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/status');
    	},

        /**
         * Get all statuss
         * @return all statuss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get status
         * @param id id
         * @return status
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new status
         * @param status status
         * @return status saved
         */
		create: function(status) {
			validate(status)
			var url = entityURL;
			return $http.post(url, status);
    	},

        /**
         * Update status
         * @param status status
         * @return status saved
         */
    	update: function(status) {
			validate(status)
			var url = entityURL + '/' + status.id;
			return $http.put(url, status);
    	},

		/**
         * Delete status
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

