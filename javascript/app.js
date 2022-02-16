class Othello{
    constructor(){
        this.rows = []
        this.legalMove = false
        this.blackFlips = []
        this.whiteFlips = []
        this.cpuPossibleMoves = []
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
    legalMoveCheck(playerNum, y, x) {
        this.legalMove = false
        if ((this.rows[y][(x == 0 ? 1 : x) - 1] > 0 || this.rows[y][(x == 7 ? 6 : x) + 1] > 0 || this.rows[(y == 7 ? 6 : y) + 1][x] > 0 || this.rows[(y == 0 ? 1 : y) - 1][x] > 0 || this.rows[(y == 7 ? 6 : y) + 1][(x == 7 ? 6 : x) + 1] > 0 || this.rows[(y == 0 ? 1 : y) - 1][(x == 7 ? 6 : x) + 1] > 0 || this.rows[(y == 7 ? 6 : y) + 1][(x == 0 ? 1 : x) - 1] > 0 || this.rows[(y == 0 ? 1 : y) - 1][(x == 0 ? 1 : x) - 1] > 0) && this.rows[y][x] == 0) {
            for (let i = x - 1; i >= 0; i--){ // check to see if a black piece is in same row in reverse
                if (this.rows[y][i] === playerNum) { // look for the first instance of a black piece
                    // checking first instance of black piece to reference piece is more than 1
                    if ((Math.abs(this.rows[y].indexOf(playerNum, i) - x)) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let j = i + 1; j < x; j++){
                            if (this.rows[y][j] === playerNum){ // If there is a black piece inbetween, return false
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
                                if (playerNum === 1) {
                                    this.blackFlips.push([y, j])
                                    this.legalMove = true
                                }
                                else if (playerNum === 2){
                                    this.whiteFlips.push([y, j])
                                    this.legalMove = true
                                }
                            }
                        }
                    }
                    break
                }
            }
            for (let i = x + 1; i < 8; i++){ // check to see if piece is in same row forward
                if (this.rows[y][i] === playerNum) {
                    // checking first instance of black piece to reference piece is more than 1
                    if ((Math.abs(this.rows[y].indexOf(playerNum, i) - x)) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let j = i - 1; j > x; j--){
                            if (this.rows[y][j] === playerNum){ // If there is a black piece inbetween, return false
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
                                if (playerNum === 1) {
                                    this.blackFlips.push([y, j])
                                    this.legalMove = true
                                }
                                else if (playerNum === 2){
                                    this.whiteFlips.push([y, j])
                                    this.legalMove = true
                                }
                            }
                        }
                    }
                    break
                }
            }
            for (let i = y - 1; i >= 0; i--){ // check to see if piece is in the same column in reverse
                if (this.rows[i][x] === playerNum){
                    // checking first instance of black piece to reference piece is more than 1
                    if (Math.abs(i - y) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let j = i + 1; j < y; j++){
                            if (this.rows[j][x] === playerNum){ // If there is a black piece inbetween, return false
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
                                if (playerNum === 1) {
                                    this.blackFlips.push([j, x])
                                    this.legalMove = true
                                }
                                else if (playerNum === 2){
                                    this.whiteFlips.push([j, x])
                                    this.legalMove = true
                                }
                            }
                        }
                    }
                    break
                }
            }
            for (let i = y + 1; i < 8; i++){ // check to see if piece is in the same column forward
                if (this.rows[i][x] === playerNum){
                    // checking first instance of black piece to reference piece is more than 1
                    if (Math.abs(i - y) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let j = i - 1; j > y; j--){
                            if (this.rows[j][x] === playerNum){ // If there is a black piece inbetween, return false
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
                                if (playerNum === 1) {
                                    this.blackFlips.push([j, x])
                                    this.legalMove = true
                                }
                                else if (playerNum === 2){
                                    this.whiteFlips.push([j, x])
                                    this.legalMove = true
                                }
                            }
                        }
                    }
                    break
                }
            }
            for (let i = y + 1 , j = x + 1 ; i < 8 && j < 8; i++, j++){ // check to see if piece is in down-right diagonal
                if (this.rows[i][j] === playerNum){
                    // checking first instance of black piece to reference piece is more than 1
                    if (Math.abs(i - y) > 1 && Math.abs(j - x) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let k = i - 1, l = j - 1; k > y && l > x; k--, l--){
                            if (this.rows[k][l] === playerNum){ // If there is a black piece inbetween, return false
                                allWhitePieces = false
                                break
                            }
                            else if (this.rows[k][l] === 0){ // if there is an empty space, return false
                                allWhitePieces = false
                                break
                            }
                        }
                        if (allWhitePieces){ // if they all happen to be white, make all of the spaces black
                            for (let k = i - 1, l = j - 1; k >= y && l >= x; k--, l--){
                                if (playerNum === 1) {
                                    this.blackFlips.push([k, l])
                                    this.legalMove = true
                                }
                                else if (playerNum === 2){
                                    this.whiteFlips.push([k, l])
                                    this.legalMove = true
                                }
                            }
                        }
                    }
                    break
                }
            }
            for (let i = y - 1 , j = x - 1 ; i >= 0 && j >= 0; i--, j--){ // check to see if piece is in up-left diagonal
                if (this.rows[i][j] === playerNum){
                    // checking first instance of black piece to reference piece is more than 1
                    if (Math.abs(i - y) > 1 && Math.abs(j - x) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let k = i + 1, l = j + 1; k < y && l < x; k++, l++){
                            if (this.rows[k][l] === playerNum){ // If there is a black piece inbetween, return false
                                allWhitePieces = false
                                break
                            }
                            else if (this.rows[k][l] === 0){ // if there is an empty space, return false
                                allWhitePieces = false
                                break
                            }
                        }
                        if (allWhitePieces){ // if they all happen to be white, make all of the spaces black
                            for (let k = i + 1, l = j + 1; k <= y && l <= x; k++, l++){
                                if (playerNum === 1) {
                                    this.blackFlips.push([k, l])
                                    this.legalMove = true
                                }
                                else if (playerNum === 2){
                                    this.whiteFlips.push([k, l])
                                    this.legalMove = true
                                }
                            }
                        }
                    }
                    break
                }
            }
            for (let i = y - 1 , j = x + 1 ; i >= 0 && j < 8; i--, j++){ // check to see if piece is in up-right diagonal
                if (this.rows[i][j] === playerNum){
                    // checking first instance of black piece to reference piece is more than 1
                    if (Math.abs(i - y) > 1 && Math.abs(j - x) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let k = i + 1, l = j - 1; k < y && l > x; k++, l--){
                            if (this.rows[k][l] === playerNum){ // If there is a black piece inbetween, return false
                                allWhitePieces = false
                                break
                            }
                            else if (this.rows[k][l] === 0){ // if there is an empty space, return false
                                allWhitePieces = false
                                break
                            }
                        }
                        if (allWhitePieces){ // if they all happen to be white, make all of the spaces black
                            for (let k = i + 1, l = j - 1; k <= y && l >= x; k++, l--){
                                if (playerNum === 1) {
                                    this.blackFlips.push([k, l])
                                    this.legalMove = true
                                }
                                else if (playerNum === 2){
                                    this.whiteFlips.push([k, l])
                                    this.legalMove = true
                                }
                            }
                        }
                    }
                    break
                }
            }
            for (let i = y + 1 , j = x - 1 ; i < 8 && j >= 0; i++, j--){ // check to see if piece is in down-left diagonal
                if (this.rows[i][j] === playerNum){
                    // checking first instance of black piece to reference piece is more than 1
                    if (Math.abs(i - y) > 1 && Math.abs(j - x) > 1){
                        let allWhitePieces = true
                        // checking if any of the pieces inbetween are black or empty
                        for (let k = i - 1, l = j + 1; k > y && l < x; k--, l++){
                            if (this.rows[k][l] === playerNum){ // If there is a black piece inbetween, return false
                                allWhitePieces = false
                                break
                            }
                            else if (this.rows[k][l] === 0){ // if there is an empty space, return false
                                allWhitePieces = false
                                break
                            }
                        }
                        if (allWhitePieces){ // if they all happen to be white, make all of the spaces black
                            for (let k = i - 1, l = j + 1; k >= y && l <= x; k--, l++){
                                if (playerNum === 1) {
                                    this.blackFlips.push([k, l])
                                    this.legalMove = true
                                }
                                else if (playerNum === 2){
                                    this.whiteFlips.push([k, l])
                                    this.legalMove = true
                                }
                            }
                        }
                    }
                    break // breaking after the first instance of same piece
                }
            }
        }
        return this.legalMove
    }
    flipBlackPieces() { // function to add changes to corresponing spaces after legal moves
        for (let i = 0; i < this.blackFlips.length; i++){ // iterate through the new array and place changes
            this.rows[this.blackFlips[i][0]][this.blackFlips[i][1]] = 1
        }
        this.blackFlips = [] // after making changes, return to an empty array for next legal check move
    }
    flipWhitePieces() { // function to add changes to corresponing spaces after legal moves
        for (let i = 0; i < this.whiteFlips.length; i++){ // iterate through the new array and place changes
            this.rows[this.whiteFlips[i][0]][this.whiteFlips[i][1]] = 2
        }
        this.whiteFlips = [] // after making changes, return to an empty array for next legal check move
    }
    cpuRandomMove() { // function for cpu to make a random legal move
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) { // iterating through all and adding legals moves to an array
                if (this.legalMoveCheck(2, i, j) == true) {
                    this.cpuPossibleMoves.push([i, j])
                }
            }
        }
        this.whiteFlips = [] // resetting the array for whiteFlips since running through tests fill it
        if(this.cpuPossibleMoves.length > 0) {
            let doMove = Math.floor(Math.random() * this.cpuPossibleMoves.length)
            this.legalMoveCheck(2, this.cpuPossibleMoves[doMove][0], this.cpuPossibleMoves[doMove][1])
            this.flipWhitePieces()
        }
        this.cpuPossibleMoves = [] // resetting the possible moves array back to empty after running possibilites
    }
}

let x = new Othello
x.createRows()
console.log(x.rows)
// x.rows[5][2] = 1
// x.rows[3][5] = 2
// x.rows[4][5] = 2
// x.rows[5][5] = 1
// console.log(x.rows)
// console.log(x.legalMoveCheck(2, 2, 3))
x.cpuRandomMove()
// console.log(x.whiteFlips)
// x.flipWhitePieces()
// console.log(x.whiteFlips)
// console.log(x.cpuPossibleMoves)
console.log(x.rows)
// console.log(x.legalMoveCheck(1, 7, 7))
// document.querySelector('#r3c5').addEventListener('click', function() {
//     let piece = document.querySelector('#gameBoard').appendChild('#r3c5').createElement('span')
//     piece.classList('black')
// })