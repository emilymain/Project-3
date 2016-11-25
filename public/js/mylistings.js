$(document).ready(function(){
$.get("http://localhost:3000/api/listings", {}, function(data) {
  $('h2').append(data[0].bedrooms)
  console.log(data[0]);


});

// $(function() {
//   $.ajax({
//     type: "GET",
//     url: "/api/listings"
//   }).then(
//     function(data)
//
//   )
});
