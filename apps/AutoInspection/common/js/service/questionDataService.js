 /****************************************************************************************
 *
 *  QUESTION DATA SERVICE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (services) {
 	'use strict';
 	services.service('questionDataService', function () {
 		var servicedata;
 		this.setData = function (data) {
 			servicedata = data;
 			console.log('inside set: ' + servicedata);
 		}
 		this.getData = function (data) {
 			servicedata = data;
 			console.log('inside get: ' + servicedata);
 			return servicedata;
 		}
 	});
 });