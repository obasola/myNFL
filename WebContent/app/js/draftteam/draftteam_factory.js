'use strict';

/**
 * Factory for DraftTeam
 */
draftTeamModule.factory('DraftTeam', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage draftTeam
    var entityURL = restURL + '/draftTeam';
	
	/**
     * Validate draftTeam
     * @param draftTeam draftTeam
     * @throws validation exception
     */
	var validate = function (draftTeam) {
		var errors = [];
        if( draftTeam.id == null || draftTeam.id == '' ) {
			errors.push('draftTeam.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all draftTeams as list items
         * @return all draftTeams as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/draftTeam');
    	},

        /**
         * Get all draftTeams
         * @return all draftTeams
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get draftTeam
         * @param id id
         * @return draftTeam
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new draftTeam
         * @param draftTeam draftTeam
         * @return draftTeam saved
         */
		create: function(draftTeam) {
			validate(draftTeam)
			var url = entityURL;
			return $http.post(url, draftTeam);
    	},

        /**
         * Update draftTeam
         * @param draftTeam draftTeam
         * @return draftTeam saved
         */
    	update: function(draftTeam) {
			validate(draftTeam)
			var url = entityURL + '/' + draftTeam.id;
			return $http.put(url, draftTeam);
    	},

		/**
         * Delete draftTeam
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

