 /****************************************************************************************
 *
 *  SILVER REPORT DATA FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('silverReportFactory', ['$http', 
        function ($http) {
        var silverReportFactory = {
            silverInterior: function() {
                return $http({
                    url: "././data/report/silver/silver-interior.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            silverExterior: function() {
                return $http({
                    url: "././data/report/silver/silver-exterior.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            silverEngine: function() {
                return $http({
                    url: "././data/report/silver/silver-engine.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            silverRoadTest: function() {
                return $http({
                    url: "././data/report/silver/silver-roadtest.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            silverUnderVehicle: function() {
                return $http({
                    url: "././data/report/silver/silver-underthevehicle.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            }
        };
        return silverReportFactory;
    }]);
 });