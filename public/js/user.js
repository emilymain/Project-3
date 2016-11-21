var mongoId = "583337a4b416e70012a50a5d";
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
// {"id": mongoId}
$.get("http://homeme-api.herokuapp.com/listings", {}, function(data) {
	for (var i = 0; i < data.length; i++) {
		if (
			data[i].price <= highPrice &&
			data[i].price >= lowPrice &&
			data[i].bedrooms === bedrooms &&
			data[i].bathrooms === bathrooms &&
			data[i].pets === pets &&
			data[i].furnished === furnished &&
			) {
			searchResult.push(data[i]);
		}
	}
	console.log(searchResult);
	// console.log(data.latitude);
	// console.log(data.longitude);
}, "json");
