'use strict';

/**
 * Factory for TeamStat
 */
teamStatModule.factory('TeamStat', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage teamStat
    var entityURL = restURL + '/teamStat';
	
	/**
     * Validate teamStat
     * @param teamStat teamStat
     * @throws validation exception
     */
	var validate = function (teamStat) {
		var errors = [];
        if( teamStat.id == null || teamStat.id == '' ) {
			errors.push('teamStat.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all teamStats as list items
         * @return all teamStats as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/teamStat');
    	},

        /**
         * Get all teamStats
         * @return all teamStats
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get teamStat
         * @param id id
         * @return teamStat
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new teamStat
         * @param teamStat teamStat
         * @return teamStat saved
         */
		create: function(teamStat) {
			validate(teamStat)
			var url = entityURL;
			return $http.post(url, teamStat);
    	},

        /**
         * Update teamStat
         * @param teamStat teamStat
         * @return teamStat saved
         */
    	update: function(teamStat) {
			validate(teamStat)
			var url = entityURL + '/' + teamStat.id;
			return $http.put(url, teamStat);
    	},

		/**
         * Delete teamStat
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

