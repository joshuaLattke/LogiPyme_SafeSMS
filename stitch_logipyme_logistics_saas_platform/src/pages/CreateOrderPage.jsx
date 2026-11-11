import { useState } from 'react';
import { carriers } from '../data/mockData';
import { Link, useSearchParams } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { validateOrder } from '../domain/orders';
export { validateOrder } from '../domain/orders';

const initialValues = { recipient: '', phone: '', city: '', address: '', weight: '', declaredValue: '', contents: '', carrier: 'servientrega', collect: true };
const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function Field({ label, name, values, errors, onChange, type = 'text', placeholder = '' }) {
  return <label>{label}<input type={type} value={values[name]} onChange={(event) => onChange(name, event.target.value)} placeholder={placeholder} aria-invalid={Boolean(errors[name])} />{errors[name] && <span className="field-error">{errors[name]}</span>}</label>;
}

export function CreateOrderPage() {
  const { state, dispatch } = useDemo();
  const [params] = useSearchParams();
  const [values, setValues] = useState({ ...initialValues, carrier: carriers.some(c => c.id === params.get('operador')) ? params.get('operador') : 'servientrega' });
  const [errors, setErrors] = useState({});
  const [createdId, setCreatedId] = useState('');
  const change = (name, value) => setValues((current) => ({ ...current, [name]: value }));

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateOrder(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setCreatedId(''); return; }
    dispatch({ type: 'CREATE_ORDER', values });
    setCreatedId(`LP-${state.nextOrder}`);
  }

  const selectedCarrier = carriers.find((carrier) => carrier.id === values.carrier);
  const quote = selectedCarrier.basePrice + Number(values.weight || 0) * selectedCarrier.perKg;

  return (
    <section className="page-grid">
      <div className="page-heading"><p className="eyebrow">Nuevo despacho</p><h1>Crear nuevo pedido</h1><p>Completa los datos para simular una cotización y generar el envío.</p></div>
      {createdId && <div className="success-banner" role="status"><span>✓</span><div><strong>Pedido simulado creado</strong><p>{createdId} está listo para consultar. Se conserva durante esta sesión.</p><Link to={`/pedidos/${createdId}`} className="button secondary">Ver pedido</Link></div></div>}
      <form className="create-layout" onSubmit={submit} noValidate>
        <div className="form-sections">
          <article className="card form-card"><div className="section-number">1</div><div className="section-title"><h2>Datos del destinatario</h2><p>Información de quien recibirá el paquete.</p></div><div className="field-grid"><Field label="Nombre del destinatario" name="recipient" values={values} errors={errors} onChange={change} placeholder="Ej. Camila Torres" /><Field label="Teléfono del destinatario" name="phone" values={values} errors={errors} onChange={change} placeholder="300 000 0000" /><Field label="Ciudad" name="city" values={values} errors={errors} onChange={change} placeholder="Ciudad de destino" /><Field label="Dirección" name="address" values={values} errors={errors} onChange={change} placeholder="Calle, número y complemento" /></div></article>
          <article className="card form-card"><div className="section-number">2</div><div className="section-title"><h2>Información del paquete</h2><p>Usaremos estos datos para calcular el flete.</p></div><div className="field-grid"><Field label="Peso (kg)" name="weight" type="number" values={values} errors={errors} onChange={change} placeholder="0" /><Field label="Valor declarado (COP)" name="declaredValue" type="number" values={values} errors={errors} onChange={change} placeholder="0" /><label className="field-wide">Contenido<textarea value={values.contents} onChange={(event) => change('contents', event.target.value)} placeholder="Describe brevemente el contenido" rows="3" /></label></div></article>
          <article className="card form-card"><div className="section-number">3</div><div className="section-title"><h2>Elige una transportadora</h2><p>Tarifas ficticias calculadas para esta demostración.</p></div><div className="carrier-options">{carriers.map((carrier) => <label className={values.carrier === carrier.id ? 'selected' : ''} key={carrier.id}><input type="radio" name="carrier" value={carrier.id} checked={values.carrier === carrier.id} onChange={() => change('carrier', carrier.id)} /><span className="carrier-mark" style={{ background: carrier.color }}>{carrier.initial}</span><span><strong>{carrier.name}</strong><small>{carrier.eta} · {carrier.coverage}</small></span><b>{currency.format(carrier.basePrice + Number(values.weight || 0) * carrier.perKg)}</b></label>)}</div></article>
        </div>
        <aside className="side-stack sticky-summary"><article className="card order-total"><p className="eyebrow">Resumen del envío</p><h2>{selectedCarrier.name}</h2><div><span>Flete estimado</span><b>{new Intl.NumberFormat('es-CO').format(quote)} COP</b></div><div><span>Tiempo estimado</span><b>{selectedCarrier.eta}</b></div><label className="collect-toggle"><input type="checkbox" checked={values.collect} onChange={(event) => change('collect', event.target.checked)} /><span><b>Pago contraentrega</b><small>Recaudar el valor declarado</small></span></label><button className="button primary wide" type="submit">Crear pedido simulado</button><small>El pedido se añade al listado de esta sesión.</small></article></aside>
      </form>
    </section>
  );
}
