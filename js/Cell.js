export default class Cell {
    row;
    col;
    curve;
    constructor(row, col){
        this.row = row;
        this.col = col;
        this.curve = null;
    }
}