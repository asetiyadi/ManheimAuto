/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *  	
 *  	// Optional 
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"  
 *  	returnedContentEncoding : 'encoding', 
 *  	parameters: {name1: value1, ... }, 
 *  	headers: {name1: value1, ... }, 
 *  	cookies: {name1: value1, ... }, 
 *  	body: { 
 *  		contentType: 'text/xml; charset=utf-8' or similar value, 
 *  		content: stringValue 
 *  	}, 
 *  	transformation: { 
 *  		type: 'default', or 'xslFile', 
 *  		xslFile: fileName 
 *  	} 
 *  } 
 */

function getInspectionChecklist() {
	WL.Logger.warn("inside BluemixHTTP - getInspectionChecklist method")
}


/**
 * 
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
/*
function getStoriesFiltered(interest) {
	path = getPath(interest);
	
	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path,
	    transformation : {
		    type : 'xslFile',
		    xslFile : 'filtered.xsl'
	    }
	};
	
	return WL.Server.invokeHttp(input);
}



function getPath(interest) {
	if (interest == undefined || interest == '') {
		interest = '';
	}else {
		interest = '_' + interest;
	}
	return 'rss/edition' + interest + '.rss';
}
*/

/*function registerUser(userid) { 
	var input = { 
		method : 'post', 
		path : '/service/plan/App/user?key=45e58f3c-d319-4ca1-9404-9dc80b1677be?tenantId=f990a9e4-1f93-4a7c-a589-d7e4ca3d30f6', 
		returnedContentType : 'application/json', 
		headers: {'Content-Type' : 'application/json'}, 
		body : { 
			'contentType' : 'application/json', 
			'content' : JSON.stringify({ "uid" : userid}) 
		} 
	};
	
	return WL.Server.invokeHttp(input); 
}*/

function submitAuthentication(username, password) {
	WL.Logger.warn("inside BluemixAdapter - verifyUser - authentication submitted for user: " + username);
	var userInfo = {
        "username": username,
        "password": password
    };
	WL.Logger.warn("userInfo = " + JSON.stringify(userInfo));
	
	var input = {
		headers: {"Content-Type": "application/json"},
        method: "post",
        path: "/api/verifyUser",
        body: {
        	"contentType": "application/json",
        	"content": JSON.stringify(userInfo)
        }
	};
	WL.Logger.warn("input = " + JSON.stringify(input));
	
	var response = WL.Server.invokeHttp(input); 
	
	WL.Logger.warn(response.array[0]);
	
	if(response.array.length > 0) {
		
		var identity = {
			userId: username,
			displayName: response.array[0].firstname + " " + response.array[0].lastname,
			attributes: {
				role: "technician",
				techId: response.array[0].techId
			}
		};
		WL.Logger.warn("identity = " + JSON.stringify(identity));
		WL.Server.setActiveUser("AdapterAuthRealm", identity);
		
		return {
			authRequired: false
		};
	}
	else {
		
		WL.Logger.warn("BluemixHTTP Adapater - verifyUser: User not found");
		WL.Logger.warn(response.array[0]);
		return onAuthRequired(null, "Invalid login credential");
	}
	/*WL.Server.invokeHttp(input, {
		onSuccess: function(data) {
			WL.Logger.warn("submitAuthentication invocation result: " + JSON.stringify(data));
			if(!data.responseJSON && data.responseJSON.array.length > 0) {
				
				var identity = {
					userId: username,
					displayName: data.responseJSON.array[0].firstname + " " + data.responseJSON.array[0].lastname,
					attributes: {
						role: "technician",
						techId: data.responseJSON.array[0].techId
					}
				};
				
				WL.Server.setActiveUser("AdapterAuthRealm", identity);
				
				return {
					authRequired: false
				};
			}
			else {
				WL.Logger.warn("BluemixHTTP Adapater - verifyUser: User not found");
				return onAuthRequired(null, "Invalid login credential");
			}
		},
		onFailure: function(error) {
			WL.Logger.warn("submitAuthentication failure: " + error);
		}
	});*/
	
	//WL.Logger.debug("REST - response: " + response);*/
	
	
	
	
	/*var input = {
			headers: {"Content-Type": "application/json"},
            method: "POST",
            path: "http://localhost:8000/api/verifyUser",
            body: {
            	"contentType": "application/json",
            	"content": JSON.stringify(userInfo)
            }
	};
	WL.Logger.info("input = " + JSON.stringify(input));
	return WL.Server.invokeHttp(input);*/
}

function onAuthRequired(headers, errorMessage) {
	WL.Logger.warn("BluemixHTTP adapter - onAuthRequired");
	errorMessage = errorMessage ? errorMessage : null;
	
	return {
		authRequired: true,
		errorMessage: errorMessage
	};
}

function onLogout() {
	WL.Logger.warn("Logged OUT");
	WL.Server.setActiveUser("AdapterAuthRealm", null);
}
