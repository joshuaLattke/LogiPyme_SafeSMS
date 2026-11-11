import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { roleLabels } from '../domain/orders';
import { useState } from 'react';

export function Header({ onMenuToggle }) {
  const { state, user, dispatch } = useDemo(); const navigate = useNavigate(); const [query, setQuery] = useState('');
  return <header className="topbar"><button className="menu-button" onClick={onMenuToggle} aria-label="Abrir menú">☰</button><form className="global-search" onSubmit={e => { e.preventDefault(); if (query.trim()) navigate(`/consulta/${encodeURIComponent(query.trim().toUpperCase())}`); }}><span aria-hidden="true">⌕</span><input aria-label="Buscar pedido por número" value={query} onChange={e => setQuery(e.target.value)} placeholder="Consultar LP-1048…" /></form><div className="topbar-actions"><label className="profile-select">Perfil demo<select aria-label="Perfil de demostración" value={user.id} onChange={e => { dispatch({ type: 'SET_USER', id: e.target.value }); const next = state.users.find(u => u.id === e.target.value); navigate(next.role === 'courier' ? '/operacion' : next.role === 'recipient' ? '/consulta' : next.role === 'admin' ? '/administracion' : '/dashboard'); }}>{state.users.map(u => <option value={u.id} key={u.id}>{u.name} · {roleLabels[u.role]}</option>)}</select></label>{user.role === 'commerce' && <Link className="quick-action" to="/pedidos/nuevo">＋ Nuevo pedido</Link>}<Link className="safe-header-link" to="/safesms">◇ SafeSMS</Link></div></header>;
}
