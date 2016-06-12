'use strict';

/**
 * Controller for Team
 **/
teamModule.controller('TeamCtrl', ['Team',  'Division', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Team, Division, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Division',     // edition mode
    $scope.mode = null;
    
	// list of teams
    $scope.teams = [];
	// team to edit
    $scope.team = null;

	// referencies entities
	$scope.items = {};
    // divisions
	$scope.items.divisions = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Division.getAllAsListItems().then(
				function(success) {
        	        $scope.items.divisions = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh teams list
     */
    $scope.refreshTeamList = function() {
    	try {
			$scope.teams = [];
        	Team.getAll().then(
				function(success) {
        	        $scope.teams = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh team
     */
    $scope.refreshTeam = function(id) {
    	try {
        	$scope.team = null;
	        Team.get(id).then(
				function(success) {
        	        $scope.team = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the teams list page
     */
    $scope.goToTeamList = function() {
        $scope.refreshTeamList();
        $location.path('/team');
    }
    /**
     * Go to the team edit page
     */
    $scope.goToTeam = function(id) {
        $scope.refreshTeam(id);
        $location.path('/team/'+id);
    }

    // Actions

    /**
     * Save team
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Team.create;
			} else {
				save = Team.update;
			}
			save($scope.team).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.team = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete team
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Team.delete(id).then(
				function(success) {
                	$scope.goToTeamList();
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
        $scope.team = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTeam($routeParams.id);
    } else {
        // List page
        $scope.refreshTeamList();
    }
    
    
}]);
