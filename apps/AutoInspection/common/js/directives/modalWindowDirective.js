 /****************************************************************************************
 *
 *  MODAL WINDOW DIRECTIVE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (directives) {
    'use strict';
    directives.directive('modalWindow', ['$rootScope','$timeout', 
    	function ($rootScope,$timeout) {
		return {
			priority: 1,
			link: function (scope, element, attrs) {
				$timeout(function () {
					angular.element('#input1').focus();
				});
			}
		};
    }]);
 });