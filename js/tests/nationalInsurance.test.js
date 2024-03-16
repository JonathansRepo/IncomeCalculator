import { calculateMonthlyNationalInsurance } from '../src/nationalInsurance.js';

test('calculateMonthlyNationalInsurance below threshold', () => {
  expect(calculateMonthlyNationalInsurance(12569)).toBe(0);
});

test('calculateMonthlyNationalInsurance below upper threshold', () => {
  expect(calculateMonthlyNationalInsurance(25000)).toBe(103.58);
});

test('calculateMonthlyNationalInsurance above upper threshold', () => {
  expect(calculateMonthlyNationalInsurance(80000)).toBe(809.67);
});
