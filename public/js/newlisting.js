$('#submitListing').click(function(event) {

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

  $.post( "http://localhost:3000/api/listings", params, "json");

  event.preventDefault();
});
