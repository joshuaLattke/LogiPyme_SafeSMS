import { DemoProvider } from '../state/DemoContext';
import { MemoryRouter } from 'react-router-dom';
function render(ui) { return rtlRender(<DemoProvider><MemoryRouter>{ui}</MemoryRouter></DemoProvider>); }
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { CarriersPage } from './CarriersPage';

test('recalcula las cotizaciones cuando cambia el peso', async () => {
  const user = userEvent.setup();
  render(<CarriersPage />);

  expect(screen.getByText('12.400 COP')).toBeInTheDocument();
  const weight = screen.getByLabelText(/peso a cotizar/i);
  await user.clear(weight);
  await user.type(weight, '3');

  expect(screen.getByText('16.200 COP')).toBeInTheDocument();
});
