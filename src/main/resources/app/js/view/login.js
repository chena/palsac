define([
	'backbone', 
	'mustache',
	'facebook',
	'text!tpl/login.html'
], function(Backbone, Mustache, FB, LoginTemplate) {
	
	var LoginView = Backbone.View.extend({
		el: '#login',
		template: LoginTemplate,
		
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		
		events: {
			'click .logout':	'logout'
		},
		
		render: function() {
			this.$el.html(Mustache.render(this.template, this.model.toJSON()));
			return this;
		},
		
		logout: function() {
			var that = this;

			FB.logout(function(response) {
				that.model.clear();
				Backbone.history.navigate('/');
			});
		}
	});
	
	return LoginView;
});