function gameboard(boardTitle) {
    const board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    const getBoardTitle = () => boardTitle;

    const printBoard = () => {
        boardPrint = "";
        board.forEach(row => { boardPrint += row.join(" | ") + "<br>" });
        return boardPrint;
    };
    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = " ";
            }
        }
    };

    // Setters
    const setBoard = (row, col, value) => board[row][col] = value;

    // Checkers
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















const board = gameboard("Hermes v CPU"); // Call the function to get the board object


const symbolButtons = document.querySelectorAll(".symbol-button");
const gameBoard = document.querySelector(".gameboard");
const gameInfo = document.querySelector(".game-info");
const playerSymbol = document.querySelector(".player-symbol");
const gameCells = gameBoard.querySelectorAll(".cell");
const lastMove = document.querySelector(".last-move");
const lastMoveText = document.querySelector(".last-move-text");
const gameResult = document.querySelector(".game-result");

const resetButton = document.querySelector(".parameter-reset-button");
const isBoardFull = document.querySelector(".parameter-is-board-full");
const isLastMoveRepeated = document.querySelector(".parameter-is-repeated");
const checkWin = document.querySelector(".parameter-check-win");
const boardTitle = document.querySelector(".parameter-board-title");
const printBoard = document.querySelector(".parameter-print-board");


// Loop through each button and add an event listener
symbolButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedSymbol = button.textContent; // Get the text content of the clicked button
        playerSymbol.textContent = selectedSymbol; // Update the player symbol display
    });
});


// Loop through each game cell and add an event listener
gameCells.forEach(cell => {

    cell.addEventListener("click", () => {

        if (cell.textContent !== "") {
            isLastMoveRepeated.textContent = "true";
        } else {
            isLastMoveRepeated.textContent = "false";
        }

        cell.textContent = playerSymbol.textContent;
        lastMoveText.textContent = cell.dataset.position;
        board.setBoard(cell.dataset.position.split(",")[0], cell.dataset.position.split(",")[1], playerSymbol.textContent);
        printBoard.innerHTML = board.printBoard();
        checkWin.textContent = board.checkWin();
        isBoardFull.textContent = board.isBoardFull();
    }); // Set the text content of the clicked cell to the selected symbol

});

resetButton.addEventListener("click", () => {
    board.resetBoard();
    printBoard.innerHTML = board.printBoard();
    gameCells.forEach(cell => {
        cell.textContent = "";
    })
    checkWin.textContent = board.checkWin();
    lastMoveText.textContent = "";
    isLastMoveRepeated.textContent = "false";
});



