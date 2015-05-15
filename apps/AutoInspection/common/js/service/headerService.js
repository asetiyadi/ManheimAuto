 /****************************************************************************************
 *
 *  HEADER SERVICE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (services) {
 	'use strict';
 	services.service('headerService', ['$rootScope', 
 		function ($rootScope) {
		var title = 'Inspection App';
		var link = 'Logout';
		var linkID = 'logoutWrapper';
		var linkURL = '/login';
		this.title = function () { 
			return title; 
		},
		this.setTitle = function (newTitle) { 
			title = newTitle; 
		},
		this.link = function () { 
			return link; 
		},
		this.setLink = function (newLink) { 
			link = newLink; 
		},
		this.linkID = function () { 
			return linkID; 
		},
		this.setLinkID = function (newLinkID) { 
			linkID = newLinkID; 
		},
		this.linkURL = function () { 
			return linkURL; 
		},
		this.setLinkURL = function (newLinkURL) { 
			linkURL = newLinkURL; 
		}
 	}]);
 });