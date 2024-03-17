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
  expect(calculateIncomeTax(50271)).toBe(7540.6);
});

test('calculateIncomeTax 100,000', () => {
  expect(calculateIncomeTax(100000)).toBe(27432.2);
});

test('calculateIncomeTax 110,000', () => {
  expect(calculateIncomeTax(110000)).toBe(33432.2);
});

test('calculateIncomeTax just over additioanl threshold', () => {
  expect(calculateIncomeTax(125140)).toBe(42516.2);
});

test('calculateIncomeTax way over additional threshold', () => {
  expect(calculateIncomeTax(250000)).toBe(98703.2);
});
