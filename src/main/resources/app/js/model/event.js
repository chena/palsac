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
		}
	});
	
	Event.Collection = Backbone.Collection.extend({
		url: '/api/events',
		
		model: Event.Model
	});
	
	return Event;
});