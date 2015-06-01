
 /****************************************************************************************
 *
 *  INSPECTION CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
    'use strict';
 	controllers.controller('inspectionCtrl', ['$scope','$rootScope','$http','$timeout','locationService','$log','$state','$window','reportFactory','$modal','productListFactory',
        function ($scope,$rootScope,$http,$timeout,locationService,$log,$state,$window,reportFactory,$modal,productListFactory) {
        /*******************************************************
        *  VARIABLES                            
        *******************************************************/
        $scope.inspectionURL = locationService.getInspectionUrl();
        $scope.vinURL = locationService.getVinUrl();
        $scope.inspectionPath = locationService.getInspectionPath();
        $scope.params = $state.params;
        $scope.inspectionParam = $scope.params.inspectionPath;
        $scope.urlParams = $rootScope.vinNum;
        $scope.date = new Date();
        $scope.listMenu = true; //default view when product overlay is open
        $scope.summaryMenu = false;
        $scope.selectedProduct = false;
        $scope.newTxt = '';
        $scope.manualVinForm = {};
        $scope.apiData = {};
        $scope.count = [];
        $scope.selectedQuestions = [];
        $rootScope.formData = {};
        $rootScope.fields = {
            attachment: '',
            note: ''
        };
        // watch the notes field for text updates
        $rootScope.$watch('fields.note', function (newVal,oldVal) {
            if (newVal !== oldVal) {
                $log.warn("New Val = ");   
                $rootScope.fields.attachment = newVal;
            }
        });
        //warn users about data loss on page reload
        $window.onbeforeunload = function () {
            return 'You will lose all unsaved changes.';
        };
        $scope.numItems = function () {
            $scope.checkedInput = angular.element('#form-views').length;
        };
        $scope.calculateProgress = function () {
            $rootScope.objKeys = Object.keys($rootScope.formData);
            $rootScope.objLength = $rootScope.objKeys.length;
            $scope.calculatePercent = ($rootScope.objLength/$scope.totalCount) * 100;
            $scope.progressPercent = Math.ceil($scope.calculatePercent.toFixed(2));
        };

        /*******************************************************
        *  ATTACHMENT OVERLAY MODAL TOGGLE                        
        *******************************************************/
        $scope.attachmentModal = function(name,value) {
            var modalInstance = $modal.open({
                templateUrl: '../../views/elements/attachment-overlay.html',
                controller: 'AttachmentModalCtrl',
                size: 'lg',
                resolve: {
                    editName : function() {
                        return name;
                    },
                    editValue : function() {
                        return value;
                    }
                }
            });
        };

        /*******************************************************
        *  MANUAL VIN SECTION                       
        *******************************************************/
        $scope.manualVinForm = {};
        $scope.submit = function() {
            $state.go('/dealerVehicleInfo');
        };
        $scope.clearForm = function () {
            var firstInput = angular.element('#input1');
            $scope.manualVinForm.$setPristine();
            $scope.urlParams = $scope.urlParams;
            firstInput.focus();
        };
        /*******************************************************
        *  SUBMIT FORM                        
        *******************************************************/
        $scope.submitForm = function (vinNum) {
            $scope.vinNum = vinNum;
            $scope.loading = true;
            /*******************************************************
            *  EDMUNDS API VIN DECODE                             
            *******************************************************/
            $scope.apiKey = 'qb2vxv4qzn77hns26zdqzasv';
            if ($scope.urlParams != undefined) {
                var vinURL = 'https://api.edmunds.com/api/vehicle/v2/vins/'+$scope.urlParams+'?&fmt=json&api_key='+$scope.apiKey;
                $http.get(vinURL).success(function (data,status,headers,config) {
                    // delay for 2 secs
                    $timeout(function() {
                        $scope.loading = false;
                        $scope.vehicleData = data;
                        $scope.make = $scope.vehicleData.make.name;
                        $scope.model = $scope.vehicleData.model.name
                        $state.go('inspection.report.dealerVehicleInfo',({vinNum:$scope.urlParams}));
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
            } else {
                var vinURL = 'https://api.edmunds.com/api/vehicle/v2/vins/'+$scope.vinNum+'?&fmt=json&api_key='+$scope.apiKey;
                $http.get(vinURL).success(function (data,status,headers,config) {
                    // delay for 2 secs
                    $timeout(function() {
                        $scope.loading = false;
                        $scope.vehicleData = data;
                        $scope.make = $scope.vehicleData.make.name;
                        $scope.model = $scope.vehicleData.model.name
                        $state.go('inspection.report.dealerVehicleInfo',({vinNum:$scope.vinNum}));
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
        /*******************************************************
        *  UPLOAD VEHICLE IMAGE                          
        *******************************************************/
        $scope.onFileSelect = function($files) {
            // $files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: 'server/upload/url', //upload.php script, node.js route, or servlet url
                    data: {myObj: $scope.myModelObj},
                    file: file,
                }).progress(function(evt) {
                    $log.info('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    $log.info(data);
                });
            }
        };
        $scope.change = function (element,scope) {
            var fileName = element.value;
            $scope.newTxt = fileName;
            $scope.$apply();
        };
        /*******************************************************
        *  INSPECTION PATH SELECTION                          
        *******************************************************/
        $scope.nextStep = function (inspectionPath) {
            $state.go('inspection.vinScanner',({inspectionPath:inspectionPath}));
        };
        /*******************************************************
        *  PRODUCT LIST SECTION                         
        *******************************************************/
        var listPromise;
        $scope.getProductList = function () {
            listPromise = productListFactory.productList();
            listPromise.then(function (data) {
                $scope.productList = data.products;
            });
        };
        $scope.getProductList();
        $scope.selectProduct = function (product) {
            $scope.productSelect = true;
            $scope.selected = product;
            $scope.selectedProduct = true;
            $scope.listMenu = false; 
            $scope.summaryMenu = false;
        };
        $scope.selected = {}; 
        $scope.productModal = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/elements/product-overlay.html',
                scope: $scope,
                size: 'lg'
            });
        };
        $scope.backToProductList = function () {
            $scope.listMenu = true; 
            $scope.selectedProduct = false;
            $scope.summaryMenu = false;
        };
        $scope.submit = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.toggleList = function() {
            $scope.listMenu = true;
            $scope.summaryMenu = false;
        };
        $scope.toggleSummary = function() {
            $scope.summaryMenu = true;
            $scope.listMenu = false;
        };
        /*******************************************************
        *  REPORT SECTION                         
        *******************************************************/
        var reportPromise;
        $scope.frontInterior = {};
        $scope.leftFrontInterior = {};
        $scope.leftRearInterior = {};
        $scope.rightRearInterior = {};
        $scope.rightFrontInterior = {};
        $scope.frontExterior = {};
        $scope.leftFrontExterior = {};
        $scope.leftRearExterior = {};
        $scope.rightRearExterior = {};
        $scope.rightFrontExterior = {};
        $scope.engine = {};
        $scope.getReport = function () {
            reportPromise = reportFactory.getChecklist();
            reportPromise.then(function (data) {
                if(data.status === 401) {
                    $state.go("login");
                    return;
                }

                $scope.interior = data.interior;
                $scope.exterior = data.exterior;
                $scope.engine = data.engine;

                $scope.frontInterior = $scope.interior.front;
                if ($scope.frontInterior != undefined) {
                    $scope.count.push($scope.frontInterior.length);
                }
                $scope.leftFrontInterior = $scope.interior.leftFront;
                if ($scope.leftFrontInterior != undefined) {
                    $scope.count.push($scope.leftFrontInterior.length);
                }
                $scope.leftRearInterior = $scope.interior.leftRear;
                if ($scope.leftRearInterior != undefined) {
                    $scope.count.push($scope.leftRearInterior.length);
                }
                $scope.rightRearInterior = $scope.interior.rightRear;
                if ($scope.rightRearInterior != undefined) {
                    $scope.count.push($scope.rightRearInterior.length);
                }
                $scope.rightFrontInterior = $scope.interior.rightFront;
                if ($scope.rightFrontInterior != undefined) {
                    $scope.count.push($scope.rightFrontInterior.length);
                }
                $scope.frontExterior = $scope.exterior.front;
                if ($scope.frontExterior != undefined) {
                    $scope.count.push($scope.frontExterior.length);
                }
                $scope.leftFrontExterior = $scope.exterior.leftFront;
                if ($scope.leftFrontExterior != undefined) {
                    $scope.count.push($scope.leftFrontExterior.length);
                }
                $scope.leftRearExterior = $scope.exterior.leftRear;
                if ($scope.leftRearExterior != undefined) {
                    $scope.count.push($scope.leftRearExterior.length);
                }
                $scope.rightRearExterior = $scope.exterior.rightRear;
                if ($scope.rightRearExterior != undefined) {
                    $scope.count.push($scope.rightRearExterior.length);
                }
                $scope.rightFrontExterior = $scope.exterior.rightFront;
                if ($scope.rightFrontExterior != undefined) {
                    $scope.count.push($scope.rightFrontExterior.length);
                }
                $scope.vehicleEngine = $scope.engine.engineCompartment;
                if ($scope.vehicleEngine != undefined) {
                    $scope.count.push($scope.vehicleEngine.length);
                }
                $scope.totalCount = 0;
                for (var i = 0;i < $scope.count.length;i++) {
                    $scope.totalCount += $scope.count[i] << 0;
                }
            });
        };
        /*******************************************************
        *  DYNAMIC NG-REPEAT REPORT                  
        *******************************************************/
        var current = $state.$current;
        var str = current.toString();
        var currentPath = str.substr(str.lastIndexOf('.')+1);
        $scope.setDataForm = function (currentPath) {
            if (currentPath === 'preCheck') {
                $scope.dataForm = $scope.checklist; 
            } else if (currentPath === 'frontInterior') {
                $scope.dataForm = $scope.frontInterior;
            } else if (currentPath === 'leftFrontInterior') {
                $scope.dataForm = $scope.leftFrontInterior;
            } else if (currentPath === 'leftRearInterior') {
                $scope.dataForm = $scope.leftRearInterior;
            } else if (currentPath === 'rightRearInterior') {
                $scope.dataForm = $scope.rightRearInterior;
            } else if (currentPath === 'rightFrontInterior') {
                $scope.dataForm = $scope.rightFrontInterior;
            } else if (currentPath === 'frontExterior') {
                $scope.dataForm = $scope.frontExterior;
            } else if (currentPath === 'leftFrontExterior') {
                $scope.dataForm = $scope.leftFrontExterior;
            } else if (currentPath === 'leftRearExterior') {
                $scope.dataForm = $scope.leftRearExterior;
            } else if (currentPath === 'rightRearExterior') {
                $scope.dataForm = $scope.rightRearExterior;
            } else if (currentPath === 'rightFrontExterior') {
                $scope.dataForm = $scope.rightFrontExterior;
            } else if (currentPath === 'vehicleEngine') {
                $scope.dataForm = $scope.vehicleEngine;
            } else if (currentPath === 'roadTest') {
                $scope.dataForm = $scope.roadTest;
            } else if (currentPath === 'underVehicle') {
                $scope.dataForm = $scope.underVehicle;
            }
        };
        /*******************************************************
        *   APP RELOAD LOGIC                      
        *******************************************************/
        //only delay on first load or reload so data has time to populate
        $timeout(function () {
            $scope.setDataForm(currentPath);
        },500);
        $rootScope.$on("$stateChangeSuccess", function () {
            var current = $state.$current;
            var str = current.toString();
            var currentPath = str.substr(str.lastIndexOf('.')+1);
            //$scope.calculateProgress();
            //no need to delay here, the data is already available
            $scope.setDataForm(currentPath);
        });
        $scope.init = function () {
            $scope.params = $state.params;
            $scope.urlParams = $scope.params.vinNum;
            // if vin is not empty
            if (($scope.urlParams != null) || ($scope.urlParams != undefined)) {
                // call the api 
                $scope.submitForm();
                // also redirect to initial report page, this if statement
                // only runs if the page has been reloaded in the report section
                // since this controller initially runs before the vin param
                // is actually set
                $state.go('inspection.report.dealerVehicleInfo');
            }
        };
        $scope.init();
        $scope.getReport();
 	}]).controller('AttachmentModalCtrl', ['$scope','$rootScope','$modalInstance','$log','editName','editValue', 
        function ($scope,$rootScope,$modalInstance,$log,editName,editValue) {
        $scope.note;
        var name = editName;
        var value = editValue;
        $scope.submit = function () {
            $rootScope.fields.attachment = $rootScope.fields.note;
            $modalInstance.dismiss('cancel');
        }
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
 });