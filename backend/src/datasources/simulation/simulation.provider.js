let interval;

function start(callback) {
  interval = setInterval(() => {
    const data = {
      temp: 20 + Math.random() * 10,
      hum: 50 + Math.random() * 20,
      gas: Math.random() * 500,
      flame: 0,
      mov: Math.round(Math.random()),
      dist: Math.random() * 100,
      source: "simulation"
    };

    callback(data);
  }, 1000);
}

function stop() {
  clearInterval(interval);
}

module.exports = { start, stop };