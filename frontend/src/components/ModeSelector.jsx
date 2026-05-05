import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ModeSelector({ mode, setMode }) {
  const [loading, setLoading] = useState(false);

  const changeMode = async (newMode) => {
    if (newMode === "WIFI") {
      alert("Modo WiFi próximamente disponible");
      return;
    }

    setLoading(true);

    try {
      await fetch(`${API_URL}/mode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mode: newMode })
      });

      setMode(newMode);
    } catch (err) {
      alert("Error al cambiar modo");
    }

    setLoading(false);
  };

  const modes = ["SIMULATION", "SERIAL", "WIFI"];

  return (
    <div className="mode-container">
      <h3>Modo de operación</h3>

      <div className="mode-buttons">
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => changeMode(m)}
            disabled={loading || m === "WIFI"}
            className={`mode-btn 
              ${mode === m ? "active" : ""} 
              ${m === "WIFI" ? "disabled" : ""}`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}