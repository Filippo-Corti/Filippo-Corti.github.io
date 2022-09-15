import Cell from './Cell.js'
import MoveData from './MoveData.js';
import { globals as G } from './globals.js';


export default class Snake {

    #snake; //Cells List [First is Tail, last is Head]
    #snakeGame;

    constructor(snakeGame) {
        this.#snakeGame = snakeGame;
        this.#snake = this.#generateDefaultSnake();
    }

    getSnake() {
        return this.#snake;
    }

    move(deltaRow, deltaCol, snakeCurve) {
        let moveData = new MoveData();
        let currentHead = this.#getSnakeHead();
        let newOccupiedCell = new Cell(currentHead.row + deltaRow, currentHead.col + deltaCol);
        if (!this.#isCellFree(newOccupiedCell)) {
            this.#snakeGame.gameOver();
            return;
        }
        moveData.cellToDelete = this.#snake[0];
        if (this.#isCellAnApple(newOccupiedCell)) {
            this.#setSnakeCurveToCell(this.#snake[this.#snake.length - 1], snakeCurve);
            moveData.cellToUpdate = this.#snake[this.#snake.length - 1];
            this.#addNewSnakeHead(newOccupiedCell);
            this.#snakeGame.appleEaten();
        }
        else {
            this.#removeSnakeTail(); //Only remove 1 if it's not eating
            this.#setSnakeCurveToCell(this.#snake[this.#snake.length - 1], snakeCurve);
            moveData.cellToUpdate = this.#snake[this.#snake.length - 1];
            this.#addNewSnakeHead(newOccupiedCell);
        }
        moveData.cellHead = newOccupiedCell;
        moveData.snakeLength = this.#snake.length;
        return moveData;
    }

    #generateDefaultSnake() {
        let list = [];
        for (let i = 0; i < G.DEFAULT_SNAKE_LENGTH; i++) {
            let cell = new Cell(G.DEFAULT_ROW, G.DEFAULT_COL + i);
            list.push(cell)
        }
        return list;
    }

    #getSnakeHead() {
        return this.#snake[this.#snake.length - 1];
    }

    #removeSnakeTail() { //Remove Tail (First Item)
        this.#snake.shift();
    }

    #addNewSnakeHead(newCell) { //Generate new Head (Last Item);
        this.#snake.push(newCell);
    }

    #isCellFree(cell) {
        return this.#snakeGame.isCellFree(cell);
    }

    #isCellAnApple(cell) {
        return this.#snakeGame.isCellAnApple(cell);
    }

    #setSnakeCurveToCell(cell, curve) {
        if (curve == null) {
            return;
        }
        cell.curve = curve;
    }

}