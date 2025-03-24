const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let b = [];
let rows = 8;
let cols = 8;
/* test */

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

drawBoard();

b[]
function drawPieces() {

}