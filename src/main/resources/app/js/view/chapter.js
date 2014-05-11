define([
	'backbone', 
	'jquery',
	'underscore',
	'mustache', 
	'gmap', 
	'text!tpl/chapter/form.html'
], function(Backbone, $, _, Mustache, Gmap, ChapterTemplate) {
	var ChapterView = Backbone.View.extend({
		template: ChapterTemplate,
		
		initialize: function(options) {
			// Backbone 1.1.0 no longer automatically attach options passed to the constructor as this.options
			// so we want to initialize it in the constructor here
			this.options = options || {};
			this.autocompelte = undefined;
			
			/*
			this.model.on('change', this.render, this);
			_.bindAll(this, 'changed'); // bind the context to the view for the changed event handler
			this.model.on('reset', this.render, this); */
		},
		
		events: {
			'change input':		'changed',
			'change select':	'changed',
			'click .submit':	'submit'
		},
		
		render: function() {
			this.$el.html(Mustache.render(this.template));
			return this;
		},
		
		setAddressAutocomplete: function() {
			// Gmap setup needs to be done after the view is rendered
			this.autocomplete = new Gmap.places.Autocomplete($('#address-input').get(0), {
				types: ['geocode']
			});
			Gmap.event.addListener(this.autocomplete, 'place_changed', this.fillInAddress);
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
		
		fillInAddress: function() {
			// TODO: different input for diff parts of address?
		},
		
		submit: function(event) {
			// TODO: validation
			
			//this.options.user.save(function(response) {
			//	console.log(response);
			//});
			
			var geocoder = new Gmap.Geocoder();
			console.log(this.model.get('address'));
			geocoder.geocode({
				'address': this.model.get('address')
			}, function(results, status) {
				console.log(status);
				if (status == Gmap.GeocoderStatus.OK) {
					console.log('valid address: ' + results[0].geometry.location);
				} else {
					console.log('invalid address');
				}
			});
			
			this.model.save(function(response) {
				console.log(response);
			});
		}
	});
	
	return ChapterView;
});