import { expect, test } from 'vitest';
import { createDemoState, demoReducer, validateOrder } from './orders';

const values = { recipient: 'Cliente de prueba', phone: '3105558877', city: 'Cali', address: 'Calle 10', weight: '2', declaredValue: '150000', carrier: 'servientrega', collect: true };

test('crea pedidos consultables con IDs distintos aunque tengan el mismo peso', () => {
  let state = createDemoState();
  state = demoReducer(state, { type: 'CREATE_ORDER', values });
  state = demoReducer(state, { type: 'CREATE_ORDER', values });
  expect(state.orders[0].id).not.toBe(state.orders[1].id);
  expect(state.orders[0].customer).toBe('Cliente de prueba');
  expect(state.orders[0].events).toHaveLength(1);
});

test('valida peso, teléfono y valor sin aceptar números negativos', () => {
  expect(validateOrder({ ...values, weight: '-2', declaredValue: '-1', phone: 'hola' })).toEqual(expect.objectContaining({ weight: expect.any(String), declaredValue: expect.any(String), phone: expect.any(String) }));
});

test('rechaza el cambio de un transportador no asignado', () => {
  let state = demoReducer(createDemoState(), { type: 'SET_USER', id: 'courier-servientrega' });
  const before = state.orders.find(o => o.id === 'LP-1050');
  state = demoReducer(state, { type: 'UPDATE_STATUS', id: 'LP-1050', status: 'Entregado' });
  expect(state.orders.find(o => o.id === 'LP-1050')).toEqual(before);
  expect(state.error).toBeTruthy();
});

test('registra exactamente un evento al cambiar un pedido asignado', () => {
  let state = demoReducer(createDemoState(), { type: 'SET_USER', id: 'courier-servientrega' });
  const count = state.orders[0].events.length;
  state = demoReducer(state, { type: 'UPDATE_STATUS', id: 'LP-1048', status: 'Recogido' });
  expect(state.orders[0].status).toBe('Recogido');
  expect(state.orders[0].events).toHaveLength(count + 1);
  expect(state.orders[0].events.at(-1).actor).toBe('courier-servientrega');
});

test('la corrección administrativa conserva el evento anterior y el motivo', () => {
  let state = demoReducer(createDemoState(), { type: 'SET_USER', id: 'admin' });
  const previous = state.orders[0].events.at(-1);
  state = demoReducer(state, { type: 'CORRECT_STATUS', id: 'LP-1048', status: 'Novedad', reason: 'Estado registrado por error' });
  const corrected = state.orders[0];
  expect(corrected.events).toContainEqual(previous);
  expect(corrected.events.at(-1)).toMatchObject({ corrects: previous.id, reason: 'Estado registrado por error' });
});

test('guarda únicamente un resumen del análisis autorizado', () => {
  const state = demoReducer(createDemoState(), { type: 'SAVE_REVIEW', result: { level: 'high', signals: [{ code: 'payment', title: 'Pago' }], domains: ['example.com'], text: 'SMS secreto', sender: '123' }, orderId: 'LP-1048' });
  expect(state.reviews).toHaveLength(1);
  expect(JSON.stringify(state.reviews)).not.toContain('SMS secreto');
  expect(JSON.stringify(state.reviews)).not.toContain('123');
});

test('corregir un estado conserva la evidencia en su evento de origen', () => {
  let state = demoReducer(createDemoState(), { type: 'SET_USER', id: 'admin' });
  const original = state.orders.find(o => o.id === 'LP-1049');
  expect(original.events.find(e => e.id === original.evidence.eventId).evidence).toEqual(original.evidence);
  state = demoReducer(state, { type: 'CORRECT_STATUS', id: 'LP-1049', status: 'Novedad', reason: 'Revisar la entrega' });
  expect(state.orders.find(o => o.id === 'LP-1049').evidence).toEqual(original.evidence);
  state = demoReducer(state, { type: 'CORRECT_STATUS', id: 'LP-1049', status: 'Entregado', reason: 'Confirmación recibida' });
  expect(state.orders.find(o => o.id === 'LP-1049').events).toEqual(expect.arrayContaining(original.events));
});
