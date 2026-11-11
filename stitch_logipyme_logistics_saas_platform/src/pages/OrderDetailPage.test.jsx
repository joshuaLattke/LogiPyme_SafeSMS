import { DemoProvider } from '../state/DemoContext';
function render(ui) { return rtlRender(<DemoProvider>{ui}</DemoProvider>); }
import { render as rtlRender, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { OrderDetailPage } from './OrderDetailPage';

function renderDetail(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path="/pedidos/:orderId" element={<OrderDetailPage />} /></Routes>
    </MemoryRouter>,
  );
}

test('muestra el destinatario y la guía del pedido solicitado', () => {
  renderDetail('/pedidos/LP-1048');

  expect(screen.getByRole('heading', { name: /pedido lp-1048/i })).toBeInTheDocument();
  expect(screen.getByText('Laura Gómez')).toBeInTheDocument();
  expect(screen.getByText('7729182319')).toBeInTheDocument();
});

test('explica cuando el pedido no existe', () => {
  renderDetail('/pedidos/desconocido');

  expect(screen.getByRole('heading', { name: /pedido no encontrado/i })).toBeInTheDocument();
});
