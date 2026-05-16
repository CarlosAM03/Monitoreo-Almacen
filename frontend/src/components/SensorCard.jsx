const SENSOR_CONFIG = {
  temperature: {
    icon: "🌡",
    accent: "sensor-temperature"
  },

  humidity: {
    icon: "💧",
    accent: "sensor-humidity"
  },

  light: {
    icon: "💡",
    accent: "sensor-light"
  },

  distance: {
    icon: "📏",
    accent: "sensor-distance"
  },

  flame: {
    icon: "🔥",
    accent: "sensor-flame"
  }
};

export default function SensorCard({
  title,
  value,
  unit,
  formatter,
  type,
  alert = false,
  globalAlert = false
}) {

  const config =
    SENSOR_CONFIG[type] || {};

  const displayValue =
    formatter
      ? formatter(value)
      : value ?? "--";

  const cardClass = `
    sensor-card
    ${config.accent || ""}
    ${alert ? "sensor-card-alert" : "sensor-card-normal"}
    ${globalAlert ? "sensor-card-global-alert" : ""}
  `;

  return (

    <article className={cardClass}>

      <div className="sensor-card-header">

        <div className="sensor-card-title-group">

          <span className="sensor-card-icon">
            {config.icon || "📡"}
          </span>

          <h4 className="sensor-card-title">
            {title}
          </h4>

        </div>

        <span className={`
          sensor-card-status
          ${alert ? "danger" : "normal"}
        `}>

          {alert
            ? "ALERTA"
            : "NORMAL"}

        </span>

      </div>

      <div className="sensor-card-body">

        <p className="sensor-card-value">

          {displayValue}

          <span className="sensor-card-unit">
            {unit}
          </span>

        </p>

      </div>

    </article>
  );
}