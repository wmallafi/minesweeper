'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

// Print formatted boards
var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var bomb = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    bomb.push(row);
  }
  // Add bombs to the bomb board
  var numberOfBombsPlaced = 0;

  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    bomb[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return bomb;
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board :');
printBoard(playerBoard);
console.log('Bomb Board :');
printBoard(bombBoard);