define([
	'underscore', 'jquery', 'backbone', 
	'view/home', 'view/map', 'util'
], function(_, $, Backbone, HomeView, MapView, Util) {
	
	return Backbone.Router.extend({
		routes: {
			'map':	'showMap',
			'*path':'showHome'
		},
		
		showHome: function() {
			this.showView('#main', new HomeView());
			this.selectMenuItem('.home');
		},
		
		showMap: function() {
			var mapView = new MapView();
			this.showView('#main', mapView);
			this.setMap(mapView);
			this.selectMenuItem('.map');
		},
		
		setMap: function(mapView) {
			mapView.setMap();
		},
		
		showView: function(selector, view) {
			// close the previous view
			if (this.currentView) {
				this.currentView.close();
			}
			
			// render the view with the selector
			$(selector).html(view.render().el);
			this.currentView = view;
			return view;
		},
		
		selectMenuItem: function(menuItem) {
			// set the selected menu item to be active
			$('.navbar .nav li').removeClass('active');
			$(menuItem).addClass('active');
		}
		
	});
	
});