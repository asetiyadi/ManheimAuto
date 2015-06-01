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
 	}]);
 });