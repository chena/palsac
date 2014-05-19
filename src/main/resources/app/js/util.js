define(['backbone', 'facebook'], function(Backbone, FB) {
	
	// add close method to all views for cleanup
	Backbone.View.prototype.close = function() {
		if (this.onClose) {
			this.onClose();
		}
		this.remove(); // this will also unbind any events attached
	};
	
	// add methods for showing and hiding validation errors
	Backbone.View.prototype.showError = function(errors) {
		if (this.onClose) {
			this.onClose();
		}
		this.remove(); // this will also unbind any events attached
	};
	
	// connect to Facebook API
	FB.init({
		appId: '1417475431850220',
		version: 'v3.0', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
	});
	
});