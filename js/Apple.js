import { globals as G } from './globals.js';
import Cell from './Cell.js'

export default class Apple {

    #snakeGame;
    row;
    col;

    constructor(snakeGame) {
        this.#snakeGame = snakeGame;
        this.#createApple();
    }

    #createApple() {
        let rCellRow, rCellCol;
        do {
            let randomCell = parseInt(Math.random() * 100) % (G.TOTAL_ROWS * G.TOTAL_COLS);
            rCellRow = parseInt(randomCell / G.TOTAL_ROWS);
            rCellCol = randomCell % G.TOTAL_COLS;
        } while (this.#cellIsOccupied(new Cell(rCellRow, rCellCol)));
        this.row = rCellRow;
        this.col = rCellCol;
    }

    #cellIsOccupied(cell) {
        return !this.#snakeGame.isCellFree(cell);
    }
}