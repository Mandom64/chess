const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let rows = 8;
let cols = 8;
let FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"; /* Starting position*/

const Type = {
    King:   1,
    Queen:  2,
    Rook:   3,
    Bishop: 4,
    Knight: 5,
    Pawn:   6,
    Empty:  0,
};

const Color = {
    White: 1,
    Black: 2,
    None:  0,
};

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Piece {
    constructor(type, color, position) {
        this.type = type;
        this.color = color;
        this.position = position;
    }
}

let Pieces = [];

const PieceImages = {
    [Color.Black]: {
        [Type.King]:   "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
        [Type.Queen]:  "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
        [Type.Rook]:   "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
        [Type.Bishop]: "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
        [Type.Knight]: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
        [Type.Pawn]:   "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",
    },
    [Color.White]: {
        [Type.King]:   "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
        [Type.Queen]:  "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
        [Type.Rook]:   "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
        [Type.Bishop]: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
        [Type.Knight]: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
        [Type.Pawn]:   "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
    }
};

function drawBoard() {
    /* Checker Pattern */
    let rectW = canvas.width / rows;
    let rectH = canvas.height / cols;

    for (let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            let rectX = col * rectW;
            let rectY = row * rectH;

            if((row+col) % 2 == 0) {
                ctx.fillStyle = "#FFFFFF";
            } else {
                ctx.fillStyle = "#FFE194";
            }
            ctx.fillRect(rectX, rectY, rectW, rectH);
        }
    }

    /* TODO: Algebraic Notation */

}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
}

function drawImage(path, x, y) {
    if(!path.length) return;

    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, x, y, img.width*1.5, img.height*1.5);
    }
    img.src = path; 
}

/* Needs simplifying */
function loadPosition() {
    let rank = FEN.split("/");

    for (let row = 0; row < rows; row++) {
        let col = 0;

        for(let i = 0; i < rank[row].length; i++) {
            let square = rank[row].charAt(i);
            if (!isNaN(square)) {
                col += parseInt(square);
                continue;
            }
            
            switch (square) {
                case 'r': Pieces.push(new Piece(Type.Rook, Color.Black, new Position(row, col))); break;
                case 'n': Pieces.push(new Piece(Type.Knight, Color.Black, new Position(row, col))); break;
                case 'b': Pieces.push(new Piece(Type.Bishop, Color.Black, new Position(row, col))); break;
                case 'q': Pieces.push(new Piece(Type.Queen, Color.Black, new Position(row, col))); break;
                case 'k': Pieces.push(new Piece(Type.King, Color.Black, new Position(row, col))); break;
                case 'p': Pieces.push(new Piece(Type.Pawn, Color.Black, new Position(row, col))); break;
                case 'R': Pieces.push(new Piece(Type.Rook, Color.White, new Position(row, col))); break;
                case 'N': Pieces.push(new Piece(Type.Knight, Color.White, new Position(row, col))); break;
                case 'B': Pieces.push(new Piece(Type.Bishop, Color.White, new Position(row, col))); break;
                case 'Q': Pieces.push(new Piece(Type.Queen, Color.White, new Position(row, col))); break;
                case 'K': Pieces.push(new Piece(Type.King, Color.White, new Position(row, col))); break;
                case 'P': Pieces.push(new Piece(Type.Pawn, Color.White, new Position(row, col))); break;
            }
            col++;
        }
    }
}

function drawPieces() {
    let rectW = canvas.width / rows;
    let rectH = canvas.height / cols;
    
    for(let piece of Pieces) {
        let rectX = piece.position.y * rectW;
        let rectY = piece.position.x  * rectH;
        let PieceToDraw = PieceImages[piece.color]?.[piece.type];

        if (PieceToDraw) {
            drawImage(PieceToDraw, rectX + rectW/16, rectY + rectH/16);
        }
    }
}

function draw() {
    clearBoard();
    drawBoard();
    drawPieces();
}

function Move(piece, newSquare) {
    if(piece) {
        piece.position = new Position(newSquare.x, newSquare.y);
    }
}

loadPosition();
draw();
Move(Pieces[1], new Position(2, 2));  
draw();
console.log(Pieces);