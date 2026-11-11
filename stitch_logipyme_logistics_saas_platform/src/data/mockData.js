export const currentUser = {
  name: 'Carolina Morales',
  company: 'Dulces & Moda Artesanal',
  city: 'Bogotá D.C.',
  email: 'carolina@logipyme.co',
};

export const orders = [
  { id: 'LP-1048', tracking: '7729182319', customer: 'Laura Gómez', phone: '312 458 9021', city: 'Medellín', address: 'Cra. 43A # 18 Sur–135', status: 'En tránsito', carrier: 'Servientrega', value: 128000, shipping: 14800, weight: 2.1, date: '08 sep, 9:40 a. m.', progress: 66 },
  { id: 'LP-1049', tracking: '8846201975', customer: 'Andrés Rojas', phone: '310 455 8821', city: 'Cali', address: 'Av. 6N # 24–17', status: 'Entregado', carrier: 'Coordinadora', value: 92000, shipping: 13200, weight: 1.4, date: '08 sep, 8:15 a. m.', progress: 100 },
  { id: 'LP-1050', tracking: '6610472388', customer: 'Mónica Díaz', phone: '300 482 9102', city: 'Barranquilla', address: 'Calle 84 # 51B–22', status: 'Novedad', carrier: 'Inter Rapidísimo', value: 156000, shipping: 17900, weight: 3.2, date: '07 sep, 4:22 p. m.', progress: 52 },
  { id: 'LP-1051', tracking: '9954173026', customer: 'Felipe Castro', phone: '315 889 0214', city: 'Bucaramanga', address: 'Cra. 33 # 52–41', status: 'Pendiente', carrier: 'Envía', value: 74000, shipping: 12100, weight: 1.0, date: '07 sep, 2:08 p. m.', progress: 18 },
  { id: 'LP-1052', tracking: '5509187342', customer: 'Daniela León', phone: '301 774 2319', city: 'Pereira', address: 'Av. Circunvalar # 8–32', status: 'En tránsito', carrier: 'Coordinadora', value: 215000, shipping: 16400, weight: 2.8, date: '07 sep, 11:30 a. m.', progress: 73 },
  { id: 'LP-1053', tracking: '7738201459', customer: 'Jorge Peña', phone: '318 902 4411', city: 'Cartagena', address: 'Calle 30 # 9–45', status: 'Entregado', carrier: 'Servientrega', value: 189000, shipping: 15800, weight: 2.3, date: '06 sep, 5:50 p. m.', progress: 100 },
];

export const carriers = [
  { id: 'servientrega', name: 'Servientrega', initial: 'S', color: '#16a34a', coverage: '1.104 municipios', eta: '1–2 días', basePrice: 10500, perKg: 1900, rating: 4.8 },
  { id: 'coordinadora', name: 'Coordinadora', initial: 'C', color: '#dc2626', coverage: '1.090 municipios', eta: '1–3 días', basePrice: 9800, perKg: 2100, rating: 4.7 },
  { id: 'envia', name: 'Envía', initial: 'E', color: '#2563eb', coverage: '980 municipios', eta: '2–3 días', basePrice: 9200, perKg: 2050, rating: 4.6 },
  { id: 'inter', name: 'Inter Rapidísimo', initial: 'IR', color: '#f59e0b', coverage: '1.050 municipios', eta: '1–3 días', basePrice: 10100, perKg: 1950, rating: 4.5 },
];

export const metrics = [
  { label: 'Envíos este mes', value: '248', change: '+12%', tone: 'blue' },
  { label: 'Entregas exitosas', value: '94,8%', change: '+2,4%', tone: 'green' },
  { label: 'En tránsito', value: '36', change: '8 hoy', tone: 'amber' },
  { label: 'Recaudo pendiente', value: '$3,84 M', change: 'COP', tone: 'violet' },
];

export const activity = [
  { time: '10:42', title: 'Pedido LP-1049 entregado', detail: 'Cali · Coordinadora', tone: 'success' },
  { time: '09:58', title: 'Novedad en LP-1050', detail: 'Dirección requiere confirmación', tone: 'danger' },
  { time: '09:15', title: 'Recogida confirmada', detail: '3 paquetes · Bogotá', tone: 'primary' },
];
