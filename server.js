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
  io.emit('event-name', message);
  console.log(message);
});

//handle errors
client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1)
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
// You can replace 'index.html' with the actual name of your HTML file
res.render("dashboard.ejs")
});

io.on("connection", function (socket) {
  console.log('Client')
  io.emit('event-name', 'hello');
})


server.listen( 8000, function(){
  console.log('server is running on port 8000')
});