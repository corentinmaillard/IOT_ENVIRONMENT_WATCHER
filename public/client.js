const socket = io();
socket.on('event-temperature', (data) => {
  
    console.log('Received event:', data);
    document.getElementById("affiche_temperature").innerHTML = data;
});
socket.on('event-humidity', (data) => {
  
    console.log('Received event:', data);
    document.getElementById("affiche_humidity").innerHTML = data;
});
socket.on('event-light', (data) => {
  
    console.log('Received event:', data);
    document.getElementById("affiche_light").innerHTML = data;
});