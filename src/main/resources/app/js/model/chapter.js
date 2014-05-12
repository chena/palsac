define(['backbone'], function(Backbone) {
	
	var Chapter = {};
	
	Chapter.Model = Backbone.Model.extend({
		defaults: {
			eventType: 'popup'
		},
		convertDateTime: function() {
			
		}
	});
	
	Chapter.Collection = Backbone.Collection.extend({
		url: '/api/chapters',
		model: Chapter.Model
	});
	
	return Chapter;
});