 /****************************************************************************************
 *
 *  SWIPE CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('swipeCtrl', ['$scope','$rootScope','$state','locationService',
 		function ($scope,$rootScope,$state,locationService) {
 		/*******************************************************
		*  VARIABLES                        
		*******************************************************/
		$scope.state = $state;
 		$scope.stateName = $state.current.name;
        $scope.inspectionPath = locationService.getInspectionPath();
        $scope.nextPg = '';
        $scope.prevPg = '';
        /* possible routes - dependent on inspection path */
        $scope.dealer = 'inspection.report.dealerVehicleInfo';
        $scope.preCheck = 'inspection.report.preCheck';
        $scope.frontInt = 'inspection.report.vehicleInterior.frontInterior';
        $scope.leftFrontInt = 'inspection.report.vehicleInterior.leftFrontInterior';
        $scope.leftRearInt = 'inspection.report.vehicleInterior.leftRearInterior';
        $scope.rightRearInt = 'inspection.report.vehicleInterior.rightRearInterior';
        $scope.rightFrontInt = 'inspection.report.vehicleInterior.rightFrontInterior';
        $scope.frontExt = 'inspection.report.vehicleExterior.frontExterior';
        $scope.leftFrontExt = 'inspection.report.vehicleExterior.leftFrontExterior';
        $scope.leftRearExt = 'inspection.report.vehicleExterior.leftRearExterior';
        $scope.rightRearExt = 'inspection.report.vehicleExterior.rightRearExterior';
        $scope.rightFrontExt = 'inspection.report.vehicleExterior.rightFrontExterior';
        $scope.engine = 'inspection.report.vehicleEngine';
        $scope.roadTest = 'inspection.report.roadTest';
        $scope.underVehicle = 'inspection.report.underVehicle';
        $scope.inspectionSum = 'inspection.report.summary';
		/*******************************************************
		*  SWIPE REPORT PAGES                      
		*******************************************************/
		$scope.nextPage = function (nextPg) {  
            if (nextPg != null) {
                $state.go(nextPg);
            }   
		};
		$scope.prevPage = function (prevPg) {   
            if (prevPg != null) {
                $state.go(prevPg);
            }      
		};
        /*******************************************************
        *  BRONZE SWIPE FUNCTION                          
        *******************************************************/
        $scope.bronzeSwipe = function () {
            if ($scope.stateName === $scope.dealer) {
                    $scope.nextPg = null;
                    $scope.prevPg = null;
            } else if ($scope.stateName === $scope.preCheck) {
                    $scope.nextPg = $scope.frontInt;
                    $scope.prevPg = $scope.dealer;
            } else if ($scope.stateName === $scope.frontInt) {
                    $scope.nextPg = $scope.leftFrontInt;
                    $scope.prevPg = $scope.preCheck;
            } else if ($scope.stateName === $scope.leftFrontInt) {
                    $scope.nextPg = $scope.frontExt;
                    $scope.prevPg = $scope.frontInt;
            } else if ($scope.stateName === $scope.frontExt) {
                    $scope.nextPg = $scope.leftFrontExt;
                    $scope.prevPg = $scope.leftFrontInt;
            } else if ($scope.stateName === $scope.leftFrontExt) {
                    $scope.nextPg = $scope.engine;
                    $scope.prevPg = $scope.frontExt;
            } else if ($scope.stateName === $scope.engine) {
                    $scope.nextPg = $scope.inspectionSum;
                    $scope.prevPg = $scope.leftFrontExt;
            } else if ($scope.stateName === $scope.inspectionSum) {
                    $scope.nextPg = null;
                    $scope.prevPg = $scope.engine;
            }
        };
        /*******************************************************
        *  SILVER SWIPE FUNCTION                          
        *******************************************************/
	    $scope.silverSwipe = function () {
            if ($scope.stateName === $scope.dealer) {
                    $scope.nextPg = null;
                    $scope.prevPg = null;
            } else if ($scope.stateName === $scope.preCheck) {
                    $scope.nextPg = $scope.frontInt;
                    $scope.prevPg = $scope.dealer;
            } else if ($scope.stateName === $scope.frontInt) {
                    $scope.nextPg = $scope.leftFrontInt;
                    $scope.prevPg = $scope.preCheck;
            } else if ($scope.stateName === $scope.leftFrontInt) {
                    $scope.nextPg = $scope.leftRearInt;
                    $scope.prevPg = $scope.frontInt;
            } else if ($scope.stateName === $scope.leftRearInt) {
                    $scope.nextPg = $scope.rightRearInt;
                    $scope.prevPg = $scope.leftFrontInt;
            } else if ($scope.stateName === $scope.rightRearInt) {
                    $scope.nextPg = $scope.rightFrontInt;
                    $scope.prevPg = $scope.leftRearInt;
            } else if ($scope.stateName === $scope.rightFrontInt) {
                    $scope.nextPg = $scope.frontExt;
                    $scope.prevPg = $scope.rightRearInt;
            }  else if ($scope.stateName === $scope.frontExt) {
                    $scope.nextPg = $scope.leftFrontExt;
                    $scope.prevPg = $scope.rightFrontInt;
            } else if ($scope.stateName === $scope.leftFrontExt) {
                    $scope.nextPg = $scope.leftRearExt;
                    $scope.prevPg = $scope.frontExt;
            } else if ($scope.stateName === $scope.leftRearExt) {
                    $scope.nextPg = $scope.rightRearExt;
                    $scope.prevPg = $scope.leftFrontExt;
            } else if ($scope.stateName === $scope.rightRearExt) {
                    $scope.nextPg = $scope.rightFrontExt;
                    $scope.prevPg = $scope.leftRearExt;
            } else if ($scope.stateName === $scope.rightFrontExt) {
                    $scope.nextPg = $scope.engine;
                    $scope.prevPg = $scope.rightRearExt;
            } else if ($scope.stateName === $scope.engine) {
                    $scope.nextPg = $scope.roadTest;
                    $scope.prevPg = $scope.rightFrontExt;
            } else if ($scope.stateName === $scope.roadTest) {
                    $scope.nextPg = $scope.underVehicle;
                    $scope.prevPg = $scope.engine;
            } else if ($scope.stateName === $scope.underVehicle) {
                    $scope.nextPg = $scope.inspectionSum;
                    $scope.prevPg = $scope.roadTest;
            } else if ($scope.stateName === $scope.inspectionSum) {
                    $scope.nextPg = null;
                    $scope.prevPg = $scope.underVehicle;
            }
	    };
        /*******************************************************
        *  GOLD SWIPE FUNCTION                          
        *******************************************************/
	    $scope.goldSwipe = function () {
            if ($scope.stateName === $scope.dealer) {
                    $scope.nextPg = null;
                    $scope.prevPg = null;
            } else if ($scope.stateName === $scope.preCheck) {
                    $scope.nextPg = $scope.frontInt;
                    $scope.prevPg = $scope.dealer;
            } else if ($scope.stateName === $scope.frontInt) {
                    $scope.nextPg = $scope.leftFrontInt;
                    $scope.prevPg = $scope.preCheck;
            } else if ($scope.stateName === $scope.leftFrontInt) {
                    $scope.nextPg = $scope.leftRearInt;
                    $scope.prevPg = $scope.frontInt;
            } else if ($scope.stateName === $scope.leftRearInt) {
                    $scope.nextPg = $scope.rightRearInt;
                    $scope.prevPg = $scope.leftFrontInt;
            } else if ($scope.stateName === $scope.rightRearInt) {
                    $scope.nextPg = $scope.rightFrontInt;
                    $scope.prevPg = $scope.leftRearInt;
            } else if ($scope.stateName === $scope.rightFrontInt) {
                    $scope.nextPg = $scope.frontExt;
                    $scope.prevPg = $scope.rightRearInt;
            }  else if ($scope.stateName === $scope.frontExt) {
                    $scope.nextPg = $scope.leftFrontExt;
                    $scope.prevPg = $scope.rightFrontInt;
            } else if ($scope.stateName === $scope.leftFrontExt) {
                    $scope.nextPg = $scope.leftRearExt;
                    $scope.prevPg = $scope.frontExt;
            } else if ($scope.stateName === $scope.leftRearExt) {
                    $scope.nextPg = $scope.rightRearExt;
                    $scope.prevPg = $scope.leftFrontExt;
            } else if ($scope.stateName === $scope.rightRearExt) {
                    $scope.nextPg = $scope.rightFrontExt;
                    $scope.prevPg = $scope.leftRearExt;
            } else if ($scope.stateName === $scope.rightFrontExt) {
                    $scope.nextPg = $scope.engine;
                    $scope.prevPg = $scope.rightRearExt;
            } else if ($scope.stateName === $scope.engine) {
                    $scope.nextPg = $scope.roadTest;
                    $scope.prevPg = $scope.rightFrontExt;
            } else if ($scope.stateName === $scope.roadTest) {
                    $scope.nextPg = $scope.underVehicle;
                    $scope.prevPg = $scope.engine;
            } else if ($scope.stateName === $scope.underVehicle) {
                    $scope.nextPg = $scope.inspectionSum;
                    $scope.prevPg = $scope.roadTest;
            } else if ($scope.stateName === $scope.inspectionSum) {
                    $scope.nextPg = null;
                    $scope.prevPg = $scope.underVehicle;
            }
	    };
        /*******************************************************
        *  INSPECTION SPECIFIC FUNCTION CALLS                          
        *******************************************************/
        $scope.checkPath = function () {
            if ($scope.inspectionPath === 'bronze') {
                $scope.bronzeSwipe();
            } else if ($scope.inspectionPath === 'silver') {
                $scope.silverSwipe();
            } else if ($scope.inspectionPath === 'gold') {
                $scope.goldSwipe();
            }
        };
        $scope.checkPath(); //initialize
        $rootScope.$on('$stateChangeSuccess', function (event,toState,toParams,fromState,fromParams) {
            $scope.stateName = $state.current.name;
            $scope.checkPath();
        });
 	}]);
 });