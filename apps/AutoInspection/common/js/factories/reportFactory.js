 /****************************************************************************************
 *
 *  REPORT DATA FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('reportFactory', ['$http', 
        function ($http) {
        var reportFactory = {
            getChecklist : function() {
                return $http({
                    url: "/api/getchecklist/1",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            }
        };
        return reportFactory;
    }]);
 });