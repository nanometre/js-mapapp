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

async function getData(){
    let request1 = axios.get('data/hdb.json');
    let request2 = axios.get('data/malls.json');
    let request3 = axios.get('data/nature.json');

    let response1 = await request1;
    let response2 = await request2;
    let response3 = await request3;
    
    return [response1.data, response2.data, response3.data];
}

window.addEventListener('DOMContentLoaded', async function() {
    let data = await getData();
    // console.log(data[2])
    hdbData = data[0];
    mallsData = data[1];
    natureData = data[2];

    let hdbGroup = L.layerGroup();
    for (let hdb of hdbData) {
        let hdbMarker = L.marker([hdb.coordinates[0], hdb.coordinates[1]]).bindPopup(hdb.name);
        hdbMarker.addTo(hdbGroup);
    }
    hdbGroup.addTo(map);

    let mallGroup = L.layerGroup();
    for (let mall of mallsData) {
        let mallMarker = L.marker([mall.coordinates[0], mall.coordinates[1]]).bindPopup(mall.name)
        mallMarker.addTo(mallGroup);
    }
    mallGroup.addTo(map);

    let natureGroup = L.layerGroup();
    for (let nature of natureData) {
        let natureMarker = L.marker([nature.coordinates[0], nature.coordinates[1]]).bindPopup(nature.name)
        natureMarker.addTo(natureGroup);
    }
    natureGroup.addTo(map);

    let overlays = {
        'HDB': hdbGroup,
        'Malls': mallGroup,
        'Nature': natureGroup,
    }

    L.control.layers({}, overlays).addTo(map);
})
