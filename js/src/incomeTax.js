const personalAllowance = 12570;
const basicRate = 0.2;
const higherRateThresholdStart = 50271;
const higherRate = 0.4;
const additionalThresholdStart = 125141;
const additionalRate = 0.45;
const personalAllowancwAdjustmentThreshold = 100000;

const calculateIncomeTax = function (grossAnnualIncome) {
  if (grossAnnualIncome <= personalAllowance) return 0;

  if (
    grossAnnualIncome > personalAllowance &&
    grossAnnualIncome < higherRateThresholdStart
  ) {
    return (grossAnnualIncome - personalAllowance) * basicRate;
  }

  if (grossAnnualIncome >= higherRateThresholdStart) {
    const amountOverHigherRate =
      grossAnnualIncome - (higherRateThresholdStart - 1);
    const higherRateTax = amountOverHigherRate * higherRate;
    const normalRateTx =
      (higherRateThresholdStart - 1 - personalAllowance) * basicRate;
    return higherRateTax + normalRateTx;
  }

  return grossAnnualIncome;
};

export { calculateIncomeTax };
