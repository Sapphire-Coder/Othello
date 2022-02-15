class Othello{
    constructor(){
        this.rows = []
        this.legalMove = false
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
        this.legalMove = false
        if (this.rows[y][x - 1] > 0 || this.rows[y][x + 1] > 0 || this.rows[y + 1][x] > 0 || this.rows[y - 1][x] > 0 || this.rows[y + 1][x + 1] > 0 || this.rows[y - 1][x + 1] > 0 || this.rows[y + 1][x - 1] > 0 || this.rows[y - 1][x - 1] > 0) {
            for (let i = x - 1; i >= 0; i--){ // check to see if a black piece is in same row in reverse
                if (this.rows[y][i] === 1) { // look for the first instance of a black piece
                    // checking first instance of black piece to reference piece is more than 1
                    if ((Math.abs(this.rows[y].indexOf(1, i) - x)) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let j = i + 1; j < x; j++){
                            if (this.rows[y][j] === 1){ // If there is a black piece inbetween, return false
                                allWhitePieces = false
                                break
                            }
                            else if (this.rows[y][j] === 0){ // if there is an empty space, return false
                                allWhitePieces = false
                                break
                            }
                        }
                        if (allWhitePieces){ // if they all happen to be white, make all of the spaces black
                            for (let j = i + 1; j <= x; j++){
                                this.rows[y][j] = 1
                            }
                        }
                    }
                    this.legalMove = true
                    break
                }
            }
            for (let i = x + 1; i < 8; i++){ // check to see if piece is in same row forward
                if (this.rows[y][i] === 1) {
                    // checking first instance of black piece to reference piece is more than 1
                    if ((Math.abs(this.rows[y].indexOf(1, i) - x)) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let j = i - 1; j > x; j--){
                            if (this.rows[y][j] === 1){ // If there is a black piece inbetween, return false
                                allWhitePieces = false
                                break
                            }
                            else if (this.rows[y][j] === 0){ // if there is an empty space, return false
                                allWhitePieces = false
                                break
                            }
                        }
                        if (allWhitePieces){ // if they all happen to be white, make all of the spaces black
                            for (let j = i - 1; j >= x; j--){
                                this.rows[y][j] = 1
                            }
                        }
                    }
                    this.legalMove = true
                    break
                }
            }
            for (let i = y - 1; i >= 0; i--){ // check to see if piece is in the same column in reverse
                if (this.rows[i][x] === 1){
                    // checking first instance of black piece to reference piece is more than 1
                    if (Math.abs(i - y) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let j = i + 1; j < y; j++){
                            if (this.rows[j][x] === 1){ // If there is a black piece inbetween, return false
                                allWhitePieces = false
                                break
                            }
                            else if (this.rows[j][x] === 0){ // if there is an empty space, return false
                                allWhitePieces = false
                                break
                            }
                        }
                        if (allWhitePieces){ // if they all happen to be white, make all of the spaces black
                            for (let j = i + 1; j <= y; j++){
                                this.rows[j][x] = 1
                            }
                        }
                    }
                    this.legalMove = true
                    break
                }
            }
            for (let i = y + 1; i < 8; i++){ // check to see if piece is in the same column forward
                if (this.rows[i][x] === 1){
                    // checking first instance of black piece to reference piece is more than 1
                    if (Math.abs(i - y) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let j = i - 1; j > y; j--){
                            if (this.rows[j][x] === 1){ // If there is a black piece inbetween, return false
                                allWhitePieces = false
                                break
                            }
                            else if (this.rows[j][x] === 0){ // if there is an empty space, return false
                                allWhitePieces = false
                                break
                            }
                        }
                        if (allWhitePieces){ // if they all happen to be white, make all of the spaces black
                            for (let j = i - 1; j >= y; j--){
                                this.rows[j][x] = 1
                            }
                        }
                    }
                    this.legalMove = true
                    break
                }
            }
            for (let i = y + 1 , j = x + 1 ; i < 8 && j < 8; i++, j++){ // check to see if piece is in down-right diagonal
                if (this.rows[i][j] === 1){
                    this.legalMove = true
                }
            }
            for (let i = y - 1 , j = x - 1 ; i >= 0 && j >= 0; i--, j--){ // check to see if piece is in up-left diagonal
                if (this.rows[i][j] === 1){
                    this.legalMove = true
                }
            }
            for (let i = y - 1 , j = x + 1 ; i >= 0 && j < 8; i--, j++){ // check to see if piece is in up-right diagonal
                if (this.rows[i][j] === 1){
                    this.legalMove = true
                }
            }
            for (let i = y + 1 , j = x - 1 ; i < 8 && j >= 0; i++, j--){ // check to see if piece is in down-left diagonal
                if (this.rows[i][j] === 1){
                    this.legalMove = true
                }
            }
        }
        return this.legalMove
    }
}

let x = new Othello
x.createRows()
console.log(x.rows)
console.log(x.legalMoveCheck(2, 4))
console.log(x.rows)
// document.querySelector('#r5c6').addEventListener('click', function() {
//     document.appendChild('span'.className('black'))
// })