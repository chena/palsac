define(['backbone'], function(Backbone) {
	
	var User = {};
	
	User.Model = Backbone.Model.extend({
		url: '/api/users',
		id: 'userID'
	});
	
	User.Collection = Backbone.Collection.extend({
		model: User.Model
	});
	
	return User;
});