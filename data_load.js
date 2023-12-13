const fs = require('fs');

function load_data_from_Json(temperature,moisture,soilmoisture,lightsensor){

fs.readFile('./public/thing.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erreur de lecture du fichier :', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    // Maintenant, vous pouvez utiliser les données JSON (jsonData) comme vous le souhaitez.
    console.log('Contenu du fichier JSON :', jsonData);
    temperature = jsonData.Temperature
    moisture = jsonData.Moisture
    soilmoisture = jsonData.Soilmoisture
    lightsensor = jsonData.Light
  } catch (parseError) {
    console.error('Erreur de parsing JSON :', parseError);
  }
  return temperature,moisture,soilmoisture,lightsensor
})};

function add(list,thing){
    list.push(thing)
  }
module.exports =  {load_data_from_Json,add};
// export default load_data_from_Json;
