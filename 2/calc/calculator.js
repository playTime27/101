const readline = require('readline-sync');

console.log('Welcome to Calculator!');
console.log(performOperation(getInput()));

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

function validInput(message) {
    let haveNumbers = false;
    let number;
    while ( !haveNumbers ) {
        prompt(message);
        number = readline.question();
        haveNumbers = checkValidity(number);
      }
    return number;
}

function getInput() {

    let firstNumber = validInput('What\'s the first number?');
    let secondNumber = validInput(`The first number is ${firstNumber}. What is the second number?`);
    let operation = validInput(` What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide`);

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
