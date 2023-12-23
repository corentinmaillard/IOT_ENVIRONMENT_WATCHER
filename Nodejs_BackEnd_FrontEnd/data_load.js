const fs = require('fs');

// load all data from Json
function load_data_from_Json(temperature,moisture,soilmoisture,lightsensor,time){

  try {
    const data = fs.readFileSync('./public/thing.json', 'utf8');
    const jsonData = JSON.parse(data);
    console.log('Content of the JSON File:', jsonData);
    temperature.push(...jsonData.Temperature)
    moisture.push(...jsonData.Moisture)
    soilmoisture.push(...jsonData.Soilmoisture)
    lightsensor.push(...jsonData.Light)
    time.push(...jsonData.Time)
  } catch (parseError) {
    console.error(' JSON parsing Error  :', parseError);
  }

}
// Function to add values to a list
function add(list,value){
  if (list !== undefined) {
    list.push(value)
  }
  else {
    console.log("List is undefined, not adding to the array.");
}
}
// saves the new data to the Json
function save(temperature,moisture,soilmoisture,lightsensor,time){
  
    const datas = {
      "Time": time,
      "Temperature": temperature,
      "Moisture": moisture,
      "Soilmoisture": soilmoisture,
      "Light": lightsensor,
    };

    const dictString = JSON.stringify(datas, null, 2); // Adding indentation for better readability
    fs.writeFile('./public/thing.json', dictString, (err) => {
      if (err) throw err;
      console.log('File has been saved!');
    });
  }


module.exports =  {load_data_from_Json,add,save};
