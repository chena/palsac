define(['backbone'], function(Backbone) {
	
	var Event = {};
	
	Event.Model = Backbone.Model.extend({
		defaults: {
			eventType: 'popup'
		},
		convertDateTime: function() {
			
		}
	});
	
	Event.Collection = Backbone.Collection.extend({
		url: '/api/events',
		model: Event.Model
	});
	
	return Event;
});