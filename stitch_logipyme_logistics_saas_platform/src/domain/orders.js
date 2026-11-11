import { carriers, orders as examples } from '../data/mockData';
import { signalDefinitions, riskLabels } from './sms';

export const statuses = ['Pendiente', 'Recogido', 'En camino', 'Entregado', 'Novedad'];
export const roleLabels = { commerce: 'Microempresario', courier: 'Transportador', admin: 'Administrador', recipient: 'Destinatario' };
export const progressByStatus = { Pendiente: 15, Recogido: 35, 'En camino': 66, Entregado: 100, Novedad: 52 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validEmail = email => emailPattern.test(email ?? '');

export function validateOrder(values) {
  const errors = {};
  for (const field of ['recipient', 'phone', 'city', 'address', 'weight', 'declaredValue']) {
    if (!String(values[field] ?? '').trim()) errors[field] = 'Este campo es obligatorio';
  }
  if (!errors.weight && (!Number.isFinite(Number(values.weight)) || Number(values.weight) <= 0)) errors.weight = 'Ingresa un peso mayor que cero';
  if (!errors.declaredValue && (!Number.isFinite(Number(values.declaredValue)) || Number(values.declaredValue) < 0)) errors.declaredValue = 'Ingresa un valor igual o mayor que cero';
  if (!errors.phone && !/^\d{10}$/.test(String(values.phone).replace(/\D/g, ''))) errors.phone = 'Ingresa un teléfono de 10 dígitos';
  if (!carriers.some(c => c.id === values.carrier)) errors.carrier = 'Selecciona una transportadora';
  return errors;
}

export function createDemoState() {
  const users = [
    { id: 'commerce', name: 'Carolina Morales', role: 'commerce', company: 'Dulces & Moda Artesanal', email: 'carolina@logipyme.example' },
    ...carriers.map(c => ({ id: `courier-${c.id}`, name: `Equipo ${c.name}`, role: 'courier', carrierId: c.id, email: `${c.id}@logipyme.example` })),
    { id: 'admin', name: 'Administración LogiPyme', role: 'admin', email: 'admin@logipyme.example' },
    { id: 'recipient', name: 'Destinatario de prueba', role: 'recipient', email: '' },
  ];
  return {
    users, activeUserId: 'commerce', nextOrder: 1100, nextReview: 1, reviews: [], analysis: null, error: '', preferences: { delivery: true, collection: true, tips: false },
    orders: examples.map(order => {
      const status = order.status === 'En tránsito' ? 'En camino' : order.status;
      const carrierId = carriers.find(c => c.name === order.carrier).id;
      const path = status === 'Pendiente' ? ['Pendiente'] : status === 'Novedad' ? ['Pendiente', 'Recogido', 'Novedad'] : status === 'Entregado' ? ['Pendiente', 'Recogido', 'En camino', 'Entregado'] : ['Pendiente', 'Recogido', 'En camino'];
      const evidence = status === 'Entregado' ? { url: '/assets/entrega-demo.svg', name: 'Comprobante de ejemplo', demo: true, eventId: `${order.id}-event-${path.length - 1}` } : null;
      const events = path.map((step, i) => ({ id: `${order.id}-event-${i}`, status: step, actor: i ? `courier-${carrierId}` : 'commerce', happenedAt: `2026-09-0${6 + Math.min(i, 2)}T${10 + i}:00:00-05:00`, recordedAt: `2026-09-0${6 + Math.min(i, 2)}T${10 + i}:02:00-05:00`, ...(step === 'Entregado' ? { evidence } : {}) }));
      return { ...order, carrierId, ownerId: 'commerce', status, progress: progressByStatus[status], collect: true, contents: 'Productos artesanales', createdAt: '2026-09-06T14:00:00-05:00', events, evidence };
    }),
  };
}

export const getVisibleOrders = (state, user) => user?.role === 'admin' ? state.orders : user?.role === 'courier' ? state.orders.filter(o => o.carrierId === user.carrierId) : user?.role === 'commerce' ? state.orders.filter(o => o.ownerId === user.id) : [];

export function demoReducer(state, action) {
  const user = state.users.find(u => u.id === state.activeUserId);
  const fail = error => ({ ...state, error });
  if (action.type === 'RESET') return createDemoState();
  if (action.type === 'CLEAR_ERROR') return { ...state, error: '' };
  if (action.type === 'SET_USER') return state.users.some(u => u.id === action.id) ? { ...state, activeUserId: action.id, analysis: null, error: '' } : fail('Perfil no disponible');
  if (action.type === 'SET_ANALYSIS') return { ...state, analysis: { ...action.result, orderId: action.orderId?.trim().toUpperCase() ?? '' }, error: '' };
  if (action.type === 'CLEAR_ANALYSIS') return { ...state, analysis: null };
  if (action.type === 'SAVE_REVIEW') {
    const codes = action.result.signals.map(s => s.code).filter(code => signalDefinitions[code]);
    const review = { id: `REV-${state.nextReview}`, createdAt: new Date().toISOString(), level: riskLabels[action.result.level] ? action.result.level : 'unknown', codes, orderId: action.orderId ?? '', userId: user.id };
    return { ...state, reviews: [review, ...state.reviews], nextReview: state.nextReview + 1, error: '' };
  }
  if (action.type === 'DELETE_REVIEW') return { ...state, reviews: state.reviews.filter(r => r.id !== action.id || r.userId !== user.id) };
  if (action.type === 'CLEAR_REVIEWS') return { ...state, reviews: state.reviews.filter(r => r.userId !== user.id) };
  if (action.type === 'SET_PREFERENCES') return { ...state, preferences: { ...state.preferences, ...action.values } };
  if (action.type === 'REGISTER_COMPANY' || action.type === 'ADD_USER') {
    if (action.type === 'ADD_USER' && user.role !== 'admin') return fail('Solo administración puede gestionar los roles');
    const v = action.values;
    if (!v.name?.trim() || !validEmail(v.email) || state.users.some(u => u.email === v.email)) return fail('Revisa el nombre y un correo válido que no esté registrado');
    const role = action.type === 'REGISTER_COMPANY' ? 'commerce' : v.role;
    if (!roleLabels[role] || role === 'recipient') return fail('Selecciona un rol disponible');
    if (role === 'courier' && !carriers.some(c => c.id === v.carrierId)) return fail('Selecciona el operador del transportador');
    const added = { id: `user-${state.users.length + 1}`, name: v.name.trim(), email: v.email.trim(), role, company: v.company?.trim() || 'Comercio de prueba', carrierId: v.carrierId };
    return { ...state, users: [...state.users, added], activeUserId: action.type === 'REGISTER_COMPANY' ? added.id : state.activeUserId, error: '' };
  }
  if (action.type === 'CREATE_ORDER') {
    if (user.role !== 'commerce') return fail('Solo el comercio puede crear pedidos');
    if (Object.keys(validateOrder(action.values)).length) return fail('Revisa los datos del pedido');
    const v = action.values; const c = carriers.find(c => c.id === v.carrier); const now = new Date().toISOString(); const id = `LP-${state.nextOrder}`;
    const order = { id, tracking: `DEMO-${state.nextOrder}`, customer: v.recipient.trim(), phone: v.phone.trim(), city: v.city.trim(), address: v.address.trim(), weight: Number(v.weight), value: Number(v.declaredValue), contents: v.contents?.trim() || 'Paquete de prueba', collect: Boolean(v.collect), carrier: c.name, carrierId: c.id, shipping: c.basePrice + Number(v.weight) * c.perKg, status: 'Pendiente', progress: 15, date: 'Creado en esta sesión', createdAt: now, ownerId: user.id, evidence: null, events: [{ id: `${id}-event-0`, status: 'Pendiente', actor: user.id, happenedAt: now, recordedAt: now }] };
    return { ...state, orders: [order, ...state.orders], nextOrder: state.nextOrder + 1, error: '' };
  }
  if (action.type === 'UPDATE_STATUS' || action.type === 'CORRECT_STATUS') {
    const order = state.orders.find(o => o.id === action.id);
    if (!order || !statuses.includes(action.status)) return fail('Pedido o estado no disponible');
    const correction = action.type === 'CORRECT_STATUS';
    if (correction ? user.role !== 'admin' : user.role !== 'courier' || order.carrierId !== user.carrierId) return fail('Este perfil no tiene permiso para modificar el pedido');
    if (correction && !action.reason?.trim()) return fail('Escribe el motivo de la corrección');
    const now = new Date().toISOString(); const happenedAt = action.happenedAt || now;
    if (Number.isNaN(new Date(happenedAt).getTime())) return fail('Revisa la fecha del evento');
    const eventId = `${order.id}-event-${order.events.length}`;
    const newEvidence = action.status === 'Entregado' && action.evidence && !action.evidence.eventId ? { ...action.evidence, eventId } : null;
    const event = { id: eventId, status: action.status, actor: user.id, happenedAt, recordedAt: now, ...(newEvidence ? { evidence: newEvidence } : {}), ...(correction ? { corrects: order.events.at(-1).id, reason: action.reason.trim() } : {}) };
    const updated = { ...order, status: action.status, progress: progressByStatus[action.status], events: [...order.events, event], evidence: newEvidence ?? order.evidence };
    return { ...state, orders: state.orders.map(o => o.id === order.id ? updated : o), error: '' };
  }
  return state;
}
