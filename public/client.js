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

async function fetchData() {
    const response = await fetch('/thing.json');
    const json = await response.json();
    try{
        document.getElementById("affiche_temperature").innerHTML = json["Temperature"][json["Temperature"].length-1]
    }
    catch{}
    try{
        document.getElementById("affiche_humidity").innerHTML = json["soilmoisture"][json["soilmoisture"].length-1]
    }
    catch{}
    try{
        document.getElementById("affiche_light").innerHTML = json["Light"][json["Light"].length-1]
    }
    catch{}
}
fetchData()
