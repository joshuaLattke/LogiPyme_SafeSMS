import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { App, AppRoutes } from './App';

test('muestra la pantalla de acceso de LogiPyme', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /tu operación logística, clara y bajo control/i }),
  ).toBeInTheDocument();
});

test('muestra la navegación y la marca en el dashboard', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <AppRoutes />
    </MemoryRouter>,
  );

  expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'LogiPyme + SafeSMS' })).toHaveAttribute(
    'src',
    '/assets/logipyme-safesms-diapositivas.png',
  );
  expect(screen.getByRole('heading', { name: /resumen de tu operación/i })).toBeInTheDocument();
});

test('ofrece volver al inicio desde una ruta desconocida', () => {
  render(
    <MemoryRouter initialEntries={['/ruta-inexistente']}>
      <AppRoutes />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: /página no encontrada/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /volver al acceso/i })).toHaveAttribute('href', '/');
});
