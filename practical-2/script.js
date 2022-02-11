async function showEarthquakes() {
    let response = await axios.get('data/earthquakes.geojson');
    let earthquakeLayer = L.geoJson(response.data, {
        "onEachFeature":function(feature, marker){
            // feature -- stores the information about the feature
            // layer -- is the line or shape that is being drawn onto the map
            marker.bindPopup(feature.properties.place)
        }
    }).addTo(map)
    return earthquakeLayer;
}

// initialise map to set usa in the center
let usa = [37.09024, -95.712891]; // lat lng
let map = L.map('myMap').setView(usa, 5);

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

window.addEventListener('DOMContentLoaded', async function(){
    showEarthquakes();
})
