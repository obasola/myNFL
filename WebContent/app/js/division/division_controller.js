'use strict';

/**
 * Controller for Division
 **/
divisionModule.controller('DivisionCtrl', ['Division',  'Conference', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Division, Conference, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Conference',     // edition mode
    $scope.mode = null;
    
	// list of divisions
    $scope.divisions = [];
	// division to edit
    $scope.division = null;

	// referencies entities
	$scope.items = {};
    // conferences
	$scope.items.conferences = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Conference.getAllAsListItems().then(
				function(success) {
        	        $scope.items.conferences = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh divisions list
     */
    $scope.refreshDivisionList = function() {
    	try {
			$scope.divisions = [];
        	Division.getAll().then(
				function(success) {
        	        $scope.divisions = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh division
     */
    $scope.refreshDivision = function(id) {
    	try {
        	$scope.division = null;
	        Division.get(id).then(
				function(success) {
        	        $scope.division = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the divisions list page
     */
    $scope.goToDivisionList = function() {
        $scope.refreshDivisionList();
        $location.path('/division');
    }
    /**
     * Go to the division edit page
     */
    $scope.goToDivision = function(id) {
        $scope.refreshDivision(id);
        $location.path('/division/'+id);
    }

    // Actions

    /**
     * Save division
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Division.create;
			} else {
				save = Division.update;
			}
			save($scope.division).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.division = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete division
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Division.delete(id).then(
				function(success) {
                	$scope.goToDivisionList();
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
        $scope.division = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshDivision($routeParams.id);
    } else {
        // List page
        $scope.refreshDivisionList();
    }
    
    
}]);
