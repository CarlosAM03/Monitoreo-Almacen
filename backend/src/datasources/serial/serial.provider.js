const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const parse = require("../../utils/parser");
const { SERIAL_PORT } = require("../../config/env");

let port;

function start(callback) {
  port = new SerialPort({ path: SERIAL_PORT, baudRate: 9600 });

  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

  parser.on("data", (line) => {
    try {
      const data = parse(line);
      data.source = "serial";
      callback(data);
    } catch (err) {
      console.log("Error parseando:", line);
    }
  });
}

function stop() {
  if (port) port.close();
}

module.exports = { start, stop };