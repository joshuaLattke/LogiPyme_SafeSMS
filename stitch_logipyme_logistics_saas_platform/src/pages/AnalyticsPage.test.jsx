import { DemoProvider } from '../state/DemoContext';
function render(ui) { return rtlRender(<DemoProvider>{ui}</DemoProvider>); }
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { AnalyticsPage } from './AnalyticsPage';

test('actualiza el periodo visible de los indicadores', async () => {
  const user = userEvent.setup();
  render(<AnalyticsPage />);

  await user.click(screen.getByRole('button', { name: /últimos 30 días/i }));

  expect(screen.getByRole('heading', { name: /rendimiento: últimos 30 días/i })).toBeInTheDocument();
});
