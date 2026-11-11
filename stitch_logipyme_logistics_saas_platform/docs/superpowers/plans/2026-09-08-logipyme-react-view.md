# LogiPyme React View Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear una demo navegable de LogiPyme en React que se ejecute en localhost con Node.js, conserve la identidad visual y simule los flujos sin backend.

**Architecture:** Una SPA de React y Vite usa React Router para nueve rutas funcionales y una ruta 404. Un `AppShell` comparte navegación y cabecera; páginas enfocadas consumen datos ficticios desde módulos locales y mantienen sólo estado efímero de interfaz.

**Tech Stack:** Node.js, npm, React, Vite, React Router, CSS, Vitest, Testing Library y jsdom.

**Spec:** `docs/superpowers/specs/2026-09-08-logipyme-react-view-design.md`

## Global Constraints

- No crear backend, API, base de datos ni persistencia.
- No enviar datos de formularios a servicios externos.
- Mantener en español la interfaz y los datos ficticios.
- Servir el logo desde `public/assets/logipyme-logo.png`.
- Conservar la paleta, tipografía, estados, radios y espaciado descritos en `logipyme_direct_logistics/DESIGN.md`.
- El proyecto no tiene repositorio Git; cada tarea termina con una verificación local, no con un commit.

## File Map

- `package.json`: scripts y dependencias de ejecución y prueba.
- `vite.config.js`: plugin de React y configuración explícita de Vite.
- `index.html`: punto de entrada Vite.
- `src/main.jsx`: montaje de React.
- `src/App.jsx`: rutas públicas, rutas dentro del shell y 404.
- `src/styles.css`: tokens, componentes visuales y adaptación responsive.
- `src/test/setup.js`: extensiones de assertions y limpieza de pruebas.
- `src/data/mockData.js`: usuario, pedidos, operadores, KPI y actividad ficticios.
- `src/components/AppShell.jsx`: layout autenticado y menú móvil.
- `src/components/Sidebar.jsx`: navegación principal.
- `src/components/Header.jsx`: buscador y acciones superiores.
- `src/components/StatusBadge.jsx`: presentación accesible de estados.
- `src/components/Modal.jsx`: diálogo reutilizable.
- `src/pages/AccessPage.jsx`: acceso y registro simulados.
- `src/pages/DashboardPage.jsx`: resumen operacional.
- `src/pages/OrdersPage.jsx`: tabla, filtros y selección de pedidos.
- `src/pages/CreateOrderPage.jsx`: formulario simulado de creación.
- `src/pages/OrderDetailPage.jsx`: detalle y prueba de entrega.
- `src/pages/TrackingPage.jsx`: filtros, mapa visual y modal de prueba.
- `src/pages/CarriersPage.jsx`: catálogo y simulador de flete.
- `src/pages/AnalyticsPage.jsx`: KPI y gráficos construidos con CSS/SVG.
- `src/pages/SettingsPage.jsx`: configuración e invitación simulada.
- `src/pages/NotFoundPage.jsx`: recuperación de rutas inválidas.
- `src/**/*.test.jsx`: pruebas junto a los componentes o páginas que verifican.
- `README.md`: comandos de localhost, compilación y alcance de la demo.

---

### Task 1: Toolchain and first tested render

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`
- Create: `src/test/setup.js`
- Test: `src/App.test.jsx`

**Interfaces:**
- Produces: `App(): JSX.Element` and npm scripts `dev`, `start`, `build`, `preview`, `test`.

- [ ] **Step 1: Create the manifest and test harness**

Use ESM and define `start` as a localhost-friendly alias:

```json
{
  "name": "logipyme-react-demo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "start": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "latest",
    "react-dom": "latest",
    "react-router-dom": "latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "jsdom": "latest",
    "vite": "latest",
    "vitest": "latest"
  },
  "vitest": {
    "environment": "jsdom",
    "setupFiles": ["./src/test/setup.js"]
  }
}
```

- [ ] **Step 2: Write the failing smoke test**

```jsx
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders the LogiPyme access screen', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /gestiona tus envíos/i })).toBeInTheDocument();
});
```

- [ ] **Step 3: Run the test and confirm the expected failure**

Run: `npm install && npm test`

Expected: FAIL because `App` or the heading does not exist yet.

- [ ] **Step 4: Add the minimal Vite entry and initial access view**

`src/App.jsx` initially exports:

```jsx
export function App() {
  return <main><h1>Gestiona tus envíos en un solo lugar</h1></main>;
}
```

Mount it from `src/main.jsx` with `createRoot(document.getElementById('root')).render(<App />)` and import `styles.css`. Add a standard Vite `index.html` containing `<div id="root"></div>`.

Configure React explicitly:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });
```

Use this exact HTML body and module entry: `<div id="root"></div><script type="module" src="/src/main.jsx"></script>`.

- [ ] **Step 5: Verify the foundation**

Run: `npm test && npm run build`

Expected: one passing smoke test and a successful Vite build in `dist/`.

### Task 2: Routing, shared shell and company logo

**Files:**
- Create: `public/assets/logipyme-logo.png`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Create: `src/components/AppShell.jsx`
- Create: `src/components/Sidebar.jsx`
- Create: `src/components/Header.jsx`
- Create: `src/pages/NotFoundPage.jsx`
- Test: `src/App.test.jsx`

**Interfaces:**
- Produces: `AppRoutes(): JSX.Element`, `AppShell(): JSX.Element`, `navItems: Array<{to: string, label: string, icon: string}>`.
- Produces routes: `/`, `/dashboard`, `/pedidos`, `/pedidos/nuevo`, `/pedidos/:orderId`, `/seguimiento`, `/operadores`, `/indicadores`, `/configuracion`, `*`.

- [ ] **Step 1: Add failing navigation and 404 tests**

Render `AppRoutes` inside `MemoryRouter` and assert that `/dashboard` shows the authenticated shell, `/pedidos` selects “Pedidos”, and `/ruta-inexistente` displays “Página no encontrada”. Also assert that the logo has alt text `LogiPyme`.

```jsx
render(<MemoryRouter initialEntries={['/dashboard']}><AppRoutes /></MemoryRouter>);
expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument();
expect(screen.getByRole('img', { name: 'LogiPyme' })).toHaveAttribute('src', '/assets/logipyme-logo.png');
```

- [ ] **Step 2: Run the targeted test**

Run: `npm test -- src/App.test.jsx`

Expected: FAIL because the router, shell and asset are absent.

- [ ] **Step 3: Implement routes and the reusable shell**

Wrap `AppRoutes` in `BrowserRouter` from `App`. Use a parent `<Route element={<AppShell />}>` containing authenticated pages, and `<Outlet />` in `AppShell`. `Sidebar` uses `NavLink`; `Header` exposes the mobile menu button through an `onMenuToggle` prop.

```jsx
export const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '▦' },
  { to: '/pedidos', label: 'Pedidos', icon: '▣' },
  { to: '/seguimiento', label: 'Seguimiento en vivo', icon: '⌖' },
  { to: '/operadores', label: 'Operadores logísticos', icon: '▰' },
  { to: '/indicadores', label: 'Analítica y KPI', icon: '◫' },
  { to: '/configuracion', label: 'Configuración', icon: '⚙' }
];
```

Until later tasks replace them, route elements may use semantic headings with their final page names. Copy the user-provided logo without alteration to the specified asset path.

- [ ] **Step 4: Add the visual foundation**

Define CSS variables for `--primary: #2563eb`, `--navy: #0b192c`, `--surface: #f8fafc`, `--success: #10b981`, `--warning: #f59e0b`, `--danger: #ef4444`, text, border, radii and shadows. Implement a fixed 260px desktop sidebar and a drawer below 768px.

- [ ] **Step 5: Verify routes and shell**

Run: `npm test -- src/App.test.jsx && npm run build`

Expected: navigation, logo and 404 assertions pass; production build succeeds.

### Task 3: Mock data and access flow

**Files:**
- Create: `src/data/mockData.js`
- Create: `src/pages/AccessPage.jsx`
- Modify: `src/App.jsx`
- Test: `src/pages/AccessPage.test.jsx`

**Interfaces:**
- Produces: `currentUser`, `orders`, `carriers`, `metrics`, `activity` named exports.
- Produces: `AccessPage(): JSX.Element` with tabs `Ingresar` and `Crear empresa`.
- Consumes: `useNavigate()` and redirects successful local submissions to `/dashboard`.

- [ ] **Step 1: Write access-flow tests**

Cover tab switching, required-field validation and navigation after a valid login. Use `userEvent` and a memory router with both `/` and `/dashboard` routes.

```jsx
await user.click(screen.getByRole('button', { name: /ingresar/i }));
expect(screen.getByText(/correo y contraseña son obligatorios/i)).toBeInTheDocument();
await user.type(screen.getByLabelText(/correo/i), 'carolina@logipyme.co');
await user.type(screen.getByLabelText(/contraseña/i), 'demo1234');
await user.click(screen.getByRole('button', { name: /ingresar/i }));
expect(await screen.findByText('Dashboard de prueba')).toBeInTheDocument();
```

- [ ] **Step 2: Confirm failure**

Run: `npm test -- src/pages/AccessPage.test.jsx`

Expected: FAIL because `AccessPage` has not been implemented.

- [ ] **Step 3: Implement local data and access forms**

Create stable IDs and Colombian sample values. The access form tracks `{email, password}`; registration tracks `{company, nit, name, email, password, accepted}`. Submission calls only `preventDefault()`, validates state and navigates. It must not call `fetch`, `XMLHttpRequest`, localStorage or sessionStorage.

```js
export const currentUser = { name: 'Carolina Morales', company: 'Dulces & Moda Artesanal', city: 'Bogotá D.C.' };
export const orders = [
  { id: 'LP-1048', tracking: '7729182319', customer: 'Laura Gómez', city: 'Medellín', status: 'En tránsito', value: 128000 },
  { id: 'LP-1049', tracking: '8846201975', customer: 'Andrés Rojas', city: 'Cali', status: 'Entregado', value: 92000 },
  { id: 'LP-1050', tracking: '6610472388', customer: 'Mónica Díaz', city: 'Barranquilla', status: 'Novedad', value: 156000 }
];
```

- [ ] **Step 4: Verify access behavior**

Run: `npm test -- src/pages/AccessPage.test.jsx`

Expected: tab, validation and local navigation tests pass.

### Task 4: Dashboard, orders and order detail

**Files:**
- Create: `src/components/StatusBadge.jsx`
- Create: `src/pages/DashboardPage.jsx`
- Create: `src/pages/OrdersPage.jsx`
- Create: `src/pages/OrderDetailPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Test: `src/pages/OrdersPage.test.jsx`
- Test: `src/pages/OrderDetailPage.test.jsx`

**Interfaces:**
- Produces: `StatusBadge({status}): JSX.Element`.
- `OrdersPage` consumes `orders` and supports query plus status filter.
- `OrderDetailPage` consumes `useParams().orderId`; unknown IDs render an in-page empty state.

- [ ] **Step 1: Write failing order tests**

Assert that filtering by “Entregado” hides an “En tránsito” order, searching by customer name narrows the table, selecting a row link opens `/pedidos/LP-1048`, and the detail page renders its tracking number. Assert an unknown ID displays “Pedido no encontrado”.

- [ ] **Step 2: Confirm failure**

Run: `npm test -- src/pages/OrdersPage.test.jsx src/pages/OrderDetailPage.test.jsx`

Expected: FAIL because pages and filtering do not exist.

- [ ] **Step 3: Implement the three pages**

Dashboard renders four metric cards, recent orders, operational alerts and settlement summary. Orders renders controls plus an accessible table and a card layout on mobile. Detail renders customer, package, cost breakdown, shipment timeline and proof image fallback. Every order detail link uses `/pedidos/${order.id}`.

```jsx
const visibleOrders = orders.filter((order) =>
  (status === 'Todos' || order.status === status) &&
  `${order.id} ${order.tracking} ${order.customer} ${order.city}`.toLowerCase().includes(query.toLowerCase())
);

<Link to={`/pedidos/${order.id}`} aria-label={`Ver pedido ${order.id}`}>Ver detalle</Link>
```

- [ ] **Step 4: Implement state presentation**

Map `Pendiente`, `En tránsito`, `Entregado` and `Novedad` to deterministic CSS classes in `StatusBadge`. Add `aria-label="Estado: ${status}"`; do not encode state only by color.

- [ ] **Step 5: Verify operational views**

Run: `npm test -- src/pages/OrdersPage.test.jsx src/pages/OrderDetailPage.test.jsx && npm run build`

Expected: filter, search, route and missing-order tests pass; build succeeds.

### Task 5: Order creation and live tracking interactions

**Files:**
- Create: `src/components/Modal.jsx`
- Create: `src/pages/CreateOrderPage.jsx`
- Create: `src/pages/TrackingPage.jsx`
- Modify: `src/styles.css`
- Test: `src/pages/CreateOrderPage.test.jsx`
- Test: `src/pages/TrackingPage.test.jsx`

**Interfaces:**
- Produces: `Modal({title, open, onClose, children}): JSX.Element | null`.
- `CreateOrderPage` owns local form state and success confirmation.
- `TrackingPage` consumes `orders`, filters by status and opens a proof modal by order ID.

- [ ] **Step 1: Write failing interaction tests**

For creation, submit an empty form and assert required-field feedback; fill recipient, phone, city, address, package weight and declared value and assert “Pedido simulado creado”. For tracking, filter “Novedad”, open an order, open “Ver prueba” and close the dialog with Escape.

- [ ] **Step 2: Confirm failure**

Run: `npm test -- src/pages/CreateOrderPage.test.jsx src/pages/TrackingPage.test.jsx`

Expected: FAIL because the pages and dialog behavior are absent.

- [ ] **Step 3: Implement the creation form**

Use controlled inputs and a pure validator:

```js
export function validateOrder(values) {
  const required = ['recipient', 'phone', 'city', 'address', 'weight', 'declaredValue'];
  return required.reduce((errors, field) => {
    if (!String(values[field] ?? '').trim()) errors[field] = 'Este campo es obligatorio';
    return errors;
  }, {});
}
```

On success, show a local confirmation containing a generated display-only ID; do not mutate shared data or send a request.

- [ ] **Step 4: Implement tracking and accessible modal**

Render a CSS-based schematic map rather than a map API. `Modal` uses `role="dialog"`, `aria-modal="true"`, a labelled heading, a visible close button, backdrop close and an Escape listener removed on cleanup.

```jsx
useEffect(() => {
  if (!open) return undefined;
  const closeOnEscape = (event) => event.key === 'Escape' && onClose();
  document.addEventListener('keydown', closeOnEscape);
  return () => document.removeEventListener('keydown', closeOnEscape);
}, [open, onClose]);

if (!open) return null;
return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
  <section role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">{title}</h2>
    <button type="button" aria-label="Cerrar" onClick={onClose}>×</button>
    {children}
  </section>
</div>;
```

- [ ] **Step 5: Verify interactive flows**

Run: `npm test -- src/pages/CreateOrderPage.test.jsx src/pages/TrackingPage.test.jsx`

Expected: validation, success, filtering and modal tests pass.

### Task 6: Carriers, analytics and settings

**Files:**
- Create: `src/pages/CarriersPage.jsx`
- Create: `src/pages/AnalyticsPage.jsx`
- Create: `src/pages/SettingsPage.jsx`
- Modify: `src/styles.css`
- Test: `src/pages/CarriersPage.test.jsx`
- Test: `src/pages/SettingsPage.test.jsx`

**Interfaces:**
- `CarriersPage` consumes `carriers` and calculates a display-only quote from local inputs.
- `AnalyticsPage` consumes `metrics` and renders accessible textual values alongside CSS/SVG charts.
- `SettingsPage` owns local preferences and invitation modal state.

- [ ] **Step 1: Write failing page tests**

Assert that a carrier quote changes when weight changes, period buttons update the analytics heading, and an empty invitation form shows validation while a valid email shows “Invitación simulada enviada”.

- [ ] **Step 2: Confirm failure**

Run: `npm test -- src/pages/CarriersPage.test.jsx src/pages/SettingsPage.test.jsx`

Expected: FAIL because the carrier, analytics and settings pages do not exist.

- [ ] **Step 3: Implement carriers and analytics**

Calculate quotes locally with `basePrice + weight * perKg` from each carrier record. Analytics period state accepts `mes`, `30d`, or `trimestre`; all charts include a nearby text summary so values are not visual-only.

```jsx
const quotes = carriers.map((carrier) => ({
  ...carrier,
  quote: carrier.basePrice + Number(weight || 0) * carrier.perKg
}));

const periodLabels = { mes: 'Este mes', '30d': 'Últimos 30 días', trimestre: 'Este trimestre' };
<h2>Rendimiento: {periodLabels[period]}</h2>
```

- [ ] **Step 4: Implement settings**

Render profile, notification, privacy and collaborator sections. Saving preferences displays an inline confirmation. Invitation validates with `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, never sends a request, and closes after acknowledgement.

```jsx
function submitInvite(event) {
  event.preventDefault();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) {
    setInviteError('Ingresa un correo válido');
    return;
  }
  setInviteError('');
  setInviteSent(true);
}
```

- [ ] **Step 5: Verify the remaining views**

Run: `npm test -- src/pages/CarriersPage.test.jsx src/pages/SettingsPage.test.jsx && npm run build`

Expected: quotes, analytics state, settings validation and build succeed.

### Task 7: Responsive polish, documentation and localhost verification

**Files:**
- Modify: `src/styles.css`
- Create: `README.md`
- Modify: `src/**/*.jsx` only where browser verification exposes an issue.

**Interfaces:**
- Produces documented commands: `npm install`, `npm start`, `npm test`, `npm run build`, `npm run preview`.
- Produces a development URL reported by Vite, normally `http://localhost:5173`.

- [ ] **Step 1: Run the complete automated verification**

Run: `npm test && npm run build`

Expected: all tests pass and Vite creates `dist/` without errors.

- [ ] **Step 2: Start localhost**

Run: `npm start`

Expected: Vite reports a local URL, normally `http://localhost:5173/`, and keeps the process running.

- [ ] **Step 3: Verify the application in a browser**

Open `/`, `/dashboard`, `/pedidos`, `/pedidos/LP-1048`, `/pedidos/nuevo`, `/seguimiento`, `/operadores`, `/indicadores`, `/configuracion` and an invalid route. At desktop and mobile widths, verify visible content, navigation, logo, no horizontal page overflow, no uncaught console errors and no failed local assets.

- [ ] **Step 4: Apply only evidence-driven visual fixes**

Compare the principal routes against their matching `screen.png` references. Correct concrete spacing, overflow, contrast, focus or responsive issues in `styles.css`; rerun only the tests affected by any JSX change.

- [ ] **Step 5: Document operation and limitations**

README must state that this is a frontend-only demo with fictitious data, list the five npm commands, name the default localhost URL, explain that state resets on refresh and note that WhatsApp is the only permitted external action.

- [ ] **Step 6: Run final verification after documentation**

Run: `npm test && npm run build`

Expected: all tests pass and the production build succeeds. Keep `npm start` active for user inspection and report its exact URL.
