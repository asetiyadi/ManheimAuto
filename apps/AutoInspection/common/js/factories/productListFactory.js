 /****************************************************************************************
 *
 *  PRODUCT LIST FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('productListFactory', ['$http', 
        function ($http) {
        var productListFactory = {
            productList : function() {
                return $http({
                    url: "data/product-list.json",
                    method: "GET",
                }).then(function (response) {
                    return response.data;
                });
            }
        };
        return productListFactory;
    }]);
 });