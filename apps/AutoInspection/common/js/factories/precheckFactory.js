 /****************************************************************************************
 *
 *  PRECHECK DATA FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('precheckFactory', ['$http', 
        function ($http) {
        var precheckFactory = {
            getPreCheck : function() {
                return $http({
                    url: "././data/report/precheck-inspection.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            }
        };
        return precheckFactory;
    }]);
 });