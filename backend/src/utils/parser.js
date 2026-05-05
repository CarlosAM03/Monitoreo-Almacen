module.exports = function parse(line) {
  const parts = line.trim().split(",");
  const data = {};

  parts.forEach((p) => {
    const [key, value] = p.split(":");
    data[key.toLowerCase()] = Number(value);
  });

  return data;
};