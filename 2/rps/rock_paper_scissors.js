const readline = require('readline-sync');
const VALID_CHOICES = ['rock','paper','scissors','spock','lizard'];
const messages = require('./messages.json');
const WIN_CONDITIONS = {
  "spock" : ['scissors', 'rock'],
  "scissors" : ['paper', 'lizard'],
  "rock" : ['lizard', 'scissors'],
  "paper" : ['rock', 'spock'],
  "lizard" : ['paper', 'spock']
};


do {
  runGame();
} while (playAgain());

function playAgain() {
  let response = getInput(messages.playAgain);
  if (response.toLowerCase() === 'yes') {
    console.clear();
    return true;
  } else {
    return false;
  }
}

function runGame() {
  let computerChoice = getComputerChoice();
  let userChoice = getUserChoice();

  prompt(`You chose ${userChoice}, computer chose ${computerChoice}`);
  printWinner(userChoice, computerChoice);
}

function isWinningChoice(choice) {
  return WIN_CONDITIONS[choice].includes(choice);
}

function printWinner(userChoice, computerChoice) {
  let youWin = isWinningChoice(userChoice);
  let youLost = isWinningChoice(computerChoice);

  if (youWin) {
    prompt('You win!');
  } else if (youLost) {
    prompt('You lose!');
  } else {
    prompt('It\'s a tie!');
  }
}

function getUserChoice() {
  let choice = getInput(`Choose one : ${VALID_CHOICES.join(", ")}`);
  while (!isChoiceValid(choice)) {
    prompt(messages.error.invalid);
    prompt(`Choose one : ${VALID_CHOICES.join(", ")}`);
    choice = readline.question();
  }
  return choice;
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
  return readline.question();
}

function prompt(message) {
  let greenConsoleFG = '\x1b[32m';
  let redConsoleFG = '\x1b[31m';
  let resetConsoleFG = '\x1b[0m';
  console.log(`${redConsoleFG}`, messages.format.prompt, `${greenConsoleFG}`, message, `${resetConsoleFG}`);
}
