import { DemoProvider } from '../state/DemoContext';
import { MemoryRouter } from 'react-router-dom';
function render(ui) { return rtlRender(<DemoProvider><MemoryRouter>{ui}</MemoryRouter></DemoProvider>); }
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { CreateOrderPage } from './CreateOrderPage';

test('señala los campos obligatorios de un pedido vacío', async () => {
  const user = userEvent.setup();
  render(<CreateOrderPage />);

  await user.click(screen.getByRole('button', { name: /crear pedido simulado/i }));

  expect(screen.getAllByText('Este campo es obligatorio').length).toBeGreaterThanOrEqual(6);
});

test('confirma un pedido simulado completo sin enviarlo', async () => {
  const user = userEvent.setup();
  render(<CreateOrderPage />);

  await user.type(screen.getByLabelText(/nombre del destinatario/i), 'Camila Torres');
  await user.type(screen.getByLabelText(/teléfono del destinatario/i), '3105558877');
  await user.type(screen.getByLabelText(/^ciudad$/i), 'Manizales');
  await user.type(screen.getByLabelText(/^dirección$/i), 'Calle 10 # 20-30');
  await user.type(screen.getByLabelText(/peso/i), '2');
  await user.type(screen.getByLabelText(/^valor declarado \(cop\)$/i), '150000');
  await user.click(screen.getByRole('button', { name: /crear pedido simulado/i }));

  expect(screen.getByRole('status')).toHaveTextContent('Pedido simulado creado');
});
