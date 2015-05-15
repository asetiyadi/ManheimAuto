function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	
}

/****************************************************************************************
*
*  REQUIRE JS CONFIGURATION
*  @version (.1)
*  @date (2015)
*
*****************************************************************************************/
require.config({
	paths: {
		'angular':'lib/angular',
		'angular-ui-router':'lib/angular-ui-router',
		'angular-touch':'lib/angular-touch',
		'device-detector':'lib/ng-device-detector',
		'bootstrap-ui':'lib/bootstrap-ui-0.12.1.min',
		'domReady':'lib/requirejs-domready',
		'angular-file-upload':'lib/angular-file-upload.min'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-ui-router': {
			deps: ['angular']
		},
		'angular-touch': {
			deps: ['angular']
		},
		'device-detector': {
			deps: ['angular']
		},
		'bootstrap-ui': {
			deps: ['angular']
		},
		'angular-file-upload': {
			deps: ['angular']
		}
	},
	priority: [
		'angular'
	],
	// start application
	deps: ['./bootstrap']
});
