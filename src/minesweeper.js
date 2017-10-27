class Game {
  constructor (numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    // console.log('In Game Class : ');
    // this._board.print();
  }

  playMove (rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game over... a Bomb was flipped. Final Board :');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log(
        'Congratulations there are no more safe tiles remaining ... You won the Game.'
      );
    } else {
      console.log('Current Board : ');
      this._board.print();
    }
  }
}

class Board {
  constructor (numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    // console.log('Number of Bombs : ' + this._numberOfBombs);

    this._numberOfTiles = numberOfRows * numberOfBombs;
    // console.log('Number of Tiles : ' + this._numberOfTiles);

    // Static method call
    this._playerBoard = Board.generatePlayerBoard(
      numberOfRows,
      numberOfColumns
    );
    // console.log('Player Board : ');
    // this.print();

    // Static method Call
    this._bombBoard = Board.generateBombBoard(
      numberOfRows,
      numberOfColumns,
      numberOfBombs
    );
    // console.log('Bomb Board : ');
    // this.printBombBoard();
  }

  get playerBoard () {
    return this._playerBoard;
  }

  /* flip user selected tile and check if it has a Bomb or if it is empty
   *
  */

  flipTile (rowIndex, columnIndex) {
    // console.log(this._playerBoard[rowIndex][columnIndex]);
    // Check for empty tile
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!.');
      return;
      // Update player board with Bomb if it is found
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      // Update with number of neighboring bombs
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(
        rowIndex,
        columnIndex
      );
      // this.print();
    }
    this._numberOfTiles--;
    // console.log(`Number of tiles remaining : ${this._numberOfTiles}`);
  }

  getNumberOfNeighborBombs (rowIndex, columnIndex) {
    // console.log(`User rowIndex : ${rowIndex}`);
    // console.log(`User rowIndex : ${columnIndex}`);
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if (
        neighborRowIndex >= 0 &&
        neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 &&
        neighborColumnIndex < numberOfColumns
      ) {
        // console.log([rowIndex, columnIndex] + ' => ' + neighborRowIndex + ',' + neighborColumnIndex);
        // console.log(bombBoard[neighborRowIndex][neighborColumnIndex]);
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    // console.log(`Number of neighboring Bombs : ${numberOfBombs}`);
    return numberOfBombs;
  }

  hasSafeTiles () {
    // this expression is a truthy no need to the if key word
    return this._numberOfTiles !== this._numberOfBombs;
  }

  // Print formatted boards
  print () {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
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
      if (bomb[randomRowIndex][randomColumnIndex] !== 'B') {
        bomb[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return bomb;
  }
}

const g = new Game(3, 3, 5);
g.playMove(1, 1);
