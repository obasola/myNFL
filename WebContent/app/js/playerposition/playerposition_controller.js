'use strict';

/**
 * Controller for PlayerPosition
 **/
playerPositionModule.controller('PlayerPositionCtrl', ['PlayerPosition',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(PlayerPosition, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of playerPositions
    $scope.playerPositions = [];
	// playerPosition to edit
    $scope.playerPosition = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh playerPositions list
     */
    $scope.refreshPlayerPositionList = function() {
    	try {
			$scope.playerPositions = [];
        	PlayerPosition.getAll().then(
				function(success) {
        	        $scope.playerPositions = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh playerPosition
     */
    $scope.refreshPlayerPosition = function(id) {
    	try {
        	$scope.playerPosition = null;
	        PlayerPosition.get(id).then(
				function(success) {
        	        $scope.playerPosition = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the playerPositions list page
     */
    $scope.goToPlayerPositionList = function() {
        $scope.refreshPlayerPositionList();
        $location.path('/playerPosition');
    }
    /**
     * Go to the playerPosition edit page
     */
    $scope.goToPlayerPosition = function(id) {
        $scope.refreshPlayerPosition(id);
        $location.path('/playerPosition/'+id);
    }

    // Actions

    /**
     * Save playerPosition
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = PlayerPosition.create;
			} else {
				save = PlayerPosition.update;
			}
			save($scope.playerPosition).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.playerPosition = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete playerPosition
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    PlayerPosition.delete(id).then(
				function(success) {
                	$scope.goToPlayerPositionList();
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
        $scope.playerPosition = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPlayerPosition($routeParams.id);
    } else {
        // List page
        $scope.refreshPlayerPositionList();
    }
    
    
}]);
