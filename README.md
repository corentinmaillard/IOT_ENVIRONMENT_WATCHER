# IOT_ENVIRONMENT_WATCHER

# Table of contents
* [About the project](#about-the-project)

# About the project
The purpose of the project is to reduce the consumption of water while watering the plants of a fields during drought. For that we will use 3 types of sensors :
- Soil moisture sensor : to check if we really need to water the field
- Light sensor : to check if the light is too bright and risk of burning the plant if they are watered
- Humidity and temperature sensor : to check the temperature

# Installation device (with Arduino)
## Boards Manager
- Arduino SAMD Boards
- Adafruit SAMD Boards (to install go in "preference" menu and add "https://adafruit.github.io/arduino-board-index/package_adafruit_index.json" in "Additional Boards Manager URLs")

## Libraries
- MCCI LoRaWAN LMIC library (change the region in  "project_config/lmic_project_config.h")
- DHT sensor library
- Adafruit Unified Sensor by adafruit
- adafruit tsl2561 by adafruit

## Source :
- https://github.com/parastuffs/IT4L-IOT/wiki/Adafruit-Feather-M0-configuration
- https://learn.adafruit.com/adafruit-feather-m0-radio-with-lora-radio-module/using-with-arduino-ide

## Tutorial used:
- https://learn.adafruit.com/the-things-network-for-feather?view=all
- https://learn.adafruit.com/tsl2561/overview





