'use strict';
const btnCalculate = document.querySelector('.btn-calculate');
const inputIncome = document.querySelector('.input-gross-income');
const pensionContribution = document.querySelector(
  '.input-pension-contribution'
);

console.log(pensionContribution);

btnCalculate.addEventListener('click', function (event) {
  event.preventDefault();
  const income = inputIncome.value;
  console.log(income);
  const pension = pensionContribution.value;
  console.log(pension);
});
