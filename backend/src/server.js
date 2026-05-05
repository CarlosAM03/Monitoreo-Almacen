const http = require("http");
const app = require("./app");
const gateway = require("./modules/sensor/sensor.gateway");
const service = require("./modules/sensor/sensor.service");
const { PORT } = require("./config/env");

const server = http.createServer(app);

gateway.init(server);
service.start();

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});