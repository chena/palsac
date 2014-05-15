define([
	'backbone', 
	'bbnested',
	'jquery',
	'underscore',
	'mustache', 
	'gmap', 
	'timepicker', 
	'text!tpl/event/form.html'
], function(Backbone, BackboneNested, $, _, Mustache, Gmap, TimePicker, EventTemplate) {
	var EventView = Backbone.View.extend({
		template: EventTemplate,
		
		initialize: function(options) {
			// for address input
			this.autocompelte = undefined;
			
			/*
			this.model.on('change', this.render, this);
			_.bindAll(this, 'changed'); // bind the context to the view for the changed event handler
			this.model.on('reset', this.render, this); */
		},
		
		events: {
			'change .event':	'changed',
			'change .venue':	'venueChanged',
			'change .organizer':'organizerChanged',
			'click .submit':	'submit',
		},
		
		render: function() {
			this.$el.html(Mustache.render(this.template, this.model.toJSON()));
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
			var that = this;
			
			// Gmap setup needs to be done after the view is rendered
			var autocomplete = new Gmap.places.Autocomplete($('#addressInput').get(0), {
				types: ['geocode']
			});
			
			// TODO: validate address
			var bindAddress = function() {
				var place = autocomplete.getPlace(),
					geocode = place.geometry.location;
				
				that.model.set({
					venue: {
						address: place.formatted_address,
						latitude: geocode.lat(),
						longtitude: geocode.lng()
					}
				});
			}
			
			Gmap.event.addListener(autocomplete, 'place_changed', bindAddress);
		},
		
		venueChanged: function(event) {
			this.changed(event, 'venue');
		},
		
		organizerChanged: function(event) {
			this.changed(event, 'organizer');
		},
		
		changed: function(event, modelName) {
			var target = event.target,
				field = target.name,
				value = target.value, 
				changed = {};
			
			console.log(field);
			changed[field] = value;
			
			if (!modelName) {
				this.model.set(changed);
				
				// toggle form input based on event type
				if (field === 'type') {
					if (value === 'recurring') {
						$('#eventDateInput').hide();
						$('#eventDescInput').show();
					} else {
						$('#eventDescInput').hide();
						$('#eventDateInput').show();
					} 
				}
			} else {
				var nestedModel = {};
				nestedModel[modelName] = changed; 
				this.model.set(nestedModel);
			}
		},
		
		submit: function() {
			var model = this.model;
			// TODO: validation
			if (model.get('type') === 'popup') {
				model.set({
					date: $('[name="date"]').val()
				});
				model.unset('repeatDescription');
			} else {
				model.unset('date');
			}
			
			model.set({
				startTime: $('[name="startTime"]').val(), 
				endTime: $('[name="endTime"]').val(),
			});
			
			
			/*
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
			});*/
			
			
			this.model.save(function(response) {
				console.log(response);
			}); 
		}
	});
	
	return EventView;
});