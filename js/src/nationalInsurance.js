import { lowerNIThreshold } from './config.js';
import { lowerNIRate } from './config.js';
import { upperNIThreshold } from './config.js';
import { upperNIRate } from './config.js';

export class NationalInsurance {
  calculateMonthlyNationalInsurance = function (grossAnnualIncome) {
    if (grossAnnualIncome <= lowerNIThreshold) {
      return 0;
    }

    if (grossAnnualIncome <= upperNIThreshold)
      return +(
        ((grossAnnualIncome - lowerNIThreshold) * lowerNIRate) /
        12
      ).toFixed(2);

    return +(
      ((upperNIThreshold - lowerNIThreshold) * lowerNIRate +
        (grossAnnualIncome - upperNIThreshold) * upperNIRate) /
      12
    ).toFixed(2);
  };
}
