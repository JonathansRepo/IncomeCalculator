const personalAllowance = 12570;
const basicRate = 0.2;
const higherRateThresholdStart = 50271;
const higherRate = 0.4;
const additionalThresholdStart = 125141;
const additionalRate = 0.45;
const personalAllowanceAdjustmentThreshold = 100000;

// There are three tax rates:
// Basic = 20%
// Higher - 40%
// Additional = 45%

// What type of tax payer is this?
const isBasicRate = function (grossAnnualIncome) {
  return (
    grossAnnualIncome > personalAllowance &&
    grossAnnualIncome < higherRateThresholdStart
  );
};

const isHigherRate = function (grossAnnualIncome) {
  return (
    grossAnnualIncome >= higherRateThresholdStart &&
    grossAnnualIncome < additionalThresholdStart
  );
};

const isAdditionalRate = function (grossAnnualIncome) {
  return grossAnnualIncome >= additionalThresholdStart;
};

//Tax calculations
const calculateAbovePersonalBelowAdditional = function (
  grossAmount,
  adjustedAllowance
) {
  return (grossAmount - adjustedAllowance) * basicRate;
};

const calculateAboveHigherBelowAdditionalAdjusted = function (
  grossAnnualIncome
) {
  //Need to add a modification to the lower threshold
  //When income is over £100K, for every £2 the personal allowance is reduced
  // by £1

  let adjustedPersonalAllowance = personalAllowance;
  let adjustedHigherRateStart = higherRateThresholdStart;

  if (grossAnnualIncome > personalAllowanceAdjustmentThreshold) {
    // Remember for every £2 the personal allowance is reduced by £1
    const amountOver100KHalved =
      (grossAnnualIncome - personalAllowanceAdjustmentThreshold) / 2;
    adjustedPersonalAllowance -= amountOver100KHalved;

    adjustedHigherRateStart -= amountOver100KHalved;
  }

  const lowerRateTax = calculateAbovePersonalBelowAdditional(
    adjustedHigherRateStart,
    adjustedPersonalAllowance < 0 ? 0 : adjustedPersonalAllowance
  );

  const amountOverHigherRate =
    grossAnnualIncome - (adjustedHigherRateStart - 1);
  const higherRateTax = amountOverHigherRate * higherRate;

  return higherRateTax + lowerRateTax;
};

const calculateAboveAdditionalThreshold = function (grossAnnualIncome) {
  const amountOverAdditionalThreshold =
    grossAnnualIncome - (additionalThresholdStart - 1); // 150000
  const taxUnderAdditionalThreshold =
    calculateAboveHigherBelowAdditionalAdjusted(additionalThresholdStart - 1);

  const taxOverAdditionalThreshold =
    amountOverAdditionalThreshold * additionalRate +
    taxUnderAdditionalThreshold;

  return taxOverAdditionalThreshold;
};

//Main function
const calculateAnnualIncomeTax = function (grossAnnualIncome) {
  console.log(grossAnnualIncome);
  //Shouldn't pay any tax
  if (grossAnnualIncome <= personalAllowance) return 0;

  //Above 12571 aand below 50271
  if (isBasicRate(grossAnnualIncome))
    return calculateAbovePersonalBelowAdditional(
      grossAnnualIncome,
      personalAllowance
    );

  //Above 150000
  if (isAdditionalRate(grossAnnualIncome)) {
    return calculateAboveAdditionalThreshold(grossAnnualIncome);
  }

  //above 50271 and below 150000
  if (isHigherRate(grossAnnualIncome)) {
    return calculateAboveHigherBelowAdditionalAdjusted(grossAnnualIncome);
  }
};

export { calculateAnnualIncomeTax };
