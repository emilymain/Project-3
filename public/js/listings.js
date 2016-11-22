var map;
var markers = [];
var searchResult = [];

function initMap() {
  var center = {
    lat: 34.0129821,
    lng: -118.495196
  };

  map = new google.maps.Map($('#map')[0], {
    zoom: 12,
    center: center,
    mapTypeId: 'roadmap'
  });

  // This event listener will call addMarker() when the map is clicked.
  $('#submitSearch').click(function(event) {
    deleteMarkers();
    searchResult = [];

    var city = $('#city').val();
    var minPrice = $('#minPrice').val();
    var maxPrice = $('#maxPrice').val();
    var bedrooms = $('#bedrooms').val();
    var bathrooms = $('#bathrooms').val();
    var duration = $('#duration').val();
    var pets = $('#pets').val();
    var furnished = $('#furnished').val();

    var params = {
      "city": city,
      "minPrice": minPrice,
      "maxPrice": maxPrice,
      "bedrooms": bedrooms,
      "bathrooms": bathrooms,
      "duration": duration,
      "pets": pets,
      "furnished": furnished
    }

    $.get("http://localhost:3000/api/listings", {}, function(data) {
			console.log(data[0])
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].city === params.city
          // && data[i].price >= params.minPrice
          // && data[i].price <= params.maxPrice
          // && data[i].bedrooms === params.bedrooms
          // && data[i].bathrooms === params.bathrooms
          // && data[i].duration === params.duration
          // && data[i].pets === params.pets
          // && data[i].furnished === params.furnished
        ) {
          searchResult.push(data[i])
          var latLng = {
            lat: data[i].latitude,
            lng: data[i].longitude
          }
          addMarker(latLng);
        }
      }
      console.log(searchResult);
    })
  });

  // Adds a marker at the center of the map.
  addMarker(center);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
