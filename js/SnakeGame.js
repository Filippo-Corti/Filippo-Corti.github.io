import Apple from './Apple.js';
import Snake from './Snake.js';
import MoveData from './MoveData.js';
import { globals as G } from './globals.js';

export default class SnakeGame {

    #gameGui; //Game GUI
    #snake; //Snake
    #apple;
    direction;
    movingTimer;

    constructor(gameGui) {
        this.#gameGui = gameGui;
        this.#snake = new Snake(this);
        this.generateApple();
        this.direction = 'D';
    }

    getSnake() {
        return this.#snake.getSnake();
    }

    getApple() {
        return this.#apple;
    }

    startMoving() {
        this.movingTimer = setInterval(() => {
            this.moveSnake(this.direction);
        }, G.PACE);
    }

    stopMoving() {
        if (this.movingTimer !== null) {
            clearInterval(this.movingTimer);
        }
    }

    reset() {
        this.stopMoving();
        this.direction = 'D';
        this.#gameGui.regenerate();
        this.#snake = new Snake(this);
        this.generateApple();
    }

    gameOver() {
        this.stopMoving();
        this.#gameGui.gameOver();
    }

    generateApple() {
        this.#apple = new Apple(this);
    }

    appleEaten() {
        this.generateApple();
    }

    changeSnakeDirection(key) {
        this.stopMoving();
        this.moveSnake(key);
        this.startMoving();
    }

    moveSnake(key) {
        let moveData;
        if (!this.isKeyTheOppositeOfDirection(key)) {
            let cellRotation = this.#getSnakeRotation(this.direction, key);
            this.direction = key;
            switch (this.direction) {
                case 'W':
                    moveData = this.#snake.move(-1, 0, cellRotation);
                    break;
                case 'A':
                    moveData = this.#snake.move(0, -1, cellRotation);
                    break;
                case 'S':
                    moveData = this.#snake.move(1, 0, cellRotation);
                    break;
                case 'D':
                    moveData = this.#snake.move(0, 1, cellRotation);
                    break;
                default:
                    return;
            }
            this.#updateGUI(moveData);
        }
    }

    isCellFree(cell) {
        return this.isCellInsideTheBoard(cell) && !this.isCellPartOfTheSnake(cell);
    }

    isCellInsideTheBoard(cell) {
        return (cell.row >= 0 && cell.row < G.TOTAL_ROWS) && (cell.col >= 0 && cell.col < G.TOTAL_COLS);
    }

    isCellPartOfTheSnake(cell) {
        let snake = this.#snake.getSnake();
        let returnValue = false;
        snake.forEach(el => {
            if (el.row == cell.row && el.col == cell.col) {
                returnValue = true;
            }
        });
        return returnValue;
    }

    isCellAnApple(cell) {
        if (!this.#apple) return false;
        return (this.#apple.row === cell.row && this.#apple.col === cell.col);
    }

    isKeyTheOppositeOfDirection(key) {
        if (key === 'W' && this.direction === 'S') {
            return true;
        }
        if (key === 'S' && this.direction === 'W') {
            return true;
        }
        if (key === 'A' && this.direction === 'D') {
            return true;
        }
        if (key === 'D' && this.direction === 'A') {
            return true;
        }
    }

    #getSnakeRotation(lastDir, newDir) {
        if (lastDir === newDir) {
            return null;
        }
        if ((lastDir === 'D' && newDir === 'W') || (lastDir === 'S' && newDir === 'A')) {
            return 0;
        }
        if ((lastDir === 'A' && newDir === 'W') || (lastDir === 'S' && newDir === 'D')) {
            return 90;
        }
        if ((lastDir === 'A' && newDir === 'S') || (lastDir === 'W' && newDir === 'D')) {
            return 180;
        }
        if ((lastDir === 'D' && newDir === 'S') || (lastDir === 'W' && newDir === 'A')) {
            return 270;
        }
    }

    #updateGUI(moveData) {
        this.#gameGui.updateGUI(moveData, this.getApple());
    }

}