// Set up express with socket.io
let express = require('express');
let mqtt = require('mqtt');

const app = express();
app.use(express.static('public'));
const server = require("http").Server(app);
const io = require("socket.io")(server);

 // Replace these with your TTN MQTT connection details
const ttnMqttHost = 'eu1.cloud.thethings.network';
const ttnMqttPort = 1883; // Default MQTT port
const ttnUsername = 'environment-watcher@ttn';
const ttnPassword = 'NNSXS.5B7EE34DXWYT5TDNBTAQRO7YFTHDL7AJ6RN7LQI.XTWMASAFRVTKPSCUCWU7YWUPBVTSLX56QUFWP5SS67RSDXNYVIFQ';
const ttnDevice = 'eui-70b3d57ed0062cb4';
const temperature = [];
const moisture = [];
const soilmoisture = [];
const light = [];

// Connect to TTN and subscribe to your device
const client = mqtt.connect(`mqtt://${ttnMqttHost}:${ttnMqttPort}`, {
  username: ttnUsername,
  password: ttnPassword,
});

 client.on('connect', () => {
    console.log('Connected to TTN MQTT');
   client.subscribe(`v3/${ttnUsername}/devices/${ttnDevice}/up`);
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
  const soilHumidity= decodedPayload.soilHumidity
  const mes = [degreesC, humidity,soilHumidity];

  console.log("Degrees Celsius:", mes[0]);
  console.log("Humidity:", mes[1]);
  console.log("soilHumidity:", mes[2]);
  io.emit('event-name', mes[0]);
  temperature.push(mes[0]);
  moisture.push(mes[1])
  soilmoisture.push(mes[2])
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
  io.emit('event-name', 'hello');
})

const fs = require('fs');



function save(){
  const datas = {
    "Temperature": temperature,
    "Moisture": moisture,
    "soilmoisture": soilmoisture,
    "Light": light,
  };
  
  const dictString = JSON.stringify(datas, null, 2); // Adding indentation for better readability
  
  fs.writeFile('./public/thing.json', dictString, (err) => {
    if (err) throw err;
    console.log('File has been saved!');
  });
}


// const value = JSON.parse()

server.listen( 8000, function(){
  console.log('server is running on port 8000')
});