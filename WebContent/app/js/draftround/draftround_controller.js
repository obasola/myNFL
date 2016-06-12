'use strict';

/**
 * Controller for DraftRound
 **/
draftRoundModule.controller('DraftRoundCtrl', ['DraftRound',  'DraftTeam', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(DraftRound, DraftTeam, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'DraftTeam',     // edition mode
    $scope.mode = null;
    
	// list of draftRounds
    $scope.draftRounds = [];
	// draftRound to edit
    $scope.draftRound = null;

	// referencies entities
	$scope.items = {};
    // draftTeams
	$scope.items.draftTeams = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		DraftTeam.getAllAsListItems().then(
				function(success) {
        	        $scope.items.draftTeams = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh draftRounds list
     */
    $scope.refreshDraftRoundList = function() {
    	try {
			$scope.draftRounds = [];
        	DraftRound.getAll().then(
				function(success) {
        	        $scope.draftRounds = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh draftRound
     */
    $scope.refreshDraftRound = function(id) {
    	try {
        	$scope.draftRound = null;
	        DraftRound.get(id).then(
				function(success) {
        	        $scope.draftRound = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the draftRounds list page
     */
    $scope.goToDraftRoundList = function() {
        $scope.refreshDraftRoundList();
        $location.path('/draftRound');
    }
    /**
     * Go to the draftRound edit page
     */
    $scope.goToDraftRound = function(id) {
        $scope.refreshDraftRound(id);
        $location.path('/draftRound/'+id);
    }

    // Actions

    /**
     * Save draftRound
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = DraftRound.create;
			} else {
				save = DraftRound.update;
			}
			save($scope.draftRound).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.draftRound = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete draftRound
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    DraftRound.delete(id).then(
				function(success) {
                	$scope.goToDraftRoundList();
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
        $scope.draftRound = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshDraftRound($routeParams.id);
    } else {
        // List page
        $scope.refreshDraftRoundList();
    }
    
    
}]);
