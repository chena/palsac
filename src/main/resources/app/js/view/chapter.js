define([
	'backbone', 
	'underscore', 
	'text!tpl/chapter/form.html'
], function(Backbone, _, ChapterTemplate) {
	
	var ChapterView = Backbone.View.extend({
		template: _.template(ChapterTemplate),
		
		events: {
			'click .submit':	'submit'
		},
		
		render: function() {
			this.$el.html(this.template);
			return this;
		},
		
		submit: function() {
			
		}
	});
	
	return ChapterView;
});