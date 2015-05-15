 /****************************************************************************************
 *
 *  NAVIGATION LIST FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('navigationFactory', ['$http', 
        function ($http) {
        var navigationFactory = {
            bronzeData : function() {
                return $http({
                    url: "././data/bronze-navigation.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            silverData : function() {
                return $http({
                    url: "././data/silver-navigation.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            goldData : function() {
                return $http({
                    url: "././data/gold-navigation.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            }
        };
        return navigationFactory;
    }]);
 });