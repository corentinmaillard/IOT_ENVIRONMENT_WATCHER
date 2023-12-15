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
        const timestampString = jsonData.uplink_message.received_at;
        
        // Convert the timestamp to a Date object
        const timestamp = new Date(timestampString);
        const day = timestamp.getDate();
        const month = timestamp.getMonth();
        const year = timestamp.getFullYear();
        const hours = timestamp.getHours();
        const minutes = timestamp.getMinutes();
        const date = `${day}.${month}.${year}`;
        const time = `${hours}:${minutes}`;
        
        const mes = [degreesC, humidity,soilHumidity,light, date, time];

      
        console.log("Temperature:", mes[0]);
        console.log("Moisture:", mes[1]);
        console.log("Soilmoisture:", mes[2]);
        console.log("Light :",mes[3])
        console.log("Date :" ,mes[4]);
        console.log("Time :" ,mes[5]);
        //io.emit('event-name', mes[0]);
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