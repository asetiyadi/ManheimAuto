 /****************************************************************************************
 *
 *  BRONZE REPORT DATA FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('bronzeReportFactory', ['$http', 
        function ($http) {
        var bronzeReportFactory = {
            bronzeInterior : function() {
                return $http({
                    url: "././data/report/bronze/bronze-interior.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            bronzeExterior : function() {
                return $http({
                    url: "././data/report/bronze/bronze-exterior.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            bronzeEngine : function() {
                return $http({
                    url: "././data/report/bronze/bronze-engine.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            }
        };
        return bronzeReportFactory;
    }]);
 });