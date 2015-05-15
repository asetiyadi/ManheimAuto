/****************************************************************************************
*
*  PROGRESS BAR CONTROLLER
*  @version (.1)
*  @date (2015)
*
*****************************************************************************************/
define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('progressBarCtrl', ['$scope','$rootScope','$state','locationService','$timeout',
        function ($scope,$rootScope,$state,locationService,$timeout) {
        /*******************************************************
        *  VARIABLES                            
        *******************************************************/
        $scope.state = $state;
        $scope.stateName = $state.current.name;
        $scope.params = $state.params;
        $scope.inspectionParam = $scope.params.inspectionPath;
        var amt = 0;
        $scope.countFrom = 0;
        $scope.countTo = amt;
        $scope.progressValue = amt;

        /*******************************************************
        *  DYNAMIC PROGRESS BAR                     
        *******************************************************/
        $scope.getBronzeProgress = function () {
            $scope.state = $state;
            $scope.stateName = $state.current.name;
            if ($scope.stateName === 'inspection.report.vehicleInterior.frontInterior') {
                var amt = 20;
                return amt;
            } else if ($scope.stateName === 'inspection.report.vehicleInterior.leftFrontInterior') {
                var amt = 40;
                return amt;
            } else if ($scope.stateName === 'inspection.report.vehicleExterior.frontExterior') {
                var amt = 60;
                return amt;
            } else if ($scope.stateName === 'inspection.report.vehicleExterior.leftFrontExterior') {
                var amt = 80;
                return amt;
            } else if ($scope.stateName === 'inspection.report.vehicleEngine') {
                var amt = 100;
                return amt;
            }
            $scope.countFrom = 0;
            $scope.countTo = amt;
            $scope.progressValue = amt;
        };

        $rootScope.$on("$stateChangeSuccess", function () {
            if ($scope.inspectionParam === 'bronze') {
                $scope.getBronzeProgress();
            } else if ($scope.inspectionParam === 'silver') {

            } else if ($scope.inspectionParam === 'gold') {

            }
        });

    }]);
});