export function isUpperCase(string) {
    return string === string.toUpperCase();
}

export function isLowerCase(string) {
    return string === string.toLowerCase();
}

export class Vec2 {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}