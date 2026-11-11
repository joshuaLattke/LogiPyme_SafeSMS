import { DemoProvider } from '../state/DemoContext';
function render(ui) { return rtlRender(<DemoProvider>{ui}</DemoProvider>); }
import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrackingPage } from './TrackingPage';

test('filtra la operación por novedades', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><TrackingPage /></MemoryRouter>);

  await user.click(screen.getByRole('button', { name: /^novedad$/i }));

  expect(screen.getAllByText('Mónica Díaz')).toHaveLength(2);
  expect(screen.queryByText('Laura Gómez')).not.toBeInTheDocument();
});

test('abre y cierra con Escape la prueba de entrega', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><TrackingPage /></MemoryRouter>);

  await user.click(screen.getByRole('button', { name: /^seleccionar pedido lp-1049$/i }));
  await user.click(screen.getByRole('button', { name: /ver prueba de entrega/i }));
  expect(screen.getByRole('dialog', { name: /prueba de entrega/i })).toBeInTheDocument();

  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
