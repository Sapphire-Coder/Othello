class Othello{
    constructor(){
        this.rows = []
        this.legalMove = false
        this.blackFlips = []
        this.whiteFlips = []
        this.cpuPossibleMoves = []
        this.blackScore = 0
        this.whiteScore = 0
        this.blackHasMoves = false
        this.whiteHasMoves = false
        this.playerPass = false
        this.cpuPass = false
    }
    createRows() { // creates the 8 rows, and fills them with 0 so they have the proper spaces
        for (let i = 0; i < 8; i++){
            this.rows[i] = [0, 0, 0, 0, 0, 0, 0, 0]
        } // 1 stands for black pieces, 2 stands for white pieces, and this initiates the starting board
        this.rows[3][3] = 2
        this.rows[3][4] = 1
        this.rows[4][3] = 1
        this.rows[4][4] = 2
    }
    legalMoveCheck(playerNum, y, x) {
        this.legalMove = false
        if ((this.rows[y][(x == 0 ? 1 : x) - 1] > 0 || this.rows[y][(x == 7 ? 6 : x) + 1] > 0 || this.rows[(y == 7 ? 6 : y) + 1][x] > 0 || this.rows[(y == 0 ? 1 : y) - 1][x] > 0 || this.rows[(y == 7 ? 6 : y) + 1][(x == 7 ? 6 : x) + 1] > 0 || this.rows[(y == 0 ? 1 : y) - 1][(x == 7 ? 6 : x) + 1] > 0 || this.rows[(y == 7 ? 6 : y) + 1][(x == 0 ? 1 : x) - 1] > 0 || this.rows[(y == 0 ? 1 : y) - 1][(x == 0 ? 1 : x) - 1] > 0) && this.rows[y][x] == 0) {
            for (let i = x - 1; i >= 0; i--){ // check to see if a same color piece is in same row in reverse
                if (this.rows[y][i] === playerNum) { // look for the first instance of a same piece
                    // checking first instance of same piece space to reference piece is more than 1
                    if ((Math.abs(this.rows[y].indexOf(playerNum, i) - x)) > 1){
                        let oppColor = true
                        // checking if any of the pieces inbetween are the same color or empty
                        for (let j = i + 1; j < x; j++){
                            if (this.rows[y][j] === playerNum){ // If there is a same color piece inbetween, return false
                                oppColor = false
                                break
                            }
                            else if (this.rows[y][j] === 0){ // if there is an empty space, return false
                                oppColor = false
                                break
                            }
                        }
                        if (oppColor){ // if they all happen to be the opposing color, make all of the spaces player color
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
                    // checking first instance of same color piece to reference piece is more than 1
                    if ((Math.abs(this.rows[y].indexOf(playerNum, i) - x)) > 1){
                        let oppColor = true
                        // checking if any of the pieces inbetween are same color or empty
                        for (let j = i - 1; j > x; j--){
                            if (this.rows[y][j] === playerNum){ // If there is a same color piece inbetween, return false
                                oppColor = false
                                break
                            }
                            else if (this.rows[y][j] === 0){ // if there is an empty space, return false
                                oppColor = false
                                break
                            }
                        }
                        if (oppColor){ // if they all happen to be opposing color, make all of the spaces player color
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
                    // checking first instance of same color piece space to reference piece is more than 1
                    if (Math.abs(i - y) > 1){
                        let oppColor = true
                        // checking if any of the pieces inbetween are same color or empty
                        for (let j = i + 1; j < y; j++){
                            if (this.rows[j][x] === playerNum){ // If there is a same color piece inbetween, return false
                                oppColor = false
                                break
                            }
                            else if (this.rows[j][x] === 0){ // if there is an empty space, return false
                                oppColor = false
                                break
                            }
                        }
                        if (oppColor){ // if they all happen to be opposing color, make all of the spaces player color
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
                    // checking first instance of same color piece space to reference piece is more than 1
                    if (Math.abs(i - y) > 1){
                        let oppColor = true
                        // checking if any of the pieces inbetween are same color or empty
                        for (let j = i - 1; j > y; j--){
                            if (this.rows[j][x] === playerNum){ // If there is a same color piece inbetween, return false
                                oppColor = false
                                break
                            }
                            else if (this.rows[j][x] === 0){ // if there is an empty space, return false
                                oppColor = false
                                break
                            }
                        }
                        if (oppColor){ // if they all happen to be opposing color, make all of the spaces player color
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
                    // checking first instance of same color piece space to reference piece is more than 1
                    if (Math.abs(i - y) > 1 && Math.abs(j - x) > 1){
                        let oppColor = true
                        // checking if any of the pieces inbetween are same color or empty
                        for (let k = i - 1, l = j - 1; k > y && l > x; k--, l--){
                            if (this.rows[k][l] === playerNum){ // If there is a same color piece inbetween, return false
                                oppColor = false
                                break
                            }
                            else if (this.rows[k][l] === 0){ // if there is an empty space, return false
                                oppColor = false
                                break
                            }
                        }
                        if (oppColor){ // if they all happen to be opposing color, make all of the spaces player color
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
                    // checking first instance of same color piece space to reference piece is more than 1
                    if (Math.abs(i - y) > 1 && Math.abs(j - x) > 1){
                        let oppColor = true
                        // checking if any of the pieces inbetween are same color or empty
                        for (let k = i + 1, l = j + 1; k < y && l < x; k++, l++){
                            if (this.rows[k][l] === playerNum){ // If there is a same color piece inbetween, return false
                                oppColor = false
                                break
                            }
                            else if (this.rows[k][l] === 0){ // if there is an empty space, return false
                                oppColor = false
                                break
                            }
                        }
                        if (oppColor){ // if they all happen to be opposing color, make all of the spaces player color
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
                    // checking first instance of same color piece space to reference piece is more than 1
                    if (Math.abs(i - y) > 1 && Math.abs(j - x) > 1){
                        let oppColor = true
                        // checking if any of the pieces inbetween are same color or empty
                        for (let k = i + 1, l = j - 1; k < y && l > x; k++, l--){
                            if (this.rows[k][l] === playerNum){ // If there is a same color piece inbetween, return false
                                oppColor = false
                                break
                            }
                            else if (this.rows[k][l] === 0){ // if there is an empty space, return false
                                oppColor = false
                                break
                            }
                        }
                        if (oppColor){ // if they all happen to be opposing color, make all of the spaces player color
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
                    // checking first instance of same color piece space to reference piece is more than 1
                    if (Math.abs(i - y) > 1 && Math.abs(j - x) > 1){
                        let oppColor = true
                        // checking if any of the pieces inbetween are same color or empty
                        for (let k = i - 1, l = j + 1; k > y && l < x; k--, l++){
                            if (this.rows[k][l] === playerNum){ // If there is a same color piece inbetween, return false
                                oppColor = false
                                break
                            }
                            else if (this.rows[k][l] === 0){ // if there is an empty space, return false
                                oppColor = false
                                break
                            }
                        }
                        if (oppColor){ // if they all happen to be opposing color, make all of the spaces player color
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
        this.whiteHasMoves = false
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) { // iterating through all and adding legals moves to an array
                if (this.legalMoveCheck(2, i, j) == true) {
                    this.cpuPossibleMoves.push([i, j])
                }
            }
        }
        this.whiteFlips = [] // resetting the array for whiteFlips since running through tests fill it
        if(this.cpuPossibleMoves.length > 0) {
            this.whiteHasMoves = true
            this.cpuPass = false
            let doMove = Math.floor(Math.random() * this.cpuPossibleMoves.length)
            this.legalMoveCheck(2, this.cpuPossibleMoves[doMove][0], this.cpuPossibleMoves[doMove][1])
            this.whiteFlips.forEach(flip => {
                document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece white"></span>'

            })
            this.flipWhitePieces()
            this.score()
        }
        else{
            document.querySelector('#cpuTurnStatus').innerHTML = 'The opponent has no legal moves, their turn passes.'
            this.cpuPass = true
        }
        this.cpuPossibleMoves = [] // resetting the possible moves array back to empty after running possibilites
        return this.whiteHasMoves
    }
    score() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.rows[i][j] === 1) {
                    this.blackScore++
                }
                else if (this.rows[i][j] === 2) {
                    this.whiteScore++
                }
            }
        }
        document.querySelector('#blackScore').innerHTML = `${this.blackScore}`
        document.querySelector('#whiteScore').innerHTML = `${this.whiteScore}`
        this.blackScore = 0
        this.whiteScore = 0
    }
    blackPossibleMoves() {
        this.blackHasMoves = false
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) { // iterating through all to check for legal moves
                if (this.legalMoveCheck(1, i, j) == true) {
                    this.playerPass = false
                    this.blackHasMoves = true
                    break
                }
            }
            if (this.blackHasMoves == true){
                break
            }
        }
        this.blackFlips = [] // resetting the array for blackFlips since running through tests fill it
        if(this.blackHasMoves == true) {
            document.querySelector('#playerTurnStatus').innerHTML = 'Your Turn'
            document.querySelector('#cpuTurnStatus').innerHTML = null
        }
        else {
            document.querySelector('#playerTurnStatus').innerHTML = 'You have no legal moves, so your turn passes.'
            this.playerPass = true
        }
        return this.blackHasMoves
    }
    winCheck() {
        this.blackPossibleMoves()
        if(this.blackHasMoves == false && this.cpuRandomMove() == true) {
            this.cpuRandomMove()
        }
        if(this.playerPass == true && this.cpuPass == true){
            let finalPlayerScore = 0
            let finalCpuScore = 0
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++){
                    if (this.rows[i][j] == 1)
                    finalPlayerScore++
                    else if (this.rows[i][j] == 2) {
                        finalCpuScore++
                    }
                }
            }
            if (finalPlayerScore > finalCpuScore) {
                document.querySelector('#playerTurnStatus').innerHTML = 'You win!'
                document.querySelector('#cpuTurnStatus').innerHTML = 'The opponent loses!'
            }
            else if (finalPlayerScore < finalCpuScore) {
                document.querySelector('#playerTurnStatus').innerHTML = 'You lose!'
                document.querySelector('#cpuTurnStatus').innerHTML = 'The opponent wins!'
            }
            else {
                document.querySelector('#cpuTurnStatus').innerHTML = 'It is a tie!'
                document.querySelector('#cpuTurnStatus').innerHTML = 'It is a tie!'
            }
        }
    }
}

let x = new Othello
x.createRows()
x.score()
const cpuMoveDelay = () => {
    x.cpuRandomMove()
    x.winCheck()
}
document.querySelector('#reset').onclick = function() {
    x.createRows()
    x.score()
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            document.querySelector(`#r${i}c${j}`).innerHTML = null
        }
    }
    document.querySelector('#playerTurnStatus').innerHTML = 'Your Turn'
    document.querySelector('#cpuTurnStatus').innerHTML = null
    document.querySelector(`#r4c4`).innerHTML = '<span class="piece white"></span>'
    document.querySelector(`#r5c5`).innerHTML = '<span class="piece white"></span>'
    document.querySelector(`#r4c5`).innerHTML = '<span class="piece black"></span>'
    document.querySelector(`#r5c4`).innerHTML = '<span class="piece black"></span>'
}

document.querySelector('#r1c1').onclick = function() {
    if (x.legalMoveCheck(1, 0, 0)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r1c2').onclick = function() {
    if (x.legalMoveCheck(1, 0, 1)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r1c3').onclick = function() {
    if (x.legalMoveCheck(1, 0, 2)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r1c4').onclick = function() {
    if (x.legalMoveCheck(1, 0, 3)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r1c5').onclick = function() {
    if (x.legalMoveCheck(1, 0, 4)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r1c6').onclick = function() {
    if (x.legalMoveCheck(1, 0, 5)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r1c7').onclick = function() {
    if (x.legalMoveCheck(1, 0, 6)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r1c8').onclick = function() {
    if (x.legalMoveCheck(1, 0, 7)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r2c1').onclick = function() {
    if (x.legalMoveCheck(1, 1, 0)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r2c2').onclick = function() {
    if (x.legalMoveCheck(1, 1, 1)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r2c3').onclick = function() {
    if (x.legalMoveCheck(1, 1, 2)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r2c4').onclick = function() {
    if (x.legalMoveCheck(1, 1, 3)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r2c5').onclick = function() {
    if (x.legalMoveCheck(1, 1, 4)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r2c6').onclick = function() {
    if (x.legalMoveCheck(1, 1, 5)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r2c7').onclick = function() {
    if (x.legalMoveCheck(1, 1, 6)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r2c8').onclick = function() {
    if (x.legalMoveCheck(1, 1, 7)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r3c1').onclick = function() {
    if (x.legalMoveCheck(1, 2, 0)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r3c2').onclick = function() {
    if (x.legalMoveCheck(1, 2, 1)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r3c3').onclick = function() {
    if (x.legalMoveCheck(1, 2, 2)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r3c4').onclick = function() {
    if (x.legalMoveCheck(1, 2, 3)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r3c5').onclick = function() {
    if (x.legalMoveCheck(1, 2, 4)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r3c6').onclick = function() {
    if (x.legalMoveCheck(1, 2, 5)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r3c7').onclick = function() {
    if (x.legalMoveCheck(1, 2, 6)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r3c8').onclick = function() {
    if (x.legalMoveCheck(1, 2, 7)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r4c1').onclick = function() {
    if (x.legalMoveCheck(1, 3, 0)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r4c2').onclick = function() {
    if (x.legalMoveCheck(1, 3, 1)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r4c3').onclick = function() {
    if (x.legalMoveCheck(1, 3, 2)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r4c4').onclick = function() {
    if (x.legalMoveCheck(1, 3, 3)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r4c5').onclick = function() {
    if (x.legalMoveCheck(1, 3, 4)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r4c6').onclick = function() {
    if (x.legalMoveCheck(1, 3, 5)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r4c7').onclick = function() {
    if (x.legalMoveCheck(1, 3, 6)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r4c8').onclick = function() {
    if (x.legalMoveCheck(1, 3, 7)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r5c1').onclick = function() {
    if (x.legalMoveCheck(1, 4, 0)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r5c2').onclick = function() {
    if (x.legalMoveCheck(1, 4, 1)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r5c3').onclick = function() {
    if (x.legalMoveCheck(1, 4, 2)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r5c4').onclick = function() {
    if (x.legalMoveCheck(1, 4, 3)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r5c5').onclick = function() {
    if (x.legalMoveCheck(1, 4, 4)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r5c6').onclick = function() {
    if (x.legalMoveCheck(1, 4, 5)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r5c7').onclick = function() {
    if (x.legalMoveCheck(1, 4, 6)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r5c8').onclick = function() {
    if (x.legalMoveCheck(1, 4, 7)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r6c1').onclick = function() {
    if (x.legalMoveCheck(1, 5, 0)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r6c2').onclick = function() {
    if (x.legalMoveCheck(1, 5, 1)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r6c3').onclick = function() {
    if (x.legalMoveCheck(1, 5, 2)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r6c4').onclick = function() {
    if (x.legalMoveCheck(1, 5, 3)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r6c5').onclick = function() {
    if (x.legalMoveCheck(1, 5, 4)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r6c6').onclick = function() {
    if (x.legalMoveCheck(1, 5, 5)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r6c7').onclick = function() {
    if (x.legalMoveCheck(1, 5, 6)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r6c8').onclick = function() {
    if (x.legalMoveCheck(1, 5, 7)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r7c1').onclick = function() {
    if (x.legalMoveCheck(1, 6, 0)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r7c2').onclick = function() {
    if (x.legalMoveCheck(1, 6, 1)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r7c3').onclick = function() {
    if (x.legalMoveCheck(1, 6, 2)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r7c4').onclick = function() {
    if (x.legalMoveCheck(1, 6, 3)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r7c5').onclick = function() {
    if (x.legalMoveCheck(1, 6, 4)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r7c6').onclick = function() {
    if (x.legalMoveCheck(1, 6, 5)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r7c7').onclick = function() {
    if (x.legalMoveCheck(1, 6, 6)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r7c8').onclick = function() {
    if (x.legalMoveCheck(1, 6, 7)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r8c1').onclick = function() {
    if (x.legalMoveCheck(1, 7, 0)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r8c2').onclick = function() {
    if (x.legalMoveCheck(1, 7, 1)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r8c3').onclick = function() {
    if (x.legalMoveCheck(1, 7, 2)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r8c4').onclick = function() {
    if (x.legalMoveCheck(1, 7, 3)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r8c5').onclick = function() {
    if (x.legalMoveCheck(1, 7, 4)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r8c6').onclick = function() {
    if (x.legalMoveCheck(1, 7, 5)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r8c7').onclick = function() {
    if (x.legalMoveCheck(1, 7, 6)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}
document.querySelector('#r8c8').onclick = function() {
    if (x.legalMoveCheck(1, 7, 7)) {
        x.blackFlips.forEach(flip => {
            document.querySelector(`#r${flip[0] + 1}c${flip[1] + 1}`).innerHTML = '<span class="piece black"></span>'
        })
        x.flipBlackPieces()
        x.score()
        document.querySelector('#playerTurnStatus').innerHTML = null
        document.querySelector('#cpuTurnStatus').innerHTML = 'Opponent\'s Turn'
        setTimeout(cpuMoveDelay, 1500)
    }
    else {
        alert('This is not a valid move!')
    }
}