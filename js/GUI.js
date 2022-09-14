import Cell from './Cell.js';
import SnakeGame from './SnakeGame.js';
import { globals as G } from './globals.js';

export default class GUI {

    #gameBoard; //Board (Div)
    #currentScore;
    #highestScore;
    #rows;
    #cols;
    #snakeGame; //Game Logic
    #isGameRunning;

    constructor(rows, cols) {
        this.#rows = rows;
        this.#cols = cols;
        this.#initControls();
        this.#isGameRunning = false;
    }

    /* Public Methods */

    linkGameLogic(snakeGame) {
        this.#snakeGame = snakeGame;
    }

    generateBoard() {
        this.#gameBoard = document.createElement("div");
        this.#gameBoard.classList.add("board");
        document.querySelector(".game-container").append(this.#gameBoard);
        this.#fillBoard();
        this.#currentScore = document.querySelector(".current-score");
        this.#highestScore = document.querySelector(".highest-score");
    }

    startGame() {
        this.#isGameRunning = true;
        this.updateGUI(this.#snakeGame.getSnake(), this.#snakeGame.getApple());
        this.#snakeGame.startMoving();
    }

    updateGUI(snake, apple) {
        this.#updateSnakePosition(snake);
        this.#updateApplePosition(apple);
        this.#updateScores(snake.length - G.DEFAULT_SNAKE_LENGTH);
    }

    eatApple() {
        this.#removeApple(this.#snakeGame.getApple());
    }

    gameOver() {
        if (this.#isGameRunning) { //Prevents multiple executions
            alert('Game Over');
        }
        this.#isGameRunning = false;
    }

    regenerate() {
        this.#removeBoard();
        this.generateBoard();
    }

    isCellOccupiable(cell) {
        return this.#isCellEmpty(cell) || this.isCellAnApple(cell);
    }

    isCellAnApple(cell) {
        if (this.#doesCellExist(cell)) {
            let cellDiv = this.#getCellDivFromCoordinates(cell.row, cell.col);
            return cellDiv.getAttribute("cell-type") === "apple";
        }
    }

    mobileMove(key){
        this.#snakeGame.changeSnakeDirection(key);
    }

    /* Private Methods */

    #initControls() {
        window.addEventListener('keydown', (e) => {
            if (this.#isGameRunning)
                this.#snakeGame.changeSnakeDirection(e.key.toUpperCase());
        })
    }

    #fillBoard() {
        for (let i = 0; i < this.#cols; i++) {
            for (let j = 0; j < this.#rows; j++) {
                let cell;
                cell = document.createElement("div");
                cell.classList.add("board__cell");
                cell.setAttribute("cell-type", "empty")
                cell.id = "cell" + i + "-" + j;
                this.#gameBoard.append(cell);
            }
        }
    }

    #emptyBoard() {
        for (let i = 0; i < this.#cols; i++) {
            for (let j = 0; j < this.#rows; j++) {
                let currentCell = this.#getCellDivFromCoordinates(i, j);
                currentCell.setAttribute("cell-type", "empty");
            }
        }
    }

    #removeBoard() {
        document.querySelector(".board").remove();
    }

    #drawSnake(snake) {
        let a = 0;
        snake.forEach(cell => {
            let currentCell = document.querySelector("#cell" + cell.row + "-" + cell.col);
            if (a == snake.length - 1) {
                currentCell.setAttribute("cell-type", "snake-head");
                this.#styleTextureDirection(currentCell);
            } else {
                if (a === 0) {
                    currentCell.setAttribute("cell-type", "snake-tail");
                    currentCell.style.transform = "rotate(0deg)";
                } else
                    currentCell.setAttribute("cell-type", "snake");
            }
            a++;
        });
    }

    #styleTextureDirection(cell) {
        let direction = this.#snakeGame.direction;
        switch (direction) {
            case 'W':
                cell.style.transform = "rotate(0deg)";
                break;
            case 'A':
                cell.style.transform = "rotate(270deg)";
                break;
            case 'S':
                cell.style.transform = "rotate(180deg)";
                break;
            case 'D':
                cell.style.transform = "rotate(90deg)";
                break;
            default:
                return;
        }
    }

    #updateSnakePosition(currentSnake) {
        this.#emptyBoard();
        this.#drawSnake(currentSnake);
    }

    #drawApple(apple) {
        let appleCell = this.#getCellDivFromCoordinates(apple.row, apple.col);
        appleCell.setAttribute("cell-type", "apple");
    }

    #removeApple(apple) {
        let appleCell = this.#getCellDivFromCoordinates(apple.row, apple.col);
        appleCell.setAttribute("cell-type", "snake-head");
    }

    #updateApplePosition(currentApple) {
        this.#drawApple(currentApple);
    }

    #doesCellExist(cell) {
        let cellDiv = this.#getCellDivFromCoordinates(cell.row, cell.col);
        return !(cellDiv === null);
    }

    #isCellEmpty(cell) {
        if (this.#doesCellExist(cell)) {
            let cellDiv = this.#getCellDivFromCoordinates(cell.row, cell.col);
            return cellDiv.getAttribute("cell-type") === "empty";
        }
    }

    #getCellDivFromCoordinates(row, col) {
        return document.querySelector("#cell" + row + "-" + col);
    }

    #updateScores(score) {
        this.#currentScore.innerHTML = score;
        if (score > (this.#highestScore.innerHTML)) {
            this.#highestScore.innerHTML = score;
        }
    }

}

