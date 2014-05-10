define([
	'backbone', 
	'mustache', 
	'text!tpl/home.html'
], function(Backbone, Mustache, HomeTemplate) {
	
	var HomeView = Backbone.View.extend({
		template: HomeTemplate,
		
		render: function() {
			this.$el.html(Mustache.render(this.template));
			return this;
		}
	});
	
	return HomeView;
});