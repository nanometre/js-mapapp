let mapCenter = [1.3521,103.8198];
let map = L.map('map').setView(mapCenter, 11);
let cluster = L.markerClusterGroup();

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

async function getEarthquakes(){
    let response = await axios.get('data/earthquakes.geojson')
    let earthquakeLayer = L.geoJson(response.data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.place);
        }
    }).addTo(cluster);
    return earthquakeLayer;
}

window.addEventListener('DOMContentLoaded', function() {
    getEarthquakes()
})

cluster.addTo(map)