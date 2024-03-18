export class NationalInsurance {
  calculateMonthlyNationalInsurance = function (grossAnnualIncome) {
    const lowerThreshold = 12570;
    const lowerRate = 0.1;
    const upperThreshold = 50270;
    const upperRate = 0.2;

    if (grossAnnualIncome <= lowerThreshold) {
      return 0;
    }

    if (grossAnnualIncome <= upperThreshold)
      return +(((grossAnnualIncome - lowerThreshold) * lowerRate) / 12).toFixed(
        2
      );

    return +(
      ((upperThreshold - lowerThreshold) * lowerRate +
        (grossAnnualIncome - upperThreshold) * upperRate) /
      12
    ).toFixed(2);
  };
}
