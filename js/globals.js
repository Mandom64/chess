/*
 *   Contains global that has game state vars and some maps
 */

export let global = {
    activeColor: null,
    castling : {
        k: 0,
        q: 0,
        K: 0,
        Q: 0,
    },
    halfmoves: 0,
    fullmoves: 1,
};

export function printGlobals() {
    console.log(global);
}

export const PieceImages = {
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

export const Letters = {
    ['a']: 0,
    ['b']: 1,
    ['c']: 2,
    ['d']: 3,
    ['e']: 4,
    ['f']: 5,
    ['g']: 6,
    ['h']: 7,
};

export const Numbers = {
    [0]: 'a',
    [1]: 'b',
    [2]: 'c',
    [3]: 'd',
    [4]: 'e',
    [5]: 'f',
    [6]: 'g',
    [7]: 'h',
};