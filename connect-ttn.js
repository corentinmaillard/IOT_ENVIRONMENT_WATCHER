let express = require('express');
let mqtt = require('mqtt');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Initiate connection and susbcribe to MQTT server
function ttnconnect(){

// TTN (The Things Network) MQTT server details
const ttnMqttHost = 'eu1.cloud.thethings.network';
const ttnMqttPort = 1883; // Default MQTT port
const ttnUsername = 'environment-watcher@ttn';
const ttnPassword = 'NNSXS.5B7EE34DXWYT5TDNBTAQRO7YFTHDL7AJ6RN7LQI.XTWMASAFRVTKPSCUCWU7YWUPBVTSLX56QUFWP5SS67RSDXNYVIFQ';
const ttnDevice = 'eui-70b3d57ed0062cb4';

// Connect to the TTN MQTT server with specified credentials
const client = mqtt.connect(`mqtt://${ttnMqttHost}:${ttnMqttPort}`, {
  username: ttnUsername,
  password: ttnPassword,
});

// Event handler when connected to TTN MQTT
client.on('connect', () => {
    console.log('Connected to TTN MQTT');
   client.subscribe(`v3/${ttnUsername}/devices/${ttnDevice}/up`);
   io.emit
})
return client
};

// Call the ttnconnect function to initiate the connection 
const client = ttnconnect();

module.exports = { ttnconnect, client, express, app, server, io };