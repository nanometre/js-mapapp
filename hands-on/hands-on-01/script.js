let mapCenter = [1.3521,103.8198];
let map = L.map('map').setView(mapCenter, 11);

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

let zooMarker = L.marker([1.4043, 103.7930]);
zooMarker.bindPopup('<p>Singapore Zoo</p>');
zooMarker.addTo(map);

let discoveryMarker = L.marker([1.3327, 103.6789]);
discoveryMarker.bindPopup('<p>Singapore Discovery Centre</p>');
discoveryMarker.addTo(map);

let birdParkMarker = L.marker([1.3187, 103.7064]);
birdParkMarker.bindPopup('<p>Jurong Bird Park</p>');
birdParkMarker.addTo(map);