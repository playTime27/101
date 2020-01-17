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

let userWinCount = 0;
let cpuWinCount = 0;

do {
  prompt('First to 5 wins!');
  runGame();
} while (playAgain());

function playAgain() {
  prompt(messages.playAgain);

  if (readline.question().toLowerCase() === 'yes') {
    resetGame();
    return true;
  } else {
    return false;
  }
}

function resetGame() {
  console.clear();
  userWinCount = 0;
  cpuWinCount = 0;
}

function runGame() {
  while (true) {
    if (userWinCount < 5 && cpuWinCount < 5) {
      break;
    }
    prompt(`userWins : ${userWinCount} |||  cpuWins : ${cpuWinCount}`);
    let computerChoice = getComputerChoice();
    let userChoice = getUserChoice();

  prompt(`You chose ${userChoice}, computer chose ${computerChoice}`);
  printWinner(userChoice, computerChoice);
  }
  printMatchWinner();
}

function printMatchWinner() {
  if (userWinCount === 5) {
    prompt("You won the match!");
} else {
    prompt("Sorry, the CPU is rigged. You lost the match!");
  }
}

function isWinningChoice(choice, opposingChoice) {
  return WIN_CONDITIONS[choice].includes(opposingChoice);
}

function printWinner(userChoice, computerChoice) {
  let youWin = isWinningChoice(userChoice, computerChoice);
  let youLost = isWinningChoice(computerChoice, userChoice);

  if (youWin) {
    prompt('You win!\n');
    updateUserWinCount();
  } else if (youLost) {
    prompt('You lose!\n');
    updateCpuWinCount();
  } else {
    prompt('It\'s a tie!\n');
  }
}

function updateUserWinCount() {
  userWinCount++;
}

function updateCpuWinCount() {
  cpuWinCount++;
}

function getUserChoice() {
  let choice = getInput(`Choose one : ${VALID_CHOICES.join(", ")}`);
  while (!isChoiceValid(choice)) {
    prompt(messages.error.invalid);
    choice = getInput(`Choose one : ${VALID_CHOICES.join(", ")}`);
  }
  return choice;
}

function getPossibleChoices(choice) {
  return VALID_CHOICES.filter(value =>
    value.substring(0,choice.length).includes(choice));
}

function choiceAutoComplete(choice) {
  let possibleChoices = getPossibleChoices(choice);

  if (possibleChoices.length === 0) {
    return choice;
  } else if (possibleChoices.length === 1) {
    return possibleChoices[0];
  } else {
    prompt(`${messages.multipleOptions} ${choice}. Including ${possibleChoices.join(", ")}.`);
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
  let result = choiceAutoComplete(response);
  return result;
}

function prompt(message) {
  let greenConsoleFG = '\x1b[32m';
  let redConsoleFG = '\x1b[31m';
  let resetConsoleFG = '\x1b[0m';
  console.log(`${redConsoleFG}${messages.format.prompt}`, `${greenConsoleFG}`, message, `${resetConsoleFG}`);
}