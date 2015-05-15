 /****************************************************************************************
 *
 *  EDMUNDS API SDK DIRECTIVE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (directives) {
    'use strict';
     directives.directive('asynchronousSdk', function() {
 	 	return {
        	restrict: 'E',
            scope: {
                content:'='
            },
            templateUrl: '../../views/edmundsTemplate.html'
        };
     });
 });