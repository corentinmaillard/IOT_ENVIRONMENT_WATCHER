/// Load data from Json file :
const Dataload = require('./data_load');

let temperature = [];
let moisture = [];
let soilmoisture = [];
let lightsensor = [];

Dataload.load_data_from_Json(temperature,moisture,soilmoisture,lightsensor);
// Dataload.add(lightsensor,30)
// console.log(lightsensor)

/// Connect to TTN and subscribe to your device :
const ttn = require('./connect-ttn');
express = ttn.express;
server = ttn.server
app = ttn.app;

 /// When TTN sends a message, notify the client via socket.io :
const Data_update = require('./data_update')
Data_update.update(temperature,moisture,soilmoisture,lightsensor);

/// Server initialisation :
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
let router=require('./routes');
app.use('/',router);

server.listen( 8000, function(){
  console.log('server is running on port 8000')
});
