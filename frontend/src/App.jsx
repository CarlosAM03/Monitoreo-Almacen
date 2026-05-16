import { useEffect, useState } from "react";

import ModeSelector from "./components/ModeSelector";
import Dashboard from "./pages/Dashboard";

import useSocket from "./hooks/useSocket";

import "./styles/global.css";
import "./styles/dashboard.css";
import "./styles/cards.css";
import "./styles/mode-selector.css";
import "./styles/system-status.css";
import "./styles/connection-status.css";
import "./styles/status-indicator.css";
import "./styles/alerts.css";
import "./styles/responsive.css";

const API_URL =
  import.meta.env.VITE_API_URL;

export default function App() {

  const [mode, setMode] =
    useState("SIMULATION");

  const {
    data
  } = useSocket();

  const systemAlert =
    data?.any_alert === 1;

  useEffect(() => {

    fetch(`${API_URL}/mode`)

      .then((res) => res.json())

      .then((data) =>
        setMode(data.mode)
      )

      .catch(() => {});
  }, []);

  return (

    <div className={`
      app-shell
      ${systemAlert ? "app-shell-alert" : ""}
    `}>

      <div className="app-background-grid" />

      <header className={`
        app-header
        ${systemAlert ? "app-header-alert" : ""}
      `}>

        <div>

          <span className="app-tag">
            INDUSTRIAL IoT MONITOR
          </span>

          <h1 className="app-title">
            Monitor Industrial Inteligente
          </h1>

        </div>

      </header>

      <ModeSelector
        mode={mode}
        setMode={setMode}
        globalAlert={systemAlert}
      />

      <Dashboard
        mode={mode}
        externalData={data}
      />

    </div>
  );
}