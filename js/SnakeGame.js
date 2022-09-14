import Apple from './Apple.js';
import Snake from './Snake.js';
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
        this.#gameGui.eatApple();
        this.generateApple();
    }

    changeSnakeDirection(key) {
        this.stopMoving();
        this.moveSnake(key);
        this.startMoving();
    }

    moveSnake(key) {
        if (!this.isKeyTheOppositeOfDirection(key)) {
            this.direction = key;
            switch (this.direction) {
                case 'W':
                    this.#snake.move(-1, 0);
                    break;
                case 'A':
                    this.#snake.move(0, -1);
                    break;
                case 'S':
                    this.#snake.move(1, 0);
                    break;
                case 'D':
                    this.#snake.move(0, 1);
                    break;
                default:
                    return;
            }
            this.#updateGUI();
        }
    }

    isCellFree(cell) {
        return this.#gameGui.isCellOccupiable(cell);
    }

    isCellAnApple(cell) {
        return this.#gameGui.isCellAnApple(cell);
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

    #updateGUI() {
        this.#gameGui.updateGUI(this.getSnake(), this.getApple());
    }

}