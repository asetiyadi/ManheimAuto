 /****************************************************************************************
 *
 *  COMPILE DIRECTIVE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (directives) {
 	'use strict';
 	directives.directive('compile', ['$compile','$timeout',
 		function ($compile,$timeout) {
 		return {
 			restrict:'A',
 			scope: {
 				value: '=ngModel'
 			},
 			link: function (scope,elem,attrs) {
 				$timeout(function () {                
 					$compile(elem.contents())(scope);    
 				});
 			}        
 		};
 	}]);
 });
