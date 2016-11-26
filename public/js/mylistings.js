$(document).ready(function(){
  $.get("http://localhost:3000/api/listings", {}, function(data) {
    for(var i = 0; i < data.length; i++) {
      console.log(data[i]);
      $(`<div class="row">
          <div class="col-sm-6 col-md-4">
            <div class="thumbnail"><img src="${data[i].imageurl}" alt="...">
              <div class="caption">
                <h3 id="address">${data[i].streetNumber + ' ' + data[i].streetName}</h3>
                <p>${data[i].neighborhood + ', ' + data[i].zipcode}</p>
                <p>${data[i].bedrooms + ' Bed, ' + data[i].bathrooms + ' Bath'}</p>
                <p>${'$' + data[i].price + '/mo'} </p>
              </div>
            </div>
          </div>
        </div>`).appendTo('body');
    }
  });
});
