function createMap(restaurantsNyc) { // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});


    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
        "Street Map": streetmap
    };

    // Create an overlayMaps object to hold the bikeStations layer.
    var overlayMaps = {
        "Restaurants": restaurantsNyc
    };

    // Create the map object with options.
    var map = L.map("map-id", {
        center: [
            40.73, -74.0059
        ],
        zoom: 12,
        layers: [streetmap, restaurantsNyc]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);
}

function createMarkers(response) { // Initialize an array to hold bike markers.
    var restaurantMarkers = [];

    // Loop through the stations array.
    for (var index = 0; index < response.length; index++) {
        var restaurant = response[index];

        // For each station, create a marker, and bind a popup with the station's name.
        var restaurantMarker = L.marker([restaurant.Latitude, restaurant.Longitude]).bindPopup("<h3>" + restaurant.Name + "<h3><h3>Rating: " + restaurant.Rating + "</h3>");

        // Add the marker to the bikeMarkers array.
        restaurantMarkers.push(restaurantMarker);
    }

    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(restaurantMarkers));
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
createMarkers(response);
