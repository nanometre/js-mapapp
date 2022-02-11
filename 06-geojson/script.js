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

async function loadCyclingPath() {
    let response = await axios.get('data/cycle.geojson');
    // second arg is a config object
    let cyclingLayer = L.geoJson(response.data, {
        "onEachFeature":function(feature, layer) {
            // feature -- stores the information about the feature
            // layer -- is the line or shape that is being drawn onto the map
            // console.log(feature.properties); // inspect the properties of each feature
            layer.bindPopup(feature.properties.Description);

            // feature.properties.Description is HTML 
            let dummyDiv = document.createElement('div');
            // when we assign to the innerHTML of an element
            // it will contail any child elements inside new innerHTML
            dummyDiv.innerHTML = feature.properties.Description; //<table>...</table>
            let columns = dummyDiv.querySelectorAll('td');
            let pathName = columns[0].innerHTML;
            let agency = columns[1].innerHTML;
            layer.bindPopup(`<div>
                <ul>
                    <li>Path Name: ${pathName}</li>
                    <li>Agency: ${agency}</li>
                </ul>
            </div>`); 
        }

    }).addTo(map);
    cyclingLayer.setStyle({
        'color': 'red'
    })
    return cyclingLayer;
}

async function loadNParks() {
    let response = await axios.get('data/nparks.geojson');
    let nparks = L.geoJson(response.data, {
        onEachFeature:function(feature, layer) {
            // layer.bindPopup(feature.properties.Description);
            let dummyDiv = document.createElement('div');
            dummyDiv.innerHTML = feature.properties.Description;
            let columns = dummyDiv.querySelectorAll('td');
            let parkName = columns[0].innerHTML;
            let pathType = columns[1].innerHTML;
            let loop = columns[2].innerHTML;
            layer.bindPopup(`<div>
                <ul>
                    <li>Park: ${parkName}</li>
                    <li>Type: ${pathType}</li>
                    <li>Loop: ${loop}</li>
                </ul>
            </div>`)
        }
    }).addTo(map);
    nparks.setStyle({
        'color':'green'
    })
    return nparks;
}

window.addEventListener('DOMContentLoaded',  function(){
    loadCyclingPath();
    loadNParks();
})