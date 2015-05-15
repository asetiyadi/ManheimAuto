 /****************************************************************************************
 *
 *  UPDATE TITLE DIRECTIVE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (directives) {
    'use strict';
    directives.directive('updateTitle', ['$rootScope','$timeout', 
    	function ($rootScope,$timeout) {
    	return {
      		link: function(scope, element) {
				var listener = function(event, toState) {
					var title = 'Default Title';
					if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;
					$timeout(function() {
						element.text(title);
					}, 0, false);
				};
				$rootScope.$on('$stateChangeSuccess', listener);
			}
		};
	}]);
 });
