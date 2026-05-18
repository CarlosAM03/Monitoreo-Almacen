const datasource = require("../../datasources");

const gateway = require("./sensor.gateway");

const { mapSensorData } = require("./sensor.mapper");

const prisma = require("../../prisma/client");


// =====================================================
// PIPELINE CENTRAL
// provider -> parser -> mapper -> gateway -> prisma
// =====================================================

async function processSensorData(rawData) {

  try {

    // =========================================
    // MAPPER
    // =========================================

    const mapped = mapSensorData(rawData);


    // =========================================
    // VALIDACIÓN BÁSICA
    // Evita undefined/null inesperados
    // =========================================

    if (!mapped || typeof mapped !== "object") {

      console.log("[ERROR] Payload inválido");

      return;
    }


    // =========================================
    // GATEWAY (WebSocket)
    // =========================================

    gateway.emitData(mapped);


    // =========================================
    // PERSISTENCIA
    // =========================================

    await save(mapped);

  } catch (err) {

    console.log(
      "[ERROR] Fallo procesando sensor data:",
      err.message
    );
  }
}


// =====================================================
// START
// =====================================================

function start() {

  datasource.start(async (data) => {

    await processSensorData(data);

  });
}


// =====================================================
// CAMBIO DE MODO
// =====================================================

function changeMode(mode) {

  datasource.switchMode(mode, async (data) => {

    await processSensorData(data);

  });
}


// =====================================================
// MODO ACTUAL
// =====================================================

function getMode() {

  return datasource.getMode();
}


// =====================================================
// PERSISTENCIA DB
// =====================================================

async function save(data) {

  try {

    await prisma.sensorLog.create({

      data: {

        // =========================
        // SENSORES
        // =========================

        temp: data.temp,

        hum: data.hum,

        dist: data.dist,

        flame: data.flame,

        light: data.light,


        // =========================
        // ALERTAS
        // =========================

        fire: data.fire,

        intrusion: data.intrusion,

        temp_alert: data.temp_alert,

        high_hum: data.high_hum,

        low_light: data.low_light,

        any_alert: data.any_alert,


        // =========================
        // METADATA
        // =========================

        source: data.source
      }
    });

  } catch (err) {

    console.log(
      "[ERROR] Error guardando en DB:",
      err.message
    );
  }
}


module.exports = {

  start,

  changeMode,

  getMode,

  save
};