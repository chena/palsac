define([
	'backbone', 
	'mustache', 
	'gmap', 
	'text!tpl/map.html'
], function(Backbone, Mustache, Gmap, MapTemplate) {
	
	var MapView = Backbone.View.extend({
		template: MapTemplate,
		
		render: function() {
			this.$el.html(Mustache.render(this.template));
			return this;
		},
		
		setMap: function() {
			var autocomplete, locations,
				map, mapOptions, styles;
			
			// data
			locations = [
				{
					title: 'Our Town Cafe',
					address: '245 Broadway E, Vancouver, BC V5T 1W4',
					latLng: new Gmap.LatLng(49.263151, -123.100135)
				},
				{
					title: 'Toronto\'s First Post Office',
					address: '260 Adelaide St E, Toronto, ON M5A 1N1',
					latLng: new Gmap.LatLng(43.652002, -79.370439)
				}
			];
			
			styles = [{
				stylers: [{
					saturation: -50 
				}]
			}];

			mapOptions = {
				center: new Gmap.LatLng(56.697775, -105.429688), // centre at North America
				zoom: 3,
				styles: styles,
				mapTypeId: Gmap.MapTypeId.ROADMAP
			};
	  	
	  		map = new Gmap.Map($('#map-canvas').get(0), mapOptions);

	  		// mark each location on the map
	  		_.each(locations, function(location) {
	      		var marker = new Gmap.Marker({
	      			position: location.latLng,
	      			title: location.title,
	      			// icon: 'img/envolope.png' // use a custom marker icon
	      		});
	      		marker.setMap(map);

	      		// zoom in location on click event
	      		Gmap.event.addListener(marker, 'click', function() {
	      			map.setZoom(15);
	      			map.setCenter(marker.getPosition());

	      			var infoWindow = new Gmap.InfoWindow({
						content: '<b>' + marker.getTitle() + '</b><br>' + location.address
					});
					infoWindow.open(map,marker);
	      		});
	  		});

	  		// handle location search
	      	autocomplete = new Gmap.places.Autocomplete($('#search-box').get(0));
	      	
	      	var onSearch = function() {
		  		var place = autocomplete.getPlace();
		  		
		  		if (place.geometry) {
		  			var from = place.geometry.location,
		  				minDist = Number.MAX_VALUE,
		  				minIndex;

		  			for (var i = 0, location; i < locations.length, location = locations[i]; i++) {
						var dist = Gmap.geometry.spherical.computeDistanceBetween(from, location.latLng);	      				
		  				if (dist < minDist) {
		  					minIndex = i;
		  					minDist = dist;
		  				}  
		  			}

		  			map.panTo(locations[minIndex].latLng);
		  			map.setZoom(10);
		  		} 
	      	}
	      	
	      	Gmap.event.addListener(autocomplete, 'place_changed', onSearch);
	  	}
		
	});
	
	return MapView;
});