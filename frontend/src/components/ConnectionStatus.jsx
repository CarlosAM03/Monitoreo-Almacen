import { SOCKET_STATUS } from "../hooks/useSocket";

const STATUS_CONFIG = {

  [SOCKET_STATUS.CONNECTED]: {

    label: "ONLINE",

    message:
      "Backend conectado — Telemetría en tiempo real",

    icon: "🟢",

    className: "connection-online"
  },

  [SOCKET_STATUS.DISCONNECTED]: {

    label: "OFFLINE",

    message:
      "Sin conexión con el backend",

    icon: "🔴",

    className: "connection-offline"
  },

  [SOCKET_STATUS.RECONNECTING]: {

    label: "RECONNECTING",

    message:
      "Reconectando con el servidor...",

    icon: "🟡",

    className: "connection-reconnecting"
  }
};

export default function ConnectionStatus({

  status

}) {

  const config =
    STATUS_CONFIG[status] ||
    STATUS_CONFIG[SOCKET_STATUS.DISCONNECTED];

  return (

    <section className={`
      connection-status
      ${config.className}
    `}>

      <div className="connection-status-content">

        <div className="connection-status-info">

          <span className="connection-status-icon">
            {config.icon}
          </span>

          <div>

            <h3 className="connection-status-title">
              Estado de Conectividad
            </h3>

            <p className="connection-status-message">
              {config.message}
            </p>

          </div>

        </div>

        <div className="connection-status-badge">
          {config.label}
        </div>

      </div>

    </section>
  );
}