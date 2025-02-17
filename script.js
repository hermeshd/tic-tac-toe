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
const gameCellsIcon = gameBoard.querySelector(".play-icon");
const lastMove = document.querySelector(".last-move");
const lastMoveText = document.querySelector(".last-move-text");
const gameResult = document.querySelector(".game-result");

const resetButton = document.querySelector(".reset-button");
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



// Function to insert and load the outline SVG
function addHoverIcon(cell) {
    if (!cell.querySelector(".play-icon") && !cell.querySelector(".play-icon-selected")) { // Prevent duplicate icons
        const objectElement = document.createElement("object");
        objectElement.classList.add("play-icon");
        objectElement.setAttribute("type", "image/svg+xml");
        objectElement.setAttribute("data", `./resources/${playerSymbol.textContent.toLowerCase()}-icon-outline.svg`);

        cell.appendChild(objectElement);

        // Wait for the object to load before adding the event listener
        objectElement.addEventListener("load", () => {
            const svgDoc = objectElement.contentDocument;
            if (svgDoc) {
                const svgElement = svgDoc.querySelector("svg");
                if (svgElement) {
                    svgElement.addEventListener("click", () => {
                        replaceWithFilledIcon(cell);
                        lastMoveText.textContent = cell.dataset.position; // Update the last move text
                        board.setBoard(cell.dataset.position.split(",")[0], cell.dataset.position.split(",")[1], playerSymbol.textContent); // Update the game board
                        printBoard.innerHTML = board.printBoard();
                        checkWin.textContent = board.checkWin();
                        isBoardFull.textContent = board.isBoardFull();
                    });
                }
            }
        });
    }
}

// Function to replace with the filled icon when clicked
function replaceWithFilledIcon(cell) {
    cell.innerHTML = `<object class="play-icon-selected" type="image/svg+xml" data="./resources/${playerSymbol.textContent.toLowerCase()}-icon-filled.svg"></object>`;
}

// Add event listeners for hover effect
gameCells.forEach(cell => {
    cell.addEventListener("mouseenter", () => addHoverIcon(cell));

    cell.addEventListener("mouseleave", () => {
        const icon = cell.querySelector(".play-icon");
        if (icon) {
            cell.removeChild(icon);
        }
    });
});






// if (cell.textContent !== "") {
//     isLastMoveRepeated.textContent = "true";
// } else {
//     isLastMoveRepeated.textContent = "false";
// }

// lastMoveText.textContent = cell.dataset.position; // Update the last move text
// board.setBoard(cell.dataset.position.split(",")[0], cell.dataset.position.split(",")[1], playerSymbol.textContent); // Update the game board
// printBoard.innerHTML = board.printBoard();
// checkWin.textContent = board.checkWin();
// isBoardFull.textContent = board.isBoardFull();
// cell.style.cursor = "default";


//Reset everything when reset button is clicked
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


//Change header icon's color

// --white-color: #edf2f4;
// --light-red: #ef233c;

// Wait for the SVG to load
document.getElementById('header-icon').addEventListener('load', function () {
    // Access the SVG's internal document
    const svgDoc = this.getSVGDocument();

    // Select the element(s) you want to modify
    const xColor = svgDoc.querySelector('.x-color');
    const oColor = svgDoc.querySelectorAll('.o-color');
    const dividerColor = svgDoc.querySelector('.divider-color');

    // Change the fill color of all o-color elements
    oColor.forEach(o => {
        o.style.fill = '#edf2f4';
    });

    // Change the fill color of the x-color element
    xColor.style.fill = '#ef233c';

    // Change the fill color of the divider-color element
    dividerColor.style.fill = '#2b2d42';
});


//Change footer icon's color

// Wait for the SVG to load
document.getElementById('footer-icon').addEventListener('load', function () {
    // Access the SVG's internal document
    const svgDoc = this.getSVGDocument();

    // Select the element(s) you want to modify
    const paths = svgDoc.querySelectorAll('path');

    // Change the fill color of all <path> elements
    paths.forEach(path => {
        path.style.fill = 'red';
    });
});
