/*
    TODO: Find a way to make this work with dragging and dropping
	the pieces with the mouse.
*/
import { Letters, Numbers, PieceImages } from './globals.js';
import { isLowerCase, isUpperCase, Vec2 } from './utils.js';

const MoveTypes = {
	Straight: 1,
	Diagonal: 2,
	Knight: 3,
	None: 0,
};

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

	getMoveType(direction) {
		if (Math.abs(direction.row) === Math.abs(direction.col)) return MoveTypes.Diagonal;
		if (direction.row === 0 || direction.col === 0) return MoveTypes.Straight;
		
		return MoveTypes.None;
	}

	isSameColor(piece, piece2) {
		return (isLowerCase(piece) && isLowerCase(piece2)) ||
			(isUpperCase(piece) && isUpperCase(piece2))
			? true
			: false;
	}

	/* Works for straight, diagonal moves */
	isPathClear(from, to, dir) {
		let row = from.row;
		let col = from.col;
		let rowIncrement = dir.row !== 0 ? 1 : 0;
		let colIncrement = dir.col !== 0 ? 1 : 0;

		if (from.row > to.row) rowIncrement = -rowIncrement;
		if (from.col > to.col) colIncrement = -colIncrement;

		while (row !== to.row || col !== to.col) {
			row += rowIncrement;
			col += colIncrement;

			/* No check on the final square in the path, since we might want to capture it */
			if ((row !== to.row || col !== to.col) && this.square[row][col] !== '0') {
				console.log('Error: Path is blocked by ' + this.square[row][col]);
				return false;
			}
		}

		return true;
	}

	isValidMove(from, to) {
		let dir = new Vec2(from.row - to.row, from.col - to.col);
		let piece = this.square[from.row][from.col];
		let nextSquare = this.square[to.row][to.col];

		/* Out of bounds check */
		if (to.row < 0 || to.row > this.rows || to.col < 0 || to.col > this.cols) {
			console.log('Error: move ' + str + 'is outside of the board!');
			return false;
		}

		/* Color check */
		if (nextSquare !== '0') {
			if (this.isSameColor(piece, nextSquare)) {
				console.log('Error: move is blocked by friendly piece!');
				return false;
			}
		}

		/*
			Here lie all the piece constraints/rules and where
			there will 100% be bugs   
		*/
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
				/* Diagonal check */
				if (this.getMoveType(dir) === MoveTypes.Diagonal) {
					console.log('Error: Rook cannot move diagonally!');
					return false;
				}

				/* Check if there is a piece in the path */
				if (this.isPathClear(from, to, dir)) {
					console.log('Path is clear!');
					return true;
				}

				break;
			case 'n':
				return true;
				break;
			case 'b':
				/* Straight check */
				if (this.getMoveType(dir) === MoveTypes.Straight) {
					console.log('Error: Bishop cannot move straight!');
					return false;
				}

				/* Check if there is a piece in the path */
				if (this.isPathClear(from, to, dir)) {
					console.log('Path is clear!');
					return true;
				}

				break;
			case 'q':
				/* Check for arbitrary movements */
				if (!(this.getMoveType(dir) === MoveTypes.Diagonal || this.getMoveType(dir) === MoveTypes.Straight)) {
					console.log("Error: Queen cannot move in this manner!");
					return false;
				}

				/* Check if there is a piece in the path */
				if (this.isPathClear(from, to, dir)) {
					console.log('Path is clear!');
					return true;
				}

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
				/* Diagonal check */
				if (this.getMoveType(dir) === MoveTypes.Diagonal) {
					console.log('Error: Rook cannot move diagonally!');
					return false;
				}

				/* Check if there is a piece in the path */
				if (this.isPathClear(from, to, dir)) {
					console.log('Path is clear!');
					return true;
				}

				break;
			case 'N':
				return true;
				break;
			case 'B':
				/* Straight check */
				if (this.getMoveType(dir) === MoveTypes.Straight) {
					console.log('Error: Bishop cannot move straight!');
					return false;
				}

				/* Check if there is a piece in the path */
				if (this.isPathClear(from, to, dir)) {
					console.log('Path is clear!');
					return true;
				}

				break;
			case 'Q':
				/* Check for arbitrary movements */
				if (!(this.getMoveType(dir) === MoveTypes.Diagonal || this.getMoveType(dir) === MoveTypes.Straight)) {
					console.log("Error: Queen cannot move in this manner!");
					return false;
				}

				/* Check if there is a piece in the path */
				if (this.isPathClear(from, to, dir)) {
					console.log('Path is clear!');
					return true;
				}

				break;
			case 'K':
				return true;
				break;
		}
		return false;
	}

	Move(str) {
		/*
			If a square is 'c7', 'c' is the col and '7' is the row, so
			i can still access the board like so 'board[row][col]' 
		*/
		let from = new Vec2(parseInt(this.rows - str[1]), Letters[str[0]]);
		let to = new Vec2(parseInt(this.rows - str[3]), Letters[str[2]]);

		if (!this.isValidMove(from, to)) {
			console.log('Error: Move ' + str + ' is not valid.');
			return;
		}

		/* If the move is valid, make it */
		this.square[to.row][to.col] = this.square[from.row][from.col];
		this.square[from.row][from.col] = '0';
	}

	Draw(canvas, ctx) {
		/* Square Dimensions */
		let rectW = canvas.width / this.rows;
		let rectH = canvas.height / this.cols;

		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				/* Square position inside canvas */
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
