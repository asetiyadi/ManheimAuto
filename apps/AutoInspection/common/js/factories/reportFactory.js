 /****************************************************************************************
 *
 *  REPORT DATA FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('reportFactory', ['$http', '$rootScope',
        function ($http, $rootScope) {
            var reportFactory = {
                getChecklist : function() {
                    return $http({
                        url: "https://autoinspection.mybluemix.net/api/v1/checklist/1",
                        method: "GET",
                        headers: {
                            'x-access-token': $rootScope.token
                        }
                    }).then(function (response) {
                        return response.data;
                    });
                }
            };
            return reportFactory;
        }
    ]);
 });