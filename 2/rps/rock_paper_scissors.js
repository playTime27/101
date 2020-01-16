const readline = require('readline-sync');
const VALID_CHOICES = ['rock,paper,scissors'];
const messages = require('./messages.json');

runGame();

function runGame() {
  let randomChoice = getRandomChoice();
  let userChoice = getUserChoice();

  prompt(`You chose ${userChoice}, computer chose ${randomChoice}`);
}

function getUserChoice() {
  prompt(`Choose one : ${VALID_CHOICES.join(", ")}`);
  let choice = readline.question();
  while (!isChoiceValid(choice)) {
    choice = readline.question();
  }
}

function getRandomChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  return VALID_CHOICES[randomIndex];
}

function isChoiceValid(choice) {
  return [VALID_CHOICES].includes(choice);
}

function prompt(message) {
  let green = '\x1b[32m code';
  let red = '\x1b[32m';
  let reset = '\x1b[0m';
  console.log(`${red}`, messages.format.prompt, `${green}`, message, `${reset}`);
}
