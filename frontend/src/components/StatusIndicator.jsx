export default function StatusIndicator({ label, active }) {
  return (
    <div className="status">
      <strong>{label}: </strong>
      <span className={active ? "status alert" : "status ok"}>
        {active ? "ALERTA" : "NORMAL"}
      </span>
    </div>
  );
}