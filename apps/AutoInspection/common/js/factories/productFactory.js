 /****************************************************************************************
 *
 *  PRODUCT FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('productFactory', ['$http', 
        function ($http) {
        var productFactory = {
            productList : function() {
                return $http({
                    url: "././data/product-list.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            },
            ordersList : function() {
                return $http({
                    url: "././data/product-orders.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            }
        };
        return productFactory;
    }]);
 });