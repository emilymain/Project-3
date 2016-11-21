// This page includes the javscript for the front-end

$(function() {

	console.log('javascript is working');

	var mymap = L.map('mapid').setView([34.0195, -118.4912], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(mymap);

	var marker = L.marker([34.0195, -118.4912]).addTo(mymap);

	$('#submit').click(function(event) {

    console.log('jQuery works')

    var address = $('#address').val();
    var zipcode = $('#zipcode').val();
    var price = $('#price').val();
    var bedrooms = $('#bedrooms').val();
    var bathrooms = $('#bathrooms').val();
    var duration = $('#duration').val();
    var pets = $('#pets').val();
    var furnished = $('#furnished').val();

		var params = {
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


  })

});
