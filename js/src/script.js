import { NationalInsurance } from './nationalInsurance.js';
import { IncomeTax } from './incomeTax.js';

// DOM elements
const btnCalculate = document.querySelector('.btn-calculate');
const inputAnnualIncome = document.querySelector('.input-gross-income');
const pensionMonthlyContribution = document.querySelector(
  '.input-pension-contribution'
);
const monthlyGrossIncomeLabel = document.querySelector('.monthly-gross-income');
const monthlyNationalInsuranceLabel = document.querySelector(
  '.monthly-national-insurance'
);
const monthlyIncomeTaxLabel = document.querySelector('.monthly-income-tax');
const monthlyNetLabel = document.querySelector('.monthly-net-income');

const nationalInsurance = new NationalInsurance();
const incomeTax = new IncomeTax();

// Validations
const inputsArevalid = function () {
  if (isNaN(inputAnnualIncome.value) && isNaN(parseFloat(inputAnnualIncome))) {
    alert('Please enter a valid Annual Income');
    return false;
  }

  if (+inputAnnualIncome.value < 0) {
    alert('Please enter a valid Annual Income');
    return false;
  }

  if (isNaN(pensionMonthlyContribution.value)) {
    alert('Please enter a valid Monthly Pension Contribution');
    return false;
  }

  if (+pensionMonthlyContribution.value < 0) {
    alert('Please enter a valid Monthly Pension Contribution');
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

  monthlyGrossIncomeLabel.textContent = `Your monthly gross income is: £${grossMonthlyIncome}`;

  const taxableIncome = +(annualIncome - monthlyPension * 12).toFixed(2);

  const monthlyNationalInsurance = nationalInsurance
    .calculateMonthlyNationalInsurance(annualIncome)
    .toFixed(2);

  monthlyNationalInsuranceLabel.textContent = `Your monthly national insurance is: £${monthlyNationalInsurance}`;

  const monthlyIncomeTax = (
    incomeTax.calculateAnnualIncomeTax(taxableIncome) / 12
  ).toFixed(2);
  monthlyIncomeTaxLabel.textContent = `Your monthly income tax is: £${monthlyIncomeTax}`;

  monthlyNetLabel.textContent = `Your monthly net income is: £${(
    grossMonthlyIncome -
    monthlyNationalInsurance -
    monthlyIncomeTax
  ).toFixed(2)}`;
});
