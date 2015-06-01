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
            },

            verifyUser: function(criteria) {
                console.log("In VERIFY USER block: " + JSON.stringify(criteria));

                var xhrRequest = {
                    headers: {'Content-Type': 'application/json'},
                    method: 'post',
                    url: 'https://autoinspection.mybluemix.net/login',
                    data: criteria
                };

                return $http(xhrRequest)
                    .then(function (response) {
                        return response.data;
                    })
            }
        }

        return userFactory;
    }]);
 });