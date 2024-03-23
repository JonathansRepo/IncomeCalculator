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

const formatMoney = function (value, locale, currency) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

//Event listening
btnCalculate.addEventListener('click', function (event) {
  event.preventDefault();

  if (!inputsArevalid()) return;

  const annualIncome = +inputAnnualIncome.value;
  const monthlyPension = +pensionMonthlyContribution.value;
  const grossMonthlyIncome = +(annualIncome / 12)
    .toFixed(0)
    .toLocaleString('en-UK');

  const taxableIncome = +(annualIncome - monthlyPension * 12).toFixed(0);

  monthlyGrossIncomeResult.textContent = `${formatMoney(grossMonthlyIncome)}`;

  const monthlyNationalInsurance = nationalInsurance
    .calculateMonthlyNationalInsurance(annualIncome)
    .toFixed(0);

  monthlyNIResult.textContent = `${formatMoney(monthlyNationalInsurance)}`;

  const monthlyIncomeTax = (
    incomeTax.calculateAnnualIncomeTax(taxableIncome) / 12
  ).toFixed(0);

  monthlyIncomeTaxResult.textContent = `${formatMoney(monthlyIncomeTax)}`;

  monthlyNetResult.textContent = `${formatMoney(
    (grossMonthlyIncome - monthlyNationalInsurance - monthlyIncomeTax).toFixed(
      0
    )
  )}`;

  resultsContainer.classList.remove('hidden');
});
