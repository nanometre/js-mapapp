async function getEarthquakeData() {
    let response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson');
    let earthquakeLatLng = [];
    for (let e of response.data.features) {
        let lat = e.geometry.coordinates[1];
        let lng = e.geometry.coordinates[0];
        earthquakeLatLng.push([lat,lng]);
    }
    return earthquakeLatLng;
}

// this function's responsbility to plot where the earthquakes 
function plotEarthquake(earthquakes, cluster) {
    for (let e of earthquakes) {
        let marker = L.marker(e);
        marker.addTo(cluster);
    }
}

window.addEventListener("DOMContentLoaded", async function(){
   let earthquakeLatLng = await getEarthquakeData();
   plotEarthquake(earthquakeLatLng, cluster);
   
});

// we need a center position for our map
// to be the starting position
let singapore = [ 1.29, 103.85]; // <-- array of 
                                 // 2 elements for latm lng

// create the map
// L is the Leaflet object which is in the global scope
// and is created when we <script src="leaflet.js">...
// L.map() creates a map object (contains all functionalities/data)
// and it takes one arg: the ID to put the map in.
let map = L.map('singaporeMap').setView(singapore, 6);

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

let cluster = L.markerClusterGroup();
cluster.addTo(map); 
