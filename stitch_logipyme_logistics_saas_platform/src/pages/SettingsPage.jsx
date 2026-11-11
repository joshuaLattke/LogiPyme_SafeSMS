import { useState } from 'react';
import { Modal } from '../components/Modal';
import { useDemo } from '../state/DemoContext';
import { Link } from 'react-router-dom';

export function SettingsPage() {
  const { user, state, dispatch } = useDemo();
  const currentUser = { ...user, city: 'Sucursal de demostración', company: user.company || 'Equipo LogiPyme' };
  const [preferences, setPreferences] = useState(state.preferences);
  const [info, setInfo] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [inviteSent, setInviteSent] = useState(false);
  const [saved, setSaved] = useState(false);

  function submitInvite(event) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) { setInviteError('Ingresa un correo válido'); setInviteSent(false); return; }
    setInviteError(''); setInviteSent(true);
  }

  return (
    <section className="page-grid">
      <div className="page-heading"><p className="eyebrow">Administración</p><h1>Configuración y privacidad</h1><p>Personaliza tu cuenta, equipo y comunicaciones.</p></div>
      {saved && <div className="success-banner" role="status"><span>✓</span><div><strong>Preferencias guardadas</strong><p>Los cambios permanecen sólo durante esta demostración.</p></div></div>}
      <div className="settings-layout">
        <div className="settings-main">
          <article className="card settings-section"><div className="settings-title"><span className="settings-icon">◉</span><div><h2>Perfil de la empresa</h2><p>Información visible en tus documentos y guías.</p></div><button className="link-button" type="button" onClick={() => setInfo('Los perfiles de demostración se crean desde Administración. Los cambios de esta sesión se reinician al recargar.')}>Ver opciones</button></div><div className="company-profile"><div className="company-avatar">DM</div><div><strong>{currentUser.company}</strong><span>{currentUser.city}</span></div><b>Perfil demo</b></div><dl><div><dt>Administrador</dt><dd>{currentUser.name}</dd></div><div><dt>Correo</dt><dd>{currentUser.email}</dd></div><div><dt>Teléfono</dt><dd>No registrado en la demo</dd></div></dl></article>
          <article className="card settings-section"><div className="settings-title"><span className="settings-icon">♢</span><div><h2>Notificaciones</h2><p>Elige qué actualizaciones quieres recibir.</p></div></div><div className="toggle-list"><label><span><b>Novedades de entrega</b><small>Alertas cuando un pedido requiera atención.</small></span><input type="checkbox" checked={preferences.delivery} onChange={e => setPreferences({ ...preferences, delivery: e.target.checked })} /></label><label><span><b>Confirmaciones de recaudo</b><small>Resumen cuando recibas un giro.</small></span><input type="checkbox" checked={preferences.collection} onChange={e => setPreferences({ ...preferences, collection: e.target.checked })} /></label><label><span><b>Consejos y novedades</b><small>Contenido para mejorar tu operación.</small></span><input type="checkbox" checked={preferences.tips} onChange={e => setPreferences({ ...preferences, tips: e.target.checked })} /></label></div></article>
          <article className="card settings-section"><div className="settings-title"><span className="settings-icon">⌾</span><div><h2>Privacidad y seguridad</h2><p>Control de acceso y tratamiento de información.</p></div></div><div className="security-row"><div><b>Verificación en dos pasos</b><span>Protección adicional para tu cuenta.</span></div><button className="button secondary" type="button" onClick={() => setInfo('La autenticación y la verificación en dos pasos requieren un servicio de cuentas real. Aquí se simulan los perfiles para la exposición.')}>Ver alcance</button></div><div className="security-row"><div><b>Tratamiento de datos</b><span>Información temporal para la demostración.</span></div><button className="link-button" type="button" onClick={() => setInfo('La demo mantiene pedidos en memoria de la pestaña. El SMS y remitente se eliminan al generar el resultado. Solo se conserva un resumen cuando eliges guardarlo. No se envían textos ni imágenes a servicios externos. La política de producción y su validación están pendientes.')}>Consultar</button></div></article>
          <button className="button primary save-settings" type="button" onClick={() => { dispatch({ type: 'SET_PREFERENCES', values: preferences }); setSaved(true); }}>Guardar preferencias</button>
        </div>
        <aside className="side-stack"><article className="card team-card"><div className="card-head"><div><h2>Tu equipo</h2><p>3 colaboradores activos</p></div></div><div className="team-list">{[['CM', 'Carolina Morales', 'Administradora'], ['JP', 'Juan Pérez', 'Despachos'], ['LS', 'Laura Sánchez', 'Operaciones']].map((person) => <div key={person[1]}><span>{person[0]}</span><div><strong>{person[1]}</strong><small>{person[2]}</small></div><span>Demo</span></div>)}</div><button className="button secondary wide" type="button" onClick={() => { setInviteOpen(true); setInviteSent(false); setInviteError(''); }}>＋ Invitar colaborador</button></article><article className="privacy-panel"><span>✓</span><h3>Privacidad del SMS</h3><p>Los pedidos permanecen en esta sesión. El texto del SMS no se conserva ni se envía a un servicio externo.</p></article></aside>
      </div>
      <article className="card analysis-card"><h2>Control de los datos de demostración</h2><p>Al recargar se reinician los pedidos y preferencias. Puedes borrar tus resúmenes de SafeSMS desde su historial.</p><div className="action-row"><Link to="/safesms/historial" className="button secondary">Historial SafeSMS</Link><button className="button secondary" onClick={() => { dispatch({ type: 'RESET' }); setPreferences({ delivery: true, collection: true, tips: false }); setSaved(false); }}>Reiniciar datos de ejemplo</button></div></article>
      <Modal title="Alcance de la demostración" open={Boolean(info)} onClose={() => setInfo('')}><p className="modal-copy">{info}</p></Modal>
      <Modal title="Invitar colaborador" open={inviteOpen} onClose={() => setInviteOpen(false)}><form className="form-stack modal-form" onSubmit={submitInvite} noValidate><p className="muted">La invitación sólo se mostrará en pantalla; no se enviará ningún correo.</p><label>Correo del colaborador<input type="email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="persona@empresa.com" /></label>{inviteError && <p className="form-error" role="alert">{inviteError}</p>}{inviteSent && <p className="success-message" role="status">Invitación simulada enviada a {inviteEmail}</p>}<div className="action-row"><button className="button secondary" type="button" onClick={() => setInviteOpen(false)}>Cancelar</button><button className="button primary" type="submit">Enviar invitación</button></div></form></Modal>
    </section>
  );
}
