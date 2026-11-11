export const riskLabels = { high: 'Varias señales de alerta', review: 'Requiere verificación', unknown: 'Información insuficiente' };
export const signalDefinitions = {
  payment: { code: 'payment', title: 'Solicitud de pago', explanation: 'El mensaje menciona un pago o cobro. Confirma el valor con la tienda por un canal que conozcas.' },
  urgency: { code: 'urgency', title: 'Presión para actuar', explanation: 'Usa urgencia o un plazo. Tómate tiempo para consultar tu pedido antes de responder.' },
  sensitive: { code: 'sensitive', title: 'Datos sensibles', explanation: 'Menciona claves, contraseñas o datos de tarjeta. No compartas esa información por un SMS.' },
  link: { code: 'link', title: 'Enlace en el mensaje', explanation: 'La presencia de un enlace no demuestra fraude. Su destino no está verificado: consulta por tu cuenta el canal de la tienda.' },
  shortened: { code: 'shortened', title: 'Enlace acortado', explanation: 'La dirección oculta su destino final. Esta demo no sigue redirecciones ni verifica la página.' },
};
const shorteners = new Set(['bit.ly', 'tinyurl.com', 't.co', 'cutt.ly', 'shorturl.at', 'goo.gl']);

export function analyzeSms(text) {
  if (!text?.trim() || text.length > 2000) throw new Error('Escribe un mensaje de entre 1 y 2.000 caracteres.');
  const normalized = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const urls = text.match(/(?:https?:\/\/|www\.)[^\s<>"']+/gi) ?? [];
  const domains = [...new Set(urls.flatMap(raw => {
    try { return [new URL(raw.replace(/[.,;!?)}\]]+$/, '').replace(/^www\./i, 'https://www.')).hostname.toLowerCase()]; }
    catch { return []; }
  }))];
  const codes = [];
  if (/\b(pag(?:ue|ar|o|os|a)|cobr(?:o|os|ar)|dinero|tarjeta|transferencia)\b|\$\s*\d/.test(normalized)) codes.push('payment');
  if (/\b(urgente|urgencia|inmediato|inmediatamente|ahora|hoy|ultimo|vence|liberarlo|suspendid[oa])\b|antes de|plazo|\d+\s*(horas|minutos)/.test(normalized)) codes.push('urgency');
  if (/\b(contrasenas?|claves?|pin|pines|cvv)\b|datos\s+(?:de\s+)?(?:(?:su|sus|tu|tus|la|las)\s+)?tarjetas?|numeros? de (?:la |su |tu )?tarjeta/.test(normalized)) codes.push('sensitive');
  if (urls.length) codes.push('link');
  const shortened = domains.some(domain => shorteners.has(domain.replace(/^www\./, '')));
  if (shortened) codes.push('shortened');
  const level = codes.includes('sensitive') || (codes.includes('payment') && codes.includes('urgency')) ? 'high' : codes.length ? 'review' : 'unknown';
  return { level, signals: codes.map(code => signalDefinitions[code]), domains, shortened };
}

export const smsExamples = [
  { name: 'Cobro urgente', text: 'Su paquete está retenido. Pague $18.900 para liberarlo hoy antes de las 6 p.m. https://entrega-pagos.example/liberar' },
  { name: 'Aviso de recogida', text: 'Tu pedido fue recogido. Consulta su estado en el canal habitual de la tienda.' },
  { name: 'Enlace acortado', text: 'Revisa la entrega de tu paquete en https://bit.ly/ejemplo-de-clase' },
];
