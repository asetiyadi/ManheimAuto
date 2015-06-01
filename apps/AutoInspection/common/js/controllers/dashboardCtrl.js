 /****************************************************************************************
 *
 *  DASHBOARD CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('dashboardCtrl', ['$scope','$rootScope',
 		function ($scope,$rootScope) {
 			$scope.techName = $rootScope.userInfo.firstname + ' ' + $rootScope.userInfo.lastname;
		/*******************************************************
		*  INSPECTION STUB DATA                           
		*******************************************************/
 		$scope.inspectionStubDate = [
 			{
	 			lotNum: '147',
	 			name: 'Vehicle 7',
	 			date: '12-7-14',
	 			image: 'images/vehicle-types/truck.png', 
	 			tech: $scope.techName,
	 			completion: '65%',
	 			manager: 'Beth Maxwell',
	 			clickFunction: 'reviewInspection("silver","1FTFW1EF3BFC19451")'
	 		},
	 		{
	 			lotNum: '148',
	 			name: 'Vehicle 8',
	 			date: '12-7-14',
	 			image: 'images/vehicle-types/sedan.png', 
	 			tech: $scope.techName,
	 			completion: '90%',
	 			manager: 'Beth Maxwell',
	 			clickFunction: 'reviewInspection("gold","3FA6P0HR5DR226247")'
	 		}
	 	];
		/*******************************************************
		*  AWAITING REVIEW STUB DATA                          
		*******************************************************/
 		$scope.reviewStubDate = [
 			{
	 			lotNum: '141',
	 			name: 'Vehicle 1',
	 			date: '12-4-14',
	 			image: 'images/vehicle-types/sedan.png', 
	 			tech: 'John Smith', 
	 			completion: '100%',
	 			manager: 'Beth Maxwell'
	 		},
	 		{
	 			lotNum: '142',
	 			name: 'Vehicle 2',
	 			date: '12-4-14',
	 			image: 'images/vehicle-types/sports.png', 
	 			tech: 'John Smith', 
	 			completion: '100%',
	 			manager: 'Beth Maxwell'
	 		},
	 		{
	 			lotNum: '143',
	 			name: 'Vehicle 3',
	 			date: '12-5-14',
	 			image: 'images/vehicle-types/suv.png', 
	 			tech: 'John Smith', 
	 			completion: '100%',
	 			manager: 'Beth Maxwell'
	 		}
	 	];
 	}]);
 });