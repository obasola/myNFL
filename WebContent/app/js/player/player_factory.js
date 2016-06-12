'use strict';

/**
 * Factory for Player
 */
playerModule.factory('Player', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage player
    var entityURL = restURL + '/player';
	
	/**
     * Validate player
     * @param player player
     * @throws validation exception
     */
	var validate = function (player) {
		var errors = [];
        if( player.id == null || player.id == '' ) {
			errors.push('player.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all players as list items
         * @return all players as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/player');
    	},

        /**
         * Get all players
         * @return all players
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get player
         * @param id id
         * @return player
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new player
         * @param player player
         * @return player saved
         */
		create: function(player) {
			validate(player)
			var url = entityURL;
			return $http.post(url, player);
    	},

        /**
         * Update player
         * @param player player
         * @return player saved
         */
    	update: function(player) {
			validate(player)
			var url = entityURL + '/' + player.id;
			return $http.put(url, player);
    	},

		/**
         * Delete player
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

