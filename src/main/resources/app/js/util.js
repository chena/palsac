define(['backbone'], function(Backbone) {
	
	// add close method to all views for cleanup
	Backbone.View.prototype.close = function() {
		if (this.onClose) {
			this.onClose();
		}
		this.remove(); // this will also unbind any events attached
	}
	
});