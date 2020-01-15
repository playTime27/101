const readline = require('readline-sync');
const messages = require('./messages.json');

startCalculator();

function startCalculator() {
  askForInput('loanAmount');
  askForInput('apr');
  askForInput('loanDuration');
}

function getLoanAmount() {

}

function getAPR() {

}

function getLoanDuration() {

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
      //generalInput?
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
  if (response.trim() !== "" && Number(response)) {
    return response;
  } else {
      invalidInput();
      askForInput('loanAmount');
  }
}

function setAPR(response) {
    if (response.trim() !== "" && Number(response)) {
        return response;
      } else {
          invalidInput();
          askForInput('apr');
      }
}

function setLoanDuration(response) {
    if (response.trim() !== "" && Number(response)) {
        return response;
      } else {
          invalidInput();
          askForInput('loanDuration');
      }
}

function prompt(message) {
    console.log('\x1b[32m%s\x1b[31m%s\x1b[0m', messages.format.prompt, message);
}