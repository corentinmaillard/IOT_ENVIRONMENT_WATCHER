 // Set up express with socket.io
 let express = require('express');
 let mqtt = require('mqtt');
 
 const app = express();
 app.use(express.static('public'));
 const server = require("http").Server(app);
 const io = require("socket.io")(server);

// Routes
//app.use(express.urlencoded({extended:true}));
//let router=require('./routes');
//app.use('/',router);

 // Replace these with your TTN MQTT connection details
const ttnMqttHost = 'eu1.cloud.thethings.network';
const ttnMqttPort = 1883; // Default MQTT port
const ttnUsername = 'environment-watcher@ttn';
const ttnPassword = 'NNSXS.E6FQVX2JN2N5UOGNYD6DFO3VMAEGCWOTJGDOIOY.7UHY5PJYEFGX2CRJAEW6G2WM55HDSUS5OVBWSNLOSE5MBS64XTIQ';
const ttnDevice = 'eui-70b3d57ed0062cb4';

 // Connect to TTN and subscribe to your device
 const client = mqtt.connect(`mqtt://${ttnMqttHost}:${ttnMqttPort}`, {
    username: ttnUsername,
    password: ttnPassword,
  });

 client.on('connect', () => {
    console.log('Connected to TTN MQTT');
   client.subscribe(`${ttnUsername}/devices/${ttnDevice}/up`);
 });

 // When TTN sends a message, notify the client via socket.io
 client.on('message', (topic, message) => {
   io.emit('event-name', "hello world");
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


server.listen( 8000, function(){
  console.log('server is running on port 8000')
});