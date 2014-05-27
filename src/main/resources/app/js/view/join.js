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
				Backbone.history.loadUrl(Backbone.history.fragment);
			});
		}
	});
	
	return JoinView;
});