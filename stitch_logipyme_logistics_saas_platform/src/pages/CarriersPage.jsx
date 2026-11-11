import { useState } from 'react';
import { Link } from 'react-router-dom';
import { carriers } from '../data/mockData';

const number = new Intl.NumberFormat('es-CO');

export function CarriersPage() {
  const [weight, setWeight] = useState('1');
  const [origin, setOrigin] = useState('Bogotá D.C.');
  const [destination, setDestination] = useState('Medellín');

  return (
    <section className="page-grid">
      <div className="page-heading"><p className="eyebrow">Red logística</p><h1>Operadores logísticos</h1><p>Compara cobertura, tiempos y tarifas simuladas en un solo lugar.</p></div>
      <article className="quote-panel">
        <div><p className="eyebrow">Simulador rápido</p><h2>Cotiza un envío nacional</h2><p>Valores de referencia para esta demostración.</p></div>
        <label>Origen<select value={origin} onChange={(event) => setOrigin(event.target.value)}><option>Bogotá D.C.</option><option>Medellín</option><option>Cali</option></select></label>
        <span className="route-arrow">→</span>
        <label>Destino<select value={destination} onChange={(event) => setDestination(event.target.value)}><option>Medellín</option><option>Cali</option><option>Barranquilla</option></select></label>
        <label>Peso a cotizar (kg)<input type="number" min="1" value={weight} onChange={(event) => setWeight(event.target.value)} /></label>
      </article>
      <div className="carrier-grid">{carriers.map((carrier, index) => {
        const quote = carrier.basePrice + Number(weight || 0) * carrier.perKg;
        return <article className="carrier-card" key={carrier.id}>
          <div className="carrier-card-top"><span className="carrier-mark large" style={{ background: carrier.color }}>{carrier.initial}</span>{index === 0 && <b className="recommended">Recomendado</b>}<span className="rating">★ {carrier.rating}</span></div>
          <h2>{carrier.name}</h2><p>Cobertura confiable para envíos nacionales y recaudo contraentrega.</p>
          <dl><div><dt>Cobertura</dt><dd>{carrier.coverage}</dd></div><div><dt>Entrega estimada</dt><dd>{carrier.eta}</dd></div><div><dt>Ruta</dt><dd>{origin} → {destination}</dd></div></dl>
          <div className="quote-result"><span>Tarifa estimada</span><strong>{number.format(quote)} COP</strong><small>Incluye manejo básico</small></div>
          <Link to={`/pedidos/nuevo?operador=${carrier.id}`} className={`button ${index === 0 ? 'primary' : 'secondary'} wide`}>Elegir {carrier.name}</Link>
        </article>;
      })}</div>
      <div className="info-strip"><span>ⓘ</span><div><strong>Estas tarifas son demostrativas</strong><p>En una integración real se consultarían los precios y coberturas de cada transportadora.</p></div></div>
    </section>
  );
}
