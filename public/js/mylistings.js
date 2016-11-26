$(document).ready(function(){
$.get("http://localhost:3000/api/listings", {}, function(data) {
  for(var i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
  // 
  // $('h3').text(data[0].streetNumber + ' ' + data[0].streetName)
  // console.log(data[0]);

// the above code uses /api/listings in order to grab data and append it to the div
// the goal is to pull from the favorites array and do a forEach favorite, create a div for apt.

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
