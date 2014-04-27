define([
	'backbone', 
	'mustache', 
	'underscore', 
	'text!tpl/home.html'
], function(Backbone, Mustache, _, HomeTemplate) {
	
	var HomeView = Backbone.View.extend({
		template: _.template(HomeTemplate),
		
		render: function() {
			this.$el.html(this.template);
			return this;
		}
	});
	
	return HomeView;
});