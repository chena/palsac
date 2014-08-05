define([
	'backbone', 
	'bbnested',
	'jquery',
	'underscore',
	'mustache', 
	'gmap', 
	'timepicker', 
	'moment',
	'text!tpl/chapter.html',
	'text!tpl/organizer.html'
], function(Backbone, BackboneNested, $, _, Mustache, Gmap, TimePicker, Moment, ChapterTemplate, OrganizerTemplate) {
	var ChapterView = Backbone.View.extend({
		template: ChapterTemplate,
		
		events: {
			'change input, textarea, select': 'changed',
			'click .submit': 'submit',
			'click div.has-error *': 'clearThisError',
			'click .another': 'addOrganizer'
		},
		
		render: function() {
			this.$el.html(Mustache.render(this.template, this.model.toJSON()));
			return this;
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
		
		changed: function(event) {
			var target = event.target,
				field = target.name,
				value = target.value, 
				changed = {};
			
			// skip binding organizers info
			if ($(event.target).hasClass('organizer')) {
				return;
			}
			
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
		
		addOrganizer: function(event) {
			event.preventDefault();
			this.$('.another').remove(); // remove other add anchor
			this.$('.organizers').append(Mustache.render(OrganizerTemplate));
		},
		
		submit: function() {
			this.clearAllErrors();
			var model = this.model;
			
			// bind organizers
			var organizers = [],
				organizer = {},
				that = this;
			
			// TODO: move to utility
			var isEmpty = function(obj) {
				for (var field in obj) {
					if (obj[field] && obj[field].trim().length > 0) {
						return false;
					}
				}
				return true;
			};
			
			$('.organizer').each(function(index, item) {
				organizer[item.name] = item.value;
				if(index % 2 != 0 && !isEmpty(organizer)) {
					organizers.push(_.clone(organizer));
				}
			});
			model.setOrganizers(organizers);
			
			// client side validation
			if (!model.isValid()) {
				var requiredErrors = model.validationError;
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
			
			model.save({}, { 
				success: function(model, response) {
					Backbone.history.navigate('map', true);
					/*
					$('.alert-success').show();
					$('.alert-success').append($('<p/>', {
						text: 'Your chapter has been successfully added'
					}));
					setTimeout(function() {
						$('.alert-success').empty().hide();
					}, 3000);*/
				}
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
	
	return ChapterView;
});