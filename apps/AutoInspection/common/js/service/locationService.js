 /****************************************************************************************
 *
 *  LOCATION SERVICE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (services) {
 	'use strict';
 	services.service('locationService', ['$rootScope','$state','$stateParams', function ($rootScope,$state,$stateParams) {
 		this.getInspectionUrl = function () {
 			$rootScope.inspectionPath = $stateParams.inspectionPath;
 			$rootScope.inspectionURL = '/inspection/' + $rootScope.inspectionPath;
 			return $rootScope.inspectionURL;
 		},
 		this.getInspectionPath = function () {
 			$rootScope.inspectionPath = $stateParams.inspectionPath;
 			return $rootScope.inspectionPath;
 		},
 		this.getVinUrl = function () {
 			$rootScope.inspectionPath = $stateParams.inspectionPath; 
 			$rootScope.vinURL = '/inspection/' + $rootScope.inspectionPath + '/vinScanner';
 			return $rootScope.vinURL;
 		}
 	}]);
 });