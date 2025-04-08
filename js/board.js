/*
    TODO: Find a way to make this work with dragging and dropping
	the pieces with the mouse.
*/
import { Letters, Numbers, PieceImages } from './globals.js';
import { isLowerCase, isUpperCase } from './utils.js';

export class Position {
	constructor(col, row) {
		this.col = col;
		this.row = row;
	}
}

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
		// console.log(this.square);
	}

	/* 
        TODO: There must be a better way to access the board using algebraic notation
    */
	isValidMove(str) {
		let from = new Position(Letters[str[0]], this.cols - str[1]);
		let to = new Position(Letters[str[2]], this.cols - str[3]);
		let piece = this.square[from.row][from.col];
		let nextSquare = this.square[to.row][to.col];

		/* Out of bounds check */
		if (to.row < 0 || to.row > this.rows || to.col < 0 || to.col > this.cols) {
			console.log('Error: move ' + str + 'is illegal!');
			return;
		}

		/* Color check */
		if (nextSquare !== '0') {
			if (
				(isLowerCase(piece) && isLowerCase(nextSquare)) ||
				(isUpperCase(piece) && isUpperCase(nextSquare))
			) {
				console.log('isLowerCase(piece) && isLowerCase(nextSquare): ' + (isLowerCase(piece) && isLowerCase(nextSquare)));
				console.log('Error: move ' + str + ' is blocked by friendly piece');
				return;
			}
		}

		switch (piece) {
			case 'p':
				/* Forward check */
				if (nextSquare === '0') {
					let squaresMoved = from.row - to.row;
					console.log('SquaresMoved: ' + squaresMoved);
					if (from.row == 1 && squaresMoved >= -2) return true;
					if (squaresMoved === -1) return true;
				}
				/* Diagonal check */
				// if (this.square[])
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

	Move(str) {
		let from = new Position(Letters[str[0]], this.cols - str[1]);
		let to = new Position(Letters[str[2]], this.cols - str[3]);

		if (!this.isValidMove(str)) {
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
