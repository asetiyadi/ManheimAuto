 /****************************************************************************************
 *
 *  AUTHENTICATION CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('authenticateCtrl', ['$scope','$rootScope','$state','userFactory','$log','$timeout',
   		function ($scope,$rootScope,$state,userFactory,$log,$timeout) {
 		//moved hard-coded user into the 
 		//app.run function located in app.js file
 		//$scope.userInfo = {};
	    $scope.missingData = false;
	    $scope.incorrectAuth = false;
	    
 		$scope.registerUser = function() {
 			$log.info("authenticateCtrl - registerUser = " + JSON.stringify($rootScope.userInfo));
 			$scope.missingData = false;
 			if( $rootScope.userInfo.username.trim() === "" ||
	            $rootScope.userInfo.password.trim() === "" ||
	            $rootScope.userInfo.firstname.trim() === "" ||
	            $rootScope.userInfo.lastname.trim() === "" ||
	            $rootScope.userInfo.email.trim() === "" ||
	            $rootScope.userInfo.techId.trim() === "") 
	        {
	            $scope.missingData = true;
	            return;
	        }
	        var data = {
        		'username': $rootScope.userInfo.username,
	            'password': $rootScope.userInfo.password,
	            'firstname': $rootScope.userInfo.firstname,
	            'lastname': $rootScope.userInfo.lastname,
	            'email': $rootScope.userInfo.email,
	            'techId': $rootScope.userInfo.techId
	        };
	  		var promise = userFactory.registerUser(data);
	  		promise.then(function (data) {
	  			$log.info("authenticateCtrl - promise.registerUser = " + JSON.stringify(data));

            });
 		};
 		
 		
 		/*$scope.isCustomResponse = function(response) {
 			console.log("isCustomResponse - Challenge required ..." + JSON.stringify(response.responseJSON));
 			if(!response || !response.responseJSON || response.responseText === null) {
 				return false;
 			}
 			
 			if(typeof(response.responseJSON.authRequired) !== "undefined") {
 				$scope.errorLoginMsg = response.responseJSON.errorMessage;
 				return true;
 			}
 			else {
 				return false;
 			}
 		};
 		
 		$scope.handleChallenge = function(response) {
 			console.log("handleChallenge - Handle Challenge: ", JSON.stringify(response.responseJSON));
 			console.log("handleChallenge - AUTH-REQUIRED = " + response.responseJSON.authRequired + " | AUTH-STATUS = " + response.responseJSON.authStatus);
 			
 			var authRequired = response.responseJSON.authRequired;
 			
 			if(authRequired == true) {
 				console.log("handleChallenge - Shows login form");
 				$state.go("login");
 				console.log("handleChallenge - Login form loaded");
 			}
 			else if(authRequired == false) {
 				console.log("handleChallenge - Challenge is not required - send users to dashboard");
 				$state.go("dashboard.content");
 				return false;
 				//$scope.realmChallengeHandler.submitSuccess();
 			}
 		};*/
 		
 		/*var checkOnline = function() {
 			var def = $q.defer();
 			WL.Client.connect({
 				onSuccess: function() {
 					console.log("*** User is online ***");
 					def.resolve(true);
 				},
 				onFailure: function() {
 					console.log("*** User is offline ***");
 					def.resolve(false);
 				},
 				timeout: 1000
 			});
 			
 			return def.promise;
 		}*/
 		
 		$scope.verifyUser = function() {
 			$log.info("authenticateCtrl - verifyUser = " + JSON.stringify($rootScope.userInfo));
 			
	        var data = {
        		'username': $rootScope.userInfo.username,
	            'password': $rootScope.userInfo.password
	        };
	        
	        var promise = userFactory.verifyUser(data);
	        promise.then(function (data) {
	  			$log.info("authenticateCtrl - promise.verifyUser = " + JSON.stringify(data));
                if(data.token != undefined & data.user != undefined) {
                    $rootScope.token = data.token;
	  				$scope.loading = true;
                    $timeout(function() {
                        $state.go("dashboard.content");
                        $scope.loading = false;
                    }, 1000);
	  			} else {
	  				$scope.loading = false;
	  				$scope.incorrectAuth = true;
	  				return;
	  			}
            });
	       
 			/*var options = {
				adapter: "BluemixHTTP", 
				procedure: "submitAuthentication",
				parameters: [$scope.userInfo.username, $scope.userInfo.password]
			};
	        
	        //It does not need to specify callback since the response is checked by WL framework
	        $scope.realmChallengeHandler.submitAdapterAuthentication(options, {
	        	onSuccess: function(data) {
	        		var userObj = data.responseJSON.array[0];
	        		
	        		console.log("scope-verifyUser - success: " + JSON.stringify(userObj));
	        		
	        		var identity = {
        				adapter: "BluemixHTTP", 
        				procedure: "setIdentity",
        				parameters: [userObj]
        			};
	        		
	        		 $scope.realmChallengeHandler.submitAdapterAuthentication(identity);
	        	},
	        	onFailure: function(error) {
	        		console.log("scope-verifyUser - error: " + JSON.stringify(error));
	        	}
	        });*/
			
			/*WL.Client.invokeProcedure(invocationOptions, {
				onSuccess: onVerifyUserSuccess,
				onFailure: onVerifyUserFailure
			});*/
	        //$state.go("dashboard.content");
 		};
 		
 		function onVerifyUserSuccess(data){
			console.log("onVerifyUserSuccess: " + JSON.stringify(data));
			if(angular.isArray(data.responseJSON.array) && data.responseJSON.array.length > 0) {
  				$state.go("dashboard.content");
  				$scope.$apply();
			}
  			else {
  				$scope.incorrectAuth = true;
  				return;
  			}
		}
		
		function onVerifyUserFailure(data){
			console.log("onVerifyUserFailure: " + JSON.stringify(data));
		}
		
		/*$scope.realmChallengeHandler = WL.Client.createChallengeHandler("AdapterSecurityTest");
 		$scope.realmChallengeHandler.isCustomResponse = $scope.isCustomResponse;
 		$scope.realmChallengeHandler.handleChallenge = $scope.handleChallenge;*/
 	}]);
 });
