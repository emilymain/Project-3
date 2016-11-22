// var mongoId = "583337a4b416e70012a50a5d";
var userLat = 34.0129821;
var userLng = -118.495196;
var searchResult = [];

console.log('javascript is working');

function initMap() {
      var uluru = {lat: userLat, lng: userLng};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }

    $('#submitSearch').click(function(event) {

      console.log('jQuery works')
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


      $.post( "http://localhost:3000/api/listings", params, "json");

      event.preventDefault();

      $.get("http://localhost:3000/api/listings", {}, function(data) {
      	for (var i = 0; i < data.length; i++) {
      		if (
      			data[i].price <= params.maxPrice &&
      			data[i].price >= params.minPrice
            // &&
      			// data[i].bedrooms === params.bedrooms &&
      			// data[i].bathrooms === params.bathrooms &&
      			// data[i].pets === params.pets &&
      			// data[i].furnished === params.furnished &&
      			) {
      			searchResult.push(data[i]);
      		}
      	}
      	console.log(searchResult);
      }, "json");
    });
