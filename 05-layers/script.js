function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
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

// A layer group can contain other layers
// A layer can be: a layer group, or a marker, or a shape or etc etc etc
let group = L.layerGroup(); // create a new layer group

// add ten different random markers to the layer group
for (let i = 0; i < 10; i++) {
    let m = L.marker(getRandomLatLng(map));
    m.addTo(group);
}
group.addTo(map);

// create ten random green circles and add to group 2
let group2 = L.layerGroup();
for (let i = 0; i < 10; i++) {
    let pos = getRandomLatLng(map);
    let c = L.circle(pos, {
        color: 'red',
        fillColor: 'green',
        fillOpacity: 0.5,
        radius: 250
    } );
    c.addTo(group2);
}
group2.addTo(map);

// create ten random orange circles and add to group 3
let group3 = L.layerGroup();
for (let i = 0; i < 10; i++) {
    let pos = getRandomLatLng(map);
    let c = L.circle(pos, {
        color: 'red',
        fillColor: 'orange',
        fillOpacity: 0.5,
        radius: 250
    } );
    c.addTo(group3);
}
group3.addTo(map);

let markerCluster = L.markerClusterGroup();
for (let i=0; i< 500; i++) {
    let pos = getRandomLatLng(map);
    L.marker(pos).addTo(markerCluster);
}
markerCluster.addTo(map);

// base layers: must choose at least one and only one
let baseLayers = {
    'Markers': group,
    'Green Circles': group2,
}

// ovelays: can toggle on or off individual for each layer
let overlays = {
        'Red Circles': group3,
        'Clusters': markerCluster,
}

// add the overlays to the map
// if there's no baselayer, we can assign it to an empty object
// L.control.layers({}, overlays).addTo(map);
L.control.layers(baseLayers, overlays).addTo(map);

// controlling layer3 outside of map object using addEventListener assigned to a button
document.querySelector('#btnToggle')
    .addEventListener('click', function(){
        // if the map already has group3 layer, remove it
        if (map.hasLayer(group3)) {
            map.removeLayer(group3);
        } else {
            // if the map does not have the group3 layer, add it
            map.addLayer(group3);
        }
    })