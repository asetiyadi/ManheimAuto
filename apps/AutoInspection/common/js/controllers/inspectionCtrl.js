
 /****************************************************************************************
 *
 *  INSPECTION CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
    'use strict';
 	controllers.controller('inspectionCtrl', ['$scope','$rootScope','$http','$timeout','locationService','$log','$state','$window','tempReportFactory',
        function ($scope,$rootScope,$http,$timeout,locationService,$log,$state,$window,tempReportFactory) {
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
        $scope.newTxt = '';
        $scope.manualVinForm = {};
        $scope.apiData = {};
        $scope.count = [];
        $scope.selectedQuestions = [];
        /*******************************************************
        *  BEGIN PROTOTYPE STUB DATA SECTION                    
        *
        *  this section is only necessary for the prototype
        *  presentation. once prototype has been presented the
        *  data will all be changed to pull from an api. setting
        *  flags will need to be adjusted after the data change 
        *  so for now the flags are super hard-coded. 
        *
        *******************************************************/
        $scope.dealerSectionComplete = false;
        //interior
        $scope.frontInteriorComplete = false;
        $scope.leftFrontInteriorComplete = false;
        $scope.leftRearInteriorComplete = false;
        $scope.rightRearInteriorComplete = false;
        $scope.rightFrontInteriorComplete = false;
        $scope.interiorSectionComplete = false;
        //exterior
        $scope.frontExteriorComplete = false;
        $scope.leftFrontExteriorComplete = false;
        $scope.leftRearExteriorComplete = false;
        $scope.rightRearExteriorComplete = false;
        $scope.rightFrontExteriorComplete = false;
        $scope.exteriorSectionComplete = false;
        //engine
        $scope.engineComplete = false;
        //under vehicle
        $scope.underVehicleComplete = false;
        //road test
        $scope.roadTestComplete = false;
        //report complete
        $scope.inspectionComplete = false;
        $scope.setFlags = function () {
            // big hack, ran out of time to finish figuring out the logic.
            // TODO: modify completely once database API is utilized
            //pre-check
            var pc1=$scope.formData.precheck_Inspection1;
            var pc2=$scope.formData.precheck_Inspection2;
            var pc3=$scope.formData.precheck_Inspection3;
            var pc4=$scope.formData.precheck_Inspection4;
            var pc5=$scope.formData.precheck_Inspection5;
            var pc6=$scope.formData.precheck_Inspection6;
            var pc7=$scope.formData.precheck_Inspection7;
            //front interior
            var fi1=$scope.formData.frontInterior_Inspection1;
            var fi2=$scope.formData.frontInterior_Inspection2;
            var fi3=$scope.formData.frontInterior_Inspection3;
            var fi4=$scope.formData.frontInterior_Inspection4;
            var fi5=$scope.formData.frontInterior_Inspection5;
            var fi6=$scope.formData.frontInterior_Inspection6;
            var fi7=$scope.formData.frontInterior_Inspection7;
            //left front interior
            var lfi1=$scope.formData.leftFrontInterior_Inspection1;
            var lfi2=$scope.formData.leftFrontInterior_Inspection2;
            var lfi3=$scope.formData.leftFrontInterior_Inspection3;
            var lfi4=$scope.formData.leftFrontInterior_Inspection4;
            var lfi5=$scope.formData.leftFrontInterior_Inspection5;
            var lfi6=$scope.formData.leftFrontInterior_Inspection6;
            var lfi7=$scope.formData.leftFrontInterior_Inspection7;
            //left rear interior
            var lri1=$scope.formData.leftRearInterior_Inspection1;
            var lri2=$scope.formData.leftRearInterior_Inspection2;
            var lri3=$scope.formData.leftRearInterior_Inspection3;
            var lri4=$scope.formData.leftRearInterior_Inspection4;
            var lri5=$scope.formData.leftRearInterior_Inspection5;
            var lri6=$scope.formData.leftRearInterior_Inspection6;
            var lri7=$scope.formData.leftRearInterior_Inspection7;
            //right rear interior
            var rri1=$scope.formData.rightRearInterior_Inspection1;
            var rri2=$scope.formData.rightRearInterior_Inspection2;
            var rri3=$scope.formData.rightRearInterior_Inspection3;
            var rri4=$scope.formData.rightRearInterior_Inspection4;
            var rri5=$scope.formData.rightRearInterior_Inspection5;
            var rri6=$scope.formData.rightRearInterior_Inspection6;
            var rri7=$scope.formData.rightRearInterior_Inspection7;
            //right front interior
            var rfi1=$scope.formData.rightFrontInterior_Inspection1;
            var rfi2=$scope.formData.rightFrontInterior_Inspection2;
            var rfi3=$scope.formData.rightFrontInterior_Inspection3;
            var rfi4=$scope.formData.rightFrontInterior_Inspection4;
            var rfi5=$scope.formData.rightFrontInterior_Inspection5;
            var rfi6=$scope.formData.rightFrontInterior_Inspection6;
            var rfi7=$scope.formData.rightFrontInterior_Inspection7;
            //front exterior
            var fe1=$scope.formData.frontExterior_Inspection1;
            var fe2=$scope.formData.frontExterior_Inspection2;
            var fe3=$scope.formData.frontExterior_Inspection3;
            var fe4=$scope.formData.frontExterior_Inspection4;
            var fe5=$scope.formData.frontExterior_Inspection5;
            var fe6=$scope.formData.frontExterior_Inspection6;
            var fe7=$scope.formData.frontExterior_Inspection7;
            //left front exterior
            var lfe1=$scope.formData.leftFrontExterior_Inspection1;
            var lfe2=$scope.formData.leftFrontExterior_Inspection2;
            var lfe3=$scope.formData.leftFrontExterior_Inspection3;
            var lfe4=$scope.formData.leftFrontExterior_Inspection4;
            var lfe5=$scope.formData.leftFrontExterior_Inspection5;
            var lfe6=$scope.formData.leftFrontExterior_Inspection6;
            var lfe7=$scope.formData.leftFrontExterior_Inspection7;
            //left rear exterior
            var lre1=$scope.formData.leftRearExterior_Inspection1;
            var lre2=$scope.formData.leftRearExterior_Inspection2;
            var lre3=$scope.formData.leftRearExterior_Inspection3;
            var lre4=$scope.formData.leftRearExterior_Inspection4;
            var lre5=$scope.formData.leftRearExterior_Inspection5;
            var lre6=$scope.formData.leftRearExterior_Inspection6;
            var lre7=$scope.formData.leftRearExterior_Inspection7;
            //right rear exterior
            var rre1=$scope.formData.rightRearExterior_Inspection1;
            var rre2=$scope.formData.rightRearExterior_Inspection2;
            var rre3=$scope.formData.rightRearExterior_Inspection3;
            var rre4=$scope.formData.rightRearExterior_Inspection4;
            var rre5=$scope.formData.rightRearExterior_Inspection5;
            var rre6=$scope.formData.rightRearExterior_Inspection6;
            var rre7=$scope.formData.rightRearExterior_Inspection7;
            //right front exterior
            var rfe1=$scope.formData.rightFrontExterior_Inspection1;
            var rfe2=$scope.formData.rightFrontExterior_Inspection2;
            var rfe3=$scope.formData.rightFrontExterior_Inspection3;
            var rfe4=$scope.formData.rightFrontExterior_Inspection4;
            var rfe5=$scope.formData.rightFrontExterior_Inspection5;
            var rfe6=$scope.formData.rightFrontExterior_Inspection6;
            var rfe7=$scope.formData.rightFrontExterior_Inspection7;
            //engine
            var eg1=$scope.formData.engine_Inspection1;
            var eg2=$scope.formData.engine_Inspection2;
            var eg3=$scope.formData.engine_Inspection3;
            var eg4=$scope.formData.engine_Inspection4;
            var eg5=$scope.formData.engine_Inspection5;
            var eg6=$scope.formData.engine_Inspection6;
            var eg7=$scope.formData.engine_Inspection7;
            //under vehicle
            var uv1=$scope.formData.underVehicle_Inspection1;
            var uv2=$scope.formData.underVehicle_Inspection2;
            var uv3=$scope.formData.underVehicle_Inspection3;
            var uv4=$scope.formData.underVehicle_Inspection4;
            var uv5=$scope.formData.underVehicle_Inspection5;
            var uv6=$scope.formData.underVehicle_Inspection6;
            var uv7=$scope.formData.underVehicle_Inspection7;
            //road test
            var rt1=$scope.formData.roadTest_Inspection1;
            var rt2=$scope.formData.roadTest_Inspection2;
            var rt3=$scope.formData.roadTest_Inspection3;
            var rt4=$scope.formData.roadTest_Inspection4;
            var rt5=$scope.formData.roadTest_Inspection5;
            var rt6=$scope.formData.roadTest_Inspection6;
            var rt7=$scope.formData.roadTest_Inspection7;
            if ($scope.inspectionPath==='bronze') {
                //pre-check section complete
                if ((pc1!=null)&&(pc2!=null)&&(pc3!=null)&&(pc4!=null)&&(pc5!=null)) {
                    $scope.dealerSectionComplete=true;
                }
                if ((fi1!=null)&&(fi2!=null)&&(fi3!=null)&&(fi4!=null)&&(fi5!=null)) {
                    $scope.frontInteriorComplete=true;
                }
                if ((lfi1!=null)&&(lfi1!=null)&&(lfi1!=null)&&(lfi1!=null)&&(lfi1!=null)) {
                    $scope.leftFrontInteriorComplete=true;
                }
                //interior section complete
                if (($scope.frontInteriorComplete===true)&&($scope.leftFrontInteriorComplete===true)) {
                    $scope.interiorSectionComplete=true;
                }
                if ((fe1!=null)&&(fe2!=null)&&(fe3!=null)&&(fe4!=null)&&(fe5!=null)) {
                    $scope.frontExteriorComplete=true;
                }
                if ((lfe1!=null)&&(lfe2!=null)&&(lfe3!=null)&&(lfe4!=null)&&(lfe5!=null)) {
                    $scope.leftFrontExteriorComplete=true;
                }
                //exterior section complete
                if (($scope.frontExteriorComplete===true)&&($scope.leftFrontExteriorComplete===true)) {
                    $scope.exteriorSectionComplete=true;
                }
                //engine section complete
                if ((eg1!=null)&&(eg2!=null)&&(eg3!=null)&&(eg4!=null)&&(eg5!=null)) {
                    $scope.engineComplete=true;
                }
                //under vehicle section complete
                if ((uv1!=null)&&(uv2!=null)&&(uv3!=null)&&(uv4!=null)&&(uv5!=null)) {
                    $scope.underVehicleComplete=true;
                }
                //road test section complete
                if ((rt1!=null)&&(rt2!=null)&&(rt3!=null)&&(rt4!=null)&&(rt5!=null)) {
                    $scope.roadTestComplete=true;
                }
                //report complete
                if (($scope.interiorSectionComplete===true)&&($scope.exteriorSectionComplete===true)&&($scope.engineComplete===true)) {
                    $scope.inspectionComplete=true;
                }
            } else if ($scope.inspectionPath==='silver') {
                //pre-check section complete
                if ((pc1!=null)&&(pc2!=null)&&(pc3!=null)&&(pc4!=null)&&(pc5!=null)) {
                    $scope.dealerSectionComplete=true;
                }
                //interior
                if ((fi1!=null)&&(fi2!=null)&&(fi3!=null)&&(fi4!=null)&&(fi5!=null)) {
                    $scope.frontInteriorComplete=true;
                }
                if ((lfi1!=null)&&(lfi2!=null)&&(lfi3!=null)&&(lfi4!=null)&&(lfi5!=null)) {
                    $scope.leftFrontInteriorComplete=true;
                }
                if ((lri1!=null)&&(lri2!=null)&&(lri3!=null)&&(lri4!=null)&&(lri5!=null)) {
                    $scope.leftRearInteriorComplete=true;
                }
                if ((rri1!=null)&&(rri2!=null)&&(rri3!=null)&&(rri4!=null)&&(rri5!=null)) {
                    $scope.rightRearInteriorComplete=true;
                }
                if ((rfi1!=null)&&(rfi2!=null)&&(rfi3!=null)&&(rfi4!=null)&&(rfi5!=null)) {
                    $scope.rightFrontInteriorComplete=true;
                }
                //interior section complete
                if (($scope.frontInteriorComplete===true)&&($scope.leftFrontInteriorComplete===true)&&($scope.leftRearInteriorComplete===true)&&($scope.rightRearInteriorComplete===true)&&($scope.rightFrontInteriorComplete===true)) {
                    $scope.interiorSectionComplete=true;
                }
                //exterior
                if ((fe1!=null)&&(fe2!=null)&&(fe3!=null)&&(fe4!=null)&&(fe5!=null)) {
                    $scope.frontExteriorComplete=true;
                }
                if ((lfe1!=null)&&(lfe2!=null)&&(lfe3!=null)&&(lfe4!=null)&&(lfe5!=null)) {
                    $scope.leftFrontExteriorComplete=true;
                }
                if ((lre1!=null)&&(lre2!=null)&&(lre3!=null)&&(lre4!=null)&&(lre5!=null)) {
                    $scope.leftRearExteriorComplete=true;
                }
                if ((rre1!=null)&&(rre2!=null)&&(rre3!=null)&&(rre4!=null)&&(rre5!=null)) {
                    $scope.rightRearExteriorComplete=true;
                }
                if ((rfe1!=null)&&(rfe2!=null)&&(rfe3!=null)&&(rfe4!=null)&&(rfe5!=null)) {
                    $scope.rightFrontExteriorComplete=true;
                }
                //exterior section complete
                if (($scope.frontExteriorComplete===true)&&($scope.leftFrontExteriorComplete===true)&&($scope.leftRearExteriorComplete===true)&&($scope.rightRearExteriorComplete===true)&&($scope.rightFrontExteriorComplete===true)) {
                    $scope.exteriorSectionComplete=true;
                }
                //engine section complete
                if ((eg1!=null)&&(eg2!=null)&&(eg3!=null)&&(eg4!=null)&&(eg5!=null)) {
                    $scope.engineComplete=true;
                }
                //under vehicle section complete
                if ((uv1!=null)&&(uv2!=null)&&(uv3!=null)&&(uv4!=null)&&(uv5!=null)) {
                    $scope.underVehicleComplete=true;
                }
                //road test section complete
                if ((rt1!=null)&&(rt2!=null)&&(rt3!=null)&&(rt4!=null)&&(rt5!=null)) {
                    $scope.roadTestComplete=true;
                }
                //report section complete
                if (($scope.interiorSectionComplete===true)&&($scope.exteriorSectionComplete===true)&&($scope.engineComplete===true)&&($scope.underVehicleComplete===true)&&($scope.roadTestComplete===true)) {
                    $scope.inspectionComplete=true;
                }
            } else if ($scope.inspectionPath==='gold') {
                //pre-check section complete
                if ((pc1!=null)&&(pc2!=null)&&(pc3!=null)&&(pc4!=null)&&(pc5!=null)) {
                    $scope.dealerSectionComplete=true;
                }
                //interior
                if ((fi1!=null)&&(fi2!=null)&&(fi3!=null)&&(fi4!=null)&&(fi5!=null)&&(fi6!=null)&&(fi7!=null)) {
                    $scope.frontInteriorComplete=true;
                }
                if ((lfi1!=null)&&(lfi2!=null)&&(lfi3!=null)&&(lfi4!=null)&&(lfi5!=null)&&(lfi6!=null)&&(lfi7!=null)) {
                    $scope.leftFrontInteriorComplete=true;
                }
                if ((lri1!=null)&&(lri2!=null)&&(lri3!=null)&&(lri4!=null)&&(lri5!=null)&&(lri6!=null)&&(lri7!=null)) {
                    $scope.leftRearInteriorComplete=true;
                }
                if ((rri1!=null)&&(rri2!=null)&&(rri3!=null)&&(rri4!=null)&&(rri5!=null)&&(rri6!=null)&&(rri7!=null)) {
                    $scope.rightRearInteriorComplete=true;
                }
                if ((rfi1!=null)&&(rfi2!=null)&&(rfi3!=null)&&(rfi4!=null)&&(rfi5!=null)&&(rfi6!=null)&&(rfi7!=null)) {
                    $scope.rightFrontInteriorComplete=true;
                }
                //interior section complete
                if (($scope.frontInteriorComplete===true)&&($scope.leftFrontInteriorComplete===true)&&($scope.leftRearInteriorComplete===true)&&($scope.rightRearInteriorComplete===true)&&($scope.rightFrontInteriorComplete===true)) {
                    $scope.interiorSectionComplete=true;
                }
                //exterior
                if ((fe1!=null)&&(fe2!=null)&&(fe3!=null)&&(fe4!=null)&&(fe5!=null)&&(fe6!=null)&&(fe7!=null)) {
                    $scope.frontExteriorComplete=true;
                }
                if ((lfe1!=null)&&(lfe2!=null)&&(lfe3!=null)&&(lfe4!=null)&&(lfe5!=null)&&(lfe6!=null)&&(lfe7!=null)) {
                    $scope.leftFrontExteriorComplete=true;
                }
                if ((lre1!=null)&&(lre2!=null)&&(lre3!=null)&&(lre4!=null)&&(lre5!=null)&&(lre6!=null)&&(lre7!=null)) {
                    $scope.leftRearExteriorComplete=true;
                }
                if ((rre1!=null)&&(rre2!=null)&&(rre3!=null)&&(rre4!=null)&&(rre5!=null)&&(rre6!=null)&&(rre7!=null)) {
                    $scope.rightRearExteriorComplete=true;
                }
                if ((rfe1!=null)&&(rfe2!=null)&&(rfe3!=null)&&(rfe4!=null)&&(rfe5!=null)&&(rfe6!=null)&&(rfe7!=null)) {
                    $scope.rightFrontExteriorComplete=true;
                }
                //exterior section complete
                if (($scope.frontExteriorComplete===true)&&($scope.leftFrontExteriorComplete===true)&&($scope.leftRearExteriorComplete===true)&&($scope.rightRearExteriorComplete===true)&&($scope.rightFrontExteriorComplete===true)) {
                    $scope.exteriorSectionComplete=true;
                }
                //engine section complete
                if ((eg1!=null)&&(eg2!=null)&&(eg3!=null)&&(eg4!=null)&&(eg5!=null)&&(eg6!=null)&&(eg7!=null)) {
                    $scope.engineComplete=true;
                }
                //under vehicle section complete
                if ((uv1!=null)&&(uv2!=null)&&(uv3!=null)&&(uv4!=null)&&(uv5!=null)&&(uv6!=null)&&(uv7!=null)) {
                    $scope.underVehicleComplete=true;
                }
                //road test section complete
                if ((rt1!=null)&&(rt2!=null)&&(rt3!=null)&&(rt4!=null)&&(rt5!=null)&&(rt6!=null)&&(rt7!=null)) {
                    $scope.roadTestComplete=true;
                }
                //report complete section complete
                if (($scope.interiorSectionComplete===true)&&($scope.exteriorSectionComplete===true)&&($scope.engineComplete===true)&&($scope.underVehicleComplete===true)&&($scope.roadTestComplete===true)) {
                    $scope.inspectionComplete=true;
                }
            }
        };
        $scope.getTruckTempData = function () {
            $rootScope.formData = { 
                "precheck_Inspection1": "yes",
                "precheck_Inspection2": "yes",
                "precheck_Inspection3": "yes",
                "precheck_Inspection4": "yes",
                "precheck_Inspection5": "yes",
                "frontInterior_Inspection1": "yes",
                "frontInterior_Inspection2": "yes",
                "frontInterior_Inspection3": "no",
                "frontInterior_Inspection4": "no",
                "frontInterior_Inspection5": "yes",
                "leftFrontInterior_Inspection1": "yes",
                "leftFrontInterior_Inspection2": "yes",
                "leftFrontInterior_Inspection3": "no",
                "leftFrontInterior_Inspection4": "yes",
                "leftFrontInterior_Inspection5": "yes",
                "leftRearInterior_Inspection1": "yes",
                "leftRearInterior_Inspection2": "yes",
                "leftRearInterior_Inspection3": "yes",
                "leftRearInterior_Inspection4": "yes",
                "leftRearInterior_Inspection5": "yes",
                "rightRearInterior_Inspection1": "yes",
                "rightRearInterior_Inspection2": "yes",
                "rightRearInterior_Inspection3": "yes",
                "rightRearInterior_Inspection4": "yes",
                "rightRearInterior_Inspection5": "yes",
                "rightFrontInterior_Inspection1": "yes",
                "rightFrontInterior_Inspection2": "yes",
                "rightFrontInterior_Inspection3": "yes",
                "rightFrontInterior_Inspection4": "yes",
                "rightFrontInterior_Inspection5": "yes",
                "frontExterior_Inspection1": "yes",
                "frontExterior_Inspection2": "yes",
                "frontExterior_Inspection3": "yes",
                "frontExterior_Inspection4": "yes",
                "frontExterior_Inspection5": "yes",
                "leftFrontExterior_Inspection1": "yes",
                "leftFrontExterior_Inspection2": "yes",
                "leftFrontExterior_Inspection3": "yes",
                "leftFrontExterior_Inspection4": "yes",
                "leftFrontExterior_Inspection5": "yes",
                "leftRearExterior_Inspection1": "yes",
                "leftRearExterior_Inspection2": "yes",
                "leftRearExterior_Inspection3": "yes",
                "leftRearExterior_Inspection4": "yes",
                "leftRearExterior_Inspection5": "yes"
            };
        };
        $scope.getSedanTempData = function () {
            $rootScope.formData = {
                "precheck_Inspection1": "yes",
                "precheck_Inspection2": "yes",
                "precheck_Inspection3": "yes",
                "precheck_Inspection4": "yes",
                "precheck_Inspection5": "yes",
                "frontInterior_Inspection1": "yes",
                "frontInterior_Inspection2": "yes",
                "frontInterior_Inspection3": "yes",
                "frontInterior_Inspection4": "yes",
                "frontInterior_Inspection5": "yes",
                "frontInterior_Inspection6": "yes",
                "frontInterior_Inspection7": "yes",
                "leftFrontInterior_Inspection1": "yes",
                "leftFrontInterior_Inspection2": "yes",
                "leftFrontInterior_Inspection3": "yes",
                "leftFrontInterior_Inspection4": "yes",
                "leftFrontInterior_Inspection5": "yes",
                "leftFrontInterior_Inspection6": "yes",
                "leftFrontInterior_Inspection7": "yes",
                "leftRearInterior_Inspection1": "yes",
                "leftRearInterior_Inspection2": "yes",
                "leftRearInterior_Inspection3": "yes",
                "leftRearInterior_Inspection4": "yes",
                "leftRearInterior_Inspection5": "yes",
                "leftRearInterior_Inspection6": "yes",
                "leftRearInterior_Inspection7": "yes",
                "rightRearInterior_Inspection1": "yes",
                "rightRearInterior_Inspection2": "yes",
                "rightRearInterior_Inspection3": "yes",
                "rightRearInterior_Inspection4": "yes",
                "rightRearInterior_Inspection5": "yes",
                "rightRearInterior_Inspection6": "yes",
                "rightRearInterior_Inspection7": "yes",
                "rightFrontInterior_Inspection1": "yes",
                "rightFrontInterior_Inspection2": "yes",
                "rightFrontInterior_Inspection3": "yes",
                "rightFrontInterior_Inspection4": "yes",
                "rightFrontInterior_Inspection5": "yes",
                "rightFrontInterior_Inspection6": "yes",
                "rightFrontInterior_Inspection7": "yes",
                "frontExterior_Inspection1": "yes",
                "frontExterior_Inspection2": "yes",
                "frontExterior_Inspection3": "yes",
                "frontExterior_Inspection4": "yes",
                "frontExterior_Inspection5": "yes",
                "frontExterior_Inspection6": "yes",
                "frontExterior_Inspection7": "yes",
                "leftFrontExterior_Inspection1": "yes",
                "leftFrontExterior_Inspection2": "yes",
                "leftFrontExterior_Inspection3": "yes",
                "leftFrontExterior_Inspection4": "yes",
                "leftFrontExterior_Inspection5": "yes",
                "leftFrontExterior_Inspection6": "yes",
                "leftFrontExterior_Inspection7": "yes",
                "leftRearExterior_Inspection1": "yes",
                "leftRearExterior_Inspection2": "yes",
                "leftRearExterior_Inspection3": "yes",
                "leftRearExterior_Inspection4": "yes",
                "leftRearExterior_Inspection5": "yes",
                "leftRearExterior_Inspection6": "yes",
                "leftRearExterior_Inspection7": "yes",
                "rightRearExterior_Inspection1": "yes",
                "rightRearExterior_Inspection2": "yes",
                "rightRearExterior_Inspection3": "yes",
                "rightRearExterior_Inspection4": "yes",
                "rightRearExterior_Inspection5": "yes",
                "rightRearExterior_Inspection6": "yes",
                "rightRearExterior_Inspection7": "yes",
                "rightFrontExterior_Inspection1": "yes",
                "rightFrontExterior_Inspection2": "yes",
                "rightFrontExterior_Inspection3": "yes",
                "rightFrontExterior_Inspection4": "yes",
                "rightFrontExterior_Inspection5": "yes",
                "rightFrontExterior_Inspection6": "yes",
                "rightFrontExterior_Inspection7": "yes",
                "engine_Inspection1": "no",
                "engine_Inspection2": "repair",
                "engine_Inspection3": "repair",
                "engine_Inspection4": "no",
                "engine_Inspection5": "yes",
                "engine_Inspection6": "yes",
                "engine_Inspection7": "yes",
                "roadTest_Inspection1": "yes",
                "roadTest_Inspection2": "no",
                "roadTest_Inspection3": "yes",
                "roadTest_Inspection4": "yes"
            };
        };
        /*******************************************************
        *  END PROTOTYPE STUB DATA SECTION                    
        *******************************************************/
        if ($scope.urlParams === '1FTFW1EF3BFC19451') {
            $scope.getTruckTempData();
        } else if ($scope.urlParams === '3FA6P0HR5DR226247') {
            $scope.getSedanTempData();
        } else {
            $rootScope.formData = {};
        }
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
            $scope.calculatePercent = ($rootScope.objLength/$scope.count.toString()) * 100;
            $scope.progressPercent = Math.ceil($scope.calculatePercent.toFixed(2));
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
		*  QR CODE DEBUG INFORMATION                            
		*******************************************************/
		$scope.onSuccess = function(data) {
    		$log.info('' + data + '; ' + new Date());
  		};
  		$scope.onError = function(error) {
    		$log.warn('' + error + '; ' + new Date());
  		};
  		$scope.onVideoError = function(error) {
    		$log.warn('' + error + '; ' + new Date());
  		};
        /*******************************************************
        *  REPORT SECTION                         
        *******************************************************/
        var bronzePromise,
            silverPromise,
            goldPromise;
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
        $scope.roadTest = {};
        $scope.underVehicle = {};
        $scope.getBronzeReport = function () {
            // currently has 30 questions 
            bronzePromise = tempReportFactory.bronzeData();
            bronzePromise.then(function (data) {
                $scope.checklist = data.precheck;
                $scope.frontInterior = data.frontInterior;
                $scope.leftFrontInterior = data.leftFrontInterior;
                $scope.frontExterior = data.frontExterior;
                $scope.leftFrontExterior = data.leftFrontExterior;
                $scope.vehicleEngine = data.engine;
                $scope.total = $scope.checklist.length
                             + $scope.frontInterior.length
                             + $scope.leftFrontInterior.length
                             + $scope.frontExterior.length
                             + $scope.leftFrontExterior.length
                             + $scope.vehicleEngine.length;
                $scope.count.push($scope.total);
            });
        };
        $scope.getSilverReport = function () {
            // currently has 70 questions
            silverPromise = tempReportFactory.silverData();
            silverPromise.then(function (data) {
                $scope.checklist = data.precheck;
                $scope.frontInterior = data.frontInterior;
                $scope.leftFrontInterior = data.leftFrontInterior;
                $scope.leftRearInterior = data.leftRearInterior;
                $scope.rightRearInterior = data.rightRearInterior;
                $scope.rightFrontInterior = data.rightFrontInterior;
                $scope.frontExterior = data.frontExterior;
                $scope.leftFrontExterior = data.leftFrontExterior;
                $scope.leftRearExterior = data.leftRearExterior;
                $scope.rightRearExterior = data.rightRearExterior;
                $scope.rightFrontExterior = data.rightFrontExterior;
                $scope.vehicleEngine = data.engine;
                $scope.roadTest = data.roadTest;
                $scope.underVehicle = data.underVehicle;
                $scope.total = $scope.checklist.length
                             + $scope.frontInterior.length
                             + $scope.leftFrontInterior.length
                             + $scope.leftRearInterior.length
                             + $scope.rightRearInterior.length
                             + $scope.rightFrontInterior.length
                             + $scope.frontExterior.length
                             + $scope.leftFrontExterior.length
                             + $scope.leftRearExterior.length
                             + $scope.rightRearExterior.length
                             + $scope.rightFrontExterior.length
                             + $scope.vehicleEngine.length
                             + $scope.roadTest.length
                             + $scope.underVehicle.length;
                $scope.count.push($scope.total);
            });
        };
        $scope.getGoldReport = function () {
            // currently has 96 questions
            goldPromise = tempReportFactory.goldData();
            goldPromise.then(function (data) {
                $scope.checklist = data.precheck;
                $scope.frontInterior = data.frontInterior;
                $scope.leftFrontInterior = data.leftFrontInterior;
                $scope.leftRearInterior = data.leftRearInterior;
                $scope.rightRearInterior = data.rightRearInterior;
                $scope.rightFrontInterior = data.rightFrontInterior;
                $scope.frontExterior = data.frontExterior;
                $scope.leftFrontExterior = data.leftFrontExterior;
                $scope.leftRearExterior = data.leftRearExterior;
                $scope.rightRearExterior = data.rightRearExterior;
                $scope.rightFrontExterior = data.rightFrontExterior;
                $scope.vehicleEngine = data.engine;
                $scope.roadTest = data.roadTest;
                $scope.underVehicle = data.underVehicle;
                $scope.total = $scope.checklist.length
                             + $scope.frontInterior.length
                             + $scope.leftFrontInterior.length
                             + $scope.leftRearInterior.length
                             + $scope.rightRearInterior.length
                             + $scope.rightFrontInterior.length
                             + $scope.frontExterior.length
                             + $scope.leftFrontExterior.length
                             + $scope.leftRearExterior.length
                             + $scope.rightRearExterior.length
                             + $scope.rightFrontExterior.length
                             + $scope.vehicleEngine.length
                             + $scope.roadTest.length
                             + $scope.underVehicle.length;
                $scope.count.push($scope.total);
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
        $timeout(function (){
            $scope.setDataForm(currentPath);
        },500);
        $rootScope.$on("$stateChangeSuccess", function () {
            var current = $state.$current;
            var str = current.toString();
            var currentPath = str.substr(str.lastIndexOf('.')+1);
            $scope.calculateProgress();
            //no need to delay here, the data is already available
            $scope.setDataForm(currentPath);
            $scope.setFlags();
        });
        $scope.init = function () {
            $scope.params = $state.params;
            $scope.urlParams = $scope.params.vinNum;
            // if vin is not empty
            if (($scope.urlParams != null) || ($scope.urlParams != undefined)) {
                // call the api 
                $scope.submitForm();
                //set form data
                if ($scope.urlParams === '1FTFW1EF3BFC19451') {
                    $scope.getTruckTempData();
                } else if ($scope.urlParams === '3FA6P0HR5DR226247') {
                    $scope.getSedanTempData();
                } else {
                    $rootScope.formData = {};
                }
                // also redirect to initial report page, this if statement
                // only runs if the page has been reloaded in the report section
                // since this controller initially runs before the vin param
                // is actually set
                $state.go('inspection.report.dealerVehicleInfo');
            }
        };
        $scope.init();
        $scope.$on('$viewContentLoaded', function() {
            $scope.setFlags();
        });
        if ($scope.inspectionPath === 'bronze') {
            $scope.getBronzeReport();
        } else if ($scope.inspectionPath === 'silver') {
            $scope.getSilverReport();
        } else if ($scope.inspectionPath === 'gold') {
            $scope.getGoldReport();
        }
 	}]);
 });