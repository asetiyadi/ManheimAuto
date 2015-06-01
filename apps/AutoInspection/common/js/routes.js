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
 		.state('login', {
 			url: '/login',
	        views: {
	            'content': {
	                templateUrl: './views/login.html',
	                controller: 'authenticateCtrl'
	            }
	        },
	        data : { 
	        	pageTitle: 'Login' 
	        }
		})
 		.state('registration', {
 			url: '/registration',
	        views: {
	            'content': {
	                templateUrl: './views/registration.html',
	                controller: 'authenticateCtrl'
	            }
	        },
	        data : { 
	        	pageTitle: 'Registration' 
	        }
		})
		.state('dashboard', {
			url: '/dashboard',
			abstract: true,
 			views: {
 				'content': {
					templateUrl : './views/main.html',
					controller  : 'dashboardCtrl'
 				}
 			}
		})
		.state('dashboard.content', {
			url: '',
 			views: {
 				'progress': {
 					templateUrl: './views/report_progress.html',
					controller  : 'dashboardCtrl'
 				},
 				'review': {
 					templateUrl: './views/report_review.html',
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
	    .state('inspection', {
	        abstract: true,
	        url: '/inspection/{inspectionPath}',
	        views: {
	            'content': {
	                templateUrl: './views/main.html',
	                controller: 'inspectionCtrl'
	            }
	        }
	    })
	    .state('inspection.vinScanner', {
	        url: '',
	        parent: 'inspection',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/vin_scanner.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'VIN Scanner' 
	        }
	    })
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
	    .state('inspection.report.dealerVehicleInfo', {
	        url: '',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/dealer_and_vehicle_information.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Dealer and Vehicle Info' 
	        }
	    })
	    .state('inspection.report.preCheck', {
	        url: '/preCheck',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/pre_check.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Pre-Check' 
	        }
	    })
	    .state('inspection.report.vehicleInterior', {
	        url: '/vehicleInterior',
	        parent: 'inspection.report',
	        abstract: true,
	        views: {
	            'content': {
	                templateUrl: './views/inspection/vehicle_interior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress_bar.html'
 				}
	        }
	    })    
	    .state('inspection.report.vehicleInterior.frontInterior', {
	        url: '/frontInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.frontInterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Front Interior' 
	        }
	    })    
	    .state('inspection.report.vehicleInterior.leftFrontInterior', {
	        url: '/leftFrontInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.leftFrontInterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Left Front Interior' 
	        }
	    })  
	    .state('inspection.report.vehicleInterior.leftRearInterior', {
	        url: '/leftRearInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.leftRearInterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Left Rear Interior' 
	        }
	    })    
	    .state('inspection.report.vehicleInterior.rightRearInterior', {
	        url: '/rightRearInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.rightRearInterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Right Rear Interior' 
	        }
	    })   
	    .state('inspection.report.vehicleInterior.rightFrontInterior', {
	        url: '/rightFrontInterior',
	        parent: 'inspection.report.vehicleInterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleInterior.rightFrontInterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Interior of Vehicle: Right Front Interior' 
	        }
	    })
	    .state('inspection.report.vehicleExterior', {
	        url: '/vehicleExterior',
	        abstract: true,
	        views: {
	            'content': {
	                templateUrl: './views/inspection/vehicle_exterior.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress_bar.html'
 				}
	        }
	    })	    
	    .state('inspection.report.vehicleExterior.frontExterior', {
	        url: '/frontExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.frontExterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Front Exterior' 
	        }
	    })	    	    
	    .state('inspection.report.vehicleExterior.leftFrontExterior', {
	        url: '/leftFrontExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.leftFrontExterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Left Front Exterior' 
	        }
	    })	    	    
	    .state('inspection.report.vehicleExterior.leftRearExterior', {
	        url: '/leftRearExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.leftRearExterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Left Rear Exterior' 
	        }
	    })	    
	    .state('inspection.report.vehicleExterior.rightRearExterior', {
	        url: '/rightRearExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.rightRearExterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Right Rear Exterior' 
	        }
	    })	        
	    .state('inspection.report.vehicleExterior.rightFrontExterior', {
	        url: '/rightFrontExterior',
	        parent: 'inspection.report.vehicleExterior',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/interior_exterior_content.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'reportData@inspection.report.vehicleExterior.rightFrontExterior': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Exterior of Vehicle: Right Front Exterior' 
	        }
	    })
	    .state('inspection.report.vehicleEngine', {
	        url: '/vehicleEngine',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/vehicle_engine.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress_bar.html'
 				},
 				'reportData@inspection.report.vehicleEngine': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Engine Compartment' 
	        }
	    })
	    .state('inspection.report.roadTest', {
	        url: '/roadTest',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/road_test.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress_bar.html'
 				},
 				'reportData@inspection.report.roadTest': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Road Test' 
	        }
	    })
	    .state('inspection.report.underVehicle', {
	        url: '/underVehicle',
	        parent: 'inspection.report',
	        views: {
	            'content': {
	                templateUrl: './views/inspection/under_the_vehicle.html'
	            },
 				'header': {
 					templateUrl: './views/elements/header.html'
 				},
 				'progressBar': {
 					templateUrl: './views/elements/progress_bar.html'
 				},
 				'reportData@inspection.report.underVehicle': {
 					templateUrl: './views/report_content.html'
 				}
	        },
	        data : { 
	        	pageTitle: 'Under the Vehicle' 
	        }
	    })
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