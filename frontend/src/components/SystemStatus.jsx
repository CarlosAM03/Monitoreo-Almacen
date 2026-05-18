export default function SystemStatus({ anyAlert }) {

  const isAlert = anyAlert === 1;

  return (

    <section
      className={`
        system-status
        ${isAlert ? "system-status-alert" : "system-status-normal"}
      `}
    >

      <div className="system-status-content">

        <div className="system-status-indicator" />

        <div>

          <h3 className="system-status-title">
            Estado Global del Sistema
          </h3>

          <p className="system-status-message">

            {isAlert
              ? "ALERTA ACTIVA — Revisión inmediata requerida"
              : "Sistema operando normalmente"}

          </p>

        </div>

      </div>

    </section>
  );
}