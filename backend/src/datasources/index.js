const { MODE } = require("../config/env");

let currentProvider;
let currentMode = MODE;

function load(mode) {
  switch (mode) {
    case "SERIAL":
      return require("./serial/serial.provider");
    case "WIFI":
      return require("./wifi/wifi.provider");
    default:
      return require("./simulation/simulation.provider");
  }
}

function start(callback) {
  currentProvider = load(currentMode);
  currentProvider.start(callback);
}

function switchMode(mode, callback) {
  if (currentProvider?.stop) currentProvider.stop();

  currentMode = mode;
  currentProvider = load(mode);
  currentProvider.start(callback);
}

function getMode() {
  return currentMode;
}

module.exports = { start, switchMode, getMode };