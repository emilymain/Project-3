$(function() {


  $.get("http://localhost:3000/api/listings", {}, function(data) {
    for (var i = 0; i < data.length; i++) {

      $('#listingArticle').append(
        '<article class="style3"><span class="image"><img src="images/pic03.jpg" alt="" /></span><a href="www.google.com"><h2>' + data[i].neighborhood + '</h2><div class="content"><p>Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.</p></div></a></article>'
      )
    };
  })








});
