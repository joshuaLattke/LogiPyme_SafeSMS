import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDemo } from '../state/DemoContext';
import { validEmail, roleLabels } from '../domain/orders';

export function AccessPage() {
  const { state, dispatch } = useDemo();
  const [profile, setProfile] = useState('commerce');
  const [mode, setMode] = useState('login');
  const [login, setLogin] = useState({ email: '', password: '' });
  const [register, setRegister] = useState({ company: '', nit: '', name: '', email: '', password: '', accepted: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function submitLogin(event) {
    event.preventDefault();
    if (!login.email.trim() || !login.password.trim()) {
      setError('Correo y contraseña son obligatorios');
      return;
    }
    setError('');
    dispatch({ type: 'SET_USER', id: profile });
    const selected = state.users.find(u => u.id === profile);
    navigate(selected.role === 'courier' ? '/operacion' : selected.role === 'admin' ? '/administracion' : selected.role === 'recipient' ? '/consulta' : '/dashboard');
  }

  function submitRegister(event) {
    event.preventDefault();
    if (!register.company.trim() || !register.nit.trim() || !register.name.trim() || !validEmail(register.email) || !register.password.trim() || !register.accepted || state.users.some(u => u.email === register.email.trim())) {
      setError('Completa los campos obligatorios y acepta el tratamiento de datos');
      return;
    }
    setError('');
    dispatch({ type: 'REGISTER_COMPANY', values: register });
    setRegister({ company: '', nit: '', name: '', email: '', password: '', accepted: false });
    navigate('/dashboard');
  }

  return (
    <main className="access-page">
      <section className="access-story">
        <img src="/assets/logipyme-safesms-diapositivas.png" alt="LogiPyme + SafeSMS" />
        <div className="access-copy">
          <span className="access-pill">Hecho para MiPymes colombianas</span>
          <h1>Tu operación logística, clara y bajo control.</h1>
          <p>Gestiona tus entregas y revisa mensajes sospechosos desde un mismo lugar.</p>
          <div className="access-benefits">
            <span><b>4+</b> transportadoras</span><span><b>1.100</b> municipios</span><span><b>24/7</b> trazabilidad</span>
          </div>
        </div>
        <p className="access-legal">Prototipo académico · Datos y perfiles de demostración.</p>
      </section>
      <section className="access-panel">
        <div className="mobile-logo"><img src="/assets/logipyme-safesms-diapositivas.png" alt="LogiPyme + SafeSMS" /></div>
        <div className="access-card">
          <p className="eyebrow">LogiPyme + SafeSMS</p>
          <h2>{mode === 'login' ? 'Ingresa a tu cuenta' : 'Crea tu empresa'}</h2>
          <p className="muted">{mode === 'login' ? 'Continúa donde dejaste tu operación.' : 'Comienza a organizar tus entregas hoy.'}</p>
          <div className="segmented" aria-label="Tipo de acceso">
            <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setError(''); }}>Ingresar</button>
            <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setError(''); }}>Crear empresa</button>
          </div>
          {mode === 'login' ? (
            <form className="form-stack" onSubmit={submitLogin} noValidate><label>Perfil para la presentación<select value={profile} onChange={e => setProfile(e.target.value)}>{state.users.map(u => <option key={u.id} value={u.id}>{roleLabels[u.role]} · {u.name}</option>)}</select></label>
              <label>Correo electrónico<input type="email" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} placeholder="tu@empresa.com" /></label>
              <label>Contraseña<input type="password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} placeholder="••••••••" /></label>
              <div className="form-inline"><label className="check"><input type="checkbox" /> Recordarme</label><button className="link-button" type="button" onClick={() => setError('Acceso de demostración: usa cualquier contraseña. No hay recuperación de cuentas reales.')}>Olvidé mi contraseña</button></div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button primary wide" type="submit">Ingresar</button>
            </form>
          ) : (
            <form className="form-stack" onSubmit={submitRegister} noValidate>
              <div className="two-fields"><label>Nombre de la empresa<input value={register.company} onChange={(event) => setRegister({ ...register, company: event.target.value })} /></label><label>NIT<input value={register.nit} onChange={(event) => setRegister({ ...register, nit: event.target.value })} /></label></div>
              <label>Tu nombre<input value={register.name} onChange={(event) => setRegister({ ...register, name: event.target.value })} /></label>
              <label>Correo electrónico<input type="email" value={register.email} onChange={(event) => setRegister({ ...register, email: event.target.value })} /></label>
              <label>Contraseña<input type="password" value={register.password} onChange={(event) => setRegister({ ...register, password: event.target.value })} /></label>
              <label className="check"><input type="checkbox" checked={register.accepted} onChange={(event) => setRegister({ ...register, accepted: event.target.checked })} /> Acepto el tratamiento de datos personales.</label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button primary wide" type="submit">Crear mi empresa</button>
            </form>
          )}
          <div className="access-public-links"><Link to="/consulta">Consultar un pedido</Link><Link to="/safesms">Conocer SafeSMS →</Link></div>
          <p className="demo-note">Demo visual · Puedes usar cualquier correo y contraseña.</p>
        </div>
      </section>
    </main>
  );
}
