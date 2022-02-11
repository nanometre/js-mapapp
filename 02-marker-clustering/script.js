function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();

    // get the upper right and lower left of the map window
    // in lat lng
    let southwest = bounds.getSouthWest();
    let northeast = bounds.getNorthEast();

    // we calculate the length and width of the map window in lat,lng   
    let lngSpan = northeast.lng - southwest.lng;
    let latSpan = northeast.lat - southwest.lat;

    let randomLng = (Math.random() * lngSpan) + southwest.lng;
    let randomLat = (Math.random() * latSpan) + southwest.lat;

    return [randomLat, randomLng];
}

// we need a center position for our map
// to be the starting position
let singapore = [ 1.29, 103.85]; // <-- array of 
                                 // 2 elements for latm lng

// create the map
// L is the Leaflet object which is in the global scope
// and is created when we <script src="leaflet.js">...
// L.map() creates a map object (contains all functionalities/data)
// and it takes one arg: the ID to put the map in.
let map = L.map('singaporeMap').setView(singapore, 13);

// setup the tile layers
// this setup the drawing of the map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// create a marker cluster layer
let markerClusterLayer = L.markerClusterGroup(); // available be'cos we include in
                                                 // marker cluster group js and css

for (let i =0; i < 1000; i++) {
    let pos = getRandomLatLng(map);
    let marker = L.marker(pos);
    marker.addTo(markerClusterLayer);
}

markerClusterLayer.addTo(map);