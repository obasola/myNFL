'use strict';

/**
 * Controller for Conference
 **/
conferenceModule.controller('ConferenceCtrl', ['Conference',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Conference, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of conferences
    $scope.conferences = [];
	// conference to edit
    $scope.conference = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh conferences list
     */
    $scope.refreshConferenceList = function() {
    	try {
			$scope.conferences = [];
        	Conference.getAll().then(
				function(success) {
        	        $scope.conferences = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh conference
     */
    $scope.refreshConference = function(id) {
    	try {
        	$scope.conference = null;
	        Conference.get(id).then(
				function(success) {
        	        $scope.conference = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the conferences list page
     */
    $scope.goToConferenceList = function() {
        $scope.refreshConferenceList();
        $location.path('/conference');
    }
    /**
     * Go to the conference edit page
     */
    $scope.goToConference = function(id) {
        $scope.refreshConference(id);
        $location.path('/conference/'+id);
    }

    // Actions

    /**
     * Save conference
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Conference.create;
			} else {
				save = Conference.update;
			}
			save($scope.conference).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.conference = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete conference
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Conference.delete(id).then(
				function(success) {
                	$scope.goToConferenceList();
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
        $scope.conference = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshConference($routeParams.id);
    } else {
        // List page
        $scope.refreshConferenceList();
    }
    
    
}]);
