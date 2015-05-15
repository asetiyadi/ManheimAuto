 /****************************************************************************************
 *
 *  NAVIGATION CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('navigationCtrl', ['$scope','$state','$rootScope','navigationFactory','locationService',
        function ($scope,$state,$rootScope,navigationFactory,locationService) {
        /*******************************************************
        *  VARIABLES                            
        *******************************************************/
        $scope.interior = false;
        $scope.exterior = false;
        $scope.inspectionPath = locationService.getInspectionPath();
        /*******************************************************
        *  NAVIGATION LIST DATA                         
        *******************************************************/
        $rootScope.$on('$viewContentLoaded', function () {
            // navigation active states
            $scope.dealerActive = $state.includes('inspection.report.dealerVehicleInfo');
            $scope.preCheckActive = $state.includes('inspection.report.preCheck');
            $scope.interiorActive = $state.includes('inspection.report.vehicleInterior');
            $scope.exteriorActive = $state.includes('inspection.report.vehicleExterior');
            $scope.engineActive = $state.includes('inspection.report.vehicleEngine');
            $scope.roadActive = $state.includes('inspection.report.roadTest');        
            $scope.underVehicleActive = $state.includes('inspection.report.underVehicle');        
            $scope.summaryActive = $state.includes('inspection.report.summary');
            var promise;
        	if ($scope.inspectionPath === 'bronze') {
        		// -----------------
        		// bronze navigation
        		// -----------------
        		promise = navigationFactory.bronzeData();
                promise.then(function (data) {
                    $scope.navigationList = data;
                });
        	} else if ($scope.inspectionPath === 'silver') {
        		// -----------------
        		// silver navigation
        		// -----------------
        		promise = navigationFactory.silverData();
                promise.then(function (data) {
                    $scope.navigationList = data;
                });
        	} else if ($scope.inspectionPath === 'gold') {
        		// ---------------
        		// gold navigation
        		// ---------------
        		promise = navigationFactory.goldData();
                promise.then(function (data) {
                    $scope.navigationList = data;
                });
        	}
        });
 	}]);
 });