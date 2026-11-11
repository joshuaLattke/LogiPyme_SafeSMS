import { expect, test } from 'vitest';
import { analyzeSms } from './sms';

test('explica pago y urgencia sin convertir una URL en una garantía de fraude', () => {
  const result = analyzeSms('Su paquete está retenido. Pague $18.900 hoy antes de las 6. https://pagos.example/liberar?token=privado');
  expect(result.level).toBe('high');
  expect(result.signals.map(s => s.code)).toEqual(expect.arrayContaining(['payment', 'urgency', 'link']));
  expect(result.domains).toEqual(['pagos.example']);
  expect(JSON.stringify(result)).not.toContain('token=privado');
  expect(JSON.stringify(result)).not.toContain('Su paquete');
});

test('no declara seguro un mensaje sin señales', () => {
  expect(analyzeSms('Buenas tardes').level).toBe('unknown');
});

test('advierte incertidumbre ante enlaces acortados y mayúsculas', () => {
  const result = analyzeSms('Su envío: HTTPS://BIT.LY/demo.');
  expect(result.domains).toEqual(['bit.ly']);
  expect(result.shortened).toBe(true);
  expect(result.level).toBe('review');
});

test('reconoce petición de datos sensibles', () => {
  expect(analyzeSms('Envíe su contraseña para recibir el paquete').signals.map(s => s.code)).toContain('sensitive');
});

test.each(['Envía los datos de tarjeta', 'Envía las contraseñas', 'Confirma tus claves'])('reconoce datos sensibles en la frase %s', text => {
  expect(analyzeSms(text).level).toBe('high');
  expect(analyzeSms(text).signals.map(s => s.code)).toContain('sensitive');
});

test('rechaza un texto vacío o demasiado extenso', () => {
  expect(() => analyzeSms('  ')).toThrow();
  expect(() => analyzeSms('a'.repeat(2001))).toThrow();
});
