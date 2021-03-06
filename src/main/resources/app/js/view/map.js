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
			
			var geocoder = new Gmap.Geocoder();
			
			locations = this.collection.map(function(model) {
				var venue = model.get('venue'),
					address = venue.get('address'),
					lat = venue.get('latitude'),
					lng = venue.get('longtitude'),
					latLng;
				
				if (lat && lng) {
					latLng = new Gmap.LatLng(lat, lng);
				}
				
				/*
				geocoder.geocode({
					address: address
				}, function(results, status) {
					console.log(results[0].geometry.location);
				});*/
				
				return {
					title: venue.get('name'),
					address: address,
					latLng: latLng
				};
			});
			
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
	  	
	  		map = new Gmap.Map($('#mapCanvas').get(0), mapOptions);

	  		// process each location
	  		_.each(locations, function(location) {
	  			// first mark each on the map
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
	      		
	      		// then list each in the side menu
	      		console.log(Array.prototype.slice.call(locations)[0]);
	      		$('.sidemenu').append($('<li>', {
	      			text: marker.getTitle()
	      		}));
	  		});

	  		// handle location search
	      	autocomplete = new Gmap.places.Autocomplete($('#searchBox').get(0));
	      	
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