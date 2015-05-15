 /****************************************************************************************
 *
 *  HEADER CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('headerCtrl', ['$scope','$state','$stateParams','$rootScope','headerService','$window',
 		function ($scope,$state,$stateParams,$rootScope,headerService,$window) {
		/*******************************************************
		*  VARIABLES                        
		*******************************************************/
		$scope.$state = $state;
    	$scope.$stateParams = $stateParams; 
		$scope.inspectionPath = $scope.$stateParams.inspectionPath;
		$scope.vin_number = $scope.$stateParams.vinNum;

      	$scope.inspectionUrl = 'inspection.report';

      	$scope.headerService = headerService;
		/*******************************************************
		*  DYNAMIC HEADER INFORMATION                       
		*******************************************************/
      	$rootScope.$on('$viewContentLoaded', function () {
      		// --------------------
	      	// HEADER DATA SECTION
	      	// --------------------
	      	if ($state.current.name === 'dashboard.content') {
			  	// -------------------------------------------------------
		  		// TODO: add functionality to dynamically load username
		  		// $scope.userName = call some function here;
		  		// headerService.setTitle('Welcome, ' + $scope.userName);
		  		// -------------------------------------------------------	
	      		headerService.setTitle('Welcome, John');
	      	} else if ($state.current.name === 'inspection.vinScanner') {
	      		headerService.setTitle('VIN Scanner');
	      	} else if ($state.current.name === $scope.inspectionURL + ".dealerVehicleInfo") {
	      		headerService.setTitle('Dealer and Vehicle Info');
	      	} else if ($state.current.name === $scope.inspectionURL + ".vehicleInterior") {
	      		headerService.setTitle('Interior of Vehicle');
	      	} else if ($state.current.name === $scope.inspectionURL + ".vehicleExterior") {
	      		headerService.setTitle('Exterior of Vehicle');
	      	} else if ($state.current.name === $scope.inspectionURL + ".vehicleEngine") {
	      		headerService.setTitle('Engine Compartment');
	      	} else if ($state.current.name === $scope.inspectionURL + ".roadTest") {
	      		headerService.setTitle('Road Test');
	      	} else if ($state.current.name === $scope.inspectionURL + ".underVehicle") {
	      		headerService.setTitle('Under the Vehicle');
	      	} else if ($state.current.name === $scope.inspectionURL + ".summary") {
	      		headerService.setTitle('Inspection Summary');
	      	}
	      	// --------------------
	      	// HEADER LINK SECTION
	      	// --------------------
	      	if ($state.current.name === $scope.vinURL) {
	      		headerService.setLinkURL('login');
	      		headerService.setLinkID('cancelWrapper');
	      		headerService.setLink('Cancel');
	      	} else if ($state.current.name === "inspection") {
	      		headerService.setLinkURL('login');
	      		headerService.setLinkID('cancelWrapper');
	      		headerService.setLink('Cancel');
	      	} else if ($state.current.name === "dashboard.content") {
	      		headerService.setLinkURL('login');
	      		headerService.setLinkID('logoutWrapper');
	      		headerService.setLink('Logout');
	      	} else if ($state.current.name) {
	      		// -------------------------------------------------------
	      		// TODO: this will need to save the data currently on 
	      		// the inspection forms before quitting the application
	      		// -------------------------------------------------------
	      		headerService.setLinkURL('login');
	      		headerService.setLinkID('logoutWrapper');
	      		headerService.setLink('Save & Quit');
	      	}
      	});
 	}]);
 });