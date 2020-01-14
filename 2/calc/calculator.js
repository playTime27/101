const readline = require('readline-sync');
const messages = require('./config.json');

startCalculator();
console.log(messages);

function startCalculator() {
    let moreCalculations = false;
    console.log(messages.messages.greeting);
    do {
        console.log(performOperation(getInput()));
        moreCalculations = anotherCalculation();
        if (moreCalculations) {
          console.clear();
        }
    } while (moreCalculations);
}

function anotherCalculation() {
    prompt('Would you like to perform another calculation? Enter yes if so, otherwise input anything else.');
    let response = readline.question();
    return getValidBoolean(response);
}

function prompt(message) {
    console.log(`=> ${message}`);
}

function checkValidity(number) {
  if (number.trim() !== '' && Number.isFinite(Number(number))) {
   return true;
  } else {
    console.clear();
    console.log("The provided information is invalid. Please enter it again.");
    return false;
  }
}

function getValidNumber(message) {
    let haveNumbers = false;
    let number;
    while ( !haveNumbers ) {
        prompt(message);
        number = readline.question();
        haveNumbers = checkValidity(number);
      }
    return number;
}

function getValidBoolean(response) {
    if (response.toLowerCase() === 'yes') {
      return true;
    } else {
      return false;
      }
}

function getInput() {

    let firstNumber = getValidNumber('What\'s the first number?');
    let secondNumber = getValidNumber(`The first number is ${firstNumber}. What is the second number?`);
    let operation = getValidNumber(` What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide`);

    return [Number(firstNumber),Number(secondNumber),Number(operation)];
}

function performOperation([firstNumber, secondNumber, operation]) {
    switch (operation) {
        case 1:
            return `The result is : ${firstNumber + secondNumber}`;
        case 2:
            return `The result is : ${firstNumber - secondNumber}`;
        case 3:
            return `The result is : ${firstNumber * secondNumber}`;
        case 4:
            return `The result is : ${firstNumber / secondNumber}`;
        default:
            return "Invalid operation.";

    }
}
