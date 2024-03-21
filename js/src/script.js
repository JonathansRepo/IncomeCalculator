import { NationalInsurance } from './nationalInsurance.js';
import { IncomeTax } from './incomeTax.js';

// DOM elements
// Input form
const inputAnnualIncome = document.querySelector('.input-gross-income');
const pensionMonthlyContribution = document.querySelector(
  '.input-pension-contribution'
);
const btnCalculate = document.querySelector('.btn-calculate');

// Results container
const resultsContainer = document.querySelector('.results-container');
const monthlyGrossIncomeResult = document.querySelector(
  '.monthly-gross-income-result'
);
const monthlyIncomeTaxResult = document.querySelector(
  '.monthly-income-tax-result'
);
const monthlyNIResult = document.querySelector('.monthly-NI-result');
const monthlyNetResult = document.querySelector('.monthly-net-result');

// Instances
const nationalInsurance = new NationalInsurance();
const incomeTax = new IncomeTax();

// Validations
const inputsArevalid = function () {
  if (isNaN(inputAnnualIncome.value) && isNaN(parseFloat(inputAnnualIncome))) {
    alert('Please enter a valid Annual Income');
    return false;
  }

  if (+inputAnnualIncome.value <= 0) {
    alert('Annual income must be a number greater than 0');
    return false;
  }

  if (isNaN(pensionMonthlyContribution.value)) {
    alert('Please enter a valid Monthly Pension Contribution');
    return false;
  }

  if (+pensionMonthlyContribution.value < 0) {
    alert('Monthly Pension Contribution must not be less than 0');
    return false;
  }

  return true;
};

//Event listening
btnCalculate.addEventListener('click', function (event) {
  event.preventDefault();

  if (!inputsArevalid()) return;

  const annualIncome = +inputAnnualIncome.value;
  const monthlyPension = +pensionMonthlyContribution.value;
  const grossMonthlyIncome = +(annualIncome / 12).toFixed(2);

  const taxableIncome = +(annualIncome - monthlyPension * 12).toFixed(2);

  const monthlyNationalInsurance = nationalInsurance
    .calculateMonthlyNationalInsurance(annualIncome)
    .toFixed(2);

  monthlyNIResult.textContent = `£${monthlyNationalInsurance}`;

  monthlyGrossIncomeResult.textContent = `£${grossMonthlyIncome}`;

  const monthlyIncomeTax = (
    incomeTax.calculateAnnualIncomeTax(taxableIncome) / 12
  ).toFixed(2);

  monthlyIncomeTaxResult.textContent = `£${monthlyIncomeTax}`;

  monthlyNetResult.textContent = `£${(
    grossMonthlyIncome -
    monthlyNationalInsurance -
    monthlyIncomeTax
  ).toFixed(0)}`;

  resultsContainer.classList.remove('hidden');
});
