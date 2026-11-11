import { DemoProvider } from '../state/DemoContext';
function render(ui) { return rtlRender(<DemoProvider>{ui}</DemoProvider>); }
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AccessPage } from './AccessPage';

function renderAccess() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<AccessPage />} />
        <Route path="/dashboard" element={<h1>Dashboard de prueba</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

test('rechaza un ingreso sin correo ni contraseña', async () => {
  const user = userEvent.setup();
  renderAccess();

  await user.click(screen.getAllByRole('button', { name: /^ingresar$/i }).at(-1));

  expect(screen.getByRole('alert')).toHaveTextContent('Correo y contraseña son obligatorios');
});

test('abre el dashboard después de completar el ingreso simulado', async () => {
  const user = userEvent.setup();
  renderAccess();

  await user.type(screen.getByLabelText(/correo electrónico/i), 'carolina@logipyme.co');
  await user.type(screen.getByLabelText(/^contraseña$/i), 'demo1234');
  await user.click(screen.getAllByRole('button', { name: /^ingresar$/i }).at(-1));

  expect(await screen.findByRole('heading', { name: 'Dashboard de prueba' })).toBeInTheDocument();
});

test('cambia al formulario para crear una empresa', async () => {
  const user = userEvent.setup();
  renderAccess();

  await user.click(screen.getByRole('button', { name: /crear empresa/i }));

  expect(screen.getByLabelText(/nombre de la empresa/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/nit/i)).toBeInTheDocument();
});
