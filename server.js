// load data from Json file
const Datamanage = require('./data_load');

let temperature = [];
let moisture = [];
let soilmoisture = [];
let lightsensor = [];

Datamanage.load_data_from_Json(temperature,moisture,soilmoisture,lightsensor);
Datamanage.add(lightsensor,30)
console.log(lightsensor)

// Connect to TTN and subscribe to your device
const ttn = require('./connect-ttn');
express = ttn.express;
server = ttn.server
app = ttn.app;
client = ttn.ttnconnect();

 // When TTN sends a message, notify the client via socket.io
const update = require('./data_update')
update

 

// function save(){
//   console.log(temperature)
  
//   const datas = {
//     "Temperature": temperature,
//     "Moisture": moisture,
//     "Soilmoisture": soilmoisture,
//     "Light": lightsensor,
//   };

//   const dictString = JSON.stringify(datas, null, 2); // Adding indentation for better readability
  
//   fs.writeFile('./public/thing.json', dictString, (err) => {
//     if (err) throw err;
//     console.log('File has been saved!');
//   });
// }
// server initialisation

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
let router=require('./routes');
app.use('/',router);

server.listen( 8000, function(){
  console.log('server is running on port 8000')
});

module.exports = { client,Datamanage };