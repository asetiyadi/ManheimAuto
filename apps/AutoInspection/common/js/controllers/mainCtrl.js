 /****************************************************************************************
 *
 *  MAIN CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('mainCtrl', ['$scope','$rootScope','$state','$modal','locationService',
 		function ($scope,$rootScope,$state,$modal,locationService) {
 		/*******************************************************
		*  VARIABLES                        
		*******************************************************/
		$scope.state = $state;
      	$scope.inspectionUrl = locationService.getInspectionUrl();
      	$scope.vinUrl = locationService.getVinUrl();
 		$scope.modalShown = false;
 		$scope.stateName = $state.current.name;
 		$scope.userFirstName = $rootScope.userInfo.firstname;
		/*******************************************************
		*  OVERLAY MODAL TOGGLE                        
		*******************************************************/
		$scope.toggleModal = function(text) {
			var text = text;
		    var modalInstance = $modal.open({
		        templateUrl: 'views/elements/info-overlay.html',
		        controller: 'overlayModalCtrl',
		        size: 'lg',
		        resolve: {
		            selectedPageTitle: function() {
		                return text;
		            }
		        }
		    });
		};
		$scope.startInspection = function (path) {
			var path = path;
			$rootScope.vinNum = '1C4AJWBG7CL183656';
			$state.go('inspection.vinScanner',({inspectionPath:path}));
		};
		$scope.reviewInspection = function (path,vin) {
			var path = path;
			$rootScope.vinNum = vin;
			$state.go('inspection.vinScanner',({inspectionPath:path}));
		};
 		$scope.techName = $rootScope.userInfo.firstname + ' ' + $rootScope.userInfo.lastname;
		/*******************************************************
		*  INSPECTION STUB DATA                           
		*******************************************************/
 		$scope.inspectionStubDate = [
 			{
	 			lotNum: '147',
	 			name: 'Vehicle 7',
	 			date: '12-7-14',
	 			image: 'images/vehicle-types/truck.png', 
	 			tech: $scope.techName,
	 			completion: '65%',
	 			manager: 'Beth Maxwell',
	 			clickFunction: 'reviewInspection("silver","1FTFW1EF3BFC19451")'
	 		},
	 		{
	 			lotNum: '148',
	 			name: 'Vehicle 8',
	 			date: '12-7-14',
	 			image: 'images/vehicle-types/sedan.png', 
	 			tech: $scope.techName,
	 			completion: '90%',
	 			manager: 'Beth Maxwell',
	 			clickFunction: 'reviewInspection("gold","3FA6P0HR5DR226247")'
	 		}
	 	];
		/*******************************************************
		*  AWAITING REVIEW STUB DATA                          
		*******************************************************/
 		$scope.reviewStubDate = [
 			{
	 			lotNum: '141',
	 			name: 'Vehicle 1',
	 			date: '12-4-14',
	 			image: 'images/vehicle-types/sedan.png', 
	 			tech: 'John Smith', 
	 			completion: '100%',
	 			manager: 'Beth Maxwell'
	 		},
	 		{
	 			lotNum: '142',
	 			name: 'Vehicle 2',
	 			date: '12-4-14',
	 			image: 'images/vehicle-types/sports.png', 
	 			tech: 'John Smith', 
	 			completion: '100%',
	 			manager: 'Beth Maxwell'
	 		},
	 		{
	 			lotNum: '143',
	 			name: 'Vehicle 3',
	 			date: '12-5-14',
	 			image: 'images/vehicle-types/suv.png', 
	 			tech: 'John Smith', 
	 			completion: '100%',
	 			manager: 'Beth Maxwell'
	 		}
	 	];
 	}]);
 });