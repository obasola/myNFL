'use strict';

/**
 * Factory for PlayerStatus
 */
playerStatusModule.factory('PlayerStatus', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage playerStatus
    var entityURL = restURL + '/playerStatus';
	
	/**
     * Validate playerStatus
     * @param playerStatus playerStatus
     * @throws validation exception
     */
	var validate = function (playerStatus) {
		var errors = [];
        if( playerStatus.id == null || playerStatus.id == '' ) {
			errors.push('playerStatus.id.not.defined');
		}
        if( playerStatus.statusId == null || playerStatus.statusId == '' ) {
			errors.push('playerStatus.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all playerStatuss as list items
         * @return all playerStatuss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/playerStatus');
    	},

        /**
         * Get all playerStatuss
         * @return all playerStatuss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get playerStatus
         * @param id id
         * @param statusId statusId
         * @return playerStatus
         */
    	get: function(id, statusId) {
    	    var url = entityURL + '/' + id + '/' + statusId;
        	return $http.get(url);
    	},

        /**
         * Create a new playerStatus
         * @param playerStatus playerStatus
         * @return playerStatus saved
         */
		create: function(playerStatus) {
			validate(playerStatus)
			var url = entityURL;
			return $http.post(url, playerStatus);
    	},

        /**
         * Update playerStatus
         * @param playerStatus playerStatus
         * @return playerStatus saved
         */
    	update: function(playerStatus) {
			validate(playerStatus)
			var url = entityURL + '/' + playerStatus.id + '/' + playerStatus.statusId;
			return $http.put(url, playerStatus);
    	},

		/**
         * Delete playerStatus
         * @param id id
         * @param statusId statusId
         */
    	delete: function(id, statusId) {
        	var url = entityURL + '/' + id + '/' + statusId;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

