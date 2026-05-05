require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MODE: process.env.MODE || "SIMULATION",
  SERIAL_PORT: process.env.SERIAL_PORT || "COM3"
};