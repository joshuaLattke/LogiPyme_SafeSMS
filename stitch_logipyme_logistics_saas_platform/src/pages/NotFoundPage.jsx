import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="not-found">
      <span>404</span><h1>Página no encontrada</h1>
      <p>La dirección que abriste no pertenece a esta demostración.</p>
      <Link className="button primary" to="/">Volver al acceso</Link>
    </main>
  );
}
