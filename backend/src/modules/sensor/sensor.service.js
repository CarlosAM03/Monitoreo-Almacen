const datasource = require("../../datasources");
const gateway = require("./sensor.gateway");
const { mapSensorData } = require("./sensor.mapper");
const prisma = require("../../prisma/client");


// Función para iniciar la obtención de datos
function start() {
  datasource.start((data) => {
    const mapped = mapSensorData(data);
    gateway.emitData(mapped);
    save(mapped);
  });
}
// Función para cambiar el modo de obtención de datos
function changeMode(mode) {
  datasource.switchMode(mode, (data) => {
    const mapped = mapSensorData(data);
    gateway.emitData(mapped);
  });
}
// Función para obtener el modo actual dw obtencion de datos
function getMode() {
  return datasource.getMode();
}
// Función para guardar datos en la base de datos   
async function save(data) {
  try {
    await prisma.sensorLog.create({ data });
  } catch (err) {
    console.log("Error guardando en DB");
  }
}

module.exports = { start, changeMode, getMode, save };