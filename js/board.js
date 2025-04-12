/*
    TODO: Find a way to make this work with dragging and dropping
	the pieces with the mouse.
*/
import { Letters, Numbers, PieceImages } from './globals.js';
import { isLowerCase, isUpperCase, Vec2 } from './utils.js';

// export class Position {
// 	constructor(row, col) {
// 		this.row = row;
// 		this.col = col;
// 	}
// }

/* 
    Board y is 'this.cols - y' because of algebraic notation for the moves 
*/
export class Board {
	constructor() {
		this.square = [];
		this.rows = 8;
		this.cols = 8;
	}

	Init() {
		for (let row = 0; row < this.rows; row++) {
			this.square[row] = new Array(this.cols);
			this.square[row].fill('0');
		}
	}

	Print() {
		console.table(this.square);
	}

	isValidMove(from, to) {
		let dir = new Vec2(from.row - to.row, from.col - to.col);
		let piece = this.square[from.row][from.col];
		let nextSquare = this.square[to.row][to.col];

		/* Out of bounds check */
		if (to.row < 0 || to.row > this.rows || to.col < 0 || to.col > this.cols) {
			console.log('Error: move ' + str + 'is illegal!');
			return false;
		}

		/* Color check */
		if (nextSquare !== '0') {
			if (
				(isLowerCase(piece) && isLowerCase(nextSquare)) ||
				(isUpperCase(piece) && isUpperCase(nextSquare))
			) {
				console.log('Error: move is blocked by friendly piece');
				return false;
			}
		}

		switch (piece) {
			case 'p':
				/* Forward check */
				if (dir.col === 0 && dir.row !== 0 && nextSquare === '0') {
					if (from.row == 1 && dir.row >= -2) return true; // Pawn can move 2 squares at start
					if (dir.row === -1) return true; // Pawn can only move forward
				}

				/* Diagonal check */
				if (Math.abs(dir.row) === 1 && dir.col !== 0 && nextSquare !== '0') {
					return true;
				}

				break;
			case 'r':
				return true;
				break;
			case 'n':
				return true;
				break;
			case 'b':
				return true;
				break;
			case 'q':
				return true;
				break;
			case 'k':
				return true;
				break;
			case 'P':
				/* Forward check */
				if (dir.col === 0 && dir.row !== 0 && nextSquare === '0') {
					if (from.row == 6 && dir.row >= -2) return true; // Pawn can move 2 squares at start
					if (dir.row === 1) return true; // Pawn can only move forward
				}

				/* Diagonal check */
				if (Math.abs(dir.row) === 1 && dir.col !== 0 && nextSquare !== '0') {
					return true;
				}

				break;
			case 'R':
				return true;
				break;
			case 'N':
				return true;
				break;
			case 'B':
				return true;
				break;
			case 'Q':
				return true;
				break;
			case 'K':
				return true;
				break;
		}
		return false;
	}

	// c7c6 = { x: 1, y: 7 }, { x: 1, y: 6}
	// c7: row: 7, col: 2
	// c6: row: 6, col: 2
	Move(str) {
		let from = new Vec2(parseInt(this.rows - str[1]), Letters[str[0]]);
		let to = new Vec2(parseInt(this.rows - str[3]), Letters[str[2]]);

		if (!this.isValidMove(from, to)) {
			console.log('Error: Move ' + str + ' is not valid.');
			return;
		}

		this.square[to.row][to.col] = this.square[from.row][from.col];
		this.square[from.row][from.col] = '0';
	}

	Draw(canvas, ctx) {
		let rectW = canvas.width / this.rows;
		let rectH = canvas.height / this.cols;

		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				let rectX = col * rectW;
				let rectY = row * rectH;

				/* Checker Pattern */
				if ((row + col) % 2 === 0) {
					ctx.fillStyle = '#FFFFFF';
				} else {
					ctx.fillStyle = '#FFE194';
				}
				ctx.fillRect(rectX, rectY, rectW, rectH);

				/* Algebraic Notation */
				if (col === this.cols - 1) {
					ctx.fillStyle = '#000000';
					ctx.fillText(this.rows - row + 1, rectX, rectY);
				}
				if (row === this.rows - 1) {
					ctx.fillStyle = '#000000';
					ctx.fillText(Numbers[col], rectX, rectY + rectH);
				}

				/* Pieces */
				let PieceToDraw = PieceImages[this.square[row][col]];

				if (PieceToDraw) {
					let img = new Image();
					img.onload = function () {
						let w = rectW / img.naturalWidth;
						let h = rectH / img.naturalHeight;
						let x = rectX + w;
						let y = rectY + h;
						ctx.drawImage(img, x, y, img.width * w, img.height * h);
					};
					img.src = PieceToDraw;
				}
			}
		}
	}
}
