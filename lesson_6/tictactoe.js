const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const FIRST_PLAYER = 'Computer';
const winningLines = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];
function displayBoard(board) {
  console.clear();
  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);
  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');

}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function determineIfNextMoveWins(board, player) {
  let marker = ( player === 'human' ) ? HUMAN_MARKER : COMPUTER_MARKER;
  let antiMarker = ( player === 'human' ) ? COMPUTER_MARKER : HUMAN_MARKER;
  for ( let i =0; i< winningLines.length; i++ ) {
    let count = 0;
    let numSeen = [];
    for ( let j = 0; j < winningLines[i].length; j++ ) {
      if( board[winningLines[i][j]] === marker ) {
        count++;
        numSeen.push(j);
        if( count >= 2 ) {
          if( !numSeen.includes(0) && board[winningLines[i][0]] === INITIAL_MARKER)
            return winningLines[i][0];
          else if ( !numSeen.includes(1) && board[winningLines[i][1]] === INITIAL_MARKER)
            return winningLines[i][1];
          else if( !numSeen.includes(2) && board[winningLines[i][2]] === INITIAL_MARKER)
            return winningLines[i][2];
        }
      }
    }
  }
  return false;
}

function detectWinner(board) {
  for (let line = 0; line < winningLines.length; line++) {
    let [sq1, sq2, sq3] = winningLines[line];

    if (
        board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
        board[sq1] === COMPUTER_MARKER &&
        board[sq2] === COMPUTER_MARKER &&
        board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }

  return null;
}

function computerChoosesSquare(board) {
  let index = undefined;
  let preventWin = determineIfNextMoveWins(board, 'human');
  let goForWin = determineIfNextMoveWins(board, 'computer');
  if ( goForWin ) {
    index = goForWin;
  } else if ( preventWin ) {
    index = preventWin;
  } else if (emptySquares(board).includes('5')) {
    index = 5;
  } else {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    index = emptySquares(board)[randomIndex];
  }
  board[index] = COMPUTER_MARKER;
}

function joinOr(emptySquaresArray, delimitter=" ", word="or") {
  let length = emptySquaresArray.length;
  if ( length === 2) {
    return emptySquaresArray[0] + delimitter + emptySquaresArray[1];
  } else {
    let endOfStr = delimitter + word + " " + emptySquaresArray[length-1];
    return emptySquaresArray.join(delimitter).slice(0,length) + endOfStr;
  }
}

function playerChoosesSquare(board) {
  let square;
  while (true) {
    prompt(`Choose a square ${joinOr(emptySquares(board))}:`);
    square = readline.question().trim(); // input trimmed to allow spaces in input
    if (emptySquares(board).includes(square)) break; 
      prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function prompt(message) {
  let greenConsoleFG = '\x1b[32m';
  let redConsoleFG = '\x1b[31m';
  let resetConsoleFG = '\x1b[0m';
  console.log(`${redConsoleFG}$=>`, `${greenConsoleFG}`, message, `${resetConsoleFG}`);
}
function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) { // board is unused for now; we'll use it later
  return !!detectWinner(board);
}

function chooseSquare(board, currentPlayer) {
  if(currentPlayer === 'player') {
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
}

function alternatePlayer(currentPlayer) {
  return currentPlayer === 'player' ? 'computer' : 'player';
}

function play() {
  let winCount = {
    Player : 0,
    Computer : 0,
    tie : 0
  }
  let matchWin=5;
  let next=true;
while (next) {

  let board = initializeBoard();

  displayBoard(board);
  prompt(`Player ${winCount['Player']} || Computer ${winCount['Computer']}`);
  let currentPlayer = FIRST_PLAYER;
  while (true) {
    displayBoard(board);
    chooseSquare(board, currentPlayer);
    currentPlayer = alternatePlayer(currentPlayer);
    if (someoneWon(board) || boardFull(board)) break;
  }

  displayBoard(board);

  if (someoneWon(board)) {
    readline.question(`${detectWinner(board)} won!`);
    winCount[detectWinner(board)]++;
  } else {
    readline.question("It's a tie!");
    winCount[detectWinner(board)]++;
  }

  if(winCount['Player'] === matchWin) { 
    prompt("Player won the match!");
    winCount['Player'] = 0; winCount['Computer'] = 0; winCount['tie'] =0;
    prompt('Play again? (y or n)');
    let answer = readline.question().toLowerCase()[0];
    if (answer !== 'y') break;
  } else if (winCount['Computer'] === matchWin) {
    prompt("Computer won the match!");
    winCount['Player'] = 0; winCount['Computer'] = 0; winCount['tie'] =0;
   while(true) {
    prompt('Play again? (y or n)');
    let answer = readline.question().toLowerCase()[0];
    if (answer === 'n') { 
      next=false; 
      break;
    } else if ( answer === 'y') {
      next=true;
      break;
      }
    }
  }

}

prompt('Thanks for playing Tic Tac Toe!');
}
play();