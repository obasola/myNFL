'use strict';

/**
 * Factory for PlayerPosition
 */
playerPositionModule.factory('PlayerPosition', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage playerPosition
    var entityURL = restURL + '/playerPosition';
	
	/**
     * Validate playerPosition
     * @param playerPosition playerPosition
     * @throws validation exception
     */
	var validate = function (playerPosition) {
		var errors = [];
        if( playerPosition.id == null || playerPosition.id == '' ) {
			errors.push('playerPosition.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all playerPositions as list items
         * @return all playerPositions as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/playerPosition');
    	},

        /**
         * Get all playerPositions
         * @return all playerPositions
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get playerPosition
         * @param id id
         * @return playerPosition
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new playerPosition
         * @param playerPosition playerPosition
         * @return playerPosition saved
         */
		create: function(playerPosition) {
			validate(playerPosition)
			var url = entityURL;
			return $http.post(url, playerPosition);
    	},

        /**
         * Update playerPosition
         * @param playerPosition playerPosition
         * @return playerPosition saved
         */
    	update: function(playerPosition) {
			validate(playerPosition)
			var url = entityURL + '/' + playerPosition.id;
			return $http.put(url, playerPosition);
    	},

		/**
         * Delete playerPosition
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

