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

# Software Installation
Here are the steps to install and load the software

## Librairies
The librairies needed for the project are listed below:

- Node.js (default in a Node.js environment)
- fs (File System) - used for reading and writing files
- express - used to create the web server
- mqtt - used for MQTT (Message Queuing Telemetry Transport) communication
- socket.io - used for real-time communication between the server and the client via sockets
- chart.js - used to create interactive charts on the web page
- ejs - used as a template engine for generating dynamic views
  
To install them write on a terminal:
```bash
npm install
```
## Server launch
To start the project, write on a terminal :
```bash
node server.js
```
## Source :
- https://github.com/parastuffs/IT4L-IOT/wiki/Adafruit-Feather-M0-configuration
- https://learn.adafruit.com/adafruit-feather-m0-radio-with-lora-radio-module/using-with-arduino-ide

## Tutorial used:
- https://learn.adafruit.com/the-things-network-for-feather?view=all
- https://learn.adafruit.com/tsl2561/overview





