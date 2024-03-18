export class IncomeTax {
  #personalAllowance = 12570;
  #basicRate = 0.2;
  #higherRateThresholdStart = 50271;
  #higherRate = 0.4;
  #additionalThresholdStart = 125141;
  #additionalRate = 0.45;
  #personalAllowanceAdjustmentThreshold = 100000;

  // There are three tax rates:
  // Basic = 20%
  // Higher - 40%
  // Additional = 45%

  // What type of tax payer is this?
  #isBasicRate = function (grossAnnualIncome) {
    return (
      grossAnnualIncome > this.#personalAllowance &&
      grossAnnualIncome < this.#higherRateThresholdStart
    );
  };

  #isHigherRate = function (grossAnnualIncome) {
    return (
      grossAnnualIncome >= this.#higherRateThresholdStart &&
      grossAnnualIncome < this.#additionalThresholdStart
    );
  };

  #isAdditionalRate = function (grossAnnualIncome) {
    return grossAnnualIncome >= this.#additionalThresholdStart;
  };

  //Tax calculations
  #calculateAbovePersonalBelowAdditional = function (
    grossAmount,
    adjustedAllowance
  ) {
    return (grossAmount - adjustedAllowance) * this.#basicRate;
  };

  #calculateAboveHigherBelowAdditionalAdjusted = function (grossAnnualIncome) {
    //Need to add a modification to the lower threshold
    //When income is over £100K, for every £2 the personal allowance is reduced
    // by £1

    let adjustedPersonalAllowance = this.#personalAllowance;
    let adjustedHigherRateStart = this.#higherRateThresholdStart;

    if (grossAnnualIncome > this.#personalAllowanceAdjustmentThreshold) {
      // Remember for every £2 the personal allowance is reduced by £1
      const amountOver100KHalved =
        (grossAnnualIncome - this.#personalAllowanceAdjustmentThreshold) / 2;
      adjustedPersonalAllowance -= amountOver100KHalved;

      adjustedHigherRateStart -= amountOver100KHalved;
    }

    const lowerRateTax = this.#calculateAbovePersonalBelowAdditional(
      adjustedHigherRateStart,
      adjustedPersonalAllowance < 0 ? 0 : adjustedPersonalAllowance
    );

    const amountOverHigherRate =
      grossAnnualIncome - (adjustedHigherRateStart - 1);
    const higherRateTax = amountOverHigherRate * this.#higherRate;

    return higherRateTax + lowerRateTax;
  };

  #calculateAboveAdditionalThreshold = function (grossAnnualIncome) {
    const amountOverAdditionalThreshold =
      grossAnnualIncome - (this.#additionalThresholdStart - 1);
    const taxUnderAdditionalThreshold =
      this.#calculateAboveHigherBelowAdditionalAdjusted(
        this.#additionalThresholdStart - 1
      );

    const taxOverAdditionalThreshold =
      amountOverAdditionalThreshold * this.#additionalRate +
      taxUnderAdditionalThreshold;

    return taxOverAdditionalThreshold;
  };

  //Main function
  calculateAnnualIncomeTax = function (grossAnnualIncome) {
    //Shouldn't pay any tax
    if (grossAnnualIncome <= this.#personalAllowance) return 0;

    //Above 12571 aand below 50271
    if (this.#isBasicRate(grossAnnualIncome))
      return this.#calculateAbovePersonalBelowAdditional(
        grossAnnualIncome,
        this.#personalAllowance
      );

    //Above 150000
    if (this.#isAdditionalRate(grossAnnualIncome)) {
      return this.#calculateAboveAdditionalThreshold(grossAnnualIncome);
    }

    //above 50271 and below 150000
    if (this.#isHigherRate(grossAnnualIncome)) {
      return this.#calculateAboveHigherBelowAdditionalAdjusted(
        grossAnnualIncome
      );
    }
  };
}
