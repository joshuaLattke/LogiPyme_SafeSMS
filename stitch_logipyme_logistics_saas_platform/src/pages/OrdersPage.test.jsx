import { DemoProvider } from '../state/DemoContext';
function render(ui) { return rtlRender(<DemoProvider>{ui}</DemoProvider>); }
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { OrdersPage } from './OrdersPage';

function renderOrders() {
  return render(<MemoryRouter><OrdersPage /></MemoryRouter>);
}

test('filtra pedidos por estado logístico', async () => {
  const user = userEvent.setup();
  renderOrders();

  await user.selectOptions(screen.getByLabelText(/filtrar por estado/i), 'Entregado');

  expect(screen.getByText('Andrés Rojas')).toBeInTheDocument();
  expect(screen.queryByText('Laura Gómez')).not.toBeInTheDocument();
});

test('busca pedidos por cliente', async () => {
  const user = userEvent.setup();
  renderOrders();

  await user.type(screen.getByLabelText(/buscar pedidos/i), 'Mónica');

  expect(screen.getByText('Mónica Díaz')).toBeInTheDocument();
  expect(screen.queryByText('Andrés Rojas')).not.toBeInTheDocument();
});

test('cada pedido enlaza con su detalle', () => {
  renderOrders();

  expect(screen.getByRole('link', { name: /ver pedido lp-1048/i })).toHaveAttribute('href', '/pedidos/LP-1048');
});
