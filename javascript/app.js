class Othello{
    constructor(){
        this.rows = []
        this.legalMove = null
    }
    createRows() { // creates the 8 rows, and fills them with 0 so they have the proper spaces
        for (let i = 0; i < 8; i++){
            this.rows[i] = [0, 0, 0, 0, 0, 0, 0, 0]
        } // 1 stands for black pieces, 2 stands for white pieces, and this initiates the starting board
        this.rows[3][3] = 1
        this.rows[3][4] = 2
        this.rows[4][3] = 2
        this.rows[4][4] = 1
    }
    legalMoveCheck(y, x) {
        if(this.rows[y].includes(1)){ // check to see if piece is in the same row
            this.legalMove = true
        }
        for (let i = 0; i < this.rows.length; i++){ // check to see if piece is in the same column
            if (this.rows[i][x] === 1){
                this.legalMove = true
            }
        }
        for (let i = y + 1 , j = x + 1 ; i < 8 && j < 8; i++, j++){
            if (this.rows[i][j] === 1){
                this.legalMove = true
            }
        }
        for (let i = y - 1 , j = x - 1 ; i >= 0 && j >= 0; i--, j--){
            if (this.rows[i][j] === 1){
                this.legalMove = true
            }
        }
        for (let i = y - 1 , j = x + 1 ; i >= 0 && j < 8; i--, j++){
            if (this.rows[i][j] === 1){
                this.legalMove = true
            }
        }
        for (let i = y + 1 , j = x - 1 ; i < 8 && j >= 0; i++, j--){
            if (this.rows[i][j] === 1){
                this.legalMove = true
            }
        }
        return this.legalMove
    }
}

let x = new Othello
x.createRows()
console.log(x.rows)
console.log(x.legalMoveCheck(7, 7))
// document.querySelector('#r5c6').addEventListener('click', function() {
//     document.appendChild('span'.className('black'))
// })