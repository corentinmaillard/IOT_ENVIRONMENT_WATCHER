// Set up express with socket.io
let express = require('express');
let mqtt = require('mqtt');
const fs = require('fs');
const app = express();
app.use(express.static('public'));
const server = require("http").Server(app);
const io = require("socket.io")(server);

// import readJSONFile from './readjson'

 // Replace these with your TTN MQTT connection details
const ttnMqttHost = 'eu1.cloud.thethings.network';
const ttnMqttPort = 1883; // Default MQTT port
const ttnUsername = 'environment-watcher@ttn';
const ttnPassword = 'NNSXS.5B7EE34DXWYT5TDNBTAQRO7YFTHDL7AJ6RN7LQI.XTWMASAFRVTKPSCUCWU7YWUPBVTSLX56QUFWP5SS67RSDXNYVIFQ';
const ttnDevice = 'eui-70b3d57ed0062cb4';
let temperature = [];
let moisture = [];
let soilmoisture = [];
let lightsensor = [];

fs.readFile('./public/thing.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erreur de lecture du fichier :', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    // Maintenant, vous pouvez utiliser les données JSON (jsonData) comme vous le souhaitez.
    console.log('Contenu du fichier JSON :', jsonData);
    console.log('temp',jsonData.Temperature)
    temperature = jsonData.Temperature
    moisture = jsonData.Moisture
    soilmoisture = jsonData.Soilmoisture
    lightsensor = jsonData.Light
  } catch (parseError) {
    console.error('Erreur de parsing JSON :', parseError);
  }
});



// Connect to TTN and subscribe to your device
const client = mqtt.connect(`mqtt://${ttnMqttHost}:${ttnMqttPort}`, {
  username: ttnUsername,
  password: ttnPassword,
});

 client.on('connect', () => {
    console.log('Connected to TTN MQTT');
   client.subscribe(`v3/${ttnUsername}/devices/${ttnDevice}/up`);
   io.emit
 });

 // When TTN sends a message, notify the client via socket.io
 client.on('message', (topic, message) => {
  
  // Assuming `buffer` is your ArrayBuffer
  const textDecoder = new TextDecoder('utf-8');
  const jsonString = textDecoder.decode(new Uint8Array(message));

  // Parse the JSON string
  const jsonData = JSON.parse(jsonString);

  // Extract information from the "decoded_payload" property
  const decodedPayload = jsonData.uplink_message.decoded_payload;
  const degreesC = decodedPayload.degreesC;
  const humidity = decodedPayload.humidity;
  const soilHumidity= decodedPayload.soilHumidity;
  const light = decodedPayload.lux;
  const mes = [degreesC, humidity,soilHumidity,light];

  console.log("Temperature:", mes[0]);
  console.log("Moisture:", mes[1]);
  console.log("Soilmoisture:", mes[2]);
  console.log("Light :",mes[3])
  io.emit('event-name', mes[0]);
  // limit(temperature); 
  add(temperature,mes[0])
  add(moisture,mes[1])
  add(soilmoisture,mes[2])
  add(lightsensor,mes[3])
  // temperature.push(mes[0]);
  // moisture.push(mes[1])
  // soilmoisture.push(mes[2])
  // lightsensor.push(mes[3])
  // console.log("shifted",temperature.shift())
  save()
});

 app.set('view engine', 'ejs');
 
 app.get('/', (req, res) => {
  
  res.render("moisture.ejs")
});
app.get('/light', (req, res) => {
  res.render("light.ejs");
});
app.get('/temperature', (req, res) => {
  res.render("temperature.ejs");
});



io.on("connection", function (socket) {
  console.log('Client')
})

// function limit(list){
//   if (list.length() < 11){
//     list.shift()
//   }
// }

function add(list,thing){
  list.push(thing)
}

function save(){
  console.log(temperature)
  
  const datas = {
    "Temperature": temperature,
    "Moisture": moisture,
    "Soilmoisture": soilmoisture,
    "Light": lightsensor,
  };
}
//   const dictString = JSON.stringify(datas, null, 2); // Adding indentation for better readability
  
//   fs.writeFile('./public/thing.json', dictString, (err) => {
//     if (err) throw err;
//     console.log('File has been saved!');
//   });
// }


// const value = JSON.parse()

server.listen( 8000, function(){
  console.log('server is running on port 8000')
});