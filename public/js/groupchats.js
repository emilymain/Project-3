// Define function that will get executed when the X is clicked on.
function deleteChatroom(evt) {
  console.log('clicked')
  // Grab the parent li of the span
  var html = $(this).parent();
  // Get the id of the groupchat we are deleting
  var id = html.id;

  // Use AJAX to delete the groupchat from our db
  $.ajax({
    type: "DELETE",
    url: "/api/groupchats/" + encodeURIComponent(id)
  }).then(
    // Use jquery to remove it from the DOM
    function() {
      html.remove();
    }
  );
}

$(document).ready(function() {
  // Grab all groupchats from our db
  $.ajax({
    type: "GET",
    url: "/api/groupchats"
  }).then(
    function(jsonGroupchats) {
      // Iterate through our array of json groupchats
      jsonGroupchats.forEach(function(jsonGroupchat) {
        $(chatroomList).append(
          $(`<li id=${jsonGroupchat._id}>${jsonGroupchat.chatName} - <a href="groupchats/${jsonGroupchat._id}">Enter Chatroom</a> <button onclick="deleteChatroom(this)" type="button" class="btn btn-danger">X</button> </li>`)
        );
      });
    }
  );

  // Attach listener on form button to perform AJAX post of new groupchat.
  $('#createChat').click(function(evt) {
    // Stop the default behavior from clicking on the submit button.
    evt.preventDefault();
    var newGroupchat = {
      chatName: $('#chatroomName').val().replace(/\s/g, ''),
      chatPassword: $('#chatroomPassword').val().replace(/\s/g, '')
    }
    if($('#chatroomName').val().replace(/\s/g, '') == "" || $('#chatroomPassword').val().replace(/\s/g, '') == "") {
      $('#requiredFields').modal('show');
    } else {
      // Use AJAX to add the new groupchat to our db
      $.ajax({
        method: "POST",
        url: "/api/groupchats",
        data: newGroupchat
      }).then(
        function(jsonGroupchat) {
          console.log(jsonGroupchat);
          // Clear the form
          $('#chatroomName').val("");

          return jsonGroupchat;
        },
        function(err) {
          console.log("Failed: ", err);
        }
      ).then(
        function(jsonGroupchat) {
          $(chatroomList).append(
            $(`<li>${jsonGroupchat.chatName} - <a href="groupchats/${jsonGroupchat._id}">Enter Chatroom</a> <button onclick="deleteChatroom(this)" type="button" class="btn btn-danger">X</button></li>`)
          );
        }
      );
    }
  });
});
