const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let rows = 8;
let cols = 8;
let b = new Array(rows);
let FEN = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R"; /* Starting position*/

/* Piece Images */
const bKingImg   = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg";
const bQueenImg  = "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";
const bRookImg   = "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";
const bBishopImg = "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";
const bKnightImg = "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";
const bPawnImg   = "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg";
const wKingImg   = "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg";
const wQueenImg  = "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg";
const wRookImg   = "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
const wBishopImg = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
const wKnightImg = "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
const wPawnImg   = "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg";

const PieceType = {
    King:   1,
    Queen:  2,
    Rook:   3,
    Bishop: 4,
    Knight: 5,
    Pawn:   6,
    Empty:  0,
};

let PieceColor = {

};


function initBoard() {
    for(let row = 0; row < rows; row++) {
        b[row] = new Array(rows);
        for(let col = 0; col < cols; col++) {
            b[row][col] = '0';
        }
    }
}

function drawPattern() {
    let rectW = canvas.width / rows;
    let rectH = canvas.height / cols;

    for (let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            let rectX = col * rectW;
            let rectY = row * rectH;

            if((row+col) % 2 == 0) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "#FFE194";
            }
            ctx.fillRect(rectX, rectY, rectW, rectH);
        }
    }
}

function printBoard() {
    for(let row = 0; row < rows; row++) {
        console.log(b[row].join(" "));
    }
}

function drawImage(path, x, y) {
    if(path == " ") {
        return;
    }

    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, x, y, img.width*1.5, img.height*1.5);
    }
    img.src = path;
}

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
                case 'r': b[row][col] = 'r'; break;
                case 'n': b[row][col] = 'n'; break;
                case 'b': b[row][col] = 'b'; break;
                case 'q': b[row][col] = 'q'; break;
                case 'k': b[row][col] = 'k'; break;
                case 'p': b[row][col] = 'p'; break;
                case 'R': b[row][col] = 'R'; break;
                case 'N': b[row][col] = 'N'; break;
                case 'B': b[row][col] = 'B'; break;
                case 'Q': b[row][col] = 'Q'; break;
                case 'K': b[row][col] = 'K'; break;
                case 'P': b[row][col] = 'P'; break;
            }

            col++;
        }
    }
}
// let FEN = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR"; /* Starting position*/
function drawPieces() {
    let rectW = canvas.width / rows;
    let rectH = canvas.height / cols;
    let rank = FEN.split("/");
    let PieceToDraw;

    for (let row = 0; row < rows; row++) {
        let col = 0;

        for(let i = 0; i < rank[row].length; i++) {
            let square = rank[row].charAt(i);
            if (!isNaN(square)) {
                col += parseInt(square);
                continue;
            }
            let rectX = col * rectW;
            let rectY = row * rectH;
            
            switch (square) {
                case 'r': PieceToDraw = bRookImg; break;
                case 'n': PieceToDraw = bKnightImg; break;
                case 'b': PieceToDraw = bBishopImg; break;
                case 'q': PieceToDraw = bQueenImg; break;
                case 'k': PieceToDraw = bKingImg; break;
                case 'p': PieceToDraw = bPawnImg; break;
                case 'R': PieceToDraw = wRookImg; break;
                case 'N': PieceToDraw = wKnightImg; break;
                case 'B': PieceToDraw = wBishopImg; break;
                case 'Q': PieceToDraw = wQueenImg; break;
                case 'K': PieceToDraw = wKingImg; break;
                case 'P': PieceToDraw = wPawnImg; break;
            }
            
            if (PieceToDraw) {
                drawImage(PieceToDraw, rectX + rectW/16, rectY + rectH/16);
            }
            col++;
        }
    }
}

initBoard();
loadPosition();
drawPattern();
drawPieces();
printBoard();
