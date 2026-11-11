import { NavLink } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { roleLabels } from '../domain/orders';

export const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '▦' },
  { to: '/pedidos', label: 'Pedidos', icon: '▣' },
  { to: '/seguimiento', label: 'Seguimiento en vivo', icon: '⌖' },
  { to: '/operadores', label: 'Operadores logísticos', icon: '▰' },
  { to: '/indicadores', label: 'Analítica y KPI', icon: '◫' },
  { to: '/configuracion', label: 'Configuración', icon: '⚙' },
  { to: '/safesms', label: 'SafeSMS', icon: '◇' },
  { to: '/consulta', label: 'Consulta del destinatario', icon: '⌕' },
];

export function Sidebar({ open, onClose }) {
  const { user } = useDemo();
  const items = user.role === 'recipient' ? navItems.filter(i => ['/safesms', '/consulta'].includes(i.to)) : user.role === 'courier' ? [{ to: '/operacion', label: 'Mis entregas', icon: '▣' }, ...navItems.filter(i => ['/safesms', '/consulta', '/configuracion'].includes(i.to))] : [...navItems, ...(user.role === 'admin' ? [{ to: '/administracion', label: 'Administración', icon: '⚙' }] : [])];
  return (
    <>
      {open && <button className="sidebar-backdrop" aria-label="Cerrar menú" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div>
          <div className="brand-card"><img src="/assets/logipyme-safesms-diapositivas.png" alt="LogiPyme + SafeSMS" /></div>
          <div className="branch-card">
            <span className="eyebrow">Perfil de demostración</span>
            <strong>{roleLabels[user.role]}</strong>
          </div>
          {user.role === 'commerce' && <NavLink className="sidebar-primary" to="/pedidos/nuevo" onClick={onClose}>
            <span aria-hidden="true">＋</span> Nuevo envío
          </NavLink>}
          <nav className="sidebar-nav" aria-label="Principal">
            {items.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={onClose}>
                <span aria-hidden="true">{item.icon}</span>{item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="privacy-note"><span>◇ LogiPyme + SafeSMS</span><small>Demo académica · Datos de ejemplo</small></div>
      </aside>
    </>
  );
}
