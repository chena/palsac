define([
	'backbone',
	'bbnested',
], function(Backbone, BackboneNested) {
	
	var Chapter = {};
	
	Chapter.Model = Backbone.Model.extend({
		url: '/api/chapters',
		
		defaults: {
			active: true
		},
		
		relations: {
			organizer: Backbone.Collection,
			venue: Backbone.Model,
			events: Backbone.Collection
		},
		
		setOrganizers: function(organizers) {
			this.set({
				organizers: organizers
			});
		}, 
		
		setVenue: function(venue) {
			this.set({
				venue: venue
			});
		},
		
		setEvents: function(events) {
			this.set({
				events: events
			});
		},
		
		validate: function(attrs, options) {
			var that = this,
				badFields = [];
			
			var requiredFields = ['name', 'venue.address'];
			
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
	
	Chapter.Collection = Backbone.Collection.extend({
		url: '/api/chapters',
		
		model: Chapter.Model
	});
	
	return Chapter;
});