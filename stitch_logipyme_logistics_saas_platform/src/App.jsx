import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { AccessPage } from './pages/AccessPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CarriersPage } from './pages/CarriersPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateOrderPage } from './pages/CreateOrderPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { OrdersPage } from './pages/OrdersPage';
import { SettingsPage } from './pages/SettingsPage';
import { TrackingPage } from './pages/TrackingPage';
import { DemoProvider, useDemo } from './state/DemoContext';
import { PublicShell } from './components/PublicShell';
import { ConsultPage } from './pages/ConsultPage';
import { SafeSmsLayout, SafeSmsHome, SafeSmsReview, SafeSmsResult, SafeSmsHistory } from './pages/SafeSmsPages';
import { OperationsPage } from './pages/OperationsPage';
import { AdminPage } from './pages/AdminPage';
import { Link } from 'react-router-dom';

function RoleGate({ roles, children }) {
  const { user } = useDemo();
  if (roles.includes(user.role)) return children;
  return <div className="empty-state standalone"><h1>Este perfil no tiene acceso</h1><p>Cambia el perfil de demostración para recorrer esta pantalla.</p><Link className="button primary" to={user.role === 'courier' ? '/operacion' : user.role === 'recipient' ? '/consulta' : '/dashboard'}>Volver a mi recorrido</Link></div>;
}

export function AppRoutes() {
  return (
    <DemoProvider><Routes>
      <Route path="/" element={<AccessPage />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/pedidos/nuevo" element={<RoleGate roles={['commerce']}><CreateOrderPage /></RoleGate>} />
        <Route path="/pedidos/:orderId" element={<OrderDetailPage />} />
        <Route path="/seguimiento" element={<TrackingPage />} />
        <Route path="/operadores" element={<CarriersPage />} />
        <Route path="/indicadores" element={<AnalyticsPage />} />
        <Route path="/configuracion" element={<SettingsPage />} />
        <Route path="/operacion" element={<RoleGate roles={['courier']}><OperationsPage /></RoleGate>} />
        <Route path="/administracion" element={<RoleGate roles={['admin']}><AdminPage /></RoleGate>} />
        <Route path="/safesms" element={<SafeSmsLayout />}>
          <Route index element={<SafeSmsHome />} />
          <Route path="revisar" element={<SafeSmsReview />} />
          <Route path="resultado" element={<SafeSmsResult />} />
          <Route path="historial" element={<SafeSmsHistory />} />
        </Route>
      </Route>
      <Route element={<PublicShell />}>
        <Route path="/consulta" element={<ConsultPage />} />
        <Route path="/consulta/:orderId" element={<ConsultPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes></DemoProvider>
  );
}

export function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
