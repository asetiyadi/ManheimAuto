 /****************************************************************************************
 *
 *  AUTHENTICATION CONTROLLER
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (controllers) {
 	'use strict';
 	controllers.controller('authenticateCtrl', ['$scope','$state','userFactory','$log',
 		function ($scope,$state,userFactory,$log) {
 		// TODO: user authentication
 		// user name, user password, email, and tech id required
 		// user information
	    $scope.userInfo = {
	        username: 'jsmith',
	        password: 'letmein',
	        firstname: '',
	        lastname: '',
	        email: '',
	        techId: ''
	    };
	    $scope.missingData = false;
	    $scope.incorrectAuth = false;
	    
 		$scope.registerUser = function() {
 			$log.info("authenticateCtrl - registerUser = " + JSON.stringify($scope.userInfo));
 			$scope.missingData = false;
	        if( $scope.userInfo.username.trim() === "" ||
	            $scope.userInfo.password.trim() === "" ||
	            $scope.userInfo.firstname.trim() === "" ||
	            $scope.userInfo.lastname.trim() === "" ||
	            $scope.userInfo.email.trim() === "" ||
	            $scope.userInfo.techId.trim() === "") 
	        {
	            $scope.missingData = true;
	            return;
	        }
	        var data = {
	            'username': $scope.userInfo.username,
	            'password': $scope.userInfo.password,
	            'firstname': $scope.userInfo.firstname,
	            'lastname': $scope.userInfo.lastname,
	            'email': $scope.userInfo.email,
	            'techId': $scope.userInfo.techId
	        };
	  		var promise = userFactory.registerUser(data);
	  		promise.then(function (data) {
	  			$log.info("authenticateCtrl - promise.registerUser = " + JSON.stringify(data));

            });
 		};
 		
 		
 		$scope.isCustomResponse = function(response) {
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
 		};
 		
 		$scope.verifyUser = function() {
 			$log.info("authenticateCtrl - verifyUser = " + JSON.stringify($scope.userInfo));
	        /*var data = {
	            'username': $scope.userInfo.username,
	            'password': $scope.userInfo.password,
	        };*/
	        
	        var options = {
				adapter: "BluemixHTTP", 
				procedure: "submitAuthentication",
				parameters: [$scope.userInfo.username, $scope.userInfo.password]
			};
	        
	        //It does not need to specify callback since the response is checked by WL framework
	        $scope.realmChallengeHandler.submitAdapterAuthentication(options, {});
			
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
		
		$scope.realmChallengeHandler = WL.Client.createChallengeHandler("AdapterSecurityTest");
 		$scope.realmChallengeHandler.isCustomResponse = $scope.isCustomResponse;
 		$scope.realmChallengeHandler.handleChallenge = $scope.handleChallenge;
 	}]);
 });
