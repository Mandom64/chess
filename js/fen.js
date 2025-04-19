/*
 *   FEN stuff
 */

import { global } from './globals.js';

export class FEN {
	constructor(string) {
		this.string = string;
	}

	Init(board) {
		let fields = this.string.split(' ');
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

		global.activeColor = fields[1];

		if (fields[2] === '-') {
			global.castling.k =
				global.castling.q =
				global.castling.K =
				global.castling.Q =
					0;
		} else {
			for (let i = 0; i < fields[2].length; i++) {
				switch (fields[2].charAt(i)) {
					case 'k':
						global.castling.k = 1;
						break;
					case 'q':
						global.castling.q = 1;
						break;
					case 'K':
						global.castling.K = 1;
						break;
					case 'Q':
						global.castling.Q = 1;
						break;
				}
			}
		}
	}

	Update(board) {
		this.string = '';

		for (let row = 0; row < board.rows; row++) {
			for (let col = 0; col < board.cols; col++) {
				let e = 0;

				if (board.square[row][col] === '0') {
					while (board.square[row][col] === '0') {
						e++;
						if (col + 1 < board.cols) col++;
						else break;
					}
					this.string += e.toString();
				}
				if (board.square[row][col] != '0') {
					this.string += board.square[row][col];
				}
			}
			if (row + 1 < board.rows) this.string += '/';
		}
		
		console.log('Updated FEN: ' + this.string);
		return this.string;
	}
}
