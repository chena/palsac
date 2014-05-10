define(['backbone'], function(Backbone) {
	
	var Chapter = {};
	
	Chapter.Model = Backbone.Model.extend({
		url: '/api/chapters',
		id: 'chapterID'
	});
	
	Chapter.Collection = Backbone.Collection.extend({
		model: Chapter.Model
	});
	
	return Chapter;
});