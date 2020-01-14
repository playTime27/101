const readline = require('readline-sync');

console.log('Welcome to Calculator!');
console.log(performOperation(getInput()));

function getInput() {
    let haveNumbers=false;
    while(!haveNumbers) {
        console.log('What\'s the first number?');
        let firstNumber = readline.question();
        console.log(`The first number is ${firstNumber}. What is the second number?`);
        let secondNumber = readline.question();
        console.log(`The first number is ${firstNumber}. The second number is ${secondNumber}. What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide`);
        let operation = readline.question();
        if(Number.isFinite(firstNumber) && Number.isFinite(secondNumber) && Number.isFinite(operation))
            haveNumbers=true;
    }
    return [Number(firstNumber),Number(secondNumber),Number(operation)];
}

function performOperation(values) {
    switch(values[2]) {
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



