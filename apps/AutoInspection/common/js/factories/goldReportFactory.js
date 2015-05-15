 /****************************************************************************************
 *
 *  GOLD REPORT DATA FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('goldReportFactory', ['$http', 
        function ($http) {
        var goldReportFactory = {
            goldInterior : function() {
                return $http({
                    url: "././data/report/gold/gold-interior.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            goldExterior : function() {
                return $http({
                    url: "././data/report/gold/gold-exterior.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            goldEngine : function() {
                return $http({
                    url: "././data/report/gold/gold-engine.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            goldRoadTest : function() {
                return $http({
                    url: "././data/report/gold/gold-roadtest.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            goldUnderVehicle : function() {
                return $http({
                    url: "././data/report/gold/gold-underthevehicle.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            }
        };
        return goldReportFactory;
    }]);
 });