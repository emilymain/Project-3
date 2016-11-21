$(function() {

// with prompt to get name once
// var name = prompt('What is your name?')
// var socket = io()
// $('form').submit(function(){
// 	socket.emit('chat message', name + ': ' + $('#m').val())
// 	$('#m').val('')
// 	return false
// })
// socket.on('chat message', function(msg){
// 	$('#messages').append($('<li>').text(msg))
// })
// with input for name
var socket = io()
$('form').submit(function(){
	socket.emit('chat message', $('#name').val() + ': ' + $('#m').val());
	$('#m').val('');
	return false;
});
socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
});

// end of document.ready function
});
