
const ALERT_CONFIG = {

  fire: {
    label: "Incendio",
    icon: "🔥",
    priority: "critical"
  },

  intrusion: {
    label: "Intrusión",
    icon: "🚨",
    priority: "critical"
  },

  temp_alert: {
    label: "Temperatura Alta",
    icon: "🌡",
    priority: "warning"
  },

  high_hum: {
    label: "Humedad Alta",
    icon: "💧",
    priority: "warning"
  },

  low_light: {
    label: "Baja Iluminación",
    icon: "💡",
    priority: "low"
  }
};

export default function StatusIndicator({

  type,
  active

}) {

  const config = ALERT_CONFIG[type];

  if (!config) return null;

  const {
    label,
    icon,
    priority
  } = config;

  // =================================================
  // ESTADO VISUAL
  // =================================================

  let state = "NORMAL";

  if (active) {

    if (priority === "critical") {
      state = "CRÍTICO";
    }

    else {
      state = "ADVERTENCIA";
    }
  }

  // =================================================
  // CLASES CSS
  // =================================================

  const priorityClass = active
    ? `status-card-${priority}`
    : "status-card-normal";

  return (

    <div className={`status-card ${priorityClass}`}>

      {/* HEADER */}

      <div className="status-card-header">

        <div className="status-card-info">

          <span className="status-card-icon">
            {icon}
          </span>

          <span className="status-card-label">
            {label}
          </span>

        </div>

        <span className="status-card-state">
          {state}
        </span>

      </div>

      {/* BARRA */}

      <div className="status-card-bar" />

    </div>
  );
}

