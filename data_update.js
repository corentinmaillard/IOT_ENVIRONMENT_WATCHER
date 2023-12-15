const Dataload = require('./data_load');
const ttn = require('./connect-ttn');
const client = ttn.client

function update(temperature,moisture,soilmoisture,lightsensor){
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
        Dataload.add(temperature,mes[0])
        Dataload.add(moisture,mes[1])
        Dataload.add(soilmoisture,mes[2])
        Dataload.add(lightsensor,mes[3])
        // console.log("shifted",temperature.shift())
      });
    return temperature,moisture,soilmoisture,lightsensor
}

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


module.exports = { update};