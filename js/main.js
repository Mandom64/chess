/*
	TODO:
		* Complete FEN functionality
		* Implement move rules
		* Use mouse to move pieces
*/

import { FEN } from './fen.js';
import { Board } from './board.js';
import { printGlobals } from './globals.js';

/* Main canvas for the board */
const canvas = document.getElementById('boardCanvas');
const ctx = canvas.getContext('2d');

/* Objects */
let board = new Board();
let fen = new FEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

function Init() {
	board.Init();
	fen.Init(board);
	board.Draw(canvas, ctx);
}

// async function clearCanvas() {
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// /* TODO: Understand how js executes code, unless i do this scrappy thing
//          images persist when redrawing */
// async function draw() {
// 	await clearCanvas();
// 	board.Draw(canvas, ctx);
// }


/* Main Loop */
Init();

const moveInput = document.getElementById('moveInput');
moveInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		console.clear();
		const nextMove = moveInput.value;	  
		board.Move(nextMove);
		board.Draw(canvas, ctx);		
		board.Print();
		fen.Update(board);
		printGlobals();
		moveInput.value = ''; // Clear the text input box
	}
});

