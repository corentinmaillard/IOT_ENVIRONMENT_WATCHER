/// Load data from Json file :
const Dataload = require('./data_load');

let temperaturel = [];
let moisturel = [];
let soilmoisturel = [];
let lightsensorl = [];

Dataload.load_data_from_Json(temperaturel,moisturel,soilmoisturel,lightsensorl);


/// Connect to TTN and subscribe to your device :
const ttn = require('./connect-ttn');
express = ttn.express;
server = ttn.server
app = ttn.app;

 /// When TTN sends a message, notify the client via socket.io :

ttn.client.on('message', (topic, message) => {
  // console.log(temperature)
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
    // ttn.io.emit('event-name', mes[0]);
    Dataload.add(temperaturel,mes[0]);
    Dataload.add(moisturel,mes[1]);
    Dataload.add(soilmoisturel,mes[2]);
    Dataload.add(lightsensorl,mes[3]);

    // console.log("shifted",temperature.shift())
    Dataload.save(temperaturel,moisturel,soilmoisturel,lightsensorl)
  });


// Dataload.save(temperaturel,moisturel,soilmoisturel,lightsensorl)
/// Server initialisation :
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
let router=require('./routes');
app.use('/',router);

server.listen( 8000, function(){
  console.log('server is running on port 8000')
});

