const VALID_KEYS = [
  "temp",
  "hum",
  "dist",
  "flame",
  "light",
  "fire",
  "intrusion",
  "temp_alert",
  "high_hum",
  "low_light",
  "any_alert"
];

module.exports = function parse(line) {

  // Validación básica
  if (!line || typeof line !== "string") {
    throw new Error("Serial inválido");
  }

  const data = {};

  // Limpieza inicial
  const parts = line
    .trim()
    .split(",")
    .filter(part => part.trim() !== "");

  parts.forEach((part) => {

    const [rawKey, rawValue] = part.split(":");

    // Validación estructural
    if (!rawKey || rawValue === undefined) {
      return;
    }

    const key = rawKey.trim().toLowerCase();

    // Ignorar claves desconocidas
    if (!VALID_KEYS.includes(key)) {
      return;
    }

    // Conversión segura
    const value = Number(rawValue.trim());

    data[key] = Number.isNaN(value)
      ? 0
      : value;
  });

  return data;
};