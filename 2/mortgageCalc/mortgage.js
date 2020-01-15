const readline = require('readline-sync');
const messages = require('./messages.json');

startCalculator();

function startCalculator() {
  let loanAmount = askForInput('loanAmount');
  let apr = askForInput('apr');
  let yearlyLoanDuration = askForInput('loanDuration');
  let monthlyLoanDuration = getMonthlyLoanDuration(yearlyLoanDuration);
  let monthlyInterest = getMonthlyInterest(apr, loanAmount);
  let monthlyPayment = getMonthlyPayment(loanAmount,monthlyLoanDuration);
  prompt(`Provided your loan amount of ${loanAmount}, apr of ${apr}, and loan duration of ${yearlyLoanDuration} years.\n\n\tYour monthly payment will be ${monthlyPayment}`);
}

function getMonthlyPayment(loanAmount,monthlyLoanDuration) {
  return loanAmount * (getMonthlyInterest() / (1 - Math.pow((1 + getMonthlyInterest()),(-monthlyLoanDuration))));
}

function getMonthlyInterest(apr, loanAmount) {
  let monthlyRate = apr / 12;
  return monthlyRate * loanAmount;
}

function getMonthlyLoanDuration(yearlyLoanDuration) {
  return yearlyLoanDuration * 12
}

function askForInput(value) {
  switch (value) {
    case "loanAmount":
        setLoanAmount(readInput(messages.loan.amount));
      break;
    case "apr":
        setAPR(readInput(messages.loan.apr));
      break;
    case "loanDuration":
        setLoanDuration(readInput(messages.loan.duration));
      break;
    default:
      //generalInput?nothing
  }
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
    return response;
  } else {
      invalidInput();
      return askForInput('loanAmount');
  }
}

function setAPR(response) {
    if (response.trim() !== "" && Number(response) && response >= 0 && response < 1) {
        return response;
      } else {
          invalidInput();
          return askForInput('apr');
      }
}

function setLoanDuration(response) {
    if (response.trim() !== "" && Number(response) && Number.isInteger(Number(response))) {
        return response;
      } else {
          invalidInput();
          return askForInput('loanDuration');
      }
}

function prompt(message) {
    console.log('\x1b[32m%s\x1b[31m%s\x1b[0m', messages.format.prompt, message);
    /*
      \x1b[32m code for green %s \x1b[31m character code for red %s
       \x1b[0m reset [ %s is argument ]
    */
}
