 /****************************************************************************************
 *
 *  TEMP REPORT DATA FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('tempReportFactory', ['$http',
        function ($http) {
            var tempReportFactory = {
                bronzeData : function() {
                    return $http({
                        url: "././data/report/bronze-data.json",
                        method: "GET",
                    }).then(function (response) {
                        return response.data;
                    });
                },
                silverData : function() {
                    return $http({
                        url: "././data/report/silver-data.json",
                        method: "GET",
                    }).then(function (response) {
                        return response.data;
                    });
                },
                goldData : function() {
                    return $http({
                        url: "././data/report/gold-data.json",
                        method: "GET",
                    }).then(function (response) {
                        return response.data;
                    });
                }
            };
            return tempReportFactory;
    }]);
 });