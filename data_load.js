const fs = require('fs');

function load_data_from_Json(temperature,moisture,soilmoisture,lightsensor){

  try {
    const data = fs.readFileSync('./public/thing.json', 'utf8');
    const jsonData = JSON.parse(data);
    // Maintenant, vous pouvez utiliser les données JSON (jsonData) comme vous le souhaitez.
    console.log('Contenu du fichier JSON :', jsonData);
    temperature.push(...jsonData.Temperature)
    moisture.push(...jsonData.Moisture)
    soilmoisture.push(...jsonData.Soilmoisture)
    lightsensor.push(...jsonData.Light)
  } catch (parseError) {
    console.error('Erreur de parsing JSON :', parseError);
  }

}
function add(list,value){
  if (list !== undefined) {
    list.push(value)
  }
  else {
    console.log("List is undefined, not adding to the array.");
}
}

function save(temperature,moisture,soilmoisture,lightsensor){
  
    const datas = {
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
// export default load_data_from_Json;
