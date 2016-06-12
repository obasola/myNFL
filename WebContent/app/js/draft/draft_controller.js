'use strict';

/**
 * Controller for Draft
 **/
draftModule.controller('DraftCtrl', ['Draft',  'DraftType', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Draft, DraftType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'DraftType',     // edition mode
    $scope.mode = null;
    
	// list of drafts
    $scope.drafts = [];
	// draft to edit
    $scope.draft = null;

	// referencies entities
	$scope.items = {};
    // draftTypes
	$scope.items.draftTypes = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		DraftType.getAllAsListItems().then(
				function(success) {
        	        $scope.items.draftTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh drafts list
     */
    $scope.refreshDraftList = function() {
    	try {
			$scope.drafts = [];
        	Draft.getAll().then(
				function(success) {
        	        $scope.drafts = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh draft
     */
    $scope.refreshDraft = function(id) {
    	try {
        	$scope.draft = null;
	        Draft.get(id).then(
				function(success) {
        	        $scope.draft = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the drafts list page
     */
    $scope.goToDraftList = function() {
        $scope.refreshDraftList();
        $location.path('/draft');
    }
    /**
     * Go to the draft edit page
     */
    $scope.goToDraft = function(id) {
        $scope.refreshDraft(id);
        $location.path('/draft/'+id);
    }

    // Actions

    /**
     * Save draft
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Draft.create;
			} else {
				save = Draft.update;
			}
			save($scope.draft).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.draft = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete draft
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Draft.delete(id).then(
				function(success) {
                	$scope.goToDraftList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.draft = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshDraft($routeParams.id);
    } else {
        // List page
        $scope.refreshDraftList();
    }
    
    
}]);
