const readline = require('readline-sync');
const messages = require('./config.json');

startCalculator();

function startCalculator() {
    let anotherCalculation = false;
    prompt(messages.greeting);
    do {
        prompt(performOperation(getInput()));
        anotherCalculation = getAnotherCalculation();
        if (anotherCalculation) {
          console.clear();
        }
    } while (anotherCalculation);
}

function getAnotherCalculation() {
    prompt(messages.promptAnother);
    let response = readline.question();
    return getValidBoolean(response);
}

function prompt(message) {
    console.log(`$=> ${message}`);
}

function checkValidity(number) {
  if (number.trim() !== '' && Number.isFinite(Number(number))) {
   return true;
  } else {
    console.clear();
    console.log(messages.isInvalid);
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

    let firstNumber = getValidNumber(messages.numberQuery);
    let secondNumber = getValidNumber(`The first number is ${firstNumber}. ` + messages.numberQuery );
    let operation = getValidNumber(messages.optionQuery);

    return [Number(firstNumber),Number(secondNumber),Number(operation)];
}

function performOperation([firstNumber, secondNumber, operation]) {
    switch (operation) {
        case 1:
            return  messages.result + `${firstNumber + secondNumber}`;
        case 2:
            return messages.result + `${firstNumber - secondNumber}`;
        case 3:
            return messages.result + `${firstNumber * secondNumber}`;
        case 4:
            return messages.result + `${firstNumber / secondNumber}`;
        default:
            return messages.isInvalid;

    }
}
