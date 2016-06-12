'use strict';

/**
 * Controller for PlayerStat
 **/
playerStatModule.controller('PlayerStatCtrl', ['PlayerStat',  'Player', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(PlayerStat, Player, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Player',     // edition mode
    $scope.mode = null;
    
	// list of playerStats
    $scope.playerStats = [];
	// playerStat to edit
    $scope.playerStat = null;

	// referencies entities
	$scope.items = {};
    // players
	$scope.items.players = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Player.getAllAsListItems().then(
				function(success) {
        	        $scope.items.players = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh playerStats list
     */
    $scope.refreshPlayerStatList = function() {
    	try {
			$scope.playerStats = [];
        	PlayerStat.getAll().then(
				function(success) {
        	        $scope.playerStats = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh playerStat
     */
    $scope.refreshPlayerStat = function(id) {
    	try {
        	$scope.playerStat = null;
	        PlayerStat.get(id).then(
				function(success) {
        	        $scope.playerStat = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the playerStats list page
     */
    $scope.goToPlayerStatList = function() {
        $scope.refreshPlayerStatList();
        $location.path('/playerStat');
    }
    /**
     * Go to the playerStat edit page
     */
    $scope.goToPlayerStat = function(id) {
        $scope.refreshPlayerStat(id);
        $location.path('/playerStat/'+id);
    }

    // Actions

    /**
     * Save playerStat
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = PlayerStat.create;
			} else {
				save = PlayerStat.update;
			}
			save($scope.playerStat).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.playerStat = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete playerStat
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    PlayerStat.delete(id).then(
				function(success) {
                	$scope.goToPlayerStatList();
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
        $scope.playerStat = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPlayerStat($routeParams.id);
    } else {
        // List page
        $scope.refreshPlayerStatList();
    }
    
    
}]);
