'use strict';

/**
 * Controller for Player
 **/
playerModule.controller('PlayerCtrl', ['Player',  'PlayerPosition', 'Team', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Player, PlayerPosition, Team, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'PlayerPosition',  'Team',     // edition mode
    $scope.mode = null;
    
	// list of players
    $scope.players = [];
	// player to edit
    $scope.player = null;

	// referencies entities
	$scope.items = {};
    // playerPositions
	$scope.items.playerPositions = [];
    // teams
	$scope.items.teams = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		PlayerPosition.getAllAsListItems().then(
				function(success) {
        	        $scope.items.playerPositions = success.data;
            	}, 
	            MessageHandler.manageError);
		Team.getAllAsListItems().then(
				function(success) {
        	        $scope.items.teams = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh players list
     */
    $scope.refreshPlayerList = function() {
    	try {
			$scope.players = [];
        	Player.getAll().then(
				function(success) {
        	        $scope.players = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh player
     */
    $scope.refreshPlayer = function(id) {
    	try {
        	$scope.player = null;
	        Player.get(id).then(
				function(success) {
        	        $scope.player = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the players list page
     */
    $scope.goToPlayerList = function() {
        $scope.refreshPlayerList();
        $location.path('/player');
    }
    /**
     * Go to the player edit page
     */
    $scope.goToPlayer = function(id) {
        $scope.refreshPlayer(id);
        $location.path('/player/'+id);
    }

    // Actions

    /**
     * Save player
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Player.create;
			} else {
				save = Player.update;
			}
			save($scope.player).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.player = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete player
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Player.delete(id).then(
				function(success) {
                	$scope.goToPlayerList();
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
        $scope.player = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPlayer($routeParams.id);
    } else {
        // List page
        $scope.refreshPlayerList();
    }
    
    
}]);
