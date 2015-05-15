 /****************************************************************************************
 *
 *  PAGE TITLE DIRECTIVE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (directives) {
    'use strict';
    directives.directive('title', ['$rootScope','$timeout', 
        function ($rootScope,$timeout) {
        return {
            link: function() {
                var listener = function (event,toState) {
                    $timeout(function() {
                        $rootScope.title = (toState.data && toState.data.pageTitle)
                        ? toState.data.pageTitle
                        : 'Manheim Auctions Inc. - Inspection Prototype';
                    });
                };
                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }]);
 });