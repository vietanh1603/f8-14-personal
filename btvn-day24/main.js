// main.js
import { GameLogic } from './logicGame.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameLogic();
    game.initGame();
});