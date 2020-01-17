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

do {
  console.clear();
  prompt('First to 5 wins!');
  runGame();
} while (playAgain());

function playAgain() {
  prompt(messages.playAgain);

  if (readline.question().toLowerCase() === 'yes') {
    return true;
  } else if (readline.question().toLowerCase() !== 'no') {
    prompt('That is invalid input. Please enter yes to play again or no to stop.');
    return true;
  } else {
    return false;
  }
}

function runGame() {
  let winCount = {
    user : 0,
    cpu : 0,
    tie : 0
};
let winner;
  while (winCount['user'] <= 5 && winCount['cpu'] <= 5) {

    prompt(`userWins : ${winCount['user']} |||  cpuWins : ${winCount['cpu']}`);
    let computerChoice = getComputerChoice();
    let userChoice = getUserChoice();

    prompt(`You chose ${userChoice}, computer chose ${computerChoice}`);
    winner = determineWinner(userChoice, computerChoice);
    winCount[winner]++;
    printWinner(winner);
    }
  printMatchWinner(winner);
}

function printMatchWinner(winner) {
  if (winner === 'user') {
    prompt("You won the match!");
  } else {
    prompt("Sorry, the CPU is rigged. You lost the match!");
  }
}

function isWinningChoice(choice, opposingChoice) {
  return WIN_CONDITIONS[choice].includes(opposingChoice);
}

function determineWinner(userChoice, computerChoice) {
  let youWin = isWinningChoice(userChoice, computerChoice);
  let youLost = isWinningChoice(computerChoice, userChoice);
  if (youWin) {
    return "user";
  } else if (youLost) {
    return "cpu";
  } else {
    return "tie";
  }
}

function printWinner(winner) {
  if (winner === 'user') {
    prompt('You win!\n');
  } else if (winner === 'cpu') {
    prompt('You lose!\n');
  } else {
    prompt('It\'s a tie!\n');
  }
}

function getUserChoice() {
  let choice = getInput(`${messages.instructions} ${VALID_CHOICES.join(", ")}`);
  while (!isChoiceValid(choice)) {
    prompt(messages.error.invalid);
    choice = getInput(`${messages.instructions} ${VALID_CHOICES.join(", ")}`);
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
  let response = readline.question().toLowerCase();
  let result = choiceAutoComplete(response);
  return result;
}

function prompt(message) {
  let greenConsoleFG = '\x1b[32m';
  let redConsoleFG = '\x1b[31m';
  let resetConsoleFG = '\x1b[0m';
  console.log(`${redConsoleFG}${messages.format.prompt}`, `${greenConsoleFG}`, message, `${resetConsoleFG}`);
}