define([
	'backbone', 
	'mustache', 
	'facebook',
	'text!tpl/join.html'
], function(Backbone, Mustache, FB, JoinTemplate) {
	
	var JoinView = Backbone.View.extend({
		template: JoinTemplate,
		
		events: {
			'click .fb-login':	'login'
		},
		
		render: function() {
			this.$el.html(Mustache.render(this.template));
			return this;
		},
		
		login: function() {
			FB.login(function(response) {
				console.log('I\'m logged in!');
				// FIXME: Backbone.history.navigate returns immediately
				// when the path fragment is unchanged
				Backbone.history.navigate('/', true); 
				Backbone.history.navigate('join', true);
			});
		}
	});
	
	return JoinView;
});