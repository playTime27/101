function board( placeholder, separator ) { 
  const unicodeNumbers = [ '\u{2474}' , '\u{2475}' ,'\u{2476}' ,'\u{2477}' ,'\u{2478}' ,'\u{247a}' ,'\u{247b}' ,'\u{247c}' ,'\u{247d}'];
  let board = [...unicodeNumbers];
  let numPlaceholder = 5; // must be odd
  let uniCodeSpace = (numPlaceholder - 1 ) / 2;

  const quadrant = ( index, unicodeChar ) => {
    if ( unicodeChar === undefined ) {
      placeholder.repeat(uniCodeSpace) + unicodeNumbers[index] +  placeholder.repeat(uniCodeSpace);
    } else {
      placeholder.repeat(uniCodeSpace) + unicodeChar +  placeholder.repeat(uniCodeSpace);
    }
  };

   const printRows = () => {
    for ( i = 0 ; i < 9 ; i += 3) {
      let boardOutput = "";
      boardOutput += quadrant(i, placeholder) + separator + quadrant(i + 1, placeholder)   + separator + quadrant(i + 2, placeholder) + "\n";
      boardOutput += quadrant(i, board[i])    + separator + quadrant(i + 1, board[i + 1])  + separator + quadrant(i + 2, board[i + 2]) + "\n";
      boardOutput += quadrant(i, placeholder) + separator + quadrant(i + 1, placeholder)   + separator + quadrant(i + 2, placeholder)+ "\n";
    return boardOutput;
    }
  }

  const getBoard = () => board;
  const printBoard = () => console.log(printRows());
};

board.printRows;
