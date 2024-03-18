import { lowerNIThreshold } from './config';
import { lowerNIRate } from './config';
import { upperNIThreshold } from './config';
import { upperNIRate } from './config';

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
