import { IncomeTax } from '../src/incomeTax.js';

const incomeTax = new IncomeTax();

test('calculateIncomeTax below threshold', () => {
  expect(incomeTax.calculateAnnualIncomeTax(12569)).toBe(0);
});

test('calculateIncomeTax on threshold returns 0', () => {
  expect(incomeTax.calculateAnnualIncomeTax(12570)).toBe(0);
});

test('calculateIncomeTax between lower and higher threshold', () => {
  expect(incomeTax.calculateAnnualIncomeTax(12571)).toBe(0.2);
});

test('calculateIncomeTax just below higher threshold', () => {
  expect(incomeTax.calculateAnnualIncomeTax(50269)).toBe(7539.8);
});

test('calculateIncomeTax on higher threshold', () => {
  expect(incomeTax.calculateAnnualIncomeTax(50271)).toBe(7540.6);
});

test('calculateIncomeTax 100,000', () => {
  expect(incomeTax.calculateAnnualIncomeTax(100000)).toBe(27432.2);
});

test('calculateIncomeTax 110,000', () => {
  expect(incomeTax.calculateAnnualIncomeTax(110000)).toBe(33432.2);
});

test('calculateIncomeTax just over additioanl threshold', () => {
  expect(incomeTax.calculateAnnualIncomeTax(125140)).toBe(42516.2);
});

test('calculateIncomeTax way over additional threshold', () => {
  expect(incomeTax.calculateAnnualIncomeTax(250000)).toBe(98703.2);
});
