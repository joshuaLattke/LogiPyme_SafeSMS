import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { AppRoutes } from './App';

test('SafeSMS muestra señales y el mismo pedido sin crear enlaces sospechosos', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/safesms/revisar?pedido=LP-1048']}><AppRoutes /></MemoryRouter>);
  await user.type(screen.getByLabelText(/contenido del sms/i), 'Pague hoy para liberar el paquete: https://pagos.example/token-privado');
  await user.click(screen.getByRole('button', { name: /^analizar mensaje$/i }));
  expect(await screen.findByRole('heading', { name: /varias señales de alerta/i })).toBeInTheDocument();
  expect(screen.getByText('Solicitud de pago')).toBeInTheDocument();
  expect(screen.getByText('Presión para actuar')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /volver a consultar mi pedido/i })).toHaveAttribute('href', '/consulta/LP-1048');
  expect(document.querySelector('a[href*="pagos.example"]')).toBeNull();
  await user.click(screen.getByRole('button', { name: /guardar resumen/i }));
  await user.click(screen.getByRole('link', { name: /^historial$/i }));
  expect(screen.getByText(/REV-1/)).toBeInTheDocument();
  expect(document.body.textContent).not.toContain('token-privado');
});

test('la consulta del destinatario omite información privada y enlaza con SafeSMS', async () => {
  render(<MemoryRouter initialEntries={['/consulta/LP-1048']}><AppRoutes /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: /pedido lp-1048/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /revisar un sms/i })).toHaveAttribute('href', '/safesms/revisar?pedido=LP-1048');
  expect(document.body.textContent).not.toContain('312 458 9021');
  expect(document.body.textContent).not.toContain('Cra. 43A');
});

test('crear un pedido lo incorpora al listado y al detalle de la sesión', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/pedidos/nuevo']}><AppRoutes /></MemoryRouter>);
  for (const [label, value] of [[/nombre del destinatario/i, 'Cliente Integrado'], [/teléfono del destinatario/i, '3105558877'], [/^ciudad$/i, 'Cali'], [/^dirección$/i, 'Calle 10'], [/peso \(kg\)/i, '2'], [/^valor declarado/i, '90000']]) await user.type(screen.getByLabelText(label), value);
  await user.click(screen.getByRole('button', { name: /crear pedido simulado/i }));
  const success = screen.getByRole('status');
  await user.click(within(success).getByRole('link', { name: /ver pedido/i }));
  expect(screen.getByRole('heading', { name: /pedido lp-1100/i })).toBeInTheDocument();
  expect(screen.getByText('Cliente Integrado')).toBeInTheDocument();
});

test('un resultado sin revisión previa permite volver al formulario', () => {
  render(<MemoryRouter initialEntries={['/safesms/resultado']}><AppRoutes /></MemoryRouter>);
  expect(screen.getByRole('link', { name: /revisar un mensaje/i })).toHaveAttribute('href', '/safesms/revisar');
});

test('el transportador cambia un pedido y la consulta refleja el nuevo estado', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/dashboard']}><AppRoutes /></MemoryRouter>);
  await user.selectOptions(screen.getByLabelText(/perfil de demostración/i), 'courier-servientrega');
  const card = screen.getByRole('article', { name: /entrega lp-1048/i });
  await user.selectOptions(within(card).getByLabelText(/nuevo estado/i), 'Recogido');
  await user.click(within(card).getByRole('button', { name: /registrar estado/i }));
  await user.click(within(card).getByRole('link', { name: /consulta del destinatario/i }));
  expect(screen.getByRole('heading', { name: /^recogido$/i })).toBeInTheDocument();
});

test('cancelar el análisis vuelve a un formulario sin el SMS anterior', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/safesms/revisar']}><AppRoutes /></MemoryRouter>);
  await user.type(screen.getByLabelText(/contenido del sms/i), 'Pague hoy un cobro urgente');
  await user.click(screen.getByRole('button', { name: /^analizar mensaje$/i }));
  await user.click(screen.getByRole('button', { name: /cancelar análisis/i }));
  expect(screen.getByLabelText(/contenido del sms/i)).toHaveValue('');
});

test('el perfil transportador recibe únicamente sus pedidos asignados', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/dashboard']}><AppRoutes /></MemoryRouter>);
  await user.selectOptions(screen.getByLabelText(/perfil de demostración/i), 'courier-servientrega');
  expect(screen.getByRole('article', { name: /entrega lp-1048/i })).toBeInTheDocument();
  expect(screen.queryByRole('article', { name: /entrega lp-1050/i })).not.toBeInTheDocument();
});

test('permite adjuntar una imagen local y mostrarla después de registrar la entrega', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/dashboard']}><AppRoutes /></MemoryRouter>);
  await user.selectOptions(screen.getByLabelText(/perfil de demostración/i), 'courier-servientrega');
  const card = screen.getByRole('article', { name: /entrega lp-1048/i });
  await user.selectOptions(within(card).getByLabelText(/nuevo estado/i), 'Entregado');
  await user.upload(within(card).getByLabelText(/evidencia del paquete/i), new File(['imagen de prueba'], 'paquete.png', { type: 'image/png' }));
  expect(await within(card).findByAltText(/previsualización de evidencia/i)).toBeInTheDocument();
  await user.click(within(card).getByRole('button', { name: /registrar estado/i }));
  await user.click(within(card).getByRole('link', { name: /consulta del destinatario/i }));
  await user.click(screen.getByRole('button', { name: /ver evidencia/i }));
  expect(screen.getByRole('dialog', { name: /evidencia de entrega/i })).toBeInTheDocument();
});
