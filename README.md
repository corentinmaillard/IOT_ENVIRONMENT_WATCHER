# IOT_ENVIRONMENT_WATCHER

# Table of contents
* [About the project](#about-the-project)

# About the project
The purpose of the project is to reduce the consumption of water while watering the plants of a fields during drought. For that we will use 3 types of sensors :
- Soil moisture sensor : to check if we really need to water the field
- Light sensor : to check if the light is too bright and risk of burning the plant if they are watered
- Humidity and temperature sensor : to check the temperature

# Installation device (with Arduino)
## Gestionnaire de cartes
-Arduino SAMD Boards
-Adafruit SAMD Boards (pour installer aller dans preference et mettre "https://adafruit.github.io/arduino-board-index/package_adafruit_index.json" dans "Additional Boards Manager URLs")

## Library
-MCCI LoRaWAN LMIC library (il faut change la region dans  "project_config/lmic_project_config.h")
-DHT sensor library
## Source :
https://github.com/parastuffs/IT4L-IOT/wiki/Adafruit-Feather-M0-configuration
https://learn.adafruit.com/adafruit-feather-m0-radio-with-lora-radio-module/using-with-arduino-ide

## Tuto utilisé:
https://learn.adafruit.com/the-things-network-for-feather?view=all




