define([
	'backbone', 
	'jquery',
	'underscore',
	'mustache', 
	'gmap', 
	'timepicker', 
	'text!tpl/event/form.html'
], function(Backbone, $, _, Mustache, Gmap, TimePicker, EventTemplate) {
	var EventView = Backbone.View.extend({
		template: EventTemplate,
		
		initialize: function(options) {
			// Backbone 1.1.0 is no longer automatically attaching options passed to the constructor 
			// as this.options so we want to initialize it in the constructor here
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
			'click .submit':	'submit',
		},
		
		render: function() {
			var formData = {
				user: this.options.user.toJSON(),
				model: this.model.toJSON()
			}
			this.$el.html(Mustache.render(this.template, formData));
			return this;
		},
		
		initTimePicker: function() {
			$('.datepicker').datetimepicker({
                pickTime: false
            });
			$('.timepicker').datetimepicker({
                pickDate: false
            });
		},
		
		initAddressAutocomplete: function() {
			// Gmap setup needs to be done after the view is rendered
			var autocomplete = new Gmap.places.Autocomplete($('#addressInput').get(0), {
				types: ['geocode']
			});
			
			/*
			var codeAddress = function() {
				var place = autocomplete.getPlace();
				console.log(place.geometry.location);
			}
			
			Gmap.event.addListener(autocomplete, 'place_changed', codeAddress);*/
		},
		
		changed: function(event) {
			var target = $(event.target),
				field = target.context.name,
				value = target.val(), 
				changed = {};
			
			changed[field] = value;
			
			// attach contact email to the user model
			if (field === 'email') {
				this.options.user.set(changed);
			} else {
				this.model.set(changed);
			}
			
			// toggle form input based on event type
			if (field === 'type' && value === 'recurring') {
				$('#eventDateInput').hide();
				$('#eventDescInput').show();
			} else {
				$('#eventDescInput').hide();
				$('#eventDateInput').show();
			}
		},
		
		submit: function() {
			// TODO: validation
			
			//this.options.user.save(function(response) {
			//	console.log(response);
			//});
			
			console.log(this.model.toJSON());
			
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
			
			/*
			this.model.save(function(response) {
				console.log(response);
			}); */
		}
	});
	
	return EventView;
});