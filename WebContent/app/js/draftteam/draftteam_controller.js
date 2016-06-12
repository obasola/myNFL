'use strict';

/**
 * Controller for DraftTeam
 **/
draftTeamModule.controller('DraftTeamCtrl', ['DraftTeam',  'Draft', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(DraftTeam, Draft, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Draft',     // edition mode
    $scope.mode = null;
    
	// list of draftTeams
    $scope.draftTeams = [];
	// draftTeam to edit
    $scope.draftTeam = null;

	// referencies entities
	$scope.items = {};
    // drafts
	$scope.items.drafts = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Draft.getAllAsListItems().then(
				function(success) {
        	        $scope.items.drafts = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh draftTeams list
     */
    $scope.refreshDraftTeamList = function() {
    	try {
			$scope.draftTeams = [];
        	DraftTeam.getAll().then(
				function(success) {
        	        $scope.draftTeams = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh draftTeam
     */
    $scope.refreshDraftTeam = function(id) {
    	try {
        	$scope.draftTeam = null;
	        DraftTeam.get(id).then(
				function(success) {
        	        $scope.draftTeam = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the draftTeams list page
     */
    $scope.goToDraftTeamList = function() {
        $scope.refreshDraftTeamList();
        $location.path('/draftTeam');
    }
    /**
     * Go to the draftTeam edit page
     */
    $scope.goToDraftTeam = function(id) {
        $scope.refreshDraftTeam(id);
        $location.path('/draftTeam/'+id);
    }

    // Actions

    /**
     * Save draftTeam
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = DraftTeam.create;
			} else {
				save = DraftTeam.update;
			}
			save($scope.draftTeam).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.draftTeam = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete draftTeam
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    DraftTeam.delete(id).then(
				function(success) {
                	$scope.goToDraftTeamList();
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
        $scope.draftTeam = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshDraftTeam($routeParams.id);
    } else {
        // List page
        $scope.refreshDraftTeamList();
    }
    
    
}]);
