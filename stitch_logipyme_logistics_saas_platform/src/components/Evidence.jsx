import { useState } from 'react';
import { Modal } from './Modal';

export function Evidence({ order }) {
  const [open, setOpen] = useState(false);
  const available = order.status === 'Entregado' && order.evidence;
  return <><article className="card proof-card"><div><span className="proof-icon">✓</span><div><h2>Prueba de entrega</h2><p>{available ? 'Evidencia de demostración disponible.' : 'Se habilita al entregar el pedido y adjuntar su evidencia.'}</p></div></div><button className="button secondary" disabled={!available} onClick={() => setOpen(true)}>Ver evidencia</button></article><Modal title="Evidencia de entrega" open={open} onClose={() => setOpen(false)}>{available && <figure className="evidence-preview"><img src={order.evidence.url} alt="Evidencia de prueba del paquete entregado" /><figcaption>{order.evidence.name} · Archivo local de demostración</figcaption></figure>}</Modal></>;
}
