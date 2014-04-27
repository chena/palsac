// set the require.js configuration for our application
require.config({
	baseUrl: 'app',
	
	paths: {
		// libraries
		backbone:	'js/lib/backbone',
		bootstrap:	'js/lib/bootstrap.min',
		jquery:		'js/lib/jquery-1.11.0.min',
		mustache:	'js/lib/mustache',
		require:	'js/lib/require',
		text:		'js/lib/text',
		underscore:	'js/lib/underscore-min',
		
		// google map API
		async:		'js/lib/async',
		gmap:		'js/lib/gmap',
		
		// paths for our modules
		router:	'js/router',
		util:	'js/util',
		model:	'js/model',
		view:	'js/view',
		tpl:	'templates'
	},
	
	// for libraries not supporting AMD
	shim: {
		'backbone': {
            // dependencies should be loaded before loading backbone.js
            deps: ['underscore', 'jquery'],
            // once loaded, use the global 'Backbone' as the module value
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
	}
});

// bootstrap our application by instantiating a router
require(['backbone', 'router'], function(Backbone, Router) {
	var app = new Router();
	Backbone.history.start();
});
	
