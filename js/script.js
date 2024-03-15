import { calculateMonthlyNationalInsurance } from './nationalInsurance.js';

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

  const taxableIncome = +(grossMonthlyIncome - monthlyPension).toFixed(2);

  const monthlyNationalInsurance =
    calculateMonthlyNationalInsurance(annualIncome).toFixed(2);

  monthlyNationalInsuranceLabel.textContent = `Your monthly national insurance is: £${monthlyNationalInsurance}`;
});
