import { Link, Outlet } from 'react-router-dom';

export function PublicShell() {
  return <div className="public-shell"><header className="public-header"><Link to="/" aria-label="Inicio LogiPyme y SafeSMS"><img src="/assets/logipyme-safesms-diapositivas.png" alt="LogiPyme + SafeSMS" /></Link><nav aria-label="Consulta del destinatario"><Link to="/consulta">Consultar pedido</Link><Link to="/safesms">Revisar SMS</Link></nav></header><main className="public-content"><p className="demo-ribbon">Demo académica · Pedidos y análisis de ejemplo</p><Outlet /></main><footer className="public-footer">LogiPyme + SafeSMS · Entregas claras, decisiones informadas.</footer></div>;
}
