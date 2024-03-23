import { personalAllowance } from './config.js';
import { basicRate } from './config.js';
import { higherRateThresholdStart } from './config.js';
import { higherRate } from './config.js';
import { additionalThresholdStart } from './config.js';
import { additionalRate } from './config.js';
import { personalAllowanceAdjustmentThreshold } from './config.js';

export class IncomeTax {
  // There are three tax rates:
  // Basic = 20%
  // Higher - 40%
  // Additional = 45%

  // What type of tax payer is this?
  #isBasicRate = function (grossAnnualIncome) {
    return (
      grossAnnualIncome > personalAllowance &&
      grossAnnualIncome < higherRateThresholdStart
    );
  };

  #isHigherRate = function (grossAnnualIncome) {
    return (
      grossAnnualIncome >= higherRateThresholdStart &&
      grossAnnualIncome < additionalThresholdStart
    );
  };

  #isAdditionalRate = function (grossAnnualIncome) {
    return grossAnnualIncome >= additionalThresholdStart;
  };

  //Tax calculations
  #calculateAbovePersonalBelowAdditional = function (
    grossAmount,
    adjustedAllowance
  ) {
    return (grossAmount - adjustedAllowance) * basicRate;
  };

  #calculateAboveHigherBelowAdditionalAdjusted = function (grossAnnualIncome) {
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

    const lowerRateTax = this.#calculateAbovePersonalBelowAdditional(
      adjustedHigherRateStart,
      adjustedPersonalAllowance < 0 ? 0 : adjustedPersonalAllowance
    );

    const amountOverHigherRate =
      grossAnnualIncome - (adjustedHigherRateStart - 1);
    const higherRateTax = amountOverHigherRate * higherRate;

    return higherRateTax + lowerRateTax;
  };

  #calculateAboveAdditionalThreshold = function (grossAnnualIncome) {
    const amountOverAdditionalThreshold =
      grossAnnualIncome - (additionalThresholdStart - 1);
    const taxUnderAdditionalThreshold =
      this.#calculateAboveHigherBelowAdditionalAdjusted(
        additionalThresholdStart - 1
      );

    const taxOverAdditionalThreshold =
      amountOverAdditionalThreshold * additionalRate +
      taxUnderAdditionalThreshold;

    return taxOverAdditionalThreshold;
  };

  //Main function
  calculateAnnualIncomeTax = function (grossAnnualIncome) {
    //Shouldn't pay any tax
    if (grossAnnualIncome <= personalAllowance) return 0;

    //Above 12571 aand below 50271
    if (this.#isBasicRate(grossAnnualIncome))
      return this.#calculateAbovePersonalBelowAdditional(
        grossAnnualIncome,
        personalAllowance
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
