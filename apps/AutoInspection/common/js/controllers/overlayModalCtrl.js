 /****************************************************************************************
 *
 *  OVERLAY MODAL CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('overlayModalCtrl', ['$scope','$modalInstance','selectedPageTitle',
        function ($scope,$modalInstance,selectedPageTitle) {
 		/*******************************************************
        *  VARIABLES                            
        *******************************************************/
    	$scope.selectedPageTitle = selectedPageTitle;
    	/*******************************************************
        *  CLOSE OVERLAY MODAL                          
        *******************************************************/
    	$scope.cancel = function () {
        	$modalInstance.dismiss('cancel');
    	};
 	}]);
 });