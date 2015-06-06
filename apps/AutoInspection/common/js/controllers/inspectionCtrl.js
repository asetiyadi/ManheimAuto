
 /****************************************************************************************
 *
 *  INSPECTION CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
    'use strict';
 	controllers.controller('inspectionCtrl', ['$scope','$rootScope','$http','$timeout','locationService','$log','$state','$window','reportFactory','$modal','productFactory',
        function ($scope,$rootScope,$http,$timeout,locationService,$log,$state,$window,reportFactory,$modal,productFactory) {
        /*******************************************************
        *  VARIABLES                            
        *******************************************************/
        $scope.inspectionURL = locationService.getInspectionUrl();
        $scope.vinURL = locationService.getVinUrl();
        $scope.inspectionPath = locationService.getInspectionPath();
        $scope.params = $state.params;
        $scope.inspectionParam = $scope.params.inspectionPath;
        $scope.urlParams = $rootScope.vinNum;
        $scope.progressPercent = 0;
        $scope.quantity = 0;
        $scope.total = 0;
        $scope.date = new Date();
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
        // repair overlay variables
        $scope.listMenu = true; // default
        $scope.summaryMenu = false;
        $scope.selectedProduct = false;
        $scope.productOrders = false;
        $scope.orderDetails = false;


        // attachment overlay - watch the notes field for text updates so that the variable can be updated
        $rootScope.$watch('fields.note', function (newVal,oldVal) {
            if (newVal !== oldVal) {
                $rootScope.fields.attachment = newVal;
            }
        });
        // counts the number of radio elements that have been clicked
        $scope.numItems = function () {
            $scope.checkedInput = angular.element('#form-views').length;
        };
        // progress bar calculation
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
        *  REPAIR CART SECTION                       
        *******************************************************/
        $scope.repairInvoice = [];
        $scope.addItem = function(desc,price,qty,id) {
            $scope.repairInvoice.push({
                desc:desc,
                price:price,
                id:id,
                qty:qty
            });
            $scope.quantity = 0; // reset quantity
        };
        $scope.removeItem = function(index) {
            $scope.repairInvoice.splice(index, 1);
        };
        $scope.increment = function () {
            $scope.quantity++;
        };
        $scope.decrement = function () {
            if ($scope.quantity === 0) { return; }
            $scope.quantity--;
        };
        $scope.getPartsTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.repairInvoice.length; i++) {
                var product = $scope.repairInvoice[i];
                total += (product.qty * product.price);
            }
            return total;
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
        };
        /*******************************************************
        *  UPLOAD VEHICLE IMAGE                          
        *******************************************************/
        $scope.onFileSelect = function($files) {
            // $files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: 'server/upload/url', // upload.php script, node.js route, or servlet url
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
        // changes the text from add photo to the file path and file name of the image that is getting uploaded
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
        var orderPromise;
        $scope.getProductList = function () {
            listPromise = productFactory.productList();
            listPromise.then(function (data) {
                $scope.productList = data.products;
            });
        };
        $scope.getProductList();
        /*******************************************************
        *  ORDERS SECTION                         
        *******************************************************/
        // pulls in the data to display all orders that have been started - just using stub data currently
        $scope.getProductOrders = function () {
            orderPromise = productFactory.ordersList();
            orderPromise.then(function (data) {
                $scope.ordersList = data.orders;
            });
        };
        $scope.getProductOrders(); 
        $scope.selectProduct = function (product) {
            $scope.productSelect = true;
            $scope.selected = product;
            $scope.selectedProduct = true;
            $scope.listMenu = false; 
            $scope.summaryMenu = false;
        };
        $scope.selected = {};
        $scope.itemDetails = [];
        // this function gets called within the factory call in getOrderDetails function 
        // obj is the data from orderDetailsPromise call, and key is the selected order ID
        // function loops through each item listed on the order and pulls in details for
        // each item (price,name,etc.)
        $scope.getOrderItemDetails = function (obj,key) {
            for (var i = 0; i < key.length; i++) {
                var itemID = key[i].itemID;
                for (var j=0; j < obj.length; j++) {
                    if (obj[j].id === itemID) {
                        var result = obj[j];
                        $scope.itemDetails.push(result);
                    }
                }
            }
        }; 
        // takes selected order and makes a call to pull in item details for items listed on selected order 
        $scope.getOrderDetails = function (items) {
            var orderDetailsPromise;
            $scope.orderDetails = true;
            $scope.productOrders = false;
            $scope.selectedItems = items;
            orderDetailsPromise = productFactory.productList();
            orderDetailsPromise.then(function (data) {
                $scope.details = data.products;
                $scope.getOrderItemDetails($scope.details,$scope.selectedItems);
            });
        };
        // get the total for the selected order 
        $scope.getTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.itemDetails.length; i++) {
                $scope.price = $scope.itemDetails[i].price;
                total += $scope.price;
            }
            return total;
        };
        // toggle product view - LIST 
        $scope.toggleList = function() {
            $scope.listMenu = true;
            $scope.summaryMenu = false;
        };
        // toggle product view - SUMMARY 
        $scope.toggleSummary = function() {
            $scope.summaryMenu = true;
            $scope.listMenu = false;
        };
        // orders page - sets variables so that the orders page displays
        $scope.showOrders = function () {
            $scope.productOrders = true;
            $scope.listMenu = false; 
            $scope.summaryMenu = false;
            $scope.selectedProduct = false;
        };
        // back button - sets variables so that the product list displays 
        $scope.backToProductList = function () {
            $scope.listMenu = true; 
            $scope.selectedProduct = false;
            $scope.summaryMenu = false;
            $scope.productOrders = false;
        };
        // back button - sets variables so that the order list displays 
        $scope.backToOrderList = function () {
            $scope.listMenu = false; 
            $scope.selectedProduct = false;
            $scope.summaryMenu = false;
            $scope.orderDetails = false;
            $scope.productOrders = true;
        };
        /*******************************************************
        *  PRODUCT OVERLAY MODAL                       
        *******************************************************/
        $scope.productModal = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/elements/product-overlay.html',
                scope: $scope,
                size: 'lg'
            });
        };
        $scope.submit = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
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
                // currently api is only set up for these report areas,
                // once more data is available this needs to be updated 
                $scope.interior = data.interior; 
                $scope.exterior = data.exterior;
                $scope.engine = data.engine;
                $scope.frontInterior = $scope.interior.front;
                // following if statements check if a section is available, if
                // it is then it will push the length of the object to a variable 
                // that will be used to calculate the total number of questions on 
                // the report pages. This is used for the progress bar
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
        // this function switches that data that is used in 
        // the form when the user switches the view 
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
        // need to delay so data from factory call is available
        $timeout(function () {
            $scope.setDataForm(currentPath);
        },500);
        $rootScope.$on("$stateChangeSuccess", function () {
            var current = $state.$current;
            var str = current.toString();
            var currentPath = str.substr(str.lastIndexOf('.')+1);
            // no need to delay here, the data is already available
            $scope.setDataForm(currentPath);
        });
        $scope.getReport();
 	}]).controller('AttachmentModalCtrl', ['$scope','$rootScope','$modalInstance','$log','editName','editValue', 
        function ($scope,$rootScope,$modalInstance,$log,editName,editValue) {
        $scope.note;
        var name = editName;
        var value = editValue;
        $scope.submit = function () {
            $rootScope.fields.attachment = $rootScope.fields.note;
            $modalInstance.dismiss('cancel');
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
 });