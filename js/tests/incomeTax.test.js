import { calculateIncomeTax } from '../src/incomeTax.js';

test('calculateIncomeTax below threshold', () => {
  expect(calculateIncomeTax(12569)).toBe(0);
});

test('calculateIncomeTax on threshold returns 0', () => {
  expect(calculateIncomeTax(12570)).toBe(0);
});

test('calculateIncomeTax between lower and higher threshold', () => {
  expect(calculateIncomeTax(12571)).toBe(0.2);
});

test('calculateIncomeTax just below higher threshold', () => {
  expect(calculateIncomeTax(50269)).toBe(7539.8);
});

test('calculateIncomeTax on higher threshold', () => {
  expect(calculateIncomeTax(50271)).toBe(7540.4);
});
