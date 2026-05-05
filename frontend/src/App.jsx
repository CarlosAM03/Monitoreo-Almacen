import { useState, useEffect } from "react";
import ModeSelector from "./components/ModeSelector";
import Dashboard from "./pages/Dashboard";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [mode, setMode] = useState("SIMULATION");

  useEffect(() => {
    fetch(`${API_URL}/mode`)
      .then(res => res.json())
      .then(data => setMode(data.mode))
      .catch(() => {});
  }, []);

  return (
    <div className="container">
      <h1 className="title">Sistema de Monitoreo Ambiental</h1>

      <ModeSelector mode={mode} setMode={setMode} />
      <Dashboard mode={mode} />
    </div>
  );
}