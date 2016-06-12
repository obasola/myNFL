'use strict';

/**
 * Factory for Team
 */
teamModule.factory('Team', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage team
    var entityURL = restURL + '/team';
	
	/**
     * Validate team
     * @param team team
     * @throws validation exception
     */
	var validate = function (team) {
		var errors = [];
        if( team.id == null || team.id == '' ) {
			errors.push('team.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all teams as list items
         * @return all teams as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/team');
    	},

        /**
         * Get all teams
         * @return all teams
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get team
         * @param id id
         * @return team
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new team
         * @param team team
         * @return team saved
         */
		create: function(team) {
			validate(team)
			var url = entityURL;
			return $http.post(url, team);
    	},

        /**
         * Update team
         * @param team team
         * @return team saved
         */
    	update: function(team) {
			validate(team)
			var url = entityURL + '/' + team.id;
			return $http.put(url, team);
    	},

		/**
         * Delete team
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

