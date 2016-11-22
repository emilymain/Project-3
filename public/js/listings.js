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


// $.get("http://homeme-api.herokuapp.com/listings", {}, function(data) {
// 	for (var i = 0; i < data.length; i++) {
// 		if (
// 			data[i].price <= highPrice &&
// 			data[i].price >= lowPrice &&
// 			data[i].bedrooms === bedrooms &&
// 			data[i].bathrooms === bathrooms &&
// 			data[i].pets === pets &&
// 			data[i].furnished === furnished &&
// 			) {
// 			searchResult.push(data[i]);
// 		}
// 	}
// 	console.log(searchResult);
// }, "json");
