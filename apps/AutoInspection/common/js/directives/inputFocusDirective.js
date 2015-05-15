 /****************************************************************************************
 *
 *  KEY PRESS INPUT FOCUS DIRECTIVE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (directives) {
    'use strict';
     directives.directive('inputFocus', function() {
        return {
            restrict: 'A',
            link: function (scope,elem,attrs) {
                elem.bind('keyup', function (e) {
                    // left arrow
                    if (e.keyCode === 37) {
                        if (!scope.$first) {
                            elem[0].previousElementSibling.focus();
                            console.log('scope.$first' + scope.$first);
                        }
                    }
                    // right arrow
                    else if (e.keyCode===39) {
                        if (!scope.$last) {
                            elem[0].nextElementSibling.focus();
                        }
                    }
                });
            }
        };
     });
 });