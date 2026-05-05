let io;

function init(server) {
  io = require("socket.io")(server, {
    cors: { origin: "*" }
  });
}

function emitData(data) {
  if (io) io.emit("sensor:data", data);
}

module.exports = { init, emitData };