(() => {
  document.getElementById("file-input").onchange = () => {
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if(file == null){
      return alert('No file selected.');
    }
    getSignedRequest(file);
  };
})();
function getSignedRequest(file){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}
function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    console.log('hi')
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        document.getElementById('preview').src = url;
        document.getElementById('imageurl').value = url;
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}
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
  var imageurl = $('#imageurl').val();

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
		"furnished": furnished,
    "imageurl": imageurl
	 }

	 console.log(params);

  $.post( "http://localhost:3000/api/listings", params, "json");

  event.preventDefault();
});