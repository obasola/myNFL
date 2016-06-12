'use strict';

/**
 * Controller for Status
 **/
statusModule.controller('StatusCtrl', ['Status',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Status, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of statuss
    $scope.statuss = [];
	// status to edit
    $scope.status = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh statuss list
     */
    $scope.refreshStatusList = function() {
    	try {
			$scope.statuss = [];
        	Status.getAll().then(
				function(success) {
        	        $scope.statuss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh status
     */
    $scope.refreshStatus = function(id) {
    	try {
        	$scope.status = null;
	        Status.get(id).then(
				function(success) {
        	        $scope.status = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the statuss list page
     */
    $scope.goToStatusList = function() {
        $scope.refreshStatusList();
        $location.path('/status');
    }
    /**
     * Go to the status edit page
     */
    $scope.goToStatus = function(id) {
        $scope.refreshStatus(id);
        $location.path('/status/'+id);
    }

    // Actions

    /**
     * Save status
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Status.create;
			} else {
				save = Status.update;
			}
			save($scope.status).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.status = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete status
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Status.delete(id).then(
				function(success) {
                	$scope.goToStatusList();
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
        $scope.status = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshStatus($routeParams.id);
    } else {
        // List page
        $scope.refreshStatusList();
    }
    
    
}]);
