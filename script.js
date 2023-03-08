// initializing our map and defining the coordinates of our place(Nairobi)

let map = L.map('map').setView([-1.2921, 36.8219], 7);

// adding the leaflet to our map and leaflet links to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// var facilities_wfs_url = "http://localhost:8080/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=PROGRAMMING_GIS:facilities&outputFormat=application/json&srsName=epsg:4326";

// code
// $.getJSON(facilities_wfs_url).then((res) => {
//     L.geoJson(res, {
//       pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng,
//             {
//                 radius: 10,
//                 stroke: true,
//                 weight: 2,
//                 opacity: 0.85,
//                 color:'red',
//                 fill: '#B53922',
//                 fillOpacity: 0.5
//         }).bindPopup("Facility Name:" + feature.properties.FacName);
//       },
//       onEachFeature: addMyFacilitiesData,
//     }).addTo(map);
// });
// let myLayerControl2 = L.layerGroup().addTo(map);

// let addMyFacilitiesData = (feature, layer) => {
//     myLayerControl2.addLayer(layer);
// }




// onclick events
let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

// embu county layer
let Embu_county = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'PROGRAMMING_GIS:embu',
    transparent: true,
    format: 'image/png',
});
// embu sublocations layer
let embusublocs = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'PROGRAMMING_GIS:embusublocs',
    transparent: true,
    opacity: 0.4,
    format: 'image/png',
});
// embu schools layer
let Embuschools = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'PROGRAMMING_GIS:Embuschools',
    transparent: true,
    format: 'image/png',
});
// krbroads layer
let KrbRoads = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'PROGRAMMING_GIS:KRBRoads',
    transparent: true,
    format: 'image/png',
});

//institutes layer
let institutes = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: '	PROGRAMMING_GIS:institutes',
    transparent: true,
    format: 'image/png',
});

// primary schools
let primary_schools = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'PROGRAMMING_GIS:primary_schools',
    transparent: true,
    format: 'image/png',
});

// towns
let towns = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'PROGRAMMING_GIS:towns',
    transparent: true,
    format: 'image/png',
});

// counties
let counties = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'PROGRAMMING_GIS:counties',
    transparent: true,
    opacity: 0.5,
    format: 'image/png',
});

// overlay maps
let overlayMaps = {
    "Counties": counties,
    "Embu Schools": Embuschools,
    "KrbRoads": KrbRoads,
    "embusublocs": embusublocs,
    'Institutes': institutes,
    'Embu_county': Embu_county,
    'Primary Schools': primary_schools,
    'Towns': towns,
};

//adding google hybrid as base_map
let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//adding google streets as base_map

let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//adding google satellite as base_map

let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//adding google terrain as base_map

let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//adding carto_db as base_map

let cartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png', {
   attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
   subdomains: 'abcd',
   maxZoom: 20,
   minZoom: 0
});

// Initializing baseMaps
let baseMaps = {
    "Google Hybrid":googleHybrid,
    "Google Streets": googleStreets,
    "Google Satellite":googleSat,
    "Google Terrain":googleTerrain,
    "CartoDB": cartoDB,
}

// declaring layer controls to overlay our maps
let layerControl = L.control.layers(baseMaps, overlayMaps,{collapsed:false}).addTo(map);

// Adding a search location to the map
L.Control.geocoder().addTo(map);
