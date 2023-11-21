const socket = io();
socket.on('event-name', (data) => {
  
    console.log('Received event:', data);
    document.getElementById("affiche").innerHTML = data;
});