/// Load data from Json file :
const Dataload = require('./data_load');

let temperaturel = [];
let moisturel = [];
let soilmoisturel = [];
let lightsensorl = [];
let timel = [];

Dataload.load_data_from_Json(temperaturel,moisturel,soilmoisturel,lightsensorl,timel);


/// Connect to TTN and subscribe to your device :
const ttn = require('./connect-ttn');
express = ttn.express;
server = ttn.server
app = ttn.app;

 /// When TTN sends a message, notify the client via socket.io :

ttn.client.on('message', (topic, message) => {

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
    const timestampString = jsonData.uplink_message.received_at;

    const timestamp = new Date(timestampString);
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const secondes = timestamp.getSeconds();
    const time = `${hours}:${minutes}:${secondes}`;
    
    const mes = [degreesC, humidity, soilHumidity,light,time];
    console.log("Temperature:", mes[0]);
    console.log("Moisture:", mes[1]);
    console.log("Soilmoisture:", mes[2]);
    console.log("Light :",mes[3])
    console.log("Date :" ,mes[4]);
    ttn.io.emit('event-temperature', mes[0]);
    ttn.io.emit('event-humidity', mes[1]);
    ttn.io.emit('event-soilhumidity', mes[2]);
    ttn.io.emit('event-light', mes[3]);
    Dataload.add(temperaturel,mes[0]);
    Dataload.add(moisturel,mes[1]);
    Dataload.add(soilmoisturel,mes[2]);
    Dataload.add(lightsensorl,mes[3]);
    Dataload.add(timel,mes[4]);

    Dataload.save(temperaturel,moisturel,soilmoisturel,lightsensorl,timel)
  });


/// Server initialisation :
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
let router=require('./routes');
app.use('/',router);

server.listen( 8000, function(){
  console.log('server is running on port 8000')
});

