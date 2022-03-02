mapboxgl.accessToken = 'pk.eyJ1Ijoia2FpbGVpbGkiLCJhIjoiY2tnbjkwZ21yMDd4eDJzcWhuNTB1ajU0bSJ9.VPUbxA4OWbrHiJwopSc-xg';
	var map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/mapbox/streets-v11', // style URL
	center: [-118.286078173835, 34.0216453886309], // starting position [lng, lat]
	zoom: 15 // starting zoom
	});
	
	map.on('load', function () {
		
		// Find the index of the first symbol layer in the map style
	
	
	  map.addSource('footprints_source', { 
	type: 'geojson', 
	data: 'data/upc.geojson'
		  });
	
		map.addLayer({
        'id': 'building-layer',
        'type': 'fill',
        'source': 'footprints_source',
        'layout': {},
        'paint': {
            'fill-color': '#088',  //fixed color
            'fill-color': ['get', 'color'],  //use color from feature properties (if you decide to add a color to each feature in the GeoJSON)
            'fill-color': ['interpolate', ['linear'], ['get', 'color'], 0, '#ffcf33', 79000, '#e50000'],  //OK - interpolate color proportional to AREA property
            'fill-color': [ 'interpolate', ['linear'], ['*', ['get', 'AREA'], 0.5], 0, '#ffcf33', 79000, '#e50000'],  //OK - interpolate color proportional to AREA property with a factor of 0.5
            'fill-opacity': 0.8,
        }

		
	  });
	});