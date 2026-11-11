import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { useDemo } from '../state/DemoContext';
import { statuses } from '../domain/orders';

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export function OrdersPage() {
  const { visibleOrders: orders } = useDemo();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Todos');
  const visibleOrders = useMemo(() => orders.filter((order) => {
    const matchesStatus = status === 'Todos' || order.status === status;
    const searchable = `${order.id} ${order.tracking} ${order.customer} ${order.city}`.toLowerCase();
    return matchesStatus && searchable.includes(query.toLowerCase());
  }), [query, status]);

  return (
    <section className="page-grid">
      <div className="page-heading heading-actions"><div><p className="eyebrow">Centro de operación</p><h1>Gestión de pedidos</h1><p>Consulta, filtra y acompaña todos tus despachos.</p></div><Link className="button primary" to="/pedidos/nuevo">＋ Nuevo pedido</Link></div>
      <div className="order-summary"><div><span>Todos</span><strong>{orders.length}</strong></div><div><span>En camino</span><strong>{orders.filter((item) => item.status === 'En camino').length}</strong></div><div><span>Entregados</span><strong>{orders.filter((item) => item.status === 'Entregado').length}</strong></div><div><span>Con novedad</span><strong>{orders.filter((item) => item.status === 'Novedad').length}</strong></div></div>
      <article className="card table-card">
        <div className="filters"><label className="search-field"><span>⌕</span><input aria-label="Buscar pedidos" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por pedido, guía, cliente o ciudad" /></label><label className="select-field"><span>Estado</span><select aria-label="Filtrar por estado" value={status} onChange={(event) => setStatus(event.target.value)}>{['Todos', ...statuses].map((item) => <option key={item}>{item}</option>)}</select></label></div>
        {visibleOrders.length ? <div className="table-scroll"><table><thead><tr><th>Pedido</th><th>Destinatario</th><th>Transportadora</th><th>Estado</th><th>Valor</th><th>Creado</th><th /></tr></thead><tbody>{visibleOrders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong><small>Guía {order.tracking}</small></td><td><strong>{order.customer}</strong><small>{order.city}</small></td><td>{order.carrier}</td><td><StatusBadge status={order.status} /></td><td>{currency.format(order.value)}</td><td>{order.date}</td><td><Link className="table-action" aria-label={`Ver pedido ${order.id}`} to={`/pedidos/${order.id}`}>→</Link></td></tr>)}</tbody></table></div> : <div className="empty-state"><span>⌕</span><h2>Sin coincidencias</h2><p>Prueba con otro cliente, ciudad o estado.</p></div>}
      </article>
    </section>
  );
}
