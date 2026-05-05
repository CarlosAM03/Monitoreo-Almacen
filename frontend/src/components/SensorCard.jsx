export default function SensorCard({ title, value, unit }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p className="card-value">
        {value ?? "--"} {unit}
      </p>
    </div>
  );
}