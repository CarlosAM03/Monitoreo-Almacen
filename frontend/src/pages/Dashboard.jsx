import useSocket from "../hooks/useSocket";
import SensorCard from "../components/SensorCard";
import StatusIndicator from "../components/StatusIndicator";

export default function Dashboard({ mode }) {
  const data = useSocket();

  if (!data) return <p className="title">Esperando datos...</p>;

  return (
    <div>
      <h2 className="dashboard-title">Dashboard (Modo: {mode})</h2>
        <div className="status-container">
            <StatusIndicator label="Flama" active={data.flame === 1} />
            <StatusIndicator label="Movimiento" active={data.mov === 1} />
        </div>
      <div className="cards-container">
        <SensorCard title="Temperatura" value={data.temp} unit="°C" />
        <SensorCard title="Humedad" value={data.hum} unit="%" />
        <SensorCard title="Gas" value={data.gas} unit="" />
        <SensorCard title="Distancia" value={data.dist} unit="cm" />
      </div>

      <p className="source">
        <strong>Fuente:</strong> {data.source}
      </p>
    </div>
  );
}