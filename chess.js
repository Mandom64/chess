const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let rows = 8;
let cols = 8;
let b = new Array(rows);

function initBoard() {
    for(let row = 0; row < rows; row++) {
        b[row] = new Array(rows);
        for(let col = 0; col < cols; col++) {
            b[row][col] = 0;
        }
    }
}

function drawBoard() {
    let squareWidth = canvas.width / rows;
    let squareHeight = canvas.height / cols;

    for (let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            if((row+col) % 2 == 0) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "black";
            }
            ctx.fillRect(col * squareWidth, row * squareHeight, squareWidth, squareHeight);
        }
    }
}

function printBoard() {
    for(let row = 0; row < rows; row++) {
        console.log(b[row].join(" "));
    }
}

function drawPieces() {
    let squareWidth = canvas.width / rows;
    let squareHeight = canvas.height / cols;
    
    ctx.fillStyle = "red";
    for (let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            ctx.fillText(b[row][col], col * squareWidth, row * squareHeight, squareWidth, squareHeight);
        }
    }
}

initBoard();
drawBoard();
drawPieces();
printBoard();