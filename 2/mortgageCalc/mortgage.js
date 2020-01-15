const readline = require('readline-sync');
const messages = require('./messages.json');

startCalculator();

function startCalculator() {
  let loanAmount = setLoanAmount(readInput(messages.loan.amount));
  let apr = setAPR(readInput(messages.loan.apr));
  let yearlyLoanDuration = setLoanDuration(readInput(messages.loan.duration));
  let monthlyLoanDuration = getMonthlyLoanDuration(yearlyLoanDuration);
  let monthlyPayment = getMonthlyPayment(loanAmount,monthlyLoanDuration,apr);
  prompt(`Provided your loan amount of ${loanAmount}, apr of ${apr}, and loan duration of ${yearlyLoanDuration} years.\n\n\tYour monthly payment will be ${monthlyPayment}`);
}

function getMonthlyPayment(loanAmount,monthlyLoanDuration,apr) {
  return Number(loanAmount) * (getMonthlyInterest(apr) / (1 - Math.pow((1 + getMonthlyInterest(apr)),(-Number(monthlyLoanDuration)))));
}

function getMonthlyInterest(apr) {
  return Number(apr) / 12;;
}

function getMonthlyLoanDuration(yearlyLoanDuration) {
  return Number(yearlyLoanDuration) * 12
}

function readInput(message) {
  prompt(message);
  let response = readline.question();
  return response;
}

function invalidInput() {
    console.clear();
    prompt("The input you entered is not correct. Please try again.");
}

function setLoanAmount(response) {
  if (response.trim() !== "" && Number(response) && response >= 1000 && response <= 500000) {
    return Number(response);
  } else {
      invalidInput();
      return setLoanAmount(readInput(messages.loan.amount));
  }
}

function setAPR(response) {
    if (response.trim() !== "" && Number(response) && response >= 0 && response < 1) {
        return Number(response);
      } else {
          invalidInput();
          return setAPR(readInput(messages.loan.apr));
      }
}

function setLoanDuration(response) {
    if (response.trim() !== "" && Number(response) && Number.isInteger(Number(response))) {
        return Number(response);
      } else {
          invalidInput();
          return setLoanDuration(readInput(messages.loan.duration));
      }
}

function prompt(message) {
    console.log('\x1b[32m%s\x1b[31m%s\x1b[0m', messages.format.prompt, message);
    /*
      \x1b[32m code for green %s \x1b[31m character code for red %s
       \x1b[0m reset [ %s is argument ]
    */
}
