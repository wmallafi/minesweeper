const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

// Print formatted boards
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let bomb = [];
  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    bomb.push(row);
  }
  // Add bombs to the bomb board
  let numberOfBombsPlaced = 0;

  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    bomb[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return bomb;
};

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board :');
printBoard(playerBoard);
console.log('Bomb Board :');
printBoard(bombBoard);
