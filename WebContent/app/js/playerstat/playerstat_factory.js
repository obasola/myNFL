'use strict';

/**
 * Factory for PlayerStat
 */
playerStatModule.factory('PlayerStat', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage playerStat
    var entityURL = restURL + '/playerStat';
	
	/**
     * Validate playerStat
     * @param playerStat playerStat
     * @throws validation exception
     */
	var validate = function (playerStat) {
		var errors = [];
        if( playerStat.id == null || playerStat.id == '' ) {
			errors.push('playerStat.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all playerStats as list items
         * @return all playerStats as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/playerStat');
    	},

        /**
         * Get all playerStats
         * @return all playerStats
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get playerStat
         * @param id id
         * @return playerStat
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new playerStat
         * @param playerStat playerStat
         * @return playerStat saved
         */
		create: function(playerStat) {
			validate(playerStat)
			var url = entityURL;
			return $http.post(url, playerStat);
    	},

        /**
         * Update playerStat
         * @param playerStat playerStat
         * @return playerStat saved
         */
    	update: function(playerStat) {
			validate(playerStat)
			var url = entityURL + '/' + playerStat.id;
			return $http.put(url, playerStat);
    	},

		/**
         * Delete playerStat
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

