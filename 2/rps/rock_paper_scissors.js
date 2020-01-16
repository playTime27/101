const readline = require('readline-sync');
const VALID_CHOICES = ['rock','paper','scissors'];
const messages = require('./messages.json');

do {
  runGame();
} while (playAgain());

function playAgain() {
  prompt(messages.playAgain);
  let response = readline.question();
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

function printWinner(userChoice, computerChoice) {
  let youWin = youWon(userChoice, computerChoice);
  let youLost = computerWon(userChoice, computerChoice);

  if (youWin) {
    prompt('You win!');
  } else if (youLost) {
    prompt('You lose!');
  } else {
    prompt('It\'s a tie!');
  }
}


function youWon(userChoice, computerChoice) {
  return (userChoice === 'rock' && computerChoice === 'scissors') ||
  (userChoice === 'paper' && computerChoice === 'rock') ||
  (userChoice === 'scissors' && computerChoice === 'paper');
}

function computerWon(userChoice, computerChoice) {
  return (userChoice === 'rock' && computerChoice === 'paper') ||
  (userChoice === 'paper' && computerChoice === 'scissors') ||
  (userChoice === 'scissors' && computerChoice === 'rock');
}

function getUserChoice() {
  prompt(`Choose one : ${VALID_CHOICES.join(", ")}`);
  let choice = readline.question();
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

function prompt(message) {
  let greenConsoleFG = '\x1b[32m';
  let redConsoleFG = '\x1b[31m';
  let resetConsoleFG = '\x1b[0m';
  console.log(`${redConsoleFG}`, messages.format.prompt, `${greenConsoleFG}`, message, `${resetConsoleFG}`);
}
