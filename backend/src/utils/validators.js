const { MODES } = require("../config/constants");

function isValidMode(mode) {
  return Object.values(MODES).includes(mode);
}

function isSensorDataValid(data) {
  return (
    typeof data.temp === "number" &&
    typeof data.hum === "number" &&
    typeof data.gas === "number"
  );
}

module.exports = {
  isValidMode,
  isSensorDataValid
};