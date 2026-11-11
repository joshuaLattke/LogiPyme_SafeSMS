export function downloadText(filename, text, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = filename; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function ordersCsv(orders) {
  const escape = value => { const text = String(value); return `"${(/^[=+@-]/.test(text) ? "'" : '') + text.replace(/"/g, '""')}"`; };
  return '\uFEFF' + [['Pedido', 'Destino', 'Transportador', 'Estado', 'Flete COP'], ...orders.map(o => [o.id, o.city, o.carrier, o.status, o.shipping])].map(row => row.map(escape).join(',')).join('\n');
}
