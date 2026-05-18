import useSocket from "../hooks/useSocket";

import SensorCard from "../components/SensorCard";
import StatusIndicator from "../components/StatusIndicator";
import AlertsPanel from "../components/AlertsPanel";
import SystemStatus from "../components/SystemStatus";
import ConnectionStatus from "../components/ConnectionStatus";

export default function Dashboard({
  mode,
  externalData
}) {

  const {
    data: socketData,
    connectionStatus
  } = useSocket();

  const data =
    externalData || socketData;

  if (!data) {

    return (

      <div className="dashboard-loading">

        <div className="dashboard-loading-box">

          <div className="dashboard-loading-spinner" />

          <h2>
            Esperando telemetría...
          </h2>

          <p>
            Conectando con el sistema industrial
          </p>

        </div>

      </div>
    );
  }

  const systemAlert =
    data.any_alert === 1;

  return (

    <main className={`
      dashboard-shell
      ${systemAlert ? "dashboard-shell-alert" : ""}
    `}>

      {/* resto del archivo EXACTAMENTE IGUAL */}

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="dashboard-header">

        <div>

          <span className="dashboard-tag">
            SCADA / TELEMETRÍA INDUSTRIAL
          </span>

          <h1 className="dashboard-title">
            Sistema Inteligente de Monitoreo Ambiental
          </h1>

          <p className="dashboard-subtitle">
            Plataforma IoT distribuida en tiempo real
          </p>

        </div>

        <div className="dashboard-header-meta">

          <div className="dashboard-badge">
            <span className="badge-label">
              MODO
            </span>

            <span className="badge-value">
              {mode}
            </span>
          </div>

          <div className="dashboard-badge">

            <span className="badge-label">
              FUENTE
            </span>

            <span className="badge-value">
              {data.source}
            </span>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* ESTADO GLOBAL */}
      {/* ================================================= */}

      <SystemStatus
        anyAlert={data.any_alert}
      />


      {/* ================================================= */}
      {/* ALERTAS */}
      {/* ================================================= */}

      <AlertsPanel
        alerts={{
          fire: data.fire,
          intrusion: data.intrusion,
          temp_alert: data.temp_alert,
          high_hum: data.high_hum,
          low_light: data.low_light
        }}
      />


      {/* ================================================= */}
      {/* TELEMETRÍA */}
      {/* ================================================= */}

      <section className="dashboard-section">

        <div className="section-header">

          <h2 className="section-title">
            Sensores Ambientales
          </h2>

          <span className="section-subtitle">
            Variables climáticas del almacén
          </span>

        </div>

        <div className="cards-grid">

          <SensorCard
            title="Temperatura"
            value={data.temp}
            unit="°C"
            type="temperature"
            alert={data.temp_alert === 1}
            globalAlert={systemAlert}
          />

          <SensorCard
            title="Humedad"
            value={data.hum}
            unit="%"
            type="humidity"
            alert={data.high_hum === 1}
            globalAlert={systemAlert}
          />

          <SensorCard
            title="Iluminación"
            value={data.light}
            type="light"
            alert={data.low_light === 1}
            globalAlert={systemAlert}
            unit="lux"

            formatter={(value) => {

              if (
                value === undefined ||
                value === null
              ) {
                return "--";
              }

              return Math.round(
                (value / 1023) * 1000
              );
            }}
          />

        </div>

      </section>


      {/* ================================================= */}
      {/* SEGURIDAD */}
      {/* ================================================= */}

      <section className="dashboard-section">

        <div className="section-header">

          <h2 className="section-title">
            Seguridad Física
          </h2>

          <span className="section-subtitle">
            Sensores críticos del entorno
          </span>

        </div>

        <div className="cards-grid">

          <SensorCard
            title="Distancia"
            value={data.dist}
            unit="cm"
            type="distance"
            alert={data.intrusion === 1}
            globalAlert={systemAlert}
          />

          <SensorCard
            title="Sensor de Flama"
            value={data.flame}
            unit=""
            type="flame"
            alert={data.fire === 1}
            globalAlert={systemAlert}
          />

        </div>

      </section>


      {/* ================================================= */}
      {/* LÓGICA */}
      {/* ================================================= */}

      <section className="dashboard-section">

        <div className="section-header">

          <h2 className="section-title">
            Estado Lógico del Firmware
          </h2>

          <span className="section-subtitle">
            Evaluación consolidada del sistema embebido
          </span>

        </div>

        <div className="status-grid">

          <StatusIndicator
            type="fire"
            active={data.fire === 1}
          />

          <StatusIndicator
            type="intrusion"
            active={data.intrusion === 1}
          />

          <StatusIndicator
            type="temp_alert"
            active={data.temp_alert === 1}
          />

          <StatusIndicator
            type="high_hum"
            active={data.high_hum === 1}
          />

          <StatusIndicator
            type="low_light"
            active={data.low_light === 1}
          />

        </div>

      </section>


      {/* ================================================= */}
      {/* CONECTIVIDAD */}
      {/* ================================================= */}

      <ConnectionStatus
        status={connectionStatus}
      />

    </main>
  );
}