import { globals as G } from './globals.js';

export default class GUI {

    #gameBoardDiv; //Board (Div)
    #currentScoreEl;
    #highestScoreEl;
    #gameOverModal;
    #rows;
    #cols;
    #snakeGame;
    #isGameRunning;

    constructor(rows, cols) {
        this.#isGameRunning = false;
        this.#rows = rows;
        this.#cols = cols;
        this.#initControls();
        this.#generateBoard();
    }

    /* Public Methods */

    linkGameLogic(snakeGame) {
        this.#snakeGame = snakeGame;
    }

    startGame() {
        this.#isGameRunning = true;
        this.#drawDefaultSnake();
        this.#updateApplePosition(this.#snakeGame.getApple());
        this.#snakeGame.startMoving();
    }

    updateGUI(moveData, apple) {
        if (moveData === undefined) return;
        this.#updateSnakePosition(moveData);
        this.#updateApplePosition(apple);
        this.#updateScores(moveData.snakeLength - G.DEFAULT_SNAKE_LENGTH);
    }

    gameOver() {
        if (this.#isGameRunning) { //Prevents multiple executions
            this.#gameOverModal.showModal();
        }
        this.#isGameRunning = false;
    }

    regenerate() {
        this.#emptyBoard();
    }

    mobileMove(key) {
        this.#snakeGame.changeSnakeDirection(key);
    }

    /* Private Methods */

    #initControls() {
        window.addEventListener('keydown', (e) => {
            if (this.#isGameRunning)
                this.#snakeGame.changeSnakeDirection(e.key.toUpperCase());
        })
    }

    #generateBoard() {
        this.#currentScoreEl = document.querySelector(".current-score");
        this.#highestScoreEl = document.querySelector(".highest-score");
        this.#gameOverModal = document.querySelector("#game-over");
        this.#gameBoardDiv = document.createElement("div");
        this.#gameBoardDiv.classList.add("board");
        document.querySelector(".game-container").append(this.#gameBoardDiv);
        this.#fillBoard();
    }

    #fillBoard() {
        for (let i = 0; i < this.#cols; i++) {
            for (let j = 0; j < this.#rows; j++) {
                let cell;
                cell = document.createElement("div");
                cell.classList.add("board__cell");
                cell.setAttribute("cell-type", "empty")
                cell.id = "cell" + i + "-" + j;
                this.#gameBoardDiv.append(cell);
            }
        }
    }

    #emptyBoard() {
        for (let i = 0; i < this.#cols; i++) {
            for (let j = 0; j < this.#rows; j++) {
                let currentCell = this.#getCellDivFromCoordinates(i, j);
                currentCell.setAttribute("cell-type", "empty");
                currentCell.style.transform = "rotate(0deg)";
            }
        }
    }

    #drawDefaultSnake() {
        let snake = this.#snakeGame.getSnake();
        let currentCell;
        //Draw Body
        for (let i = 0; i < snake.length - 1; i++) {
            currentCell = document.querySelector("#cell" + snake[i].row + "-" + snake[i].col);
            currentCell.setAttribute("cell-type", "snake");
            currentCell.style.transform = "rotate(90deg)";
        }
        //Draw Head
        currentCell = document.querySelector("#cell" + snake[snake.length - 1].row + "-" + snake[snake.length - 1].col);
        currentCell.setAttribute("cell-type", "snake-head");
        currentCell.style.transform = "rotate(90deg)";
    }

    #updateSnakePosition(snakeData) {
        let cellDiv;
        //Delete 
        cellDiv = this.#getCellDivFromCoordinates(snakeData.cellToDelete.row, snakeData.cellToDelete.col);
        cellDiv.setAttribute("cell-type", "empty");
        cellDiv.style.transform = "rotate(0deg)";
        //Update
        cellDiv = this.#getCellDivFromCoordinates(snakeData.cellToUpdate.row, snakeData.cellToUpdate.col);
        if (snakeData.cellToUpdate.curve != null) {
            cellDiv.setAttribute("cell-type", "snake-curve");
            cellDiv.style.transform = "rotate(" + snakeData.cellToUpdate.curve + "deg)";
        }
        else {
            cellDiv.setAttribute("cell-type", "snake");
        }
        //New Head
        cellDiv = this.#getCellDivFromCoordinates(snakeData.cellHead.row, snakeData.cellHead.col);
        cellDiv.setAttribute("cell-type", "snake-head");
        this.#styleTextureDirection(cellDiv);
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

    #updateApplePosition(apple) {
        let appleCell = this.#getCellDivFromCoordinates(apple.row, apple.col);
        appleCell.setAttribute("cell-type", "apple");
    }

    #getCellDivFromCoordinates(row, col) {
        return document.querySelector("#cell" + row + "-" + col);
    }

    #updateScores(score) {
        this.#currentScoreEl.innerHTML = score;
        if (score > (this.#highestScoreEl.innerHTML)) {
            this.#highestScoreEl.innerHTML = score;
        }
    }

}

