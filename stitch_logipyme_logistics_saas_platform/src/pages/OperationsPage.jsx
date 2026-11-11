import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { statuses } from '../domain/orders';
import { StatusBadge } from '../components/StatusBadge';
import { OrderTimeline } from '../components/OrderTimeline';

function DeliveryCard({ order }) {
  const { dispatch } = useDemo(); const [status, setStatus] = useState(order.status); const [eventDate, setEventDate] = useState(''); const [evidence, setEvidence] = useState(null); const [error, setError] = useState(''); const [saved, setSaved] = useState(false);
  function readEvidence(e) {
    const file = e.target.files?.[0]; setEvidence(null); setError('');
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type) || file.size > 2 * 1024 * 1024) { setError('Usa una imagen PNG o JPEG de hasta 2 MiB.'); e.target.value = ''; return; }
    const reader = new FileReader(); reader.onload = () => setEvidence({ url: reader.result, name: file.name }); reader.onerror = () => setError('No pudimos leer la imagen.'); reader.readAsDataURL(file);
  }
  function submit(e) {
    e.preventDefault(); setSaved(false);
    if (status === 'Entregado' && !evidence && !order.evidence) { setError('Adjunta una evidencia de prueba para registrar la entrega.'); return; }
    setError(''); dispatch({ type: 'UPDATE_STATUS', id: order.id, status, evidence: evidence || order.evidence, happenedAt: eventDate ? new Date(eventDate).toISOString() : undefined }); setSaved(true);
  }
  return <article className="card delivery-card" aria-label={`Entrega ${order.id}`}><div className="card-head"><div><h2>{order.id}</h2><p>{order.customer} · {order.city}</p></div><StatusBadge status={order.status} /></div><form className="form-stack" onSubmit={submit}><label>Nuevo estado<select value={status} onChange={e => { setStatus(e.target.value); setSaved(false); }}>{statuses.map(s => <option key={s}>{s}</option>)}</select></label><label>Hora real del evento (opcional)<input type="datetime-local" value={eventDate} onChange={e => setEventDate(e.target.value)} /></label>{status === 'Entregado' && <label>Evidencia del paquete<input type="file" accept="image/png,image/jpeg" onChange={readEvidence} /><small>PNG o JPEG, hasta 2 MiB. Usa una imagen de prueba sin personas.</small></label>}{evidence && <img className="evidence-thumbnail" src={evidence.url} alt="Previsualización de evidencia local" />}{error && <p role="alert" className="form-error">{error}</p>}{saved && <p role="status" className="success-message">Estado registrado con actor y fecha.</p>}<button className="button primary">Registrar estado</button></form><details className="delivery-events"><summary>Ver historial ({order.events.length})</summary><OrderTimeline order={order} /></details><Link className="link-button" to={`/consulta/${order.id}`}>Consulta del destinatario →</Link></article>;
}

export function OperationsPage() {
  const { visibleOrders, state } = useDemo();
  return <section className="page-grid"><div className="page-heading"><p className="eyebrow">Perfil transportador · Demo</p><h1>Mis entregas asignadas</h1><p>Registra cada evento y adjunta la evidencia cuando entregues el paquete.</p></div>{state.error && <p role="alert" className="form-error">{state.error}</p>}<div className="operations-grid">{visibleOrders.map(order => <DeliveryCard order={order} key={order.id} />)}</div>{!visibleOrders.length && <div className="empty-state"><h2>No tienes pedidos asignados</h2><p>El comercio debe seleccionar tu transportadora al crear un pedido.</p></div>}</section>;
}
