'use strict';

/**
 * Factory for Draft
 */
draftModule.factory('Draft', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage draft
    var entityURL = restURL + '/draft';
	
	/**
     * Validate draft
     * @param draft draft
     * @throws validation exception
     */
	var validate = function (draft) {
		var errors = [];
        if( draft.id == null || draft.id == '' ) {
			errors.push('draft.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all drafts as list items
         * @return all drafts as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/draft');
    	},

        /**
         * Get all drafts
         * @return all drafts
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get draft
         * @param id id
         * @return draft
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new draft
         * @param draft draft
         * @return draft saved
         */
		create: function(draft) {
			validate(draft)
			var url = entityURL;
			return $http.post(url, draft);
    	},

        /**
         * Update draft
         * @param draft draft
         * @return draft saved
         */
    	update: function(draft) {
			validate(draft)
			var url = entityURL + '/' + draft.id;
			return $http.put(url, draft);
    	},

		/**
         * Delete draft
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

