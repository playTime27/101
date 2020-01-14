const readline = require('readline-sync');

console.log('Welcome to Calculator!');
console.log(performOperation(getInput()));

function prompt(message) {
    console.log(`=> ${message}`);
}

function checkValidity(firstNumber, secondNumber, operation) {
  if (Number.isFinite(Number(firstNumber)) &&
  Number.isFinite(Number(secondNumber)) && Number.isFinite(Number(operation))) {
   return true;
  } else {
    console.clear();
    console.log("The provided information is invalid. Please enter it again.");
    return false;
  }
}

function getInput() {
  let haveNumbers = false;
  let firstNumber;
  let secondNumber;
  let operation;
  while ( !haveNumbers ) {
  console.log('What\'s the first number?');
  firstNumber = readline.question();
        prompt(`The first number is ${firstNumber}. What is the second number?`);
        secondNumber = readline.question();
        prompt(`The first number is ${firstNumber}. The second number is ${secondNumber}.`);
        prompt(` What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide`);
        operation = readline.question();
        haveNumbers = checkValidity(firstNumber,secondNumber,operation);
    }

    return [Number(firstNumber),Number(secondNumber),Number(operation)];
}

function performOperation(values) {
    switch (values[2]) {
        case 1:
            return `The result is : ${values[0] + values[1]}`;
        case 2:
            return `The result is : ${values[0] - values[1]}`;
        case 3:
            return `The result is : ${values[0] * values[1]}`;
        case 4:
            return `The result is : ${values[0] / values[1]}`;
        default:
            return "Invalid operation.";

    }
}
