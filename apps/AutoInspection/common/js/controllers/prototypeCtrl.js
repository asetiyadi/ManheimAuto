 /****************************************************************************************
 *
 *  PROTOTYPE TEMPORARY DATA
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('prototypeCtrl', ['$scope','$rootScope','$state',
        function ($scope,$rootScope,$state) {
        $scope.params = $state.params;
        $scope.urlParams = $scope.params.vinNum;
        $scope.inspectionParam = $scope.params.inspectionPath;
        /*******************************************************
        *  BEGIN PROTOTYPE STUB DATA SECTION                    
        *******************************************************/
        $scope.getSilverTempData = function () {
            if ($scope.urlParams === '1FTFW1EF3BFC19451') {
                $scope.formData = { 
                    "precheck_Inspection1":"yes",
                    "precheck_Inspection2":"yes",
                    "precheck_Inspection3":"yes",
                    "precheck_Inspection4":"yes",
                    "precheck_Inspection5":"yes",
                    "frontInterior_Inspection1":"yes",
                    "frontInterior_Inspection2":"yes",
                    "frontInterior_Inspection6":"yes",
                    "leftFrontInterior_Inspection1":"yes",
                    "leftFrontInterior_Inspection2":"yes",
                    "frontInterior_Inspection3":"yes",
                    "frontInterior_Inspection4":"yes",
                    "frontInterior_Inspection5":"yes",
                    "frontExterior_Inspection1":"yes",
                    "frontExterior_Inspection2":"yes",
                    "frontExterior_Inspection3":"yes",
                    "frontExterior_Inspection4":"yes",
                    "frontExterior_Inspection5":"yes",
                    "frontExterior_Inspection6":"yes",
                    "leftFrontExterior_Inspection1":"yes",
                    "leftFrontExterior_Inspection2":"yes",
                    "engine_Inspection1":"yes",
                    "engine_Inspection2":"yes",
                    "engine_Inspection3":"yes",
                    "engine_Inspection4":"yes",
                    "engine_Inspection5":"yes",
                    "engine_Inspection6":"yes",
                    "roadTest_Inspection1":"no",
                    "roadTest_Inspection2":"yes",
                    "roadTest_Inspection3":"yes",
                    "roadTest_Inspection4":"yes",
                    "roadTest_Inspection5":"yes",
                    "underVehicle_Inspection1":"no",
                    "underVehicle_Inspection6":"yes",
                    "underVehicle_Inspection5":"yes",
                    "underVehicle_Inspection4":"yes",
                    "underVehicle_Inspection3":"yes",
                    "underVehicle_Inspection2":"yes"
                };
            } 
        };
        $scope.getGoldTempData = function () {
            if ($scope.urlParams === '3FA6P0HR5DR226247') {
                $scope.formData = {
                    "precheck_Inspection1":"yes",
                    "frontInterior_Inspection1":"yes",
                    "frontInterior_Inspection2":"yes",
                    "frontInterior_Inspection3":"yes",
                    "frontInterior_Inspection4":"yes",
                    "frontInterior_Inspection5":"yes",
                    "frontInterior_Inspection6":"yes",
                    "frontInterior_Inspection7":"yes",
                    "leftFrontInterior_Inspection1":"yes",
                    "leftFrontInterior_Inspection2":"yes",
                    "leftFrontInterior_Inspection3":"yes",
                    "leftFrontInterior_Inspection4":"yes",
                    "leftFrontInterior_Inspection5":"yes",
                    "leftFrontInterior_Inspection6":"yes",
                    "leftFrontInterior_Inspection7":"yes",
                    "leftRearInterior_Inspection1":"yes",
                    "leftRearInterior_Inspection2":"yes",
                    "leftRearInterior_Inspection3":"yes",
                    "leftRearInterior_Inspection4":"yes",
                    "leftRearInterior_Inspection5":"yes",
                    "leftRearInterior_Inspection6":"yes",
                    "leftRearInterior_Inspection7":"yes",
                    "rightRearInterior_Inspection1":"yes",
                    "rightRearInterior_Inspection2":"yes",
                    "rightRearInterior_Inspection3":"yes",
                    "rightRearInterior_Inspection4":"yes",
                    "rightRearInterior_Inspection5":"yes",
                    "rightRearInterior_Inspection6":"yes",
                    "rightRearInterior_Inspection7":"yes",
                    "rightFrontInterior_Inspection1":"yes",
                    "rightFrontInterior_Inspection2":"yes",
                    "rightFrontInterior_Inspection3":"yes",
                    "rightFrontInterior_Inspection4":"yes",
                    "rightFrontInterior_Inspection5":"yes",
                    "rightFrontInterior_Inspection6":"yes",
                    "rightFrontInterior_Inspection7":"yes",
                    "frontExterior_Inspection1":"yes",
                    "frontExterior_Inspection7":"yes",
                    "frontExterior_Inspection6":"yes",
                    "frontExterior_Inspection5":"yes",
                    "frontExterior_Inspection4":"yes",
                    "frontExterior_Inspection3":"yes",
                    "frontExterior_Inspection2":"yes",
                    "leftFrontExterior_Inspection1":"yes",
                    "leftFrontExterior_Inspection2":"yes",
                    "leftFrontExterior_Inspection3":"yes",
                    "leftFrontExterior_Inspection4":"yes",
                    "leftFrontExterior_Inspection5":"yes",
                    "leftFrontExterior_Inspection6":"yes",
                    "leftFrontExterior_Inspection7":"yes",
                    "leftRearExterior_Inspection1":"yes",
                    "leftRearExterior_Inspection2":"yes",
                    "leftRearExterior_Inspection3":"yes",
                    "leftRearExterior_Inspection4":"yes",
                    "leftRearExterior_Inspection5":"yes",
                    "leftRearExterior_Inspection6":"yes",
                    "leftRearExterior_Inspection7":"yes",
                    "rightRearExterior_Inspection1":"yes",
                    "rightRearExterior_Inspection2":"yes",
                    "rightRearExterior_Inspection3":"yes",
                    "rightRearExterior_Inspection4":"yes",
                    "rightRearExterior_Inspection5":"yes",
                    "rightRearExterior_Inspection6":"yes",
                    "rightRearExterior_Inspection7":"yes",
                    "rightFrontExterior_Inspection7":"yes",
                    "rightFrontExterior_Inspection6":"yes",
                    "rightFrontExterior_Inspection5":"yes",
                    "rightFrontExterior_Inspection4":"yes",
                    "rightFrontExterior_Inspection3":"yes",
                    "rightFrontExterior_Inspection2":"yes",
                    "rightFrontExterior_Inspection1":"yes",
                    "engine_Inspection1":"no",
                    "engine_Inspection2":"yes",
                    "engine_Inspection3":"yes",
                    "engine_Inspection4":"yes",
                    "engine_Inspection5":"yes",
                    "engine_Inspection6":"yes",
                    "engine_Inspection7":"yes",
                    "roadTest_Inspection1":"yes",
                    "roadTest_Inspection2":"yes",
                    "roadTest_Inspection3":"yes",
                    "roadTest_Inspection4":"yes",
                    "roadTest_Inspection5":"yes",
                    "roadTest_Inspection6":"yes",
                    "roadTest_Inspection7":"yes",
                    "underVehicle_Inspection1":"no",
                    "underVehicle_Inspection2":"yes",
                    "underVehicle_Inspection3":"yes",
                    "underVehicle_Inspection4":"yes",
                    "underVehicle_Inspection5":"yes",
                    "underVehicle_Inspection6":"yes",
                    "underVehicle_Inspection7":"yes"
                };
            }
        };
        $rootScope.$on("$stateChangeSuccess", function () {
            if ($scope.inspectionParam === 'silver') {
                $scope.getSilverTempData();
            } else if ($scope.inspectionParam === 'gold') {
                $scope.getGoldTempData();
            }
        });
        /*******************************************************
        *  END PROTOTYPE STUB DATA SECTION                    
        *******************************************************/
 	}]);
 });