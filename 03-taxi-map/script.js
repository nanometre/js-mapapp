async function getTaxi() {
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    return response.data.features[0].geometry.coordinates;
}

window.addEventListener("DOMContentLoaded", async function(){
    // wait for getTaxi to finish and then store its return value
    // into taxiCoordinates
    let taxiCoordinates = await getTaxi();
    let markerClusterLayer = L.markerClusterGroup();
    for (let t of taxiCoordinates) {
        // each t is an array
        // element 0 is lng, element 1 is lat
        let lat = t[1];
        let lng = t[0];
        let marker = L.marker([lat,lng]);
        marker.addTo(markerClusterLayer);
    }
    markerClusterLayer.addTo(map)
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

