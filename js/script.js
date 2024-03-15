'use strict';
const btnCalculate = document.querySelector('.btn-calculate');
const inputAnnualIncome = document.querySelector('.input-gross-income');
const pensionMonthlyContribution = document.querySelector(
  '.input-pension-contribution'
);
const monthlyGrossIncomeLabel = document.querySelector('.monthly-gross-income');

btnCalculate.addEventListener('click', function (event) {
  event.preventDefault();
  const annualIncome = inputAnnualIncome.value;
  const monthlyPension = pensionMonthlyContribution.value;
  const grossMonthlyIncome = annualIncome / 12;

  monthlyGrossIncomeLabel.textContent = `Your monthly gross income is: £${grossMonthlyIncome}`;
  const taxableIncome = grossMonthlyIncome - monthlyPension;
});
