var searchResult = [];
// 34.0129821
// -118.495196
console.log('javascript is working');

function initMap() {
	return new google.maps.Map($('#map')[0], {
		zoom: 11,
		center: { lat: 34.0129821, lng: -118.495196 }
	})
};

var map = initMap();

function populateMap(params) {
	$.get("http://localhost:3000/api/listings", {}, function (data) {
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
				var uluru = {
					lat: data[i].latitude,
					lng: data[i].longitude
				};

				var marker = new google.maps.Marker({
					position: uluru,
					map: map
				});

				searchResult.push(data[i]);
			};
		}
		console.log(searchResult);
	}, "json");
  searchResult = [];
};

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
  populateMap(params);
});
