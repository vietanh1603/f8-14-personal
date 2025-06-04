import { DOMReferences } from './references.js';
import { questions, prizeMap } from './const.js';
import { GameState } from './gameStats.js';
import { Renderer } from './render.js';
import { GameLogic } from './logicGame.js';

// Initialize game components
const gameState = new GameState(questions, prizeMap);
const renderer = new Renderer(DOMReferences);
const gameLogic = new GameLogic(gameState, renderer);

// Start the game
gameLogic.initGame();