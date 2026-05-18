let interval;

function randomBool(probability = 0.3) {
  return Math.random() < probability ? 1 : 0;
}

function start(callback) {

  interval = setInterval(() => {

    const temp = Math.floor(20 + Math.random() * 20);

    const hum = Math.floor(40 + Math.random() * 50);

    const dist = Math.floor(Math.random() * 150);

    const flame = randomBool(0.05);

    const light = Math.floor(Math.random() * 1024);

    // =========================
    // ALERTAS SIMULADAS
    // =========================

    const fire = flame;

    const intrusion =
      dist > 0 && dist <= 20
        ? 1
        : 0;

    const temp_alert =
      temp >= 35
        ? 1
        : 0;

    const high_hum =
      hum >= 70
        ? 1
        : 0;

    const low_light =
      light <= 100
        ? 1
        : 0;

    const any_alert =
      fire ||
      intrusion ||
      temp_alert ||
      high_hum ||
      low_light
        ? 1
        : 0;

    callback({

      // =========================
      // SENSORES
      // =========================

      temp,
      hum,
      dist,
      flame,
      light,

      // =========================
      // ALERTAS
      // =========================

      fire,
      intrusion,
      temp_alert,
      high_hum,
      low_light,
      any_alert,

      // =========================
      // METADATA
      // =========================

      source: "SIMULATION"
    });

  }, 1000);
}

function stop() {

  clearInterval(interval);
}

module.exports = {
  start,
  stop
};