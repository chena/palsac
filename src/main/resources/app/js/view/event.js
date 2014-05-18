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
		
		autocomplete: undefined,
		audocompleteAddr: undefined,
		
		initAddressAutocomplete: function() {
			var that = this;
			
			// Gmap setup needs to be done after the view is rendered
			that.autocomplete = new Gmap.places.Autocomplete($('#addressInput').get(0), {
				types: ['geocode']
			});
			
			var bindAddress =  function() {
				var place = that.autocomplete.getPlace(),
					geocode = place.geometry.location,
					address = place.formatted_address;
				
				that.model.setVenue({
					address: address,
					latitude: geocode.lat(),
					longtitude: geocode.lng()
				});
				
				that.audocompleteAddr = address;
			}
			
			Gmap.event.addListener(that.autocomplete, 'place_changed', bindAddress);
		},
		
		codeAddress: function(address, callback) {
			var that = this;
			var geocoder = new Gmap.Geocoder();

			geocoder.geocode({
				'address': address
			}, function(results, status) {
				if (status == Gmap.GeocoderStatus.OK) {
					var geocode = results[0];
					console.log(status);
					console.log(results);
					
					that.model.setVenue({
						address: address,
						latitude: geocode.lat(),
						longtitude: geocode.lng()
					});
					
					callback(true);
				} else {
					callback(false);
				}
			});
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
			
			// client side validation
			/*
			if (!model.isValid()) {
				console.log(model.validationError);
				return;
			}*/
			
			var bbModel = model.get('venue') instanceof Backbone.Model;
			console.log(bbModel);
			
			// bind date and time values
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
			
			// address field is non-empty, validate it
			var modelAddr = model.get('venue').get('address');
			
			console.log('model addr' + modelAddr);
			console.log('autocomplete addr: ' + this.audocompleteAddr);
			
			if (!this.audocompleteAddr || this.audocompleteAddr != modelAddr) {
				this.codeAddress(modelAddr, function(valid) {
					console.log(valid);
					if (!valid) {
						console.log('invalid address!!');
					}
				});
				
			} 
		}
	});
	
	return EventView;
});