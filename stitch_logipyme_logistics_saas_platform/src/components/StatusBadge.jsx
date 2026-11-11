const statusClass = {
  Pendiente: 'pending',
  'En tránsito': 'transit',
  'En camino': 'transit',
  Recogido: 'transit',
  Entregado: 'delivered',
  Novedad: 'issue',
};

export function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClass[status] ?? 'pending'}`} aria-label={`Estado: ${status}`}><i />{status}</span>;
}
