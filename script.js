function gameboard(boardTitle) {
    const board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    const getBoardTitle = () => boardTitle;

    const printBoard = () => {
        console.log("Current Board:");
        board.forEach(row => console.log(row.join(" | ")));
        console.log("\n");
    };
    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = " ";
            }
        }
    };
    const setBoard = (row, col, value) => board[row][col] = value;
    const isBoardFull = () => board.every(row => row.every(cell => cell !== " "));
    const checkWin = () => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== " ") {
                return board[i][0];
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== " ") {
                return board[0][i];
            }
        }
        // Check diagonals
        if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== " ") {
            return board[0][0];
        }
        if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== " ") {
            return board[0][2];
        }
        // No winner
        return null;
    };

    return { printBoard, resetBoard, setBoard, isBoardFull, checkWin, getBoardTitle };
}

// Correct usage:
const board = gameboard("Hermes v CPU"); // Call the function to get the board object
board.setBoard(0, 1, "X");
console.log(board.printBoard());