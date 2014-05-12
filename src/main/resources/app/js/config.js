// set the require.js configuration for our application
require.config({
	baseUrl: 'app',
	
	paths: {
		// libraries
		jquery:		'js/lib/jquery-1.11.0.min',		
		backbone:	'js/lib/backbone',
		bootstrap:	'js/lib/bootstrap.min',
		mustache:	'js/lib/mustache',
		require:	'js/lib/require',
		text:		'js/lib/text',
		underscore:	'js/lib/underscore-min',
		moment:		'js/lib/moment.min',
		timepicker:	'js/lib/bootstrap-datetimepicker.min',
		
		// third-party APIs
		async:		'js/lib/async',
		gmap:		'js/lib/gmap',
		facebook:	'//connect.facebook.net/en_US/all',
		
		// paths for our modules
		router:	'js/router',
		util:	'js/util',
		model:	'js/model',
		view:	'js/view',
		tpl:	'templates'
	},
	
	// for libraries not supporting AMD
	shim: {
		'bootstrap': {
			deps: ['jquery'],
			exports: 'Bootstrap'
		},
		'backbone': {
            // dependencies should be loaded before loading backbone.js
            deps: ['underscore', 'jquery'],
            // once loaded, use the global 'Backbone' as the module value
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'facebook': {
        	exports: 'FB'
        }
	}
});

// bootstrap our application by instantiating a router
require(['backbone', 'bootstrap', 'router'], function(Backbone, Bootstrap, Router) {
	var app = new Router();
	Backbone.history.start();
});
	
