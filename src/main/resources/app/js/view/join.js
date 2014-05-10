define([
	'backbone', 
	'underscore', 
	'facebook',
	'text!tpl/join.html'
], function(Backbone, _, FB, JoinTemplate) {
	
	var JoinView = Backbone.View.extend({
		template: _.template(JoinTemplate),
		
		events: {
			'click .fb-login':	'login'
		},
		
		render: function() {
			this.$el.html(this.template);
			return this;
		},
		
		login: function() {
			FB.login(function(response) {
				
			});
		}
	});
	
	return JoinView;
});