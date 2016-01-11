Template.reactive.onRendered(function() {
  GoogleMaps.load();
});

var MAP_ZOOM = 14;
	
Template.reactive.helpers({
	geolocationError: function(){
		var error = Geoloaction.error();
		return error && error.message;
	},
	mapOptions: function() {
		var latLng = Geolocation.latLng();
		// Make sure the maps API has loaded
		if (GoogleMaps.loaded() && latLng) {
		// Map initialization options
			return {
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom: MAP_ZOOM
			};
		}
	}
});

Template.reactive.onCreated(function() {
	var self = this;
	
	GoogleMaps.ready('map', function(map) {
		var marker;
		
		// Create and move the marker when LatLng changes.
		self.autorun(function() {
			var latLng = Geolocation.latLng();
			if (! latLng) 
				return;
				
			// If the marker doesn't yet exist, create it.
			if(! marker) {
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(latLng.lat, latLng.lng),
					map: map.instance
				});
			}
			// The marker already exists, so we'll just change its position.
			else {
				marker.setPosition(latLng);
			}
			
			// Center and zoom the map view onto the current position
			map.instance.setCenter(marker.getPostion());
			map.instance.setZoom(MAP_ZOOM);
		});
	});
});


