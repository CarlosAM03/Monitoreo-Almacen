function normalizeNumber(value) {

  const parsed = Number(value);

  return Number.isNaN(parsed)
    ? 0
    : parsed;
}

function mapSensorData(raw) {

  return {

    // =========================
    // SENSORES
    // =========================

    temp: normalizeNumber(raw.temp),

    hum: normalizeNumber(raw.hum),

    dist: normalizeNumber(raw.dist),

    flame: normalizeNumber(raw.flame),

    light: normalizeNumber(raw.light),


    // =========================
    // ALERTAS
    // =========================

    fire: normalizeNumber(raw.fire),

    intrusion: normalizeNumber(raw.intrusion),

    temp_alert: normalizeNumber(raw.temp_alert),

    high_hum: normalizeNumber(raw.high_hum),

    low_light: normalizeNumber(raw.low_light),

    any_alert: normalizeNumber(raw.any_alert),


    // =========================
    // METADATA
    // =========================

    source: raw.source || "unknown"
  };
}

module.exports = {
  mapSensorData
};