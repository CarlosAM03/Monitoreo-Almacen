import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const MODES = [
  {
    key: "SERIAL",
    label: "SERIAL",
    description: "Modo oficial",
    className: "mode-serial"
  },

  {
    key: "SIMULATION",
    label: "SIMULATION",
    description: "Modo TEST",
    className: "mode-simulation"
  },

  {
    key: "WIFI",
    label: "WIFI",
    description: "Próximamente",
    className: "mode-disabled"
  }
];

export default function ModeSelector({
  mode,
  setMode,
  globalAlert
}) {

  const [loading, setLoading] =
    useState(false);

  const changeMode = async (newMode) => {

    if (newMode === "WIFI") {
      return;
    }

    setLoading(true);

    try {

      await fetch(`${API_URL}/mode`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          mode: newMode
        })
      });

      setMode(newMode);

    } catch (err) {

      console.error(
        "[MODE] ERROR:",
        err
      );
    }

    setLoading(false);
  };

  return (

    <section className={`
      mode-selector
      ${globalAlert ? "mode-selector-alert" : ""}
    `}>

      <div className="mode-selector-header">

        <h3 className="mode-selector-title">
          Modo de Operación
        </h3>

        <span className="mode-selector-subtitle">
          Control del backend industrial
        </span>

      </div>

      <div className="mode-selector-grid">

        {MODES.map((item) => {

          const disabled =
            item.key === "WIFI";

          return (

            <button
              key={item.key}
              disabled={loading || disabled}
              onClick={() =>
                changeMode(item.key)
              }
              className={`
                mode-chip
                ${item.className}
                ${mode === item.key ? "active" : ""}
                ${disabled ? "disabled" : ""}
              `}
            >

              <span className="mode-chip-label">
                {item.label}
              </span>

              <span className="mode-chip-description">
                {item.description}
              </span>

            </button>
          );
        })}

      </div>

    </section>
  );
}