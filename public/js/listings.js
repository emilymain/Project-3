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
    var minPrice = Number($('#minPrice').val());
    var maxPrice = Number($('#maxPrice').val());
    var bedrooms = Number($('#bedrooms').val());
    var bathrooms = Number($('#bathrooms').val());
    var duration = Number($('#duration').val());
    var pets = ($('#pets').val());
    var furnished = ($('#furnished').val());
    console.log(minPrice);

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

    console.log('PARAMS ARE', params);
    console.log("5" === 5);
    console.log("5" > 6);
    var formValues = [params.city, params.minPrice, params.maxPrice, params.bedrooms, params.bathrooms, params.duration
      // , params.pets, params.furnished
    ];
    var chosenValues = [];

    for (var i = 0; i < formValues.length; i++) {
      if (formValues[i]) {
        chosenValues.push(formValues[i]);
      } else {
        chosenValues.push("");
      }
    };

    console.log(chosenValues);
    console.log(formValues);

    $.get("http://localhost:3000/api/listings", {}, function(data) {
      for (var i = 0; i < data.length; i++) {
        console.log('DATA', data[i]);

        // if (
        //   data[i].city === params.city
        //   && data[i].price >= params.minPrice
        //   && data[i].price <= params.maxPrice
          // && data[i].bedrooms === params.bedrooms
          // && data[i].bathrooms === chosenValues[4]
          // && data[i].duration === chosenValues[5]
          // && data[i].pets === chosenValues[6]
          // && data[i].furnished === chosenValues[7]
          // for (var j = 0; j < chosenValues.length; j++) {

            var check = true;
            var match = true;
            while (check) {

              if (chosenValues[0] != data[i].city && chosenValues[0] != "") {
                check = false;
                match = false;
              } else if (chosenValues[0] == data[i].city || chosenValues[0] == "") {
                  check = true;
              };
              //minPrice
              if (chosenValues[1] < data[i].price && chosenValues[1] != "") {
                check = false;
                match = false;
              } else if (chosenValues[1] >= data[i].price || chosenValues[1] == "") {
                  check = true;
              };
              //maxPrice
              if (chosenValues[2] > data[i].price && chosenValues[2] != "") {
                check = false;
                match = false;
              } else if (chosenValues[2] <= data[i].price || chosenValues[2] == "") {
                  check = true;
              };

              if (chosenValues[3] != data[i].bedrooms && chosenValues[3] != "") {
                check = false;
                match = false;
              } else if (chosenValues[3] == data[i].bedrooms || chosenValues[3] == "") {
                  check = true;
              };

              if (chosenValues[4] != data[i].bathrooms && chosenValues[4] != "") {
                check = false;
                match = false;
              } else if (chosenValues[4] == data[i].bathrooms || chosenValues[4] == "") {
                  check = true;
              };

              if (chosenValues[5] != data[i].duration && chosenValues[5] != "") {
                check = false;
                match = false;
              } else if (chosenValues[5] == data[i].duration || chosenValues[5] == "") {
                  check = true;
              };
              check = false;

              // else {
              //   match = false;
              // }

            }
          // };

// ){
        if (match) {
          searchResult.push(data[i])
          var latLng = {
            lat: data[i].latitude,
            lng: data[i].longitude
          }
          addMarker(latLng);
        }
      }
      console.log(searchResult);
      console.log(searchResult.length);
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
