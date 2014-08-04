define([
	'backbone',
	'bbnested',
], function(Backbone, BackboneNested) {
	
	var Event = {};
	
	Event.Model = Backbone.Model.extend({
		url: '/api/events',
		
		defaults: {
			active: true
		},
		
		relations: {
			organizer: Backbone.Model,
			venue: Backbone.Model
		},
		
		setVenue: function(venue) {
			this.set({
				venue: venue
			});
		},
		
		validate: function(attrs, options) {
			var that = this,
				badFields = [];
			
			var requiredFields = ['title', 'venue.name', 'venue.address', 
			                      'organizer.name', 'organizer.email', 'startTime', 'endTime'];
			
			// validate required fields
			requiredFields.forEach(function(field) {
				// check if the given field is in a nested model
				var nested = that.getNestedModel(field);
				if (nested) {
					var model = nested.nestedModel,
						fieldName = nested.fieldName;
					
					if (!model || that.isEmpty(model.attributes[fieldName])) {
						badFields.push(field);
					}
				} else {
					if (that.isEmpty(attrs[field])) {
						badFields.push(field);
					}
				}
			});
			
			// validate date if present
			if (dateRequired && !_.contains(badFields, 'date')) {
				if (!moment(attrs.date, 'YYYY/MM/DD').isValid()) {
					badFields.push({
						date: 'invalid date format (YYYY/MM/DD)'
					});
				} else if (moment(attrs.date).isBefore(moment().subtract('d', 1))) {
					badFields.push({
						date: 'date must be on or after today'
					});
				}
			}
			
			// validate start and end times
			var validTimes = true,
				startTime = attrs.startTime,
				endTime = attrs.endTime,
				timeFormat = 'hh:mm a';
			
			if (!(_.contains(badFields, 'startTime') || moment(startTime, timeFormat).isValid())) {
				badFields.push({
					startTime: 'invalid time'
				});
				validTimes = false;
			}
			
			if (!(_.contains(badFields, 'endTime') || moment(endTime, timeFormat).isValid())) {
				badFields.push({
					endTime: 'invalid time'
				});
				validTimes = false;
			}
			
			if (validTimes && moment(startTime, 'hh:mm a').isAfter(moment(endTime, timeFormat))) {
				badFields.push({
					startTime: 'start time cannot be greater than end time'
				});
				badFields.push(endTime);
			}
			
			return badFields.length == 0 ? false : badFields;
		 },
		 
		 getNestedModel: function(field) {
			 if (field.indexOf('.') == -1) {
				 return false;
			 }
			 var parts = field.split('.');
			 return {
				 modelName: parts[0],
				 fieldName: parts[1],
				 nestedModel: this.get(parts[0])
			 };			 
		 },
		 
		 isEmpty: function(value) {
			 return !value || value.trim().length == 0;
		 }
	});
	
	Event.Collection = Backbone.Collection.extend({
		url: '/api/events',
		
		model: Event.Model
	});
	
	return Event;
});