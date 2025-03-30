/*
    Main script for the app, might break it into more files later 
*/
const canvas = document.getElementById("Board");
const ctx = canvas.getContext("2d");

class Board {
    constructor() {
        this.square = [];
        this.rows = 8;
        this.cols = 8;
    }
    
    Init() {
        for(let row = 0; row < board.rows; row++) {
            this.square[row] = new Array(board.cols);
            this.square[row].fill("0");
        }
    }

    Update(pieces) {
        for(let piece of pieces) {
            let row = piece.position.x;
            let col = piece.position.y
            this.square[row][col] = piece.type;
        }
    }

    Display() {
        console.table(this.square);
        console.log(this.square);
    }

    Move(row, col) {
        
    }
}

/* Globals */
let board = new Board(); /* Internal representation of the board */
let pieces = []; /* List of all the pieces currently on the board */
let FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"; /* Starting position*/

const PieceImages = {
    ["k"]: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
    ["q"]: "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
    ["r"]: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
    ["b"]: "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
    ["n"]: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
    ["p"]: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",
    ["K"]: "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
    ["Q"]: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
    ["R"]: "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
    ["B"]: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
    ["N"]: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
    ["P"]: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
    
}

/* TODO: Needs simplifying */
function loadFEN() {
    let rank = FEN.split("/");

    for (let row = 0; row < board.rows; row++) {
        let col = 0;
        for(let i = 0; i < rank[row].length; i++) {
            let piece = rank[row].charAt(i);

            if (!isNaN(piece)) {
                col += parseInt(piece);
                continue;
            }

            board.square[row][col] = piece;
            col++;
        }
    }
}

function genFEN() {
    let FEN = "";
    board.Update(pieces);
    board.Display();
    
    for(let row = 0; row < board.rows; row++) {
        for(let col = 0; col < board.cols; col++) {
            let e = 0;

            if(board.square[row][col] == "0") {
                while(board.square[row][col] == "0") {
                    e++;
                    if(col + 1 < board.cols) 
                        col++; 
                    else 
                        break;
                }
                FEN += e.toString();
            }
            if(board.square[row][col] != "0"){
                FEN += board.square[row][col];
            }
        }
        FEN += "/";
    }
    console.log(FEN);

}

function drawBoard() {
    /* Checker Pattern */
    let rectW = canvas.width / board.rows;
    let rectH = canvas.height / board.cols;

    for (let row = 0; row < board.rows; row++) {
        for(let col = 0; col < board.cols; col++) {
            let rectX = col * rectW;
            let rectY = row * rectH;

            if((row + col) % 2 == 0) {
                ctx.fillStyle = "#FFFFFF";
            } else {
                ctx.fillStyle = "#FFE194";
            }
            ctx.fillRect(rectX, rectY, rectW, rectH);
        }
    }

    /* TODO: Algebraic Notation */

}

async function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawImage(path, x, y) {
    if(path) {
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, x, y, img.width*1.5, img.height*1.5);
        }
        img.src = path; 
    }
}

/* TODO: remove fixed values for adjusting image position and size to the board */
function drawPieces() {
    let rectW = canvas.width / board.rows;
    let rectH = canvas.height / board.cols;
    
    for(let row = 0; row < board.rows; row++) {
        for(let col = 0; col < board.cols; col++) {
            let rectX = col * rectW;
            let rectY = row * rectH;
            let PieceToDraw = PieceImages[board.square[row][col]];

            if (PieceToDraw) {
                drawImage(PieceToDraw, rectX + rectW/16, rectY + rectH/16);
            }
        }
    }
}

/* TODO: Understand how js executes code and unless i do this scrappy thing
         images persist when redrawing */
async function draw() {
    await clearBoard();
    drawBoard();
    drawPieces();
}

function Init(){
    board.Init();
    loadFEN();
}

Init();
// pieces[1].Move(new Position(2, 2));
// draw();
// pieces[1].Move(new Position(3, 3));
// draw();
// pieces[1].Move(new Position(2, 4));
// draw();
// pieces[3].Move(new Position(2, 6));
draw();
genFEN();
console.log(pieces);
