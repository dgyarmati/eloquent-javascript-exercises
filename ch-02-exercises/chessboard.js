/*
    Chessboard
    Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines.
    At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.

    Passing this string to console.log should show something like this:

     # # # #
    # # # #
     # # # #
    # # # #
     # # # #
    # # # #
     # # # #
    # # # #
    When you have a program that generates this pattern, define a binding size = 8 and change the program so that it works for any size,
    outputting a grid of the given width and height.
 */

// solution 1
function createChessboard(n) {
    let s = "";
    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) { // even row
            for (let j = 0; j < n; j++) {
                s += (j % 2 === 0) ? " " : "#";
            }
        } else { // odd row
            for (let j = 0; j < n; j++) {
                s += (j % 2 === 0) ? "#" : " ";
            }
        }
        s += "\n";
    }
    return s;
}

console.log(createChessboard(2));
console.log(createChessboard(3));
console.log(createChessboard(4));
console.log(createChessboard(8));
console.log(createChessboard(9));

// solution 2
function createRow(first, second, n) {
    let row = "";
    for (let i = 0; i < n; i++) {
        row += (!(i % 2)) ? first : second;
    }
    return row;
}

function createChessboard2(n) {
    let evenRow = createRow(" ", "#", n);
    let oddRow = createRow("#", " ", n);

    let chessBoard = "";
    for (let i = 0; i < n; i++) {
        chessBoard += (!(i % 2)) ? evenRow + "\n" : oddRow + "\n";
    }

    return chessBoard;
}

console.log(createChessboard2(2));
console.log(createChessboard2(3));
console.log(createChessboard2(4));
console.log(createChessboard2(8));
console.log(createChessboard2(9));
