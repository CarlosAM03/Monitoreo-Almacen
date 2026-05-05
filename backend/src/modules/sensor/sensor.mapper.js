function mapSensorData(raw) {
  return {
    temp: Number(raw.temp) || 0,
    hum: Number(raw.hum) || 0,
    gas: Number(raw.gas) || 0,
    flame: Number(raw.flame) || 0,
    mov: Number(raw.mov) || 0,
    dist: Number(raw.dist) || 0,
    source: raw.source || "unknown"
  };
}

module.exports = {
  mapSensorData
};