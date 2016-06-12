'use strict';

/**
 * Controller for Schedule
 **/
scheduleModule.controller('ScheduleCtrl', ['Schedule',  'Team', 'ScheduleType', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Schedule, Team, ScheduleType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Team',  'ScheduleType',     // edition mode
    $scope.mode = null;
    
	// list of schedules
    $scope.schedules = [];
	// schedule to edit
    $scope.schedule = null;

	// referencies entities
	$scope.items = {};
    // teams
	$scope.items.teams = [];
    // scheduleTypes
	$scope.items.scheduleTypes = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Team.getAllAsListItems().then(
				function(success) {
        	        $scope.items.teams = success.data;
            	}, 
	            MessageHandler.manageError);
		ScheduleType.getAllAsListItems().then(
				function(success) {
        	        $scope.items.scheduleTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh schedules list
     */
    $scope.refreshScheduleList = function() {
    	try {
			$scope.schedules = [];
        	Schedule.getAll().then(
				function(success) {
        	        $scope.schedules = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh schedule
     */
    $scope.refreshSchedule = function(id) {
    	try {
        	$scope.schedule = null;
	        Schedule.get(id).then(
				function(success) {
        	        $scope.schedule = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the schedules list page
     */
    $scope.goToScheduleList = function() {
        $scope.refreshScheduleList();
        $location.path('/schedule');
    }
    /**
     * Go to the schedule edit page
     */
    $scope.goToSchedule = function(id) {
        $scope.refreshSchedule(id);
        $location.path('/schedule/'+id);
    }

    // Actions

    /**
     * Save schedule
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Schedule.create;
			} else {
				save = Schedule.update;
			}
			save($scope.schedule).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.schedule = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete schedule
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Schedule.delete(id).then(
				function(success) {
                	$scope.goToScheduleList();
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
        $scope.schedule = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSchedule($routeParams.id);
    } else {
        // List page
        $scope.refreshScheduleList();
    }
    
    
}]);
