client,Datamanage = require('./server')

function update(){
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
        Datamanage.add(temperature,mes[0])
        Datamanage.add(moisture,mes[1])
        Datamanage.add(soilmoisture,mes[2])
        Datamanage.add(lightsensor,mes[3])
        // console.log("shifted",temperature.shift())
      });
}
module.exports = { update };