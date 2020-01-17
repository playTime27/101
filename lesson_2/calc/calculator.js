const readline = require('readline-sync');
const messages = require('./config.json');

let language = getLanguage();
startCalculator();

function getLanguage() {
    prompt(messages.language);
    let response = readline.question();
    return selectLanguage(Number(response));
}

function selectLanguage(response) {
    switch (response) {
        case 1:
            return "en";
        case 2:
            return "jp";
        case 3:
            return "kr";
        default:
            return "en";
    }
}

function startCalculator() {
    let anotherCalculation = false;
    prompt(messages[language].greeting);
    do {
        prompt(performOperation(getInput()));
        anotherCalculation = getAnotherCalculation();
        if (anotherCalculation) {
          console.clear();
        }
    } while (anotherCalculation);
}

function getAnotherCalculation() {
    prompt(messages[language].promptAnother);
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

    let firstNumber = getValidNumber(messages[language].numberQuery);
    let secondNumber = getValidNumber(`The first number is ${firstNumber}. ` + messages[language].numberQuery );
    let operation = getValidNumber(messages[language].optionQuery);

    return [Number(firstNumber),Number(secondNumber),Number(operation)];
}

function performOperation([firstNumber, secondNumber, operation]) {
    switch (operation) {
        case 1:
            return  messages[language].result + `${firstNumber + secondNumber}`;
        case 2:
            return messages[language].result + `${firstNumber - secondNumber}`;
        case 3:
            return messages[language].result + `${firstNumber * secondNumber}`;
        case 4:
            return messages[language].result + `${firstNumber / secondNumber}`;
        default:
            return messages[language].isInvalid;

    }
}
