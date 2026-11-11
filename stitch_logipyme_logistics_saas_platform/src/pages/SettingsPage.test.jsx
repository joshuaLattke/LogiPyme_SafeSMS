import { DemoProvider } from '../state/DemoContext';
import { MemoryRouter } from 'react-router-dom';
function render(ui) { return rtlRender(<DemoProvider><MemoryRouter>{ui}</MemoryRouter></DemoProvider>); }
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { SettingsPage } from './SettingsPage';

test('valida y confirma una invitación simulada', async () => {
  const user = userEvent.setup();
  render(<SettingsPage />);

  await user.click(screen.getByRole('button', { name: /invitar colaborador/i }));
  await user.click(screen.getByRole('button', { name: /enviar invitación/i }));
  expect(screen.getByRole('alert')).toHaveTextContent('Ingresa un correo válido');

  await user.type(screen.getByLabelText(/correo del colaborador/i), 'equipo@logipyme.co');
  await user.click(screen.getByRole('button', { name: /enviar invitación/i }));
  expect(screen.getByRole('status')).toHaveTextContent('Invitación simulada enviada');
});
