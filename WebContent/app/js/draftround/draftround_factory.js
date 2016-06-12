'use strict';

/**
 * Factory for DraftRound
 */
draftRoundModule.factory('DraftRound', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage draftRound
    var entityURL = restURL + '/draftRound';
	
	/**
     * Validate draftRound
     * @param draftRound draftRound
     * @throws validation exception
     */
	var validate = function (draftRound) {
		var errors = [];
        if( draftRound.id == null || draftRound.id == '' ) {
			errors.push('draftRound.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all draftRounds as list items
         * @return all draftRounds as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/draftRound');
    	},

        /**
         * Get all draftRounds
         * @return all draftRounds
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get draftRound
         * @param id id
         * @return draftRound
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new draftRound
         * @param draftRound draftRound
         * @return draftRound saved
         */
		create: function(draftRound) {
			validate(draftRound)
			var url = entityURL;
			return $http.post(url, draftRound);
    	},

        /**
         * Update draftRound
         * @param draftRound draftRound
         * @return draftRound saved
         */
    	update: function(draftRound) {
			validate(draftRound)
			var url = entityURL + '/' + draftRound.id;
			return $http.put(url, draftRound);
    	},

		/**
         * Delete draftRound
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

