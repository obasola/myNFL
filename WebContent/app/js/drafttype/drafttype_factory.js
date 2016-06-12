'use strict';

/**
 * Factory for DraftType
 */
draftTypeModule.factory('DraftType', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage draftType
    var entityURL = restURL + '/draftType';
	
	/**
     * Validate draftType
     * @param draftType draftType
     * @throws validation exception
     */
	var validate = function (draftType) {
		var errors = [];
        if( draftType.id == null || draftType.id == '' ) {
			errors.push('draftType.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all draftTypes as list items
         * @return all draftTypes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/draftType');
    	},

        /**
         * Get all draftTypes
         * @return all draftTypes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get draftType
         * @param id id
         * @return draftType
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new draftType
         * @param draftType draftType
         * @return draftType saved
         */
		create: function(draftType) {
			validate(draftType)
			var url = entityURL;
			return $http.post(url, draftType);
    	},

        /**
         * Update draftType
         * @param draftType draftType
         * @return draftType saved
         */
    	update: function(draftType) {
			validate(draftType)
			var url = entityURL + '/' + draftType.id;
			return $http.put(url, draftType);
    	},

		/**
         * Delete draftType
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

