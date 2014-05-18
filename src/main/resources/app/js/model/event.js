define([
	'backbone',
	'bbnested'
], function(Backbone, BackboneNested) {
	
	var Event = {};
	
	Event.Model = Backbone.Model.extend({
		url: '/api/events',
		
		defaults: {
			type: 'popup', 
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
				//errors = {},
				//emptyMsg = 'cannot be empty';
			
			var requiredFields = ['title', 'venue.name', 'venue.address', 'organizer.name', 'startTime', 'endTime'];
			
			requiredFields.forEach(function(field) {
				if (that.isEmpty(attrs[field])) {
					badFields.push(field);
					//errors[field] = emptyMsg;
				}
			});
			
			return badFields.length == 0 ? null : badFields;
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