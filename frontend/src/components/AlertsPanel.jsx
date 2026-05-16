const ALERT_MESSAGES = {

  fire: {
    icon: "🔥",
    text: "Incendio detectado",
    priority: "critical"
  },

  intrusion: {
    icon: "🚨",
    text: "Intrusión detectada",
    priority: "critical"
  },

  temp_alert: {
    icon: "🌡",
    text: "Temperatura crítica",
    priority: "warning"
  },

  high_hum: {
    icon: "💧",
    text: "Humedad elevada",
    priority: "warning"
  },

  low_light: {
    icon: "💡",
    text: "Baja iluminación",
    priority: "low"
  }
};

export default function AlertsPanel({ alerts = {} }) {

  // =================================================
  // ALERTAS ACTIVAS
  // =================================================

  const activeAlerts = Object.entries(alerts)

    .filter(([_, value]) => value === 1)

    .map(([key]) => ({
      key,
      ...ALERT_MESSAGES[key]
    }))

    // =================================================
    // ORDEN DE PRIORIDAD
    // =================================================

    .sort((a, b) => {

      const priorities = {
        critical: 3,
        warning: 2,
        low: 1
      };

      return (
        priorities[b.priority] -
        priorities[a.priority]
      );
    });

  // =================================================
  // SIN ALERTAS
  // =================================================

  if (activeAlerts.length === 0) {

    return (

      <section className="alerts-panel alerts-panel-normal">

        <div className="alerts-panel-header">

          <h3 className="alerts-panel-title">
            Panel de Alertas
          </h3>

          <span className="alerts-panel-badge ok">
            NORMAL
          </span>

        </div>

        <div className="alerts-empty">

          <span className="alerts-empty-icon">
            ✅
          </span>

          <p>
            Sistema operando normalmente
          </p>

        </div>

      </section>
    );
  }

  // =================================================
  // ALERTAS ACTIVAS
  // =================================================

  return (

    <section className="alerts-panel alerts-panel-active">

      <div className="alerts-panel-header">

        <h3 className="alerts-panel-title">
          Alertas Activas
        </h3>

        <span className="alerts-panel-badge danger">
          {activeAlerts.length} ACTIVAS
        </span>

      </div>

      <div className="alerts-list">

        {activeAlerts.map((alert) => (

          <div
            key={alert.key}
            className={`
              alert-item
              alert-item-${alert.priority}
            `}
          >

            <div className="alert-item-content">

              <span className="alert-item-icon">
                {alert.icon}
              </span>

              <span className="alert-item-text">
                {alert.text}
              </span>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}