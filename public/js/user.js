// This page includes the javscript for the front-end

// $(function() {

	var mongoId = "583337a4b416e70012a50a5d";

	console.log('javascript is working');

	function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

	$('#submit').click(function(event) {

    console.log('jQuery works')
		var city = $('#city').val();
		var state = $('#state').val();
    var address = $('#address').val();
    var zipcode = $('#zipcode').val();
    var price = $('#price').val();
    var bedrooms = $('#bedrooms').val();
    var bathrooms = $('#bathrooms').val();
    var duration = $('#duration').val();
    var pets = $('#pets').val();
    var furnished = $('#furnished').val();

		var params = {
			"city": city,
			"state": state,
			"address": address,
			"zipcode": zipcode,
			"price": price,
			"bedrooms": bedrooms,
			"bathrooms": bathrooms,
			"duration": duration,
			"pets": pets,
			"furnished": furnished
		 }

		 console.log(params);

    $.post( "http://homeme-api.herokuapp.com/listings", params, "json");

    event.preventDefault();
  });

	console.log('foo');
	$.get("http://homeme-api.herokuapp.com/listings", {"id": mongoId}, function(data) {
		console.log(data.neighborhood);
		console.log(data.latitude);
		console.log(data.longitude);
	}, "json");

// end of document.ready function
// });
