function board( placeholder = " ", separator = "|") { 
  const unicodeNumbers = [ '\u{2474}' , '\u{2475}' ,'\u{2476}' ,'\u{2477}' ,'\u{2478}' ,'\u{247a}' ,'\u{247b}' ,'\u{247c}' ,'\u{247d}'];
  let board = [...unicodeNumbers];
  let numPlaceholder = 5; // must be odd
  let uniCodeSpace = (numPlaceholder - 1 ) / 2;

  const row = ( index, unicodeChar ) => {
    if ( unicodeChar === undefined ) {
      placeholder.repeat(uniCodeSpace) + unicodeNumbers[index] +  placeholder.repeat(uniCodeSpace);
    } else {
      placeholder.repeat(uniCodeSpace) + unicodeChar +  placeholder.repeat(uniCodeSpace);
    }
  };

  const printQuadrants = () => {
    for ( i = 0 ; i < 9 ; i += 3) {
      console.log(row(i, placeholder) + separator + row(i + 1, placeholder)   + separator + row(i + 2, placeholder) );
      console.log(row(i, board[i])    + separator + row(i + 1, board[i + 1])  + separator + row(i + 2, board[i + 2]));
      console.log(row(i, placeholder) + separator + row(i + 1, placeholder)   + separator + row(i + 2, placeholder));
    }
  }

  const print = () => {
    for ( i = 0 ; i < 9 ; i += 3) {
      console.log(row(i, placeholder) + separator + row(i + 1, placeholder)   + separator + row(i + 2, placeholder) );
      console.log(row(i, board[i])    + separator + row(i + 1, board[i + 1])  + separator + row(i + 2, board[i + 2]));
      console.log(row(i, placeholder) + separator + row(i + 1, placeholder)   + separator + row(i + 2, placeholder));
    }
  }
  const printBoard = () => {
    console.log()
    printRows(" " , "|");
    row()
  }
  printBoard();
};

