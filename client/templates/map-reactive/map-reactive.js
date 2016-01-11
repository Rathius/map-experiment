Template.map.onRendered(function() {
  GoogleMaps.load();
});

var MAP_ZOOM = 15;
	
Template.reactive.helpers({
	geolocationError: function(){
		var error = Geoloaction.erro();
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
	
	// We can use the `ready` callback to interact with the map API once the map is ready.
	GoogleMaps.ready('map', function(map) {
		// Add a marker to the map once it's ready
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
				marker.setPostion(latLng);
			}
			
			// Center and zoom the map view onto the current position
			map.instance.setCenter(marker.getpostion());
			map.instance.setZoom(MAP_ZOOM);
		});
	});
});


