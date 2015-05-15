 /****************************************************************************************
 *
 *  STATE-BASED ROUTING
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./app'], function (app) {
 	'use strict';
 	return app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
 		$urlRouterProvider.otherwise('/login');
 		$stateProvider
 		// login state
 		.state('login', {
 			url: '/login',
	        views: {
	            'content': {
	                templateUrl: './views/authenticate.html',
	                controller: 'authenticateCtrl'
	            }
	        },
	        data : { 
	        	pageTitle: 'Login' 
	        }
		})
 		// login state
 		.state('register', {
 			url: '/register',
	        views: {
	            'content': {
	                templateUrl: './views/register.html',
	                controller: 'authenticateCtrl'
	            }
	        },
	        data : { 
	        	pageTitle: 'Registration' 
	        }
		})
		// dashboard - parent state
		.state('dashboard', {
			url: '/dashboard',
			abstract: true,
 			views: {
 				'content': {
					templateUrl : './views/dashboard/main.html',
					controller  : 'dashboardCtrl'
 				}
 			}
		})
		// dashboard - child state
		.state('dashboard.content', {
			url: '',
 			views: {
 				'progress': {
 					templateUrl: './views/dashboard/vehicleProgress.html',
					controller  : 'dashboardCtrl'
 				},
 				'review': {
 					templateUrl: './views/dashboard/vehicleReview.html',
					controller  : 'dashboardCtrl'
 				},
 				'header': {
 					templateUrl: './views/elements/header.html'
 				}
 			},
	        data : { 
	        	pageTitle: 'Dashboard' 
	        }
		})
		// inspection - parent state
	    .state('inspection', {
	        abstract: true,
	        url: '/inspection/{inspectionPath}',
	        views: {
	            'content': {
	                templateUrl: './views/dashboard/main.html',
	                controller: 'inspectionCtrl'
	            }
	        }
	    })
	    // inspection - child state
	    .state('inspection.vinScanner', {
	        url: '',
	        parent: 'inspection',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/vinScanner.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'VIN Scanner' 
	        }
	    })
	    // inspection - child state
	    // report - parent state
	    .state('inspection.report', {
	        url: '/report/{vinNum}',
	        parent: 'inspection',
	        abstract: true,
	        views: {
	            'content': {
	                templateUrl: './views/inspection/report.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				}
	        }
	    })
	    // report - child state
	    .state('inspection.report.dealerVehicleInfo', {
	        url: '',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/dealerVehicleInfo.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Dealer and Vehicle Info' 
	        }
	    })
	    // report - child state
	    .state('inspection.report.preCheck', {
	        url: '/preCheck',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/preCheck.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Pre-Check' 
	        }
	    })
	    // report - child state
	    // vehicle interior - parent state
	    .state('inspection.report.vehicleInterior', {
	        url: '/vehicleInterior',
	        parent: 'inspection.report',
	        abstract: true,
	        views: {
	            'content': {
	                templateUrl: './views/inspection/vehicleInterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress-bar.html'
 				}
	        }
	    })
	    // vehicle interior - child state 	    
	    .state('inspection.report.vehicleInterior.frontInterior', {
	        url: '/frontInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior/frontInterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.frontInterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Front Interior' 
	        }
	    })
	    // vehicle interior - child state 	    
	    .state('inspection.report.vehicleInterior.leftFrontInterior', {
	        url: '/leftFrontInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior/leftFrontInterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.leftFrontInterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Left Front Interior' 
	        }
	    })
	    // vehicle interior - child state   
	    .state('inspection.report.vehicleInterior.leftRearInterior', {
	        url: '/leftRearInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior/leftRearInterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.leftRearInterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Left Rear Interior' 
	        }
	    })
	    // vehicle interior - child state 	    
	    .state('inspection.report.vehicleInterior.rightRearInterior', {
	        url: '/rightRearInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior/rightRearInterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.rightRearInterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Right Rear Interior' 
	        }
	    })
	    // vehicle interior - child state     
	    .state('inspection.report.vehicleInterior.rightFrontInterior', {
	        url: '/rightFrontInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior/rightFrontInterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.rightFrontInterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Right Front Interior' 
	        }
	    })
	    // report - child state 
	    // vehicle exterior - parent state 
	    .state('inspection.report.vehicleExterior', {
	        url: '/vehicleExterior',
	        abstract: true,
	        views: {
	            'content': {
	                templateUrl: './views/inspection/vehicleExterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress-bar.html'
 				}
	        }
	    })	    
	    // vehicle exterior - child state 
	    .state('inspection.report.vehicleExterior.frontExterior', {
	        url: '/frontExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/exterior/frontExterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.frontExterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Front Exterior' 
	        }
	    })	    
	    // vehicle exterior - child state 	    
	    .state('inspection.report.vehicleExterior.leftFrontExterior', {
	        url: '/leftFrontExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/exterior/leftFrontExterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.leftFrontExterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Left Front Exterior' 
	        }
	    })	    
	    // vehicle exterior - child state 	    
	    .state('inspection.report.vehicleExterior.leftRearExterior', {
	        url: '/leftRearExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/exterior/leftRearExterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.leftRearExterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Left Rear Exterior' 
	        }
	    })	    
	    // vehicle exterior - child state   
	    .state('inspection.report.vehicleExterior.rightRearExterior', {
	        url: '/rightRearExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/exterior/rightRearExterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.rightRearExterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Right Rear Exterior' 
	        }
	    })	    
	    // vehicle exterior - child state     
	    .state('inspection.report.vehicleExterior.rightFrontExterior', {
	        url: '/rightFrontExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/exterior/rightFrontExterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.rightFrontExterior': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Right Front Exterior' 
	        }
	    })
	    // engine - child state
	    .state('inspection.report.vehicleEngine', {
	        url: '/vehicleEngine',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/vehicleEngine.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress-bar.html'
 				},
 				'reportData@inspection.report.vehicleEngine': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Engine Compartment' 
	        }
	    })
	    // road test - child state
	    .state('inspection.report.roadTest', {
	        url: '/roadTest',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/roadTest.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress-bar.html'
 				},
 				'reportData@inspection.report.roadTest': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Road Test' 
	        }
	    })
	    // under the vehicle - child state
	    .state('inspection.report.underVehicle', {
	        url: '/underVehicle',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/underTheVehicle.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress-bar.html'
 				},
 				'reportData@inspection.report.underVehicle': {
 					templateUrl: './views/reportContent.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Under the Vehicle' 
	        }
	    })
	    // summary - child state
	    .state('inspection.report.summary', {
	        url: '/:vinNum/summary',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/summary.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Inspection Summary' 
	        }
	    });
 	}]);
 });