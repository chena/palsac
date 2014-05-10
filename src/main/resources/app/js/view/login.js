define([
	'backbone', 
	'underscore', 
	'mustache',
	'text!tpl/login.html'
], function(Backbone, _, Mustache, LoginTemplate) {
	
	var LoginView = Backbone.View.extend({
		el: '#login',
		
		template: _.template(LoginTemplate),
		
		events: {
			'click .logout':	'logout'
		},
		
		render: function() {
			console.log(this.model.toJSON());
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

	});
	
	return LoginView;
});