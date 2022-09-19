import GUI from './GUI.js';
import SnakeGame from './SnakeGame.js';
import { globals as G } from './globals.js';


/* Create Game Board and Interface and link them together */
const gui = new GUI(G.TOTAL_ROWS, G.TOTAL_COLS);
const snakeGame = new SnakeGame(gui);
gui.linkGameLogic(snakeGame);

document.querySelector(".game-buttons__start").addEventListener('click', () => {
    snakeGame.reset();
    gui.startGame();
})


/* Settings */

const settingsButton = document.querySelector(".game-settings__button");

settingsButton.addEventListener('click', () => {
    document.querySelector("#game-settings").showModal();
})

const settingsSaveButton = document.querySelector(".game-settings__save");

settingsSaveButton.addEventListener('click', () => {
    let newPace = 450 - document.querySelector("#game-speed").value;
    document.querySelector("#game-settings").close();
    G.PACE = newPace;
})

/* Close Game Over Button*/

const closeGameOver = document.querySelector(".game-over__button");

closeGameOver.addEventListener('click',() => {
    document.querySelector("#game-over").close();
})


/* Mobile Controls */


// CONTROLS FOR SCROLL-MOVING
/* document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // right swipe 
            gui.mobileMove('A');
        } else {
            gui.mobileMove('D');
            // left swipe 
        }
    } else {
        if (yDiff > 0) {
            // down swipe
            gui.mobileMove('W');
        } else {
            gui.mobileMove('S');
            // up swipe 
        }
    }
    xDown = null;
    yDown = null;
};  */

