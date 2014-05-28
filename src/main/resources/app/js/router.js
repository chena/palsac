define([
	'jquery', 'backbone', 'facebook', 
	'model/user', 'model/event',
	'view/home', 'view/login', 'view/map', 
	'view/join', 'view/event', 'util', 
], function($, Backbone, FB, User, Event, HomeView, LoginView, MapView, JoinView, EventView, Util) {
	
	return Backbone.Router.extend({
		routes: {
			'map':	'showMap',
			'join':	'showJoin',
			'*path':'showHome'
		},
		
		showHome: function() {
			this.showMainView(new HomeView());
			this.selectMenuItem('.home');
		},
		
		showMap: function() {
			var that = this;
			var events = new Event.Collection();
			
			events.fetch({
				success: function() {
					var mapView = new MapView({
						collection: events
					});
					that.showMainView(mapView);
					mapView.setMap();
				}
			});

			this.selectMenuItem('.map');
		},
		
		showJoin: function() {
			var that = this;
			
			that.selectMenuItem('.join');
			
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					FB.api('/me', function(response) {
						var user = new User.Model({
							userId: response.id, 
							name: response.first_name 
						});
						
						that.showLogin(user);
						
						var eventView = new EventView({
							model: new Event.Model({userId: user.get('userId')}),
						}) 
						that.showMainView(eventView);
						eventView.initAddressAutocomplete();
						eventView.initTimePicker();
						
					});
				} else {
					that.showMainView(new JoinView());
				}
			});
		},
		
		showLogin: function(user) {
			var loginView =  new LoginView({
				model: user
			});
			
			loginView.render();
		},
		
		showMainView: function(view) {
			// close the previous view and set the new view
			if (this.currentView) {
				this.currentView.close();
			}
			this.currentView = view;
			
			// render the view to the main area
			$('#main').html(view.render().el);
		},
		
		selectMenuItem: function(menuItem) {
			// set the selected menu item to be active
			$('.navbar .nav li').removeClass('active');
			$(menuItem).addClass('active');
		}
		
	});
	
});