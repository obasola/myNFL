'use strict';

/**
 * Controller for ScheduleType
 **/
scheduleTypeModule.controller('ScheduleTypeCtrl', ['ScheduleType',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(ScheduleType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of scheduleTypes
    $scope.scheduleTypes = [];
	// scheduleType to edit
    $scope.scheduleType = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh scheduleTypes list
     */
    $scope.refreshScheduleTypeList = function() {
    	try {
			$scope.scheduleTypes = [];
        	ScheduleType.getAll().then(
				function(success) {
        	        $scope.scheduleTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh scheduleType
     */
    $scope.refreshScheduleType = function(id) {
    	try {
        	$scope.scheduleType = null;
	        ScheduleType.get(id).then(
				function(success) {
        	        $scope.scheduleType = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the scheduleTypes list page
     */
    $scope.goToScheduleTypeList = function() {
        $scope.refreshScheduleTypeList();
        $location.path('/scheduleType');
    }
    /**
     * Go to the scheduleType edit page
     */
    $scope.goToScheduleType = function(id) {
        $scope.refreshScheduleType(id);
        $location.path('/scheduleType/'+id);
    }

    // Actions

    /**
     * Save scheduleType
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = ScheduleType.create;
			} else {
				save = ScheduleType.update;
			}
			save($scope.scheduleType).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.scheduleType = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete scheduleType
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    ScheduleType.delete(id).then(
				function(success) {
                	$scope.goToScheduleTypeList();
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
        $scope.scheduleType = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshScheduleType($routeParams.id);
    } else {
        // List page
        $scope.refreshScheduleTypeList();
    }
    
    
}]);
