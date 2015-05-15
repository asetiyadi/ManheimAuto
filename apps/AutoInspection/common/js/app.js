 /****************************************************************************************
 *
 *  APP CONFIGURATION
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define([
 	'angular',
 	'angular-ui-router',
 	'angular-touch',
 	'device-detector',
 	'bootstrap-ui',
 	'angular-file-upload',
 	'./controllers/index',	
 	'./directives/index',	
 	'./service/index',	
 	'./factories/index'
 ], function (angular,$) {
 	'use strict';
 	return angular.module('app', [
 		'ui.router',
 		'ngTouch',
 		'ui.bootstrap',
 		'ng.deviceDetector',
 		'app.controllers',
 		'app.directives',
 		'app.service',
 		'app.factories'
 	]).run(['$rootScope','$state','$stateParams','$modalStack', 
 	function ($rootScope,$state,$stateParams,$modalStack) {
    	$rootScope.$state = $state;
    	$rootScope.$stateParams = $stateParams; 
		$rootScope.inspectionPath = $rootScope.$stateParams.inspectionPath;
    	//close any open modal dialogs if user presses browser back/fwd buttons
		$rootScope.$on('$locationChangeStart', function (event) {
			var top = $modalStack.getTop();
			if (top) {
				$modalStack.dismiss(top.key);
				event.preventDefault();
			}
		});
	}]);
 });