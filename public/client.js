const socket = io();
socket.on('event-temperature', (data) => {
    console.log('Received event:', data);
    // Update the chart data
    temperatureChart.data.labels.push(new Date().toLocaleTimeString());
    temperatureChart.data.datasets[0].data.push(data);
    temperatureChart.update();
    document.getElementById("affiche_temperature").innerHTML = data;
});
socket.on('event-humidity', (data) => {
  
    console.log('Received event:', data);
    // Update the chart data
    moistureChart.data.labels.push(new Date().toLocaleTimeString());
    moistureChart.data.datasets[0].data.push(data);
    moistureChart.update();
    document.getElementById("affiche_humidity").innerHTML = data;
});
socket.on('event-soilhumidity', (data) => {
  
    console.log('Received event:', data);
    // Update the chart data
    SoilmoistureChart.data.labels.push(new Date().toLocaleTimeString());
    SoilmoistureChart.data.datasets[0].data.push(data);
    SoilmoistureChart.update();
    document.getElementById("affiche_soilhumidity").innerHTML = data;
});
socket.on('event-light', (data) => {
  
    console.log('Received event:', data);
    // Update the chart data
    lightChart.data.labels.push(new Date().toLocaleTimeString()); //new axe x label
    lightChart.data.datasets[0].data.push(data); // new axe y value
    lightChart.update();

    // Update the displayed light value
    document.getElementById("affiche_light").innerHTML = data;
    
});
// show the curent data 
async function fetchData() {
    const response = await fetch('/thing.json');
    const json = await response.json();
    try{
        document.getElementById("affiche_temperature").innerHTML = json["Temperature"][json["Temperature"].length-1]
    }
    catch{}
    try{
        document.getElementById("affiche_humidity").innerHTML = json["Moisture"][json["Moisture"].length-1]
    }
    catch{}
    try{
        document.getElementById("affiche_soilhumidity").innerHTML = json["Soilmoisture"][json["Soilmoisture"].length-1]
    }
    catch{}
    try{
        document.getElementById("affiche_light").innerHTML = json["Light"][json["Light"].length-1]
    }
    catch{}
}
fetchData()
