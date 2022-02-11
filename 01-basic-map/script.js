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

// Create a marker overlay 
let singaporeMarker = L.marker([1.29, 103.85]);

// Add the marker to the map
// map.add(singaporeMarker);
singaporeMarker.addTo(map);

let clementiMarker = L.marker([1.3162, 103.7649]);
clementiMarker.addTo(map);

L.marker([1.2494,103.8303]).addTo(map);

// add a pop-up box to the Singapore box
singaporeMarker.bindPopup(`<h1>Singapore</h1>
Singapore (/ˈsɪŋ(ɡ)əpɔːr/), officially the Republic of Singapore, is a sovereign island city-state in maritime Southeast Asia. It lies about one degree of latitude (137 kilometres or 85 miles) north of the equator, off the southern tip of the Malay Peninsula, bordering the Straits of Malacca to the west, the Riau Islands (Indonesia) to the south, and the South China Sea to the east. The country's territory is composed of one main island, 63 satellite islands and islets, and one outlying islet, the combined area of which has increased by 25% since the country's independence as a result of extensive land reclamation projects. It has the third greatest population density in the world. With a multicultural population and recognising the need to respect cultural identities, Singapore has four official languages; English, Malay, Mandarin, and Tamil. English is the lingua franca. Multiracialism is enshrined in the constitution and continues to shape national policies in education, housing, and politics.
`);

// or we can add an event listener to mark
clementiMarker.addEventListener('click', function(){
    alert("I can see my house from here!");
})

// create a circle
// first arg is the lat,lng of the circle (center point)
let circle = L.circle([1.3294,103.8021], {
    color: 'red',
    fillColor:'orange',
    fillOpacity:0.5,
    radius: 500 // metres
});
circle.addTo(map);