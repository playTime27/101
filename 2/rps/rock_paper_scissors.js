const readline = require('readline-sync');
const VALID_CHOICES = ['rock','paper','scissors','spock','lizard'];
const messages = require('./messages.json');
const WIN_CONDITIONS = {
  spock : ['scissors', 'rock'],
  scissors : ['paper', 'lizard'],
  rock : ['lizard', 'scissors'],
  paper : ['rock', 'spock'],
  lizard : ['paper', 'spock']
};

let userWinCount=0;
let cpuWinCount=0;

do {
  prompt('First to 5 wins!');
  runGame();
} while (playAgain());

function playAgain() {
  prompt(messages.playAgain);
  let response = readline.question();

  if (response.toLowerCase() === 'yes') {
    console.clear();
    userWinCount=0;
    cpuWinCount=0;
    return true;
  } else {
    return false;
  }
}

function runGame() {
  while(userWinCount < 5 || cpuWinCount < 5) {
    prompt(`userWins : ${userWinCount} |||  cpuWins : ${cpuWinCount}\n\n`);
    let computerChoice = getComputerChoice();
    let userChoice = getUserChoice();

  prompt(`You chose ${userChoice}, computer chose ${computerChoice}`);
  printWinner(userChoice, computerChoice);
  }
}

function isWinningChoice(choice, opposingChoice) {
  return WIN_CONDITIONS[choice].includes(opposingChoice);
}

function printWinner(userChoice, computerChoice) {
  let youWin = isWinningChoice(userChoice, computerChoice);
  let youLost = isWinningChoice(computerChoice, userChoice);

  if (youWin) {
    prompt('You win!');
    userWinCount++;
  } else if (youLost) {
    prompt('You lose!');
    cpuWinCount++;
  } else {
    prompt('It\'s a tie!');
  }
}

function getUserChoice() {
  let choice = getInput(`Choose one : ${VALID_CHOICES.join(", ")}`);
  while (!isChoiceValid(choice)) {
    prompt(messages.error.invalid);
    choice = getInput(`Choose one : ${VALID_CHOICES.join(", ")}`);
  }
  return choice;
}

function attemptAutoComplete(choice) {
  let arrayOfChoices = VALID_CHOICES.filter(value => {
   value=value.substring(0,choice.length);
   return value.includes(choice)
  });

  if(arrayOfChoices.length === 0) {
    return choice;
  } else if (arrayOfChoices.length === 1) {
    return arrayOfChoices[0];
  } else {
    prompt(`${messages.multipleOptions} ${choice}. Including ${arrayOfChoices.join(", ")}.`);
    return  choice;
  }

}

function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  return VALID_CHOICES[randomIndex];
}

function isChoiceValid(choice) {
  return VALID_CHOICES.includes(choice);
}

function getInput(message) {
  prompt(message);
  let response = readline.question();
  let result = attemptAutoComplete(response);
  return result;
}

function prompt(message) {
  let greenConsoleFG = '\x1b[32m';
  let redConsoleFG = '\x1b[31m';
  let resetConsoleFG = '\x1b[0m';
  console.log(`${redConsoleFG}`, messages.format.prompt, `${greenConsoleFG}`, message, `${resetConsoleFG}`);
}
