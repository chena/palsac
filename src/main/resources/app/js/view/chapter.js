define([
	'backbone', 
	'underscore',
	'mustache', 
	'text!tpl/chapter/form.html'
], function(Backbone, _, Mustache, ChapterTemplate) {
	var ChapterView = Backbone.View.extend({
		template: ChapterTemplate,
		
		initialize: function(options) {
			// Backbone 1.1.0 no longer automatically attach options passed to the constructor as this.options
			// so we want to initialize it in the constructor here
			this.options = options || {};
			//this.model.on('change', this.render, this);
			//_.bindAll(this, 'changed'); // bind the context to the view for the changed event handler
			//this.model.on('reset', this.render, this);
		},
		
		events: {
			'change input':		'changed',
			'click .submit':	'submit'
		},
		
		render: function() {
			console.log(this.options);
			this.$el.html(Mustache.render(this.template));
			return this;
		},
		
		changed: function(event) {
			var target = $(event.target),
				field = target.context.name,
				changed = {};
			
			changed[field] = target.val();
			
			// attach contact email to the user model
			if (field === 'email') {
				this.options.user.set(changed);
			} else {
				this.model.set(changed);
			}
		},
		
		submit: function(event) {
			// this.options.user.save();
			//this.model.save();
			console.log(this.options.user.toJSON());
			console.log(this.model.toJSON());
			console.log("i'm submitting");
		}
	});
	
	return ChapterView;
});