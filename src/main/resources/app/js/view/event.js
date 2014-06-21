define([
	'backbone', 
	'bbnested',
	'jquery',
	'underscore',
	'mustache', 
	'gmap', 
	'timepicker', 
	'moment',
	'text!tpl/chapter.html'
], function(Backbone, BackboneNested, $, _, Mustache, Gmap, TimePicker, Moment, EventTemplate) {
	var EventView = Backbone.View.extend({
		template: EventTemplate,
		
		initialize: function(options) {
			/*
			this.model.on('change', this.render, this);
			_.bindAll(this, 'changed'); // bind the context to the view for the changed event handler
			this.model.on('reset', this.render, this); */
		},
		
		events: {
			'change input, textarea, select': 'changed',
			'click .submit': 'submit',
			'click div.has-error *': 'clearThisError'
		},
		
		render: function() {
			this.$el.html(Mustache.render(this.template, this.model.toJSON()));
			return this;
		},
		
		initTimePicker: function() {
			var that = this;
			
			$('.datepicker').datetimepicker({
                pickTime: false,
                minDate: Moment().subtract('d', 1)
            });
			$('.timepicker').datetimepicker({
                pickDate: false,
                format: 'hh:mm a'
            });
			$('.timepicker span, .datepicker span').click(function(event) {
				that.clearThisError(event);
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
		
		changed: function(event) {
			var target = event.target,
				field = target.name,
				value = target.value, 
				changed = {};

			var nested = this.model.getNestedModel(field);

			if (nested) {
				changed[nested.fieldName] = value;
				var nestedModel = {}
				nestedModel[nested.modelName] = changed; 
				this.model.set(nestedModel);
			} else {
				changed[field] = value;
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
			}
		},
		
		submit: function() {			
			this.clearAllErrors();
			
			var model = this.model,
				bbModel = model.get('venue') instanceof Backbone.Model;
			
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
			
			// client side validation
			if (!model.isValid()) {
				var requiredErrors = model.validationError;
				console.log(requiredErrors);
				requiredErrors.forEach(function(errorField) {
					if (_.isObject(errorField)) {
						var field = Object.keys(errorField)[0],
							msg = errorField[field];
						var parent = $('[name="' + field + '"]').parent().parent();
						parent.addClass('has-error');
						
						// clear existing error msg
						parent.find('span.help-block').remove();
						
						parent.append($('<span/>', {
							text: msg,
							'class': 'help-block'
						}));
					} else {
						$('[name="' + errorField + '"]').parent().addClass('has-error');
					}
				});
				
				return;
			}
			
			// address field is non-empty, validate it
			var modelAddr = model.get('venue').get('address');
			
			console.log('model addr' + modelAddr);
			console.log('autocomplete addr: ' + this.audocompleteAddr);
			
			if (!this.audocompleteAddr || this.audocompleteAddr != modelAddr) {
				this.codeAddress(modelAddr, function(valid) {
					if (!valid) {
						console.log('invalid address!!');
					}
				});
				
			} 
			
			this.model.save(function(response) {
				console.log(response);
				Backbone.history.navigate('map', true);
				$('.alert-success').show();
				$('.alert-success').append($('<p/>', {
					text: 'Your event has been successfully added'
				}));
				setTimeout(function() {
					$('.alert-success').empty().hide();
				}, 3000);
			}); 
		},
		
		clearThisError: function(event) {
			var errorTarget = this.$(event.target).closest('.has-error');
			errorTarget.removeClass('has-error');
			errorTarget.find('.help-block').remove();
		},
		
		clearAllErrors: function() {
			this.$('.has-error').removeClass('has-error');
			this.$('.help-block').remove();
		}
		
	});
	
	return EventView;
});