import { useDemo } from '../state/DemoContext';

export const formatDate = value => new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Bogota' }).format(new Date(value));
export function OrderTimeline({ order, publicView = false }) {
  const { state } = useDemo();
  return <ol className="event-timeline">{order.events.map(event => <li key={event.id}><i aria-hidden="true">✓</i><div><strong>{event.status}</strong><time>{formatDate(event.happenedAt)}</time>{!publicView && <small>{state.users.find(u => u.id === event.actor)?.name ?? 'Perfil de demostración'} · Registrado {formatDate(event.recordedAt)}</small>}{event.evidence && <small>Evidencia vinculada a este evento de entrega.</small>}{event.reason && <p>Corrección: {event.reason}</p>}</div></li>)}</ol>;
}
