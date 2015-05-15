 /****************************************************************************************
 *
 *  USER FACTORY
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (factories) {
    factories.factory('userFactory', ['$http', 
        function ($http) {
        var userFactory = {
                
            registerUser: function(criteria) {
                console.log("In CREATE USER block: " + JSON.stringify(criteria));

                var xhrRequest = {
                    headers: {'Content-Type': 'application/json'},
                    method: 'post',
                    url: '/api/registerUser',
                    data: criteria
                };

                return $http(xhrRequest)
                    .then(function (response) {
                        return response.data;
                    });

                /*$http(xhrRequest)
                .success(function(data, status, headers, config) {
                    successHandler(data)
                })
                .error(function(data, status, headers, config) {
                    errorHandler(data);
                })*/
            },

            verifyUser: function(criteria) {
                console.log("In VERIFY USER block: " + JSON.stringify(criteria));

                var xhrRequest = {
                    headers: {'Content-Type': 'application/json'},
                    method: 'post',
                    url: '/api/verifyUser',
                    data: criteria
                };

                return $http(xhrRequest)
                    .then(function (response) {
                        return response.data;
                    })

                /*$http(xhrRequest)
                .success(function(data, status, headers, config) {
                    successHandler(data)
                })
                .error(function(data, status, headers, config) {
                    errorHandler(data);
                })*/
            }
        }

        return userFactory;
    }]);
 });