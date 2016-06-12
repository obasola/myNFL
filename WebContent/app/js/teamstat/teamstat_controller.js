'use strict';

/**
 * Controller for TeamStat
 **/
teamStatModule.controller('TeamStatCtrl', ['TeamStat',  'Team', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(TeamStat, Team, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Team',     // edition mode
    $scope.mode = null;
    
	// list of teamStats
    $scope.teamStats = [];
	// teamStat to edit
    $scope.teamStat = null;

	// referencies entities
	$scope.items = {};
    // teams
	$scope.items.teams = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Team.getAllAsListItems().then(
				function(success) {
        	        $scope.items.teams = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh teamStats list
     */
    $scope.refreshTeamStatList = function() {
    	try {
			$scope.teamStats = [];
        	TeamStat.getAll().then(
				function(success) {
        	        $scope.teamStats = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh teamStat
     */
    $scope.refreshTeamStat = function(id) {
    	try {
        	$scope.teamStat = null;
	        TeamStat.get(id).then(
				function(success) {
        	        $scope.teamStat = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the teamStats list page
     */
    $scope.goToTeamStatList = function() {
        $scope.refreshTeamStatList();
        $location.path('/teamStat');
    }
    /**
     * Go to the teamStat edit page
     */
    $scope.goToTeamStat = function(id) {
        $scope.refreshTeamStat(id);
        $location.path('/teamStat/'+id);
    }

    // Actions

    /**
     * Save teamStat
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = TeamStat.create;
			} else {
				save = TeamStat.update;
			}
			save($scope.teamStat).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.teamStat = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete teamStat
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    TeamStat.delete(id).then(
				function(success) {
                	$scope.goToTeamStatList();
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
        $scope.teamStat = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTeamStat($routeParams.id);
    } else {
        // List page
        $scope.refreshTeamStatList();
    }
    
    
}]);
