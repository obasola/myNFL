'use strict';

/**
 * Factory for Conference
 */
conferenceModule.factory('Conference', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage conference
    var entityURL = restURL + '/conference';
	
	/**
     * Validate conference
     * @param conference conference
     * @throws validation exception
     */
	var validate = function (conference) {
		var errors = [];
        if( conference.id == null || conference.id == '' ) {
			errors.push('conference.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all conferences as list items
         * @return all conferences as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/conference');
    	},

        /**
         * Get all conferences
         * @return all conferences
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get conference
         * @param id id
         * @return conference
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new conference
         * @param conference conference
         * @return conference saved
         */
		create: function(conference) {
			validate(conference)
			var url = entityURL;
			return $http.post(url, conference);
    	},

        /**
         * Update conference
         * @param conference conference
         * @return conference saved
         */
    	update: function(conference) {
			validate(conference)
			var url = entityURL + '/' + conference.id;
			return $http.put(url, conference);
    	},

		/**
         * Delete conference
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

