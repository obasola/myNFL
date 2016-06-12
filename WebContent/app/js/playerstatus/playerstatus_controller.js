'use strict';

/**
 * Controller for PlayerStatus
 **/
playerStatusModule.controller('PlayerStatusCtrl', ['PlayerStatus',  'Player', 'Status', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(PlayerStatus, Player, Status, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Player',  'Status',     // edition mode
    $scope.mode = null;
    
	// list of playerStatuss
    $scope.playerStatuss = [];
	// playerStatus to edit
    $scope.playerStatus = null;

	// referencies entities
	$scope.items = {};
    // players
	$scope.items.players = [];
    // statuss
	$scope.items.statuss = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Player.getAllAsListItems().then(
				function(success) {
        	        $scope.items.players = success.data;
            	}, 
	            MessageHandler.manageError);
		Status.getAllAsListItems().then(
				function(success) {
        	        $scope.items.statuss = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh playerStatuss list
     */
    $scope.refreshPlayerStatusList = function() {
    	try {
			$scope.playerStatuss = [];
        	PlayerStatus.getAll().then(
				function(success) {
        	        $scope.playerStatuss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh playerStatus
     */
    $scope.refreshPlayerStatus = function(id, statusId) {
    	try {
        	$scope.playerStatus = null;
	        PlayerStatus.get(id, statusId).then(
				function(success) {
        	        $scope.playerStatus = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the playerStatuss list page
     */
    $scope.goToPlayerStatusList = function() {
        $scope.refreshPlayerStatusList();
        $location.path('/playerStatus');
    }
    /**
     * Go to the playerStatus edit page
     */
    $scope.goToPlayerStatus = function(id, statusId) {
        $scope.refreshPlayerStatus(id, statusId);
        $location.path('/playerStatus/'+id+'/'+statusId);
    }

    // Actions

    /**
     * Save playerStatus
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = PlayerStatus.create;
			} else {
				save = PlayerStatus.update;
			}
			save($scope.playerStatus).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.playerStatus = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete playerStatus
     */
    $scope.delete = function(id, statusId) {
	    try {
			MessageHandler.cleanMessage();
    	    PlayerStatus.delete(id, statusId).then(
				function(success) {
                	$scope.goToPlayerStatusList();
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
        $scope.playerStatus = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null && $routeParams.statusId != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPlayerStatus($routeParams.id, $routeParams.statusId);
    } else {
        // List page
        $scope.refreshPlayerStatusList();
    }
    
    
}]);
