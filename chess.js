const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let rows = 8;
let cols = 8;
let b = new Array(rows);
let FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; /* Starting position*/

function initBoard() {
    for(let row = 0; row < rows; row++) {
        b[row] = new Array(rows);
        for(let col = 0; col < cols; col++) {

        }
    }
}

function drawBoard() {
    let rectWidth = canvas.width / rows;
    let rectHeight = canvas.height / cols;

    for (let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            let rectX = col * rectWidth;
            let rectY = row * rectHeight;

            if((row+col) % 2 == 0) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "#FFE194";
            }
            ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        }
    }
}

function printBoard() {
    for(let row = 0; row < rows; row++) {
        console.log(b[row].join(" "));
    }
}

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

// let FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; /* Starting position*/

function drawPieces() {
    let rectWidth = canvas.width / rows;
    let rectHeight = canvas.height / cols;
    let ranks = FEN.split("/");
    console.log(ranks);

    for (let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            let rectX = col * rectWidth;
            let rectY = row * rectHeight;
            let PieceToDraw;
            if(ranks[row][col] == 'r') {
                PieceToDraw = bRookImg;
            } else if(ranks[row][col] == 'n') {
                PieceToDraw = bKnightImg;
            } else if(ranks[row][col] == 'b') {
                PieceToDraw = bBishopImg;
            } else if(ranks[row][col] == 'q') {
                PieceToDraw = bQueenImg;
            } else if(ranks[row][col] == 'k') {
                PieceToDraw = bKingImg;
            } else if(ranks[row][col] == 'p') {
                PieceToDraw = bPawnImg;
            } else if(ranks[row][col] == 'R') {
                PieceToDraw = wRookImg;
            } else if(ranks[row][col] == 'N') {
                PieceToDraw = wKnightImg;
            } else if(ranks[row][col] == 'B') {
                PieceToDraw = wBishopImg;
            } else if(ranks[row][col] == 'Q') {
                PieceToDraw = wQueenImg;
            } else if(ranks[row][col] == 'K') {
                PieceToDraw = wKingImg;
            } else if(ranks[row][col] == 'P') {
                PieceToDraw = wPawnImg;
            }
            // ctx.fillStyle = "red";
            // ctx.fillText(b[row][col], rectX, rectY, rectWidth, rectHeight);
            drawImage(PieceToDraw, rectX + rectWidth/16, rectY + rectHeight/16);
        }
    }
}

initBoard();
drawBoard();
drawPieces();
printBoard();
