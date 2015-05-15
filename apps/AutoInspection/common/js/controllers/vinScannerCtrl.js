 /****************************************************************************************
 *
 *  VIN SCANNER CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('vinScannerCtrl', ['$scope','$state','$log','$http','$timeout','$rootScope',
 		function ($scope,$state,$log,$http,$timeout,$rootScope) {
        $scope.manualVinForm = {};
        /*******************************************************
        *  MANUAL VIN SECTION                       
        *******************************************************/
        $scope.submit = function() {
            $state.go('/dealerVehicleInfo');
        };
        $scope.vinNum = {
            vin1: "Z",
            vin2: "H",
            vin3: "W",
            vin4: "U",
            vin5: "R",
            vin6: "1",
            vin7: "Z",
            vin8: "D",
            vin9: "5",
            vin10: "E",
            vin11: "L",
            vin12: "A",
            vin13: "0",
            vin14: "2",
            vin15: "9",
            vin16: "9",
            vin17: "2" 
        };
        $scope.defaultForm = {
            vin1: "",
            vin2: "",
            vin3: "",
            vin4: "",
            vin5: "",
            vin6: "",
            vin7: "",
            vin8: "",
            vin9: "",
            vin10: "",
            vin11: "",
            vin12: "",
            vin13: "",
            vin14: "",
            vin15: "",
            vin16: "",
            vin17: ""
        };
        $scope.clearForm = function () {
            var firstInput = angular.element('#input1');
            $scope.manualVinForm.$setPristine();
            $scope.vinNum = $scope.defaultForm;
            firstInput.focus();
        };
        /*******************************************************
        *  SUBMIT FORM                        
        *******************************************************/
        $scope.submitForm = function () {
            $scope.loading = true;
            /*******************************************************
            *  EDMUNDS API VIN DECODE                             
            *******************************************************/
            $scope.vinData = [];
            $scope.formData = $scope.vinNum;
            angular.forEach($scope.formData, function(value,key) {
                $scope.vinData.push(value)
            });
            var vinNum = $scope.vinData.join("");
            $log.info('vin: ' + vinNum);
            $scope.apiKey = 'qb2vxv4qzn77hns26zdqzasv';
            var vinURL = 'https://api.edmunds.com/api/vehicle/v2/vins/'+vinNum+'?&fmt=json&api_key='+$scope.apiKey;
            $log.info('vin url: ' + vinURL);
            //
            //
            //
            if (vinNum != undefined) {
                $http.get(vinURL).success(function (data,status,headers,config) {
                    // delay for 2 secs
                    $timeout(function() {
                        $scope.loading = false;
                        $rootScope.vehicleData = data;
                        $rootScope.make = $scope.vehicleData.make.name;
                        $rootScope.model = $scope.vehicleData.model.name
                        $rootScope.vehicleSize = $scope.vehicleData.categories.vehicleSize;
                        $rootScope.hwyMPG = $scope.vehicleData.MPG.highway;
                        $rootScope.cityMPG = $scope.vehicleData.MPG.city;
                        $rootScope.market = $scope.vehicleData.categories.market;
                        $rootScope.baseMSRP = $scope.vehicleData.price.baseMSRP;
                        $state.go('inspection.report.dealerVehicleInfo',({vinNum:vinNum}));
                    }, 2000);
                }).error(function (data,status,headers,config) {
                    // delay for 2 secs
                    $timeout(function() {
                        $scope.loading = false;
                        // bad request
                        if (status === 400 || status === 404) {
                            $scope.statusTxt = 'Invalid VIN entered, please try again.';
                            $scope.clearForm();
                        }
                    }, 2000);
                });
            }
        };
 	}]);
 });