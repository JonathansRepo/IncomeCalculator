import { NationalInsurance } from '../src/nationalInsurance.js';

const nationalInsurance = new NationalInsurance();

test('calculateMonthlyNationalInsurance below threshold', () => {
  expect(nationalInsurance.calculateMonthlyNationalInsurance(12569)).toBe(0);
});

test('calculateMonthlyNationalInsurance below upper threshold', () => {
  expect(nationalInsurance.calculateMonthlyNationalInsurance(25000)).toBe(
    103.58
  );
});

test('calculateMonthlyNationalInsurance above upper threshold', () => {
  expect(nationalInsurance.calculateMonthlyNationalInsurance(80000)).toBe(
    809.67
  );
});
