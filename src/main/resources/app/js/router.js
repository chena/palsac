define([
	'jquery', 'backbone', 'model/user', 
	'view/home', 'view/login', 'view/map', 
	'view/join', 'view/chapter', 
	'util', 'facebook'
], function($, Backbone, User, HomeView, LoginView, MapView, JoinView, ChapterView, Util, FB) {
	
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
			var mapView = new MapView();
			this.showMainView(mapView);
			mapView.setMap();
			this.selectMenuItem('.map');
		},
		
		showJoin: function() {
			var that = this;
			
			that.selectMenuItem('.join');
			
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					FB.api('/me', function(response) {
						console.log('Good to see you, ' + response.name + '.');
						var user = new User.Model({
							userID: response.id, 
							name: response.name 
						});
						that.showLogin(user);
					});
					that.showMainView(new ChapterView());
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