/*
	Main script for the app, might break it into more files later
		TODO:
			* FEN
			* Move generation
			* Use mouse to move pieces
*/
import { FEN } from './fen.js';
import { Board } from './board.js';

const canvas = document.getElementById('Board');
const ctx = canvas.getContext('2d');

let board = new Board();
let fen = new FEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

function Init() {
	board.Init();
	fen.Init(board);
}

async function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* TODO: Understand how js executes code, unless i do this scrappy thing
         images persist when redrawing */
async function draw() {
	await clearCanvas();
	board.Draw(canvas, ctx);
}

/* Main Loop */
Init();
board.Move('c7c5');
board.Move('c1d4');
board.Move('c5d4');
board.Print();
board.Draw(canvas, ctx);
fen.Update(board);

