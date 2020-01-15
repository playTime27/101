const readline = require('readline-sync');
const messages = require('./messages.json');

do {
  console.clear();
  startCalculator();
}
while (continueProgram());

function startCalculator() {
  let loanAmount = setLoanAmount(readInput(messages.loan.amount));
  let apr = setAPR(readInput(messages.loan.apr));
  let yearlyLoanDuration = setLoanDuration(readInput(messages.loan.duration));
  let monthlyLoanDuration = getMonthlyLoanDuration(yearlyLoanDuration);
  let monthlyPayment = getMonthlyPayment(loanAmount,monthlyLoanDuration,apr);
  prompt(`Provided your loan amount of ${loanAmount}, apr of ${apr}, and loan duration of ${yearlyLoanDuration} years.\n\n\t=>Your monthly payment will be $${monthlyPayment.toFixed(2)}`);
}

function continueProgram() {
  let input = readInput('Want to try with different rates? [ Enter yes, otherwise enter anything else ]');
  if (input.toLowerCase() === 'yes') {
    console.clear();
    return true;
  } else {
     return false;
  }
}

function getMonthlyPayment(loanAmount,monthlyLoanDuration,apr) {
  return Number(loanAmount) * (getMonthlyInterest(apr) /
(1 - Math.pow((1 + getMonthlyInterest(apr)),(-Number(monthlyLoanDuration)))));
}

function getMonthlyInterest(apr) {
  return Number(apr) / 12;
}

function getMonthlyLoanDuration(yearlyLoanDuration) {
  return Number(yearlyLoanDuration) * 12;
}

function readInput(message) {
  prompt(message);
  let response = readline.question();
  return response;
}

function invalidInput() {
  //console.clear();
  prompt(messages.invalid.error);
}

function setLoanAmount(response) {
  let minLoan = 1000;
  let maxLoan = 500000;
  if (response.trim() !== "" && Number(response) && response >= minLoan && response <= maxLoan) {
    return Number(response);
  } else {
      invalidInput();
      return setLoanAmount(readInput(messages.loan.amount));
  }
}

function setAPR(response) {
  let minApr = 0;
  let maxApr = 1;
    if (response.trim() !== "" && Number(response) && Number(response) >= minApr && Number(response) < maxApr) {
        return Number(response);
      } else {
          invalidInput();
          return setAPR(readInput(messages.loan.apr));
      }
}

function setLoanDuration(response) {
  let maxDuration = 30;
    if (response.trim() !== "" && Number(response) && Number.isInteger(Number(response)) && Number(response) <= maxDuration) {
        return Number(response);
      } else {
          invalidInput();
          return setLoanDuration(readInput(messages.loan.duration));
      }
}

function prompt(message) {
    console.log('\x1b[31m%s\x1b[32m%s\x1b[0m', messages.format.prompt, message);
    /*
      \x1b[32m code for green %s \x1b[31m character code for red %s
       \x1b[0m reset [ %s is argument ]
    */
}
