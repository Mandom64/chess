/*
    Main script for the app, might break it into more files later
    TODO:
        * FEN
        * Move generation
		* Use mouse to move pieces
*/
const canvas = document.getElementById('Board');
const ctx = canvas.getContext('2d');

class Position {
	constructor(col, row) {
		this.col = col;
		this.row = row;
	}
}

/* Columns are accessed in reverse like so 'board.cols - y', 
   because im using extended algebraic notation for the moves */
class Board {
	constructor() {
		this.square = [];
		this.rows = 8;
		this.cols = 8;
	}

	Init() {
		for (let row = 0; row < this.rows; row++) {
			this.square[row] = new Array(board.cols);
			this.square[row].fill('0');
		}
	}

	Display() {
		console.table(this.square);
		console.log(this.square);
	}

	/* 
        TODO: There must be a better way to access the board using algebraic notation
    */
	isValidMove(str) {
		let from = new Position(Letters[str[0]], board.cols - str[1]);
		let to = new Position(Letters[str[2]], board.cols - str[3]);
		let piece = this.square[from.row][from.col];

		if (
			to.row < 0 ||
			to.row > board.rows ||
			to.col < 0 ||
			to.col > board.cols
		) {
			console.log('Error: move ' + str + 'is illegal!');
			return;
		}

		// console.log(piece, from, this.square[from.row][from.col]);
		// console.log(piece, to, this.square[to.row][to.col]);
		// console.log("Abs: " + Math.abs(from.row - to.row));

		switch (piece) {
			case 'p':
				/* Forward check */
				if (this.square[to.row][to.col] == '0') {
					if (from.row == 1 && Math.abs(from.row - to.row) <= 2) return true;
					if (Math.abs(from.row - to.row) == 1) return true;
				}
				/* Diagonal check */
				//if (this.square[])
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
				console.log('piece selected is: ' + piece);
				if (
					this.square[to.row][to.col] == '0' &&
					Math.abs(from.row - to.row) == 1
				)
					return true;
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
		let from = new Position(Letters[str[0]], board.cols - str[1]);
		let to = new Position(Letters[str[2]], board.cols - str[3]);

		if (!this.isValidMove(str)) {
			console.log('Error: Move ' + str + ' is not valid.');
			return;
		}

		this.square[to.row][to.col] = this.square[from.row][from.col];
		this.square[from.row][from.col] = '0';
	}
}

/* Globals */
let board = new Board();
let FEN =
	'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; /* Starting position*/
let activeColor;
let castling = {
	k: 0,
	q: 0,
	K: 0,
	Q: 0,
};
let halfmoves;
let fullmoves = 1;

const PieceImages = {
	['k']: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
	['q']: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
	['r']: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
	['b']: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
	['n']: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
	['p']: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
	['K']: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
	['Q']: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
	['R']: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
	['B']: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
	['N']: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
	['P']: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
};

const Letters = {
	['a']: 0,
	['b']: 1,
	['c']: 2,
	['d']: 3,
	['e']: 4,
	['f']: 5,
	['g']: 6,
	['h']: 7,
};

function Init() {
	board.Init();
	loadFEN();
}

function loadFEN() {
	let fields = FEN.split(' ');
	let rank = fields[0].split('/');

	for (let row = 0; row < board.rows; row++) {
		let col = 0;
		for (let i = 0; i < rank[row].length; i++) {
			let piece = rank[row].charAt(i);

			if (!isNaN(piece)) {
				col += parseInt(piece);
				continue;
			}

			board.square[row][col] = piece;
			col++;
		}
	}

	activeColor = fields[1];

	if (fields[2] == '-') {
		castling.k = castling.q = castling.K = castling.Q = 0;
	} else {
		for (i = 0; i < fields[2].length; i++) {
			switch (fields[2].charAt(i)) {
				case 'k':
					castling.k = 1;
					break;
				case 'q':
					castling.q = 1;
					break;
				case 'K':
					castling.K = 1;
					break;
				case 'Q':
					castling.Q = 1;
					break;
			}
		}
	}
}

function genFEN() {
	let FEN = '';

	for (let row = 0; row < board.rows; row++) {
		for (let col = 0; col < board.cols; col++) {
			let e = 0;

			if (board.square[row][col] == '0') {
				while (board.square[row][col] == '0') {
					e++;
					if (col + 1 < board.cols) col++;
					else break;
				}
				FEN += e.toString();
			}
			if (board.square[row][col] != '0') {
				FEN += board.square[row][col];
			}
		}
		if (row + 1 < board.rows) FEN += '/';
	}
	console.log(FEN);
	return FEN;
}

function drawBoard() {
	let rectW = canvas.width / board.rows;
	let rectH = canvas.height / board.cols;

	for (let row = 0; row < board.rows; row++) {
		for (let col = 0; col < board.cols; col++) {
			let rectX = col * rectW;
			let rectY = row * rectH;

			/* Checker Pattern */
			if ((row + col) % 2 == 0) {
				ctx.fillStyle = '#FFFFFF';
			} else {
				ctx.fillStyle = '#FFE194';
			}
			ctx.fillRect(rectX, rectY, rectW, rectH);

			/* Algebraic Notation */
			if (col == board.cols - 1) {
				ctx.fillStyle = '#000000';
				ctx.fillText(board.rows - row + 1, rectX, rectY);
			}
			if (row == board.rows - 1) {
				ctx.fillStyle = '#000000';
				ctx.fillText(col + 1, rectX, rectY + rectH);
			}
		}
	}
}

async function clearBoard() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPieces() {
	let rectW = canvas.width / board.rows;
	let rectH = canvas.height / board.cols;

	for (let row = 0; row < board.rows; row++) {
		for (let col = 0; col < board.cols; col++) {
			let rectX = col * rectW;
			let rectY = row * rectH;
			let PieceToDraw = PieceImages[board.square[row][col]];

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

/* TODO: Understand how js executes code, unless i do this scrappy thing
         images persist when redrawing */
async function draw() {
	await clearBoard();
	drawBoard();
	drawPieces();
}

/* Main Loop */
Init();
board.Move('c7c5');
board.Move('c1d4');
board.Move('c5d4');
board.Display();
draw();
let newFEN = genFEN();
