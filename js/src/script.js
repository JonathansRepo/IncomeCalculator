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

  // 1. Check inputs
  if (!inputsArevalid()) return;

  // 2. Calculate totals
  const totals = calculateTotals();

  // 3. Display results
  displayResults(...totals);
});

const calculateTotals = function () {
  const annualIncome = +inputAnnualIncome.value;
  const monthlyPension = +pensionMonthlyContribution.value;

  const grossMonthlyIncome = +(annualIncome / 12);

  const taxableAnnualIncome = +(annualIncome - monthlyPension * 12);

  const monthlyNationalInsurance =
    calculateMonthlyNationalInsurance(annualIncome);

  const monthlyIncomeTax = calculateMonthlyIncomeTax(taxableAnnualIncome);

  return [
    grossMonthlyIncome,
    monthlyNationalInsurance,
    monthlyIncomeTax,
    monthlyPension,
  ];
};

const displayResults = function (
  grossMonthlyIncome,
  monthlyNI,
  monthlyTax,
  monthlyPension
) {
  monthlyGrossIncomeResult.textContent = `${formatMoney(grossMonthlyIncome)}`;
  monthlyNIResult.textContent = `${formatMoney(monthlyNI)}`;
  monthlyIncomeTaxResult.textContent = `${formatMoney(monthlyTax)}`;
  monthlyNetResult.textContent = `${formatMoney(
    grossMonthlyIncome - monthlyNI - monthlyTax - monthlyPension
  )}`;
  resultsContainer.classList.remove('hidden');
};

const calculateMonthlyIncomeTax = function (taxableIncome) {
  return incomeTax.calculateAnnualIncomeTax(taxableIncome) / 12;
};

const calculateMonthlyNationalInsurance = function (annualIncome) {
  return nationalInsurance.calculateMonthlyNationalInsurance(annualIncome);
};
