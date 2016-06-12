'use strict';

/**
 * Controller for DraftType
 **/
draftTypeModule.controller('DraftTypeCtrl', ['DraftType',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(DraftType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of draftTypes
    $scope.draftTypes = [];
	// draftType to edit
    $scope.draftType = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh draftTypes list
     */
    $scope.refreshDraftTypeList = function() {
    	try {
			$scope.draftTypes = [];
        	DraftType.getAll().then(
				function(success) {
        	        $scope.draftTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh draftType
     */
    $scope.refreshDraftType = function(id) {
    	try {
        	$scope.draftType = null;
	        DraftType.get(id).then(
				function(success) {
        	        $scope.draftType = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the draftTypes list page
     */
    $scope.goToDraftTypeList = function() {
        $scope.refreshDraftTypeList();
        $location.path('/draftType');
    }
    /**
     * Go to the draftType edit page
     */
    $scope.goToDraftType = function(id) {
        $scope.refreshDraftType(id);
        $location.path('/draftType/'+id);
    }

    // Actions

    /**
     * Save draftType
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = DraftType.create;
			} else {
				save = DraftType.update;
			}
			save($scope.draftType).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.draftType = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete draftType
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    DraftType.delete(id).then(
				function(success) {
                	$scope.goToDraftTypeList();
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
        $scope.draftType = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshDraftType($routeParams.id);
    } else {
        // List page
        $scope.refreshDraftTypeList();
    }
    
    
}]);
