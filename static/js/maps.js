function createMap(hotelsNYC, museumsNYC, restaurantsNYC, shoppingNYC, groceriesNYC) { // Create the tile layer that will be the background of our map.
  
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
  
    
    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the different map layer.
    var overlayMaps = {
      "Hotels": hotelsNYC,
      "Restaurants": restaurantsNYC,
      "Museums": museumsNYC,
      "Shopping": shoppingNYC,
      "Groceries": groceriesNYC
    };
  
    // Create the map object with options.
    var myMap = L.map("map-id", {
      center: [
        40.73, -74.0059
      ],
      zoom: 12,
      layers: [streetmap, hotelsNYC, restaurantsNYC, museumsNYC, shoppingNYC, groceriesNYC]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);
  }
    
  
  function createMarkers(data, dataID) { // Initialize an array to hold bike markers.
    
    //let style = {color:"red"};
    //var hotelMarkers = [];
    // Loop through the stations array.
    var hotelMarkersLayer = L.layerGroup();
    for (var index = 0; index < data.length; index++) {
      var mark_data = data[index];
  
      var hotelIcon = L.icon({
        iconUrl: 'static/images/hotel-3.png',
        iconSize: [30, 30],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        });
        var restIcon = L.icon({
        iconUrl: 'static/images/restaurant-2.png',
        iconSize: [30, 30],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        });
        var museumIcon = L.icon({
        iconUrl: 'static/images/museum-2.png',
        iconSize: [30, 30],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        });
        var shopIcon = L.icon({
          iconUrl: 'static/images/shopping-2.png',
          iconSize: [30, 30],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          });
        var grocIcon = L.icon({
          iconUrl: 'static/images/cart.png',
          iconSize: [30, 30],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
        });
        let style = {};
        if (dataID == 1){
          style = {icon:hotelIcon};
        }
        else if (dataID == 2){
          style = {icon:museumIcon};
        }
        else if (dataID ==3){
          style = {icon:restIcon};
  
        }
        else if (dataID == 4){
          style = {icon:shopIcon};
        }
        else {
          style = {icon:grocIcon}
          
        }
      
      // For each station, create a marker, and bind a popup with the item's name.
      var hotelMarker = L.marker(mark_data.location, style).bindPopup("<h6>" + mark_data.name + "<h6><h6>Address: " + mark_data.address + "</h6>");
  
  
      // Add the marker to the bikeMarkers array.
      
      //hotelMarkers.push(hotelMarker);
      hotelMarker.addTo(hotelMarkersLayer); 
      //return hotelMarkersLayer 
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    //createMap(L.layerGroup(hotelMarkers));
    //return L.layerGroup(hotelMarkers)
    return hotelMarkersLayer
  }
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  console.log(respHotel, respGroceries, respMuseum, respRest, respShop)
  let hotelLayer = createMarkers(respHotel, 1);
  let museumLayer = createMarkers(respMuseum, 2);
  let restaurantLayer = createMarkers(respRest, 3);
  let shoppingLayer = createMarkers(respShop, 4);
  let groceriesLayer = createMarkers(respGroceries, 5);
  
  createMap(hotelLayer, museumLayer, restaurantLayer, shoppingLayer, groceriesLayer)
  
  