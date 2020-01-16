const readline = require('readline-sync');
const messages = require('./messages.json');

do {
  console.clear();
  startCalculator();
}
while (continueProgram());

function startCalculator() {
  let loanAmount = getLoanAmount();
  let apr = getAprAmount();
  let yearlyLoanDuration = getYearlyLoanDuration();
  let monthlyLoanDuration = getMonthlyLoanDuration(yearlyLoanDuration);
  let monthlyPayment = getMonthlyPayment(loanAmount,monthlyLoanDuration,apr);
  prompt(messages.test);
}

function continueProgram() {
  let input = readInput(messages.promptContinue);
  if (input.toLowerCase() === 'yes') {
    console.clear();
    return true;
  } else {
     return false;
  }
}

function getLoanAmount() {
  return setLoanAmount(readInput(messages.loan.amount));
}

function getAprAmount() {
  return setAPR(readInput(messages.loan.apr));
}

function getYearlyLoanDuration() {
  return setLoanDuration(readInput(messages.loan.duration));
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
  if (validLoanAmount(response)) {
    return Number(response);
  } else {
      invalidInput();
      return setLoanAmount(readInput(messages.loan.amount));
  }
}

function validLoanAmount(response) {
  let minLoan = 1000;
  let maxLoan = 500000;
  return response.trim() !== "" && Number(response) && response >= minLoan && response <= maxLoan;
}

function setAPR(response) {
    if (validAprValue(response)) {
        return Number(response);
      } else {
          invalidInput();
          return setAPR(readInput(messages.loan.apr));
      }
}

function validAprValue(response) {
  let minApr = 0;
  let maxApr = 1;
  return response.trim() !== "" && Number(response) && Number(response) >= minApr && Number(response) < maxApr;
}

function setLoanDuration(response) {
    if (validDurationValue(response)) {
        return Number(response);
      } else {
          invalidInput();
          return setLoanDuration(readInput(messages.loan.duration));
      }
}

function validDurationValue() {
  let maxDuration = 30;
  return response.trim() !== "" && Number(response) && Number.isInteger(Number(response)) && Number(response) <= maxDuration;
}

function prompt(message) {
    console.log('\x1b[31m%s\x1b[32m%s\x1b[0m', messages.format.prompt, message);
    /*
      \x1b[32m code for green %s \x1b[31m character code for red %s
       \x1b[0m reset [ %s is argument ]
    */
}
